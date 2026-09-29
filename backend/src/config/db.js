import mongoose from "mongoose";
//importing the database base
import config from "./config.js";





export async function connectDb(){
    //connecting the databse via process env file
    await mongoose.connect(config.MONGOURL)
    console.log("Database connected successfully")

} 
