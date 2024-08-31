"use strict";
// import EmailWithTrackMechInterface from "./Email/EmailWithTrackMechInterface";
// import MockAuthProvidersInterface from "./MockAuthPoviders/MockAuthProvidersInterface";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
var CircuitBreakerStates;
(function (CircuitBreakerStates) {
    CircuitBreakerStates[CircuitBreakerStates["Closed"] = 0] = "Closed";
    CircuitBreakerStates[CircuitBreakerStates["Opened"] = 1] = "Opened";
    CircuitBreakerStates[CircuitBreakerStates["HalfOpen"] = 2] = "HalfOpen";
})(CircuitBreakerStates || (CircuitBreakerStates = {}));
class RetryMechanism {
    constructor(timeoutInMilli, thresholdFailureCnt) {
        this.timeoutInMilli = timeoutInMilli;
        this.thresholdFailureCnt = thresholdFailureCnt;
        this.providerStates = new Map();
    }
    registerProvider(provider) {
        this.providerStates.set(provider, {
            state: CircuitBreakerStates.Closed,
            failureCnt: 0,
            lastFailureTimeOut: 0
        });
    }
    canRetry(provider) {
        const providerState = this.providerStates.get(provider);
        if (!providerState)
            return false;
        if (providerState.state === CircuitBreakerStates.Opened) {
            if (Date.now() - providerState.lastFailureTimeOut > this.timeoutInMilli) {
                providerState.state = CircuitBreakerStates.HalfOpen;
                return true;
            }
            return false;
        }
        return true;
    }
    tryToSend(email, providers) {
        return __awaiter(this, void 0, void 0, function* () {
            for (const provider of providers) {
                const providerState = this.providerStates.get(provider);
                if (!providerState)
                    continue;
                if (this.canRetry(provider)) {
                    try {
                        yield provider.sendEmail(email.getActualMail());
                        providerState.state = CircuitBreakerStates.Closed;
                        email.setStatus("sent");
                        email.setErrorMessage("No errors!");
                        email.setProvider(provider.getProviderName());
                        email.setRetryCnt(providerState.failureCnt);
                        providerState.failureCnt = 0;
                        providerState.lastFailureTimeOut = 0;
                        return "Email sent successfully";
                    }
                    catch (error) {
                        providerState.failureCnt++;
                        providerState.lastFailureTimeOut = Date.now();
                        if (providerState.failureCnt >= this.thresholdFailureCnt) {
                            providerState.state = CircuitBreakerStates.Opened;
                        }
                        else {
                            yield this.exponentialBackoff(providerState.failureCnt);
                        }
                    }
                }
            }
            email.setStatus("failed");
            email.setErrorMessage("All auth providers failed. Please try again later.");
            return "All auth providers failed. Please try again later.";
        });
    }
    exponentialBackoff(failureCnt) {
        return __awaiter(this, void 0, void 0, function* () {
            const waitTime = Math.pow(2, failureCnt) * 100;
            return new Promise((resolve) => setTimeout(resolve, waitTime));
        });
    }
}
exports.default = RetryMechanism;
