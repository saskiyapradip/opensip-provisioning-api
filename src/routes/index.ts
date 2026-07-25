import { Router } from "express";
import { UserRoute } from "././v1/user";
import { uploadRoute } from "././v1/upload";


export const Route = Router();

Route.use("/v1/user", UserRoute);
Route.use("/v1/upload", uploadRoute);



Route.use((req, res, next) => {
    const error = new Error("Routes not found")
    return res.status(404).json({
        success: 0, 
        message: error.message 
    })
})




