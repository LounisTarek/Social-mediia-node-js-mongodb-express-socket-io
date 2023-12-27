const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        min: 3,
        unique: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        require: true,
        min: 8,
    },
    profilePicture:{
        type: String,
        default: "",
    },
    coverPicture:{
        type: String,
        default: "",
    },
    friends: [{
        type: mongoose.Schema.Types.ObjectId, ref:"User"
    }],  

    sendrequest: [{
        type: mongoose.Schema.Types.ObjectId, ref:"User"
    }],

    receiverequest: [{
        type: mongoose.Schema.Types.ObjectId, ref:"User"
    }],

    isAdmin:{
        type: Boolean,
        default: false,
    },
},
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);