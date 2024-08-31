import express from "express";
import Usermodel from "../Models/users";
import { Register } from "../interfaces";
import { RegisterUser,LoginUser } from "../UserAuthentication/users";

const router = express.Router();

router.post("/register",async (req,res)=>{
    if(Object.keys(req.body).length == 0)
        return res.json({message:"No data is given!"});
    try{
       const data = req.body;
       let result = ""; 
       RegisterUser(data).then(val => result = val).catch(err => console.error(err));
       console.log(result); 
    }
    catch(err){
    console.error(err);
    }
})
router.post("/login",async (req,res)=>{
    if(Object.keys(req.body).length == 0)
        return res.json({message:"No data is given!"});
    try{
       const data = req.body;
       let result = ""; 
       LoginUser(data).then(val => result = val).catch(err => console.error(err));
       console.log(result); 
    }
    catch(err){
    console.error(err);
    }
})