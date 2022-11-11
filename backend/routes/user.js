const express = require("express")
const router = express.Router();


router.use("/", (req,res)=>{
    console.log("this is user")
})



module.exports = router;
