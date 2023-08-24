import mongoose  from "mongoose";

const mapDataScheam=new mongoose.Schema({
    id:{
        type:String,
        unique:true,
        required:true
    },
    latitude:String,
    longtitude:String
})

const MapData= mongoose.model("mapData",mapDataScheam)

export default MapData;