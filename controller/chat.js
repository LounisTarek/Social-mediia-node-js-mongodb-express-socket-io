const Chat = require("../models/Chat");
const Message = require("../models/Message");

const createChat = async (req, res) => {

    try {

        const existChat = await Chat.findOne({$or: [{ senderId: req.user.id, receiverId: req.params.id }, 
            { senderId: req.params.id, receiverId: req.user.id }]});

        if(existChat) return res.status(200).json(existChat);

        const newchat = new Chat({
            senderId: req.user.id,
            receiverId: req.params.id
        });

        const chat = await newchat.save();
        return res.status(200).json(chat);

        
    } catch (error) {
        console.log(error);
        return res.status(500).json("Internal server error");
    }

};

const userChats = async (req, res) => {
    const userId = req.user.id;
    try {

        const chats = await Chat.find({ $or: [{ senderId: userId }, { receiverId: userId }] });
        return res.status(200).json(chats);
        
    } catch (error) {
        return res.status(500).json("Internal server error");
    }
};

const findChat = async (req, res) => {
    try {
        
        const chat = await Chat.findById(req.params.id);

        if(!chat) return res.status(404).json("there's no conversation");

        return res.status(200).json(chat);

    } catch (error) {
        return res.status(500).json("Internal server error");
    }
};

const createMessage = async (req, res) => {
    const chatId = req.params.id;
    try {
        const chat = await Chat.findById(chatId);
        if(!chat) return res.status(404).json("No chat found");

        const newMessage = new Message({
            chatId: chatId,
            userId: req.user.id,
            text: req.body.text
        });

        const message = await newMessage.save();
        await chat.updateOne({$push: { messages: message.id }});

        return res.status(200).json(message);
        
    } catch (error) {
        return res.status(500).json("Internal server error");
    }
};

const findMessage = async (req, res) => {
    try {
        const message = await Message.findById(req.params.id);
        if(!message) return res.status(404).json("Message Not Found");

        return res.status(200).json(message);

        } catch (error) {
            console.log(error);
        return res.status(500).json("Internal server error");
    }
}

module.exports = { createChat, userChats, findChat, createMessage, findMessage };