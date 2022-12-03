const asyncHandler = require("express-async-handler")
const Chat = require("../database/models/Chat")
const User = require("../database/models/User")


exports.chatId = asyncHandler(async(req, res) => {
    const fid = req.params.friendid
    if(!req.user.friends.indexOf(fid) ==-1){res.status(404).send("User not found!")}
    await req.user.populate("chats", 'user')
    for(let i = 0; i < req.user.chats.length; i++){
        if(req.user.chats[i].user.A == fid || req.user.chats[i].user.B == fid){
            res.send(req.user.chats[i]._id)
        }
    }
})

exports.sendMessage = asyncHandler(async(req, res) => {
    const message = req.body.message

    const chatid = req.params.chatid
    const chat = await Chat.findById(chatid)
    const userid = req.user._id
    let fid;

    if(chat.user.A == userid) fid = chat.user.B
    else fid = chat.user.A
    chat.text.push({message, sendBy:userid})

    // chat.newMessage = true
    await chat.save()

    res.send(chat)
})


exports.receiveMessage = asyncHandler(async(req, res) => {
    const chatid = req.params.chatid
    const chat = await Chat.findById(chatid)
    // .populate("text.sendBy", "first_name")
    res.json(chat)

    // if(chat.newMessage) res.send("No new message!")
    // res.send("New message!")
})

