import MapData from "../models/mapDataSchema.js"
import User from "../models/userSchema.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { getRandomNumber } from './randomNumber.js';

const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS,10);
const secret=process.env.JWT_SECRET;


const fetchStartingData = async(req, res) => {
        try {
            const docs = await MapData.find({}).exec();
        console.log(docs);
            res.json(docs);
        } catch (err) {
            console.error("Error occurred:", err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    
}

const getOneMapData=async(req,res)=>{
    const id=req.params.id;
    try{
       const getOne=await MapData.findById(id).exec();
       res.status(200).json({message:"found",data:getOne});
     }
     catch(err){
        console.log(err.message);
        res.status(500).json({message:"SOMETHING WENT WRONG"});
     }
 }


const registerUser=async(req,res)=>{
    const{username,email,password,otp}=req.body;
     const  OTP=getRandomNumber();

     console.log(OTP);
    if(OTP==otp){ 
    try{
        const existingUser=await User.findOne({email:email});
        if(existingUser){
          return res.status(400).json({message:"Email Is Already Registered"});
      }
        const hashPassword= await bcrypt.hash(password,saltRounds);
        const newUser= await User.create({
            email:email,
            userName:username,
            password:hashPassword,
        })
        const token=jwt.sign({email:newUser.email,id:newUser._id},secret)
        const sanitizedUser = {
            id: newUser._id,
            email: newUser.email,
            userName: newUser.userName,
        };
        res.status(201).json({user:sanitizedUser,token:token,message:"Registered Successfully"});
    }
    catch(err){
        console.log(err);
        res.status(500).json({message:"Something Went Wrong"})
    }
}else{
    return res.status(400).json({message:"OTP IS INCORRECT"});
}
}

const loginUser=async(req,res)=>{
    try{
        const{email,password}=req.body;
        const existingUser=await User.findOne({email:email});
        if(existingUser){
            const matchPassword=await bcrypt.compare(password,existingUser.password);
           if(!matchPassword){
             return res.status(400).json({message:"Invalid Username or Password"});
           }
            const sanitizedUser = {
            id: existingUser._id,
            email: existingUser.email,
            userName: existingUser.userName,
              };
           const token=jwt.sign({email:existingUser.email,id:existingUser._id},secret)
           res.status(200).json({user:sanitizedUser,token:token,message:"Logged in Successfull"});
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

export {fetchStartingData,registerUser,loginUser,getOneMapData};