const express = require("express");
const { register, login, update, searchUsers } = require("../controllers/user");
const userProtect = require("../middleware/authMiddleware");
const router = express.Router();


router.post("/register", register)
router.post("/login", login)
router.put("/update", userProtect, update)
router.get("/searchuser", userProtect, searchUsers)



module.exports = router;
