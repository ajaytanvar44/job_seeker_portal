import express from "express";
import dotenv from "dotenv";
import  cors from "cors";
import cookieParser from "cookie-parser"; //Express middleware to read cookies sent by the browser.Useful for login sessions, authentication tokens, etc.👉 Example: when a user logs in, a cookie is stored, and cookie-parser helps you access it in your backend.
import fileUpload from "express-fileupload";

import userRouter from "./routes/userRouter.js";
import jobRouter from "./routes/jobRouter.js";
import applicationRouter from "./routes/applicationRouter.js";
import {dbConnection} from "./database/dbconnection.js";    
import {errorMiddleware} from "./middlewares/error.js";

const app = express();
dotenv.config({path: "./config/config.env"});

app.use(cors({
    origin:[process.env.FRONTEND_URL],
    methods:["GET","POST","PUT","DELETE"],
    credentials:true,
}));

app.use(cookieParser()); //To read cookies from incoming requests.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:"/tmp/",    
}));

app.use("/api/v1/user", userRouter);
app.use("/api/v1/job", jobRouter);
app.use("/api/v1/application", applicationRouter);

dbConnection();

app.use(errorMiddleware);
//app.use(fileUpload({ useTempFiles: true }));

export default app;
