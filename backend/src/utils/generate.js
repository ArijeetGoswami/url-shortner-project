//imporu=ting the crypto

import crypto from 'node:crypto';


//cereaitn the function to generate the code

const generatecode = () => {
    // //1st the mian string to be used to generate the code
    // const mainstring = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    // //vraiablle wher short code is to be stored

    // let shortcode = "";

    // //now by using the for loop we will generate the code
    // for(let i=0;i<6;i++){
    //     shortcode += mainstring.charAt(Math.floor(Math.random()*62))

    // }
    // console.log(shortcode)


    //good way of ding it is
    const shortcode = crypto.randomBytes(6).toString('base64url').slice(0,6)

    // console.log(crypto.randomBytes(6).toString('base64url').slice(0,6))

    return shortcode


}

export default generatecode



//we wiil focis on cretaing the api for the app

