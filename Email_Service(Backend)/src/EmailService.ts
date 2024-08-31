
// import EmailWithTrackingMech from "./Email/EmailWithTrackingMech";
// import NormalEmailInterface from "./Email/NormalEmailInterface";
// import MockAuthProvidersInterface from "./MockAuthPoviders/MockAuthProvidersInterface";
// import RetryMechanism from "./RetryMechanism";
// import StatusOfEmails from "./StatusOfEmails";
// class EmailService{
//     private rateLimit: number;
//     private emailsSentInWindow: number = 0;
//     private rateLimitWindow: number;
//     private windowStartTime: number;
//     private retryMechanism: RetryMechanism;
//     private providers: MockAuthProvidersInterface[];
//     private listOfEmail:NormalEmailInterface[] = [];
//     private statusOfEmails:StatusOfEmails;

//     constructor(providers: MockAuthProvidersInterface[], retryMechanism: RetryMechanism,rateLimitWindow:number,rateLimit:number,statusOfEmails:StatusOfEmails) {
//         this.providers = providers;
//         this.retryMechanism = retryMechanism;
//         this.rateLimit = rateLimit;
//         this.rateLimitWindow = rateLimitWindow;
//         this.windowStartTime = Date.now();
//         this.statusOfEmails = statusOfEmails;

//         this.providers.forEach(provider => {
//             this.retryMechanism.registerProvider(provider);
//         });
//     }

//     public async sendEmail(email: NormalEmailInterface): Promise<string> {
//         if(this.checkEmailExist(email)){
//             return "email already in the queue";
//         }
//         if (Date.now() - this.windowStartTime > this.rateLimitWindow) {
//             // Reset the rate limit window
//             this.windowStartTime = Date.now();
//             this.emailsSentInWindow = 0;
//         }

//         if (this.emailsSentInWindow >= this.rateLimit) {
//              return ("Rate limit exceeded. Please try again later.");;
//         }
        
//         const trackedEmail = new EmailWithTrackingMech(email);
//         this.statusOfEmails.addEmails(trackedEmail);
//         (await this.retryMechanism.tryToSend(trackedEmail, this.providers).then(message => {return message}));
        
//         console.log(`Email Status: ${trackedEmail.getStatus()}`);
//         if (trackedEmail.getErrorMessage()) {
//             console.log(`Error Message: ${trackedEmail.getErrorMessage()}`);
//         }
//         this.emailsSentInWindow++;
//         return "Email Sended!"
//     }
//     private checkEmailExist(email:NormalEmailInterface){
//         this.listOfEmail.forEach(element => {
//             if(email == element){
//                 return true;
//             }
//         });
//         return false;
//     }
// }
// export default EmailService;

// EmailService.ts
import EmailWithTrackingMech from "./Email/EmailWithTrackingMech";
import NormalEmailInterface from "./Email/NormalEmailInterface";
import MockAuthProvidersInterface from "./MockAuthPoviders/MockAuthProvidersInterface";
import RetryMechanism from "./RetryMechanism";
import StatusOfEmails from "./StatusOfEmails";

class EmailService {
    private rateLimit: number;
    private emailsSentInWindow: number = 0;
    private rateLimitWindow: number;
    private windowStartTime: number;
    private retryMechanism: RetryMechanism;
    private providers: MockAuthProvidersInterface[];
    private statusOfEmails: StatusOfEmails;

    constructor(providers: MockAuthProvidersInterface[], retryMechanism: RetryMechanism, rateLimitWindow: number, rateLimit: number, statusOfEmails: StatusOfEmails) {
        this.providers = providers;
        this.retryMechanism = retryMechanism;
        this.rateLimit = rateLimit;
        this.rateLimitWindow = rateLimitWindow;
        this.windowStartTime = Date.now();
        this.statusOfEmails = statusOfEmails;

        this.providers.forEach(provider => {
            this.retryMechanism.registerProvider(provider);
        });
    }

    private checkEmailExist(email: NormalEmailInterface): boolean {
        this.statusOfEmails.getListOfEmails().forEach(data => {
            if(data == email)
                return true;
        })
        return false; // Return false for now, meaning no duplicate check
    }

    public async sendEmail(email: NormalEmailInterface): Promise<string> {
        if (this.checkEmailExist(email)) {
            return "Email already in the queue";
        }

        if (Date.now() - this.windowStartTime > this.rateLimitWindow) {
            this.windowStartTime = Date.now();
            this.emailsSentInWindow = 0;
        }

        if (this.emailsSentInWindow >= this.rateLimit) {
            return "Rate limit exceeded. Please try again later.";
        }

        const trackedEmail = new EmailWithTrackingMech(email);
        this.statusOfEmails.addEmails(trackedEmail);
        const message = await this.retryMechanism.tryToSend(trackedEmail, this.providers);
        this.emailsSentInWindow++;
        return message;
    }
}

export default EmailService;


