import { Router } from "express";
import userCtrl from "../../controller/v1/userCtrl";
// import authUser from "../../middleware/authUser";
// import provisioninglogCtrl from "../../controller/v1/provisioninglogCtrl";
import multer from 'multer';


const upload = multer({ dest: 'uploads/' });
export const UserRoute = Router();


// UserRoute.post("/provisioninglog",authUser, provisioninglogCtrl.getProvisioningLogsByUserId);
// UserRoute.post("/detail", authUser,userCtrl.getUserDetailUid);
UserRoute.post("/create", userCtrl.create);    
UserRoute.put("/edit", userCtrl.editUserbyUid);
UserRoute.put("/delete",userCtrl.deleteUserById);
UserRoute.post("/add/details",userCtrl.addDetail);
UserRoute.put("/edit/details",userCtrl.EditDomainDetail);
UserRoute.post("/delete/details",userCtrl.DeleteDomainDetail);
UserRoute.post("/upsert",userCtrl.upsertDataDomainandExtention);
