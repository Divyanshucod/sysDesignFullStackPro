"use strict";
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const EmailService_1 = __importDefault(require("./EmailService"));
const RetryMechanism_1 = __importDefault(require("./RetryMechanism"));
const StatusOfEmails_1 = __importDefault(require("./StatusOfEmails"));
const AWSMockAuthProvider_1 = __importDefault(require("./MockAuthPoviders/AWSMockAuthProvider"));
const SendGridMockEmailAuthProvider_1 = __importDefault(require("./MockAuthPoviders/SendGridMockEmailAuthProvider"));
const SendGridProvider = new SendGridMockEmailAuthProvider_1.default();
const AWSProvider = new AWSMockAuthProvider_1.default();
const retryMechanism = new RetryMechanism_1.default(6000, 3);
const statusOfEmails = new StatusOfEmails_1.default();
const emailService = new EmailService_1.default([AWSProvider, SendGridProvider], retryMechanism, 5000, 3, statusOfEmails);
const PORT = process.env.PORT || 8080;
const server = (0, express_1.default)();
server.use(express_1.default.json());
server.use((0, cors_1.default)());
server.post('/sendEmail', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (Object.keys(req.body).length === 0) {
        return res.status(400).json({ message: "No data provided" });
    }
    try {
        const { email } = req.body;
        const response = yield emailService.sendEmail(email);
        res.status(200).json({ message: response });
    }
    catch (err) {
        res.status(500).json({ error: "Failed to send email", details: err });
    }
}));
server.get('/statusOfEmails', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listOfEmails = statusOfEmails.getListOfEmails();
        if (listOfEmails.length === 0) {
            return res.status(404).json({ message: "No emails found" });
        }
        const converted = [];
        for (let i = 0; i < listOfEmails.length; i++) {
            let val = ConvertToSpecificFormat(listOfEmails[i]);
            converted.push(val);
        }
        res.status(200).json(converted);
    }
    catch (err) {
        res.status(500).json({ error: "Failed to retrieve email statuses", details: err });
    }
}));
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
const ConvertToSpecificFormat = (listOfEmails) => {
    const body = listOfEmails.getActualMail().getEmailBody();
    const to = listOfEmails.getActualMail().getRecieverEmailAddress();
    const requestId = listOfEmails.getRequestId();
    const status = listOfEmails.getStatus();
    const errorMessage = listOfEmails.getErrorMessage();
    const retryCnt = listOfEmails.getRetryCnt();
    const AuthProvider = listOfEmails.getProviderName();
    return { body, to, requestId, status, errorMessage, retryCnt, AuthProvider };
};
exports.default = server;
