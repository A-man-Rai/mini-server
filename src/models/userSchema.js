import mongoose  from "mongoose";

const userSchema=new mongoose.Schema({
    email:{
        type:String,
        unique:true,
        required:true,
        sparse: true 
    },
    userName:String,
    password:String
})

const User= mongoose.model("user",userSchema)

export default User;