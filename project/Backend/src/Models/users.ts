import mongoose,{Schema,Document} from "mongoose";
interface UserI extends Document{
    name : string,
    email : string,
    password : string,
    createdAt: Date;
}
const userSchema: Schema<UserI> = new Schema({
    name:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
    },
    password:{
        type:String,
        required:true,
        trim:true,
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
})

const Usermodel = mongoose.model('user',userSchema);
export default Usermodel;