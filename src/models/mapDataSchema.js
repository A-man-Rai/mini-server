import mongoose  from "mongoose";

const mapDataScheam=new mongoose.Schema({
    title:String,
    description:String,
    latitude:String,
    longitude:String
})

const MapData= mongoose.model("mapData",mapDataScheam)

export default MapData;