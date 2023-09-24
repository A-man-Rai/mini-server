import mongoose  from "mongoose";

const adminSchema=new mongoose.Schema({
    email:{
        type:String,
        unique:true,
        required:true,
        sparse: true 
    },
    userName:String,
    password:String
})

const Admin= mongoose.model("admin",adminSchema)

export default Admin;