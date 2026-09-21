import express, { Express } from "express";
import mongoose, { mongo } from "mongoose";
import https from "http";
import cors from "cors";
import { config } from "./src/config";
import { Route } from "./src/routes";
import fs from "fs";
import helmet from "helmet";
// import  middleware from "./src/middleware/headerRemove";
import bodyParser from "body-parser";
import cron from 'node-cron';
import swaggerUi from 'swagger-ui-express';

const app = express();  
// const httpoptions:any = {
//     cert:fs.readFileSync("./cert/localhost.crt"),
//     key:fs.readFileSync("./cert/localhost.key")
// }
app.use(helmet());
app.use(helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
    }
}));
app.use(helmet.frameguard({ action: 'deny' }));
app.use(helmet.hidePoweredBy());
  

const server = https.createServer(app)
app.use(bodyParser.json({ limit: '50mb'}))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true,parameterLimit:500000}))
app.use(cors())
/** Error Hanldling  **/
app.use("/", Route)   

cron.schedule("*/1 * * * *", () => {
    if (config.enviroment.enviroment_type === "production") {
      console.log("cron called")
    //EndOldCalls();
    //SendEmailAndSmsToUsers();
    }
  });


server.listen(config.server.port, function () {
    console.log("server running on", config.server.port)
})




