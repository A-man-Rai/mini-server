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

export{getAllUsers,getAllReports}