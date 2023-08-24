import jwt  from "jsonwebtoken";

const secret=process.env.JWT_SECRET;

const auth=(req,res,next)=>{
  try{
   let token=req.headers.authorization;
   if(token){
     token =token.split(" ")[1];
     let user=jwt.verify(token,secret);
     req.id=user.id;
   }else{
    return res.status(401).json({message:"unauthorized user"});
   }
   next();
  }
  catch(err){
   console.log(err.message);
    res.status(401).json({message:"unauthorized user"});
  }
}

export {auth};