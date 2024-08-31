import Email from "../Email/NormalEmail";
import MockAuthProvidersInterface from "./MockAuthProvidersInterface";
class AWSAuthProvider implements MockAuthProvidersInterface {
    public async sendEmail(email: Email): Promise<void> {
        // Simulate sending email via AWS SES
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (Math.random() > 0.2) {
                    resolve();
                } else {
                    reject(new Error("AWS SES failed to send email"));
                }
            }, 1000);
        });
    }

    public getProviderName(): string {
        return 'AWS SES';
    }
}
export default AWSAuthProvider;