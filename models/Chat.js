const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({

    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    messages: [{ type: mongoose.Schema.Types.ObjectId,
                ref:'Message' }]
});

module.exports = mongoose.model("Chat", chatSchema);