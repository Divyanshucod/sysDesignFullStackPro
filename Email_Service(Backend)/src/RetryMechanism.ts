
// import EmailWithTrackMechInterface from "./Email/EmailWithTrackMechInterface";
// import MockAuthProvidersInterface from "./MockAuthPoviders/MockAuthProvidersInterface";

// enum CircuitBreakerStates{
//     Closed,
//     Opended,
//     HalfOpen,
// }
// class RetryMechanism {
//    private timeoutInMilli: number;
//    private thresholdFailureCnt: number;
//    private providerStates: Map<MockAuthProvidersInterface, {
//        state: CircuitBreakerStates,
//        failureCnt: number,
//        lastFailureTimeOut: number
//    }>;

//    constructor(timeoutInMilli: number, thresholdFailureCnt: number) {
//        this.timeoutInMilli = timeoutInMilli;
//        this.thresholdFailureCnt = thresholdFailureCnt;
//        this.providerStates = new Map();
//    }

//    public registerProvider(provider: MockAuthProvidersInterface): void {
//        this.providerStates.set(provider, {
//            state: CircuitBreakerStates.Closed,
//            failureCnt: 0,
//            lastFailureTimeOut: 0
//        });
//    }

//    private canRetry(provider: MockAuthProvidersInterface): boolean {
//        const providerState = this.providerStates.get(provider);
//        if (!providerState) return false;

//        if (providerState.state === CircuitBreakerStates.Opended) {
//            if (Date.now() - providerState.lastFailureTimeOut > this.timeoutInMilli) {
//                providerState.state = CircuitBreakerStates.HalfOpen;
//                return true;
//            }
//            return false;
//        }

//        return true;
//    }

//    public async tryToSend(email: EmailWithTrackMechInterface, providers: MockAuthProvidersInterface[]): Promise<string> {
//        for (let provider of providers) {
//            const providerState = this.providerStates.get(provider);
//            if (!providerState) continue;

//            if (this.canRetry(provider)) {
//                try {
//                    await provider.sendEmail(email.getActualMail()).then(()=>{ providerState.state = CircuitBreakerStates.Closed;
//                     email.setStatus("sent");
//                     email.setErrorMessage("No errors!");
//                     email.setProvider(provider.getProviderName());
//                     email.setRetryCnt(providerState.failureCnt);
//                     providerState.failureCnt = 0;
//                     providerState.lastFailureTimeOut=0;
//                     return "Email Sended"}).catch(err => {return err});
//                } catch (error) {
//                    providerState.failureCnt++;
//                    providerState.lastFailureTimeOut = Date.now();

//                    if (providerState.failureCnt >= this.thresholdFailureCnt) {
//                        providerState.state = CircuitBreakerStates.Opended;
//                    } else {
//                      await this.exponentialBackoff(providerState.failureCnt);
//                    }
//                }
//            }
//        }

//        email.setStatus("failed");
//        email.setErrorMessage("Auth providers are not working. Try again Later");
//        return "Auth providers are not working. Try again Later";
//    }
//       private async exponentialBackoff(failureCnt:number): Promise<void> {
//       const waitTime = Math.pow(2, failureCnt) * 100;
//       return new Promise((resolve) => setTimeout(resolve, waitTime));
//   }
// }

import EmailWithTrackMechInterface from "./Email/EmailWithTrackMechInterface";
import MockAuthProvidersInterface from "./MockAuthPoviders/MockAuthProvidersInterface";

enum CircuitBreakerStates {
    Closed,
    Opened,
    HalfOpen,
}

class RetryMechanism {
    private timeoutInMilli: number;
    private thresholdFailureCnt: number;
    private providerStates: Map<MockAuthProvidersInterface, {
        state: CircuitBreakerStates,
        failureCnt: number,
        lastFailureTimeOut: number
    }>;

    constructor(timeoutInMilli: number, thresholdFailureCnt: number) {
        this.timeoutInMilli = timeoutInMilli;
        this.thresholdFailureCnt = thresholdFailureCnt;
        this.providerStates = new Map();
    }

    public registerProvider(provider: MockAuthProvidersInterface): void {
        this.providerStates.set(provider, {
            state: CircuitBreakerStates.Closed,
            failureCnt: 0,
            lastFailureTimeOut: 0
        });
    }

    private canRetry(provider: MockAuthProvidersInterface): boolean {
        const providerState = this.providerStates.get(provider);
        if (!providerState) return false;

        if (providerState.state === CircuitBreakerStates.Opened) {
            if (Date.now() - providerState.lastFailureTimeOut > this.timeoutInMilli) {
                providerState.state = CircuitBreakerStates.HalfOpen;
                return true;
            }
            return false;
        }

        return true;
    }

    public async tryToSend(email: EmailWithTrackMechInterface, providers: MockAuthProvidersInterface[]): Promise<string> {
        for (const provider of providers) {
            const providerState = this.providerStates.get(provider);
            if (!providerState) continue;

            if (this.canRetry(provider)) {
                try {
                    await provider.sendEmail(email.getActualMail());
                    providerState.state = CircuitBreakerStates.Closed;
                    email.setStatus("sent");
                    email.setErrorMessage("No errors!");
                    email.setProvider(provider.getProviderName());
                    email.setRetryCnt(providerState.failureCnt);
                    providerState.failureCnt = 0;
                    providerState.lastFailureTimeOut = 0;
                    return "Email sent successfully";
                } catch (error) {
                    providerState.failureCnt++;
                    providerState.lastFailureTimeOut = Date.now();

                    if (providerState.failureCnt >= this.thresholdFailureCnt) {
                        providerState.state = CircuitBreakerStates.Opened;
                    } else {
                        await this.exponentialBackoff(providerState.failureCnt);
                    }
                }
            }
        }

        email.setStatus("failed");
        email.setErrorMessage("All auth providers failed. Please try again later.");
        return "All auth providers failed. Please try again later.";
    }

    private async exponentialBackoff(failureCnt: number): Promise<void> {
        const waitTime = Math.pow(2, failureCnt) * 100;
        return new Promise((resolve) => setTimeout(resolve, waitTime));
    }
}

export default RetryMechanism;