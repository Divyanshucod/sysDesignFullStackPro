"use strict";
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
const EmailWithTrackingMech_1 = __importDefault(require("./Email/EmailWithTrackingMech"));
class EmailService {
    constructor(providers, retryMechanism, rateLimitWindow, rateLimit, statusOfEmails) {
        this.emailsSentInWindow = 0;
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
    checkEmailExist(email) {
        this.statusOfEmails.getListOfEmails().forEach(data => {
            if (data == email)
                return true;
        });
        return false; // Return false for now, meaning no duplicate check
    }
    sendEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
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
            const trackedEmail = new EmailWithTrackingMech_1.default(email);
            this.statusOfEmails.addEmails(trackedEmail);
            const message = yield this.retryMechanism.tryToSend(trackedEmail, this.providers);
            this.emailsSentInWindow++;
            return message;
        });
    }
}
exports.default = EmailService;
