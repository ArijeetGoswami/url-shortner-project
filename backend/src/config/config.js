import dotenv from "dotenv";

dotenv.config();

const config ={
    MONGOURL: process.env.MONGO_URI

}

export default config;
