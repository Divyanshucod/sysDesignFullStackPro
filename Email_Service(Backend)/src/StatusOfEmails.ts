import EmailWithTrackMechInterface from "./Email/EmailWithTrackMechInterface";


class StatusOfEmails{
    listOfEmails:EmailWithTrackMechInterface[] = [];
     
    public getListOfEmails():EmailWithTrackMechInterface[]{
       return this.listOfEmails;
    }
    public addEmails(email:EmailWithTrackMechInterface):void{
        this.listOfEmails.push(email);
    }
}

export default StatusOfEmails;