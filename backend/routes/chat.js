const express = require("express");
const { chatId, sendMessage, receiveMessage } = require("../controllers/chatController");
const router = express.Router();
const userProtect = require("../middleware/authMiddleware");

router.get("/chatid/:friendid", userProtect, chatId)

router.post("/chat/send/:chatid", userProtect, sendMessage)
router.get("/chat/receive/:chatid", userProtect, receiveMessage)



module.exports = router;
