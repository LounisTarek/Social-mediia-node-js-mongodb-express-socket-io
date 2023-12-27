const router = require("express").Router();
const { createChat, userChats, findChat, createMessage, findMessage } = require("../controller/chat");
const { protect } = require("../guards/protectroutes");

router.post("/createChat/:id", protect, createChat);

router.get("/userChats", protect, userChats);

router.get("/findChat/:id", protect, findChat);

router.post("/message/:id", protect, createMessage);

router.get("/displayMessage/:id", protect, findMessage);

module.exports = router;