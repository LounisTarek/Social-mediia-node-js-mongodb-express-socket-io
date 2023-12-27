const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRouter = require("./routes/userroutes");
const postRouter = require("./routes/postroutes");
const chatRouter = require("./routes/chatroute");
const User = require("./models/User");
const socketIO = require('socket.io');

const app = express();

dotenv.config();
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to Database Successfully");

    app.listen(3000, () => {
      console.log("Server running on port 3000");
    });
  })
  .catch((error) => {
    console.error("Error connecting to database:", error);
  });

  app.use("/users", userRouter);
  app.use("/posts", postRouter);
  app.use("/chats", chatRouter);
