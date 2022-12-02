const express = require("express");
const { register, login, update, searchUsers, userDetails, friendReq, userDetailsAll, friendReqAcc, friendReqRej, listAll} = require("../controllers/user");
const userProtect = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/listallusers", userProtect, listAll)

router.post("/register", register)
router.post("/login", login)
router.post("/adminlogin", userProtect, login)


router.put("/update", userProtect, update)
router.get("/searchuser", searchUsers)

// send all of user details
router.get("/profile/mydetails", userProtect, userDetailsAll)

// send id details
router.get("/profile/:id", userProtect, userDetails)

router.post("/friendreq/:id", userProtect, friendReq)
router.post("/friendreqacc/:id", userProtect, friendReqAcc)
router.post("/friendreqrej/:id", userProtect, friendReqRej)
// router.get("/searchuser", userProtect, searchUsers)



module.exports = router;
