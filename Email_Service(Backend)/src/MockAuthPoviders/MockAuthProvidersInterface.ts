import NormalEmailInterface from "../Email/NormalEmailInterface";
interface MockAuthProvidersInterface{
    sendEmail(emailInfo:NormalEmailInterface):Promise<void>;
    getProviderName():string;
}

export default MockAuthProvidersInterface;