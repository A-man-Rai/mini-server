
import Report from "../models/reportSchema.js";
const postMapData=async(req,res)=>{
   const{title,description,latitude,longitude}=req.body;
   const report =new Report({
      title:title,
      description:description,
      userId:req.id,
      longitude:longitude,
      latitude:latitude
    });
   try{
      await report.save();
      res.status(201).json({message:"SAVED"}); 
   } catch(err){
      console.log(err.message);
      res.status(500).json({message:"SOMETHING WENT WRONG"});
   }
}

const getMapDatas=async(req,res)=>{
  try{
      const reports= await Report.find({userId:req.id});
      res.status(200).json({ success: true, data: reports });

   }
  catch(err){
   console.log(err.message);
   res.status(500).json({message:"SOMETHING WENT WRONG"});
  }
}

const updateMapData=async(req,res)=>{
   const id=req.params.reportId;
   const{title,description,latitude,longitude}=req.body;
   const report =({
      title:title,
      description:description,
      userId:req.id,
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

const deleteOneMapData=async(req,res)=>{
   const id=req.params.reportId;
   const{title,description,latitude,longitude}=req.body;
   try{
      const deletedReport=await Report.findByIdAndDelete(id);
      res.status(200).json({message:"successfully deleted",data:deletedReport});
    }
    catch(err){
       console.log(err.message);
       res.status(500).json({message:"SOMETHING WENT WRONG"});
    }
}



const deleteAllMapData=async(req,res)=>{
   try{
      const result = await Report.deleteMany({ userId:req.id});
      res.status(200).json({message :"deleted All"});
    }
    catch(err){
       console.log(err.message);
       res.status(500).json({message:"SOMETHING WENT WRONG"});
    }
}

export {getMapDatas,postMapData,updateMapData,deleteOneMapData,deleteAllMapData}