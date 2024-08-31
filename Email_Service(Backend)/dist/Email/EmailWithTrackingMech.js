"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class EmailWithTrackingMech {
    constructor(email) {
        this.status = "pending"; // this can be pending , sent(successfully sent), failed.
        this.errorMessage = "Auth Provider is not responding"; // to show why email got failed to send.
        this.retryCnt = 0; // no of attempt taken to sent email.
        this.AuthProvider = "No Auth Provider Assign";
        this.generateRequestId = () => {
            return Math.floor((Math.random() * 100 + 1));
        };
        this.email = email;
        this.requestId = this.generateRequestId();
    }
    setStatus(status) {
        this.status = status;
    }
    getStatus() {
        return this.status;
    }
    setProvider(provider) {
        this.AuthProvider = provider;
    }
    getProviderName() {
        return this.AuthProvider;
    }
    setErrorMessage(message) {
        this.errorMessage = message;
    }
    getErrorMessage() {
        return this.errorMessage;
    }
    setRetryCnt(retryCnt) {
        this.retryCnt;
    }
    getRetryCnt() {
        return this.retryCnt;
    }
    getRequestId() {
        return this.requestId;
    }
    getEmailBody() {
        return this.email.getEmailBody();
    }
    getRecieverEmailAddress() {
        return this.email.getRecieverEmailAddress();
    }
    getSenderEmailAddress() {
        return this.email.getSenderEmailAddress();
    }
    getActualMail() {
        return this.email;
    }
}
exports.default = EmailWithTrackingMech;
