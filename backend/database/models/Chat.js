const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;

const chatSchema = new mongoose.Schema(
    {
        newMessage:{
            type: Boolean,
            default: false,
        },
        text: [
            {
                message: {
                    type: String,
                    required: true,
                },
                sendBy: {
                    type: ObjectId,
                    ref: "User",
                    required: true,
                },
                commentAt: {
                    type: Date,
                    default: new Date(),
                },
            },

        ],
        user: {
            A:{
                type: ObjectId,
                ref: "User",
                required: true,
            },
            B:{
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
