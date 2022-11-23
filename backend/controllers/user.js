const User = require("../database/models/User")
const bcrypt = require("bcrypt")
const path = require("path")
const jwt = require("jsonwebtoken")
const asyncHandler = require("express-async-handler")


const regexEmail = /^([a-z0-9/.]{3,})@([a-z]{3,11}).(com)$/i
// const regexPassword = /^.*(?=.{6,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!&$%&?@ "]).*$/
const regexPassword = /^.{4,}$/


exports.searchUsers = asyncHandler(async(req, res) => {
    // req.params.id
    const searchP1 = req.query.keyword && req.query.keyword.length ? {
        "first_name" : {
            $regex: req.query.keyword,
            $options: 'i',
        },
    } : {}
    const searchP2 = req.query.keyword && req.query.keyword.length ? {
        last_name : {
            $regex: req.query.keyword,
            $options: 'i',
        },
    } : {}
    
    const user = await User.find({$or:[searchP1, searchP2]}, {first_name:1,last_name:1, picture:1}).limit(5)
    // const user = await User.find({$or:[searchP1, searchP2]},{first_name:"1"},{ last_name:"1"},{picture:"1"})

    res.json(user)
})


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

        // console.log({...req.body, username, password:cryptedPass})

        const user = await new User({...req.body, username, password:cryptedPass}).save();

        const token = jwt.sign({id:user._id.toString()}, process.env.JWT_PASSWORD, {expiresIn:"30d"})

        const {_id, first_name, last_name, email, picture, cover, ...rest} = req.body;
        res.json({_id, first_name, last_name, email, picture, username, cover, token});
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}


exports.login = async(req, res) => {
    try{
        const {email, password} = req.body;

        const user = await User.findOne({email})
        if(user && await bcrypt.compare(password, user.password)){
            return res.json({
                _id:user._id,
                first_name:user.first_name,
                last_name:user.last_name,
                email:user.email,
                username:user.username,
                picture:user.picture,
                cover:user.cover,
                token: jwt.sign({id:user._id.toString()}, process.env.JWT_PASSWORD, {expiresIn:"30d"})
            })
        }else{
            res.status(401).json({message: "Email or password is invalid!"})
        }
    }catch(error){
        res.status(500).json({message: error.message})
    }
}


exports.update = async(req, res) => {
    // console.log(req.body)
    // res.json({})
    let {first_name, last_name, profileD, coverD, bYear, bDay, bMonth, gender, password} = req.body;

    // console.log(req.body)

    if(password) password = await bcrypt.hash(password, 10)

    req.user.first_name = first_name || req.user.first_name
    req.user.last_name = last_name || req.user.last_name
    req.user.picture = profileD || req.user.picture
    req.user.cover = coverD || req.user.cover
    req.user.bYear = bYear || req.user.bYear
    req.user.bDay = bDay || req.user.bDay
    req.user.bMonth = bMonth || req.user.bMonth
    req.user.gender = gender || req.user.gender
    req.user.password = password || req.user.password

    await req.user.save()

    res.json({
        _id:req.user._id,
        first_name:req.user.first_name,
        last_name:req.user.last_name,
        email:req.user.email,
        picture:req.user.picture,
        username:req.user.username,
        cover:req.user.cover,
        token: jwt.sign({id:req.user._id.toString()}, process.env.JWT_PASSWORD, {expiresIn:"30d"})
    })

}

