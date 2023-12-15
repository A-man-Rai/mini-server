import mongoose from "mongoose";
export const Connection =async(username,password) => {
    try{
      await mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.ey688mg.mongodb.net/mapDataDB`,{
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
       console.log("DATABASE CONNECTED ");
    }
    catch(error){
     console.log(error.message);
    }
  }


export default Connection;