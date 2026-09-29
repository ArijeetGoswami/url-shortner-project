import mongoose, { Mongoose } from "mongoose";

//creating a schema foir the database

const urlschema = new mongoose.Schema({
     
    //the orginal url that the user will enter
    originalUrl:{
        type: String,
        required: true,

    },
    //the shortcode to be implemnted for the url
    shortcode:{
        type: String,
        required: true,

    },
    //the clicks or how many times the url has been clicked
    clicks:{
        type: Number,
        default: 0,

    }
})

//exportitng the schema
const Urlmodel = mongoose.model("urlmodel", urlschema)

export default Urlmodel


//now aftre this step we nned to genrate the code

