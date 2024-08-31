
import MockAuthProvidersInterface from "../MockAuthPoviders/MockAuthProvidersInterface";
import EmailInterface from "./EmailInterface";
import EmailWithTrackMechInterface from "./EmailWithTrackMechInterface";
import NormalEmailInterface from "./NormalEmailInterface";

class EmailWithTrackingMech implements EmailWithTrackMechInterface{
    private email:EmailInterface
    ;
    private requestId:number;
    private status:string = "pending"; // this can be pending , sent(successfully sent), failed.
    private errorMessage:string = "Auth Provider is not responding"; // to show why email got failed to send.
    private retryCnt:number = 0; // no of attempt taken to sent email.
    private AuthProvider:string = "No Auth Provider Assign";
    constructor(email:EmailInterface){
        this.email = email;
        this.requestId = this.generateRequestId();
    }
    public setStatus(status:string){
        this.status = status;
    }
    public getStatus():string{
       return this.status;
    }
    public setProvider(provider:string){
     this.AuthProvider = provider;
    }
    public getProviderName():string{
        return this.AuthProvider
    }
    public setErrorMessage(message:string){
         this.errorMessage = message;
    }
    public getErrorMessage():string{
        return this.errorMessage;
    }
    public setRetryCnt(retryCnt:number){
        this.retryCnt;
    }
    public getRetryCnt():number{
        return this.retryCnt;
    }
    public getRequestId():number{
        return this.requestId;
    }
    private generateRequestId = ():number=>{ // used for generating basic id for email tracking.
        return Math.floor((Math.random()*100+1));
    }
    public getEmailBody(): string {
        return this.email.getEmailBody();
    }
    public getRecieverEmailAddress(): string {
        return this.email.getRecieverEmailAddress();
    }
    public getSenderEmailAddress(): string {
        return this.email.getSenderEmailAddress();
    }
    public getActualMail(): NormalEmailInterface {
        return this.email;
    }
}
export default EmailWithTrackingMech;