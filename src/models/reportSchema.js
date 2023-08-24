import mongoose  from "mongoose";

const reportSchema= new mongoose.Schema({
   title:{
      type:String,
      required:true
   },
   description:String,
   userId:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"User",
      required:true,
   },
   latitude:String,
   longitude:String
})

const Report= mongoose.model("report",reportSchema)

export default Report;