
import Email from "../Email/NormalEmail";
import MockAuthProvidersInterface from "./MockAuthProvidersInterface";
class SendGridMockAuthProviders implements MockAuthProvidersInterface{
    private providerName: string;
    constructor() {
        this.providerName = "SendGridMockProvider";
    }

    public async sendEmail(email: Email): Promise<void> {
        // Simulate failure for demo
        return Promise.reject(`Error sending with ${this.providerName}`);
    }

    public getProviderName(): string {
        return this.providerName;
    }
}
export default SendGridMockAuthProviders;