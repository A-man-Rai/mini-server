import User from "../models/userSchema.js";
import MapData from "../models/mapDataSchema.js";
import Report from "../models/reportSchema.js";


const getAllUsers=async(req,res)=>{
    try {
        const docs = await User.find({}).exec();
        console.log(docs);
        res.json(docs);
    } catch (err) {
        console.error("Error occurred:", err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const getAllReports=async(req,res)=>{
    try {
        const docs = await Report.find({}).exec();
        console.log(docs);
        res.json(docs);
    } catch (err) {
        console.error("Error occurred:", err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const postMapAdminData = async(req, res) => {
    const{title,description,latitude,longitude,image}=req.body;
    const data =new MapData({
       title:title,
       description:description,
       longitude:longitude,
       latitude:latitude,
       image:image
     });
    try{
       await data.save();
       res.status(201).json({message:"SAVED"}); 
    } catch(err){
       console.log(err.message);
       res.status(500).json({message:"SOMETHING WENT WRONG"});
    }

}

const deleteOneAdminMapData=async(req,res)=>{
    const id=req.params.id;
    try{
       const deletedReport=await MapData.findByIdAndDelete(id);
       res.status(200).json({message:"successfully deleted",data:deletedReport});
     }
     catch(err){
        console.log(err.message);
        res.status(500).json({message:"SOMETHING WENT WRONG"});
     }
 }

 const updateAdminMapData=async(req,res)=>{
    const id=req.params.id;
    const{title,description,latitude,longitude}=req.body;
    const report =({
       title:title,
       description:description,
       longitude:longitude,
       latitude:latitude
     });
    try{
      const updatedReport=await MapData.findByIdAndUpdate(id,{ $set: report },{new:true});
      res.status(200).json(updatedReport);
    }
    catch(err){
       console.log(err.message);
       res.status(500).json({message:"SOMETHING WENT WRONG"});
    }
 
 }

 const updateAdminReportData=async(req,res)=>{
    const id=req.params.id;
    const{title,description,latitude,longitude}=req.body;
    const report =({
       title:title,
       description:description,
       longitude:longitude,
       latitude:latitude
     });
    try{
      const updatedReport=await Report.findByIdAndUpdate(id,{ $set: report },{new:true});
      res.status(200).json(updatedReport);
    }
    catch(err){
       console.log(err.message);
       res.status(500).json({message:"SOMETHING WENT WRONG"});
    }
 
 }

 const deleteOneReportData=async(req,res)=>{
    const id=req.params.id;
    try{
       const deletedReport=await Report.findByIdAndDelete(id);
       res.status(200).json({message:"successfully deleted",data:deletedReport});
     }
     catch(err){
        console.log(err.message);
        res.status(500).json({message:"SOMETHING WENT WRONG"});
     }
 }
export{getAllUsers,deleteOneReportData,getAllReports,postMapAdminData,deleteOneAdminMapData,updateAdminMapData,updateAdminReportData}