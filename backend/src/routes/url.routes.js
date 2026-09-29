// we wiill use route sform the XPathExpression

import express from "express";
//importing the shortcode for tef royes
import generateShortCode from "../utils/generate.js";
//importing the model
import urlModel from "../models/url.models.js";




// now creatinf an instance to use rotes

const router = express.Router();



//create yuapi rotes where we will create or send resquest to create rotutes

router.post("/",async(req,res)=>{
    //we will require the data from body that is url

    const { url } = req.body || {};

    //creatinfg validations for the url


    //1stchcek is we dont get the url

    if(!url){
        return res.status(400).json({
            error: "url is required"
        })
    }

    //2nd check is we will check if the url is valid or not

    if(url.startsWith("http://")== false && url.startsWith("https://")== false){
        return res.status(400).json(({
            error: "eneter or provide valid url"
            
        }))
    }

    //strat genration fo received url

    const shortcodefront = generateShortCode()

    //now we will create a new instance of the model
    const newurl = new urlModel({
        originalUrl: url,
        shortcode: shortcodefront,
    })

    //now save the new url to the database
    await newurl.save()


    return res.status(201).json({
        meassage: "url has been shortened successfully",
        data:{
            originalUrl: newurl.originalUrl,
            shortcode: newurl.shortcode,
        }
    })




})


//create a route to get all the data form the databse

router.get("/",async(req,res)=>{
    //now we will get all the data from the database
    const allurls = await urlModel.find()

    return res.status(200).json({
        message: "all urls have been fetched successfully",
        data: allurls,
    })
})


// //now lets get the data on th basis of code


router.get("/:shortcode", async (req, res) => {
  const { shortcode } = req.params;

  // 1. Fetch document directly (do not destructure { url })
  const urlEntry = await urlModel.findOne({ shortcode });

  // 2. Check if the entry exists
  if (!urlEntry) {
    return res.status(404).json({
      message: "url not found",
    });
  }

  await urlEntry.save();

  return res.redirect(urlEntry.originalUrl);
});


//oue focus wiill be on deleting the rotues creted
router.delete("/:id",async(req,res)=>{

    //retribing thre id we want to deleyte
    const {id} = req.params;
    //oince we retrrive we need to find the id form the databsae
    const urllink = await urlModel.findById(id)


    //va;idations

    //1. suppose we didnt get the url
    if(!urllink){
        return res.status(404).json({
            message:"url not found in databse"

        })
    }

    await urlModel.findOneAndDelete({
        _id: id
    })


    return res.status(200).json({
        message: "url deleted success"
    })

})











export  default router;