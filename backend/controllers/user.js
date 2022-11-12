const User = require("../database/models/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const regexEmail = /^([a-z0-9]{3,})@([a-z]{3,9}).(com)$/i
// const regexPassword = /^.*(?=.{6,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!&$%&?@ "]).*$/
const regexPassword = /^.*$/

exports.register = async (req, res) => {
    try {
        if(!req.body.email.match(regexEmail)){
            return res.status(400).json({message:"Invalid email!"})
        }
        if(!req.body.password.match(regexPassword)){
            return res.status(400).json({message:"Invalid password!"})
        }

        const check = await User.findOne({email:req.body.email})
        if(check){
            return res.status(400).json({message:"This email already exists!"})
        }

        let username = req.body.username
        while (!username || await User.findOne({username})) {
            username=req.body.first_name + (Math.random(0.1) * 10000000).toString().substring(0,7)
        } 

        const cryptedPass = await bcrypt.hash(req.body.password, 10)


        const user = await new User({...req.body, username, password:cryptedPass}).save();

        const token = jwt.sign({id:user._id.toString()}, process.env.JWT_PASSWORD, {expiresIn:"30d"})

        res.json({...req.body,username, token});
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}


