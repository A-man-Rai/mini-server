import express from "express";
import { auth } from "../middleware/auth.js";
import { fetchStartingData,registerUser,loginUser, getOneMapData} from "./callbacks.js";
import {getMapDatas,postMapData,updateMapData,deleteOneMapData,deleteAllMapData} from "./userCallbacks.js"
import { loginAdmin } from "./adminSignIn.js";
import { getAllUsers ,getAllReports,postMapAdminData,deleteOneAdminMapData, updateAdminMapData, updateAdminReportData,deleteOneReportData} from "./adminCallbacks.js";
import { subscribe } from "./webPush.js";
import {getOtp,signup} from "./getOtp.js"
const router = express.Router();

router.get("/",fetchStartingData);
router.get("/:id",getOneMapData);
router.post("/register",registerUser);
router.post("/login",loginUser);
router.post("/getotp",getOtp);

router.get("/login/reports",auth,getMapDatas);
router.post("/login/report",auth,postMapData);
router.patch("/login/report/:reportId",auth,updateMapData);
router.delete("/login/report/:reportId",auth,deleteOneMapData);
//router.delete("/login/delete",auth,deleteAllMapData);

router.post("/admin/login",loginAdmin);
router.get("/admin/users",auth,getAllUsers);
router.get("/admin/reports",auth,getAllReports);
router.post("/admin/maps",auth,postMapAdminData);
router.delete("/admin/maps/:id",auth,deleteOneAdminMapData);
router.patch("/admin/maps/:id",auth,updateAdminMapData)
router.patch("/admin/reports/:id",auth,updateAdminReportData)
router.delete("/admin/reports/:id",auth,deleteOneReportData);

router.post("/notify",subscribe);


export default router;
