import Admin from "../models/adminSchema.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


//const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS,10);
const secret=process.env.JWT_SECRET;


const loginAdmin=async(req,res)=>{
    try{
        const{email,password}=req.body;
        const existingUser=await Admin.findOne({email:email});
        if(existingUser){
            const matchPassword=await bcrypt.compare(password,existingUser.password);
           if(!matchPassword){
             return res.status(200).json({message:"invalid credentials"})
           }
            const sanitizedUser = {
            id: existingUser._id,
            email: existingUser.email,
            userName: existingUser.userName,
              };
           const token=jwt.sign({email:existingUser.email,id:existingUser._id},secret)
           res.status(200).json({user:sanitizedUser,token:token,message:"ADMIN LOGGED IN"});
        }
        else{
          return  res.status(404).json({message:"Enter Valid Email/Password"})
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({message:"Something Went Wrong"})
    }
}

export {loginAdmin};