import mongoose from "mongoose";

 export const dbConnection = ()=>{
    mongoose
       .connect(process.env.MONGO_URI,{
        dbName:"MERN_STACK_JOB_SEEKING",
       }) 
       .then(()=>{
        console.log("Database connected successfully");
       })
       .catch((err)=>{
        console.log(`Database connection failed: ${err.message}`);
       });
    }

export default dbConnection;
