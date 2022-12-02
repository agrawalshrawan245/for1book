const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;

const chatSchema = new mongoose.Schema(
  {
    text: [
        {
            message: {
                type: String,
                required: true,
            },
            sendBy: {
                type: Number,
                required: true,
            },
            commentAt: {
                type: Date,
                required: true,
            },
        },
    ],
    user: {
        0:{
            type: ObjectId,
            ref: "User",
            required: true,
        },
        1:{
            type: ObjectId,
            ref: "User",
            required: true,
        },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Chat", chatSchema);
