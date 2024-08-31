"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class NormalEmail {
    constructor(senderEmailAddress, recieverEmailAddress, emailBody) {
        this.getSenderEmailAddress = () => {
            return this.senderEmailAddress;
        };
        this.getRecieverEmailAddress = () => {
            return this.recieverEmailAddress;
        };
        this.getEmailBody = () => {
            return this.emailBody;
        };
        this.senderEmailAddress = senderEmailAddress;
        this.recieverEmailAddress = recieverEmailAddress;
        this.emailBody = emailBody;
    }
}
exports.default = NormalEmail;
