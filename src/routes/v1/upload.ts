import { Router } from "express";
import uploadCtrl from "../../controller/v1/uploadCtrl";
export const uploadRoute = Router();

uploadRoute.post("/",uploadCtrl.uploadFile)
