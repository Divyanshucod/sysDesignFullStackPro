
// import EmailService from "./EmailService";
// import AWSMockAuthProvider from "./MockAuthPoviders/AWSMockAuthProvider";
// import MockAuthProvidersInterface from "./MockAuthPoviders/MockAuthProvidersInterface";
// import SendGridMockAuthProviders from "./MockAuthPoviders/SendGridMockEmailAuthProvider";
// import RetryMechanism from "./RetryMechanism";
// import express from 'express';
// import StatusOfEmails from "./StatusOfEmails";
// import cors from 'cors';
// import EmailWithTrackMechInterface from "./Email/EmailWithTrackMechInterface";
// const AWSAuthProvider:MockAuthProvidersInterface = new AWSMockAuthProvider();
// const SendGridProvider:MockAuthProvidersInterface = new SendGridMockAuthProviders();
// const retryMechanism:RetryMechanism = new RetryMechanism(6000,3);
// const statusOfEmails = new StatusOfEmails();
// const emailService = new EmailService([AWSAuthProvider,SendGridProvider],retryMechanism,3,5000,statusOfEmails);
// const PORT = process.env.PORT || 8080;
// const server = express();
// server.use(express.json());
// server.use(cors());
// server.post('/sendEmail',async (req,res)=>{
//     if(Object.keys(req.body).length == 0){
//         return res.json("No Thing To send");
//      }
//       try{
//         const {email} = req.body;
//         await emailService.sendEmail(email).then(
//            message => res.json(message)
//         );
//       }
//       catch(err){
//        return res.json(err);
//       }
// });
// server.get('/statusOfEmails',async (req,res)=>{
//     if(Object.keys(req.body).length == 0){
//         return res.json("No Thing To send");
//      }
//       try{
//         const listOfEmails = statusOfEmails.getListOfEmails();
//         const converted = [];
//         for(let i=0;i<listOfEmails.length;i++){
//           let val = ConvertToSpecificFormate(listOfEmails[i]);
//           converted.push(val);
//         }
//         res.json(converted);
//       }
//       catch(err){
//        return res.json(err);
//       }
// })

// server.listen(PORT, () => {
//     console.log("server is runnig at port "+PORT);
    
// });
// const ConvertToSpecificFormate = (listOfEmails:EmailWithTrackMechInterface)=>{
//     const body = listOfEmails.getActualMail().getEmailBody();
//     const to = listOfEmails.getActualMail().getRecieverEmailAddress();
//     const requestId = listOfEmails.getRequestId();
//     const status = listOfEmails.getStatus();
//     const errorMessage = listOfEmails.getErrorMessage();
//     const retryCnt = listOfEmails.getRetryCnt();
//     const AuthProvider = listOfEmails.getProviderName();
//     return {body,to,requestId,status,errorMessage,retryCnt,AuthProvider};
// }

import express from 'express';
import cors from 'cors';
import EmailService from './EmailService';
import RetryMechanism from './RetryMechanism';
import StatusOfEmails from './StatusOfEmails';
import AWSAuthProvider from './MockAuthPoviders/AWSMockAuthProvider';
import SendGridAuthProvider from './MockAuthPoviders/SendGridMockEmailAuthProvider';
import EmailWithTrackMechInterface from './Email/EmailWithTrackMechInterface';

const SendGridProvider = new SendGridAuthProvider();
const AWSProvider = new AWSAuthProvider();
const retryMechanism = new RetryMechanism(6000, 3);
const statusOfEmails = new StatusOfEmails();
const emailService = new EmailService([AWSProvider, SendGridProvider], retryMechanism, 5000, 3, statusOfEmails);

const PORT = process.env.PORT || 8080;
const server = express();

server.use(express.json());
server.use(cors());

server.post('/sendEmail', async (req, res) => {
    if (Object.keys(req.body).length === 0) {
        return res.status(400).json({ message: "No data provided" });
    }
    try {
        const { email } = req.body;
        const response = await emailService.sendEmail(email);
        res.status(200).json({ message: response });
    } catch (err) {
        res.status(500).json({ error: "Failed to send email", details: err });
    }
});

server.get('/statusOfEmails', async (req, res) => {
    try {
        const listOfEmails = statusOfEmails.getListOfEmails();
        if (listOfEmails.length === 0) {
            return res.status(404).json({ message: "No emails found" });
        }
        const converted = [];
        for(let i=0;i<listOfEmails.length;i++){
          let val = ConvertToSpecificFormat(listOfEmails[i]);
          converted.push(val);
        }
        res.status(200).json(converted);
    } catch (err) {
        res.status(500).json({ error: "Failed to retrieve email statuses", details:err });
    }
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

const ConvertToSpecificFormat = (listOfEmails: EmailWithTrackMechInterface) => {
    const body = listOfEmails.getActualMail().getEmailBody();
    const to = listOfEmails.getActualMail().getRecieverEmailAddress();
    const requestId = listOfEmails.getRequestId();
    const status = listOfEmails.getStatus();
    const errorMessage = listOfEmails.getErrorMessage();
    const retryCnt = listOfEmails.getRetryCnt();
    const AuthProvider = listOfEmails.getProviderName();
    return { body, to, requestId, status, errorMessage, retryCnt, AuthProvider };
};

export default server;


