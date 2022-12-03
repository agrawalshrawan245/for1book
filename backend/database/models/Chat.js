const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;

const chatSchema = new mongoose.Schema(
    {
        newMessage:{
            type: Boolean,
            default: true,
        },
        text: [
            {
                chat:{
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
                savedAt: {
                    type: Date,
                    default: new Date(),
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
