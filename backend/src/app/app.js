import express from "express"
//impriting teh routes
import urlRoutes from "../routes/url.routes.js";
import urlModel from "../models/url.models.js";
import router from "../routes/url.routes.js";

const app = express()


app.use(express.json())


//suing the routes
app.use("/api/url",urlRoutes)




export default app