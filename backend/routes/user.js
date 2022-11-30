const express = require("express");
const { register, login, update, searchUsers, userDetails, friendReq} = require("../controllers/user");
const userProtect = require("../middleware/authMiddleware");
const router = express.Router();


router.post("/register", register)
router.post("/login", login)
router.put("/update", userProtect, update)
router.get("/searchuser", searchUsers)
router.get("/profile/:id", userProtect, userDetails)
router.post("/friendreq/:id", userProtect, friendReq)
// router.get("/searchuser", userProtect, searchUsers)



module.exports = router;
