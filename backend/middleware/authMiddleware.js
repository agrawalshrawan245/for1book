const User = require("../database/models/User.js");
const asyncHandler = require("express-async-handler")
const jwt = require("jsonwebtoken")

const userProtect = asyncHandler(async(req, res, next) => {
    let token
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        try{
            token = req.headers.authorization.split(" ")[1]
            // console.log(token)
            const {id} = jwt.verify(token, process.env.JWT_PASSWORD)
            req.user = await User.findById(id).select("-password")
            // console.log(req.params.id)
            // console.log(req.user._id)
            next()
        }catch(error){
            res.status(401)
            throw new Error("Not authorized, token failed.")
        }
    }

    if(!token){
        res.status(401)
        throw new Error("Not authorized, no token.")
    }
})


module.exports = userProtect

