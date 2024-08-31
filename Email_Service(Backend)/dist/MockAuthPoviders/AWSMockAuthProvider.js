"use strict";
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
class AWSAuthProvider {
    sendEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            // Simulate sending email via AWS SES
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    if (Math.random() > 0.2) {
                        resolve();
                    }
                    else {
                        reject(new Error("AWS SES failed to send email"));
                    }
                }, 1000);
            });
        });
    }
    getProviderName() {
        return 'AWS SES';
    }
}
exports.default = AWSAuthProvider;
