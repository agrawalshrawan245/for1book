const multer = require("multer");
const path = require("path");
const express = require("express");
const {S3} = require("aws-sdk");
const userProtect = require("../middleware/authMiddleware");
const User = require("../database/models/User")
const asyncHandler = require("express-async-handler")



const router = express.Router()

const storage = multer.memoryStorage();

const s3UploadV2 = async(file, username) => {
  const s3 = new S3();
  const param = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `for1book/${username}/${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`,
    Body: file.buffer
  }
  return await s3.upload(param).promise();
}

// const storage = multer.diskStorage({
//   destination(req, file, cb) {cb(null, '../database/')},
//   filename(req, file, cb) {cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)},
// })

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
  const mimetype = filetypes.test(file.mimetype)

  if (extname && mimetype) return cb(null, true)
  else cb('Images only!')
}

const upload = multer({ storage, fileFilter: function (req, file, cb) { checkFileType(file, cb) },})

router.post('/database', userProtect, upload.single('image'), asyncHandler(async (req, res) => { 
  const result = await s3UploadV2(req.file, req.user.username);
  req.user.photos.push(result.Location);
  await req.user.save();
  res.send(result.Location)
}))

// router.post('/uploads', upload.single('image'), (req, res) => { res.json(`/${req.file.path}`) })

module.exports = router;


