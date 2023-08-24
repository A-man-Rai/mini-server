import express from "express";
import 'dotenv/config';
import Connection from "./src/database/db.js";
import cors from "cors";
import router from "./src/routes/route.js";
import bodyParser from "body-parser";

const app=express();


app.use(cors());
app.use(bodyParser.json({extended:true}));
app.use(bodyParser.urlencoded({extended:true}))

app.use("/",router);
app.use("/register",router);
app.use("/login",router);
app.use("/login/get",router);
app.use("/login/post",router);
app.use("/login/update/:id",router);
app.use("/login/delete/:id",router);
app.use("/login/delete",router);

const username=process.env.DB_USERNAME;
const password=process.env.DB_PASSWORD;

const PORT=process.env.PORT || 9000

Connection(username,password).then(()=>{
  app.listen(PORT,()=>{
    console.log("server started at port "+PORT);
  });
}).catch((err)=>{
  console.log(err.message);
})

