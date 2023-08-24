import express from "express";
import { auth } from "../middleware/auth.js";
import { fetchStartingData,registerUser,loginUser} from "./callbacks.js";
import {getMapDatas,postMapData,updateMapData,deleteOneMapData,deleteAllMapData} from "./userCallbacks.js"
const router = express.Router();

router.get("/",fetchStartingData);
router.post("/register",registerUser);
router.post("/login",loginUser);

router.get("/login/get",auth,getMapDatas);
router.post("/login/post",auth,postMapData);
router.put("/login/update/:reportId",auth,updateMapData);
router.delete("/login/delete/:reportId",auth,deleteOneMapData);
router.delete("/login/delete",auth,deleteAllMapData);

export default router;
