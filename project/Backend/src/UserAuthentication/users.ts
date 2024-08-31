import {Login, Register} from "../interfaces"
import jwt from "jsonwebtoken";
import Usermodel from "../Models/users";
import bcrypt from 'bcrypt';
export const RegisterUser = async (data:Register):Promise<any> => {
    const {name,password,email} = data;
    //check email is already used
    if(await Usermodel.findOne({email:email})){
        return "User already Exist with given mail!";
    }
    let hashedPassword = "";
    await HashPassword(password).then((val)=> hashedPassword = val).catch(err => console.log(err));
    const newUser = await Usermodel.create({
        name,
        email,
        password:hashedPassword,
    });
    await newUser.save();
    return "User Registered SuccessFully";
}
export const LoginUser = async (loginCredentials:Login):Promise<any>=>{
    const {email,password} = loginCredentials;
    const userDetail = await Usermodel.findOne({email:email});
    console.log(userDetail?._id);
    
    if(!userDetail){
        return "User Not Registered Yet!";
    }
    //check password matched
    let Result = await bcrypt.compare(password,userDetail.password)
    if(!Result){
     return "Password or email is wrong!"
    }
    let token = generateToken(userDetail._id);
     
    return {message:"User Login",token,userId:userDetail._id};
}
async function HashPassword(password:string):Promise<string>{
   try{
      return await bcrypt.hash(password,10);
   }
   catch(err){
    console.error(err);
   }
   return "";
}
function generateToken(userId:any){
   return jwt.sign({id:userId},process.env.SECRET_KEY?process.env.SECRET_KEY:"",{expiresIn:'1h'})
}