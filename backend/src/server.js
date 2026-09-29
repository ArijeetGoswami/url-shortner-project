import app from "./app/app.js";
import {connectDb} from "./config/db.js";


//excuting teh databse function
connectDb()


app.listen(3000,()=>{
    console.log("server is running on port 3000")
})