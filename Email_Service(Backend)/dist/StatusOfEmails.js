"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class StatusOfEmails {
    constructor() {
        this.listOfEmails = [];
    }
    getListOfEmails() {
        return this.listOfEmails;
    }
    addEmails(email) {
        this.listOfEmails.push(email);
    }
}
exports.default = StatusOfEmails;
