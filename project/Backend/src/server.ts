import express from "express";
import mongoose from "mongoose";
const server = express();
server.use(express.json());
mongoose.connect(process.env.MONGO_URL?process.env.MONGO_URL:"");


server.listen(process.env.PORT,()=>{
    console.log('server is running.');
    
})