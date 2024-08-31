
import NormalEmailInterface from "./NormalEmailInterface";

class NormalEmail implements NormalEmailInterface{
   private senderEmailAddress:string;
   private recieverEmailAddress:string;
   private emailBody:string;

    constructor(senderEmailAddress:string,recieverEmailAddress:string,emailBody:string){
        this.senderEmailAddress = senderEmailAddress;
        this.recieverEmailAddress = recieverEmailAddress;
        this.emailBody = emailBody;
    }
    
    public getSenderEmailAddress = ():string=>{
        return this.senderEmailAddress
    }
    public getRecieverEmailAddress = ():string=>{
        return this.recieverEmailAddress;
    }
    public getEmailBody = ():string=>{
        return this.emailBody;
    }
}

export default NormalEmail;