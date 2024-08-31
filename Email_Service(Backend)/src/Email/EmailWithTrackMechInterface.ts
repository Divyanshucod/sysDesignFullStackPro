import EmailInterface from "./EmailInterface";
import NormalEmailInterface from "./NormalEmailInterface";

interface EmailWithTrackMechInterface extends EmailInterface{
    setStatus(status:string):void;
    getStatus():string;
    setProvider(val:string):void;
    getProviderName():string;
    setErrorMessage(message:string):void;
    getErrorMessage():string;
    setRetryCnt(retryCnt:number):void
    getRetryCnt():number;
    getRequestId():number;
    getActualMail():NormalEmailInterface;
}
export default EmailWithTrackMechInterface;