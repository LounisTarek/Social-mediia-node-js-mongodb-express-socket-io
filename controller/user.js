const User = require("../models/User");
const bcrypt = require("bcrypt");

const updateUser = async (req, res) => {

    if(req.user.id === req.params.id || req.body.isAdmin){
        
        try {
            if(req.body.password){
                req.body.password = await bcrypt.hash(req.body.password, 12);

                const user = await User.findByIdAndUpdate(req.params.id, {$set: req.body});

                return res.status(200).json("Account has been updated");
            }
        
        } catch (error) {
            res.status(500).json("Internal Server Error");
        }


    }else{
        return res.status(403).json("you can update only your account");
    }

};

const deleteUser = async (req, res) => {
    if(req.user.id === req.params.id || req.user.isAdmin){
        
        try {
                await User.deleteOne({_id: req.params.id});

                return res.status(200).json("Account has been deleted");
        
        } catch (error) {
            res.status(500).json("Internal Server Error");
        }


    }else{
        return res.status(403).json("you can delete only your account");
    }
};

const getallUsers = async(req, res) => {
    try {
       const users = await User.find();
       // const {password, updatedAt, ...other} = user._doc; 

        return res.status(200).json(users);

    } catch (error) {
        return res.status(500).json("Internal Server Error");
    }
};

const sendFriendRequest = async (req, res) => {
    if(req.user.id !== req.params.id){

        try {
            
            const user = await User.findById(req.user.id);
            const currentUser = await User.findById(req.params.id);

            if(!user.friends.includes(req.params.id) && !user.sendrequest.includes(req.params.id)){

                const sender = await user.updateOne({$push: { sendrequest: req.params.id }});
                const receiver = await currentUser.updateOne({$push: { receiverequest: req.user.id }});

                return res.status(200).json(" Request has been sent");

            }else if(user.friends.includes(req.params.id)){
                return res.status(403).json("you already his friend");
            }
            else if(user.sendrequest.includes(req.params.id)){
                return res.status(403).json("you already send request to this user");
            }

        } catch (error) {
            return res.status(500).json("Internal Server Error");
        }

    }else{
        return res.status(403).json("You can't follow yourself");
    }
};

const acceptFriendRequest = async (req, res) => {
    if(req.user.id !== req.params.id){

        try {
            
            const user = await User.findById(req.user.id);
            const currentUser = await User.findById(req.params.id);

            if(user.receiverequest.includes(req.params.id)){

                await currentUser.updateOne({$pull: { sendrequest: req.user.id  }});
                await user.updateOne({$pull: { receiverequest: req.params.id }});
                await user.updateOne({$push: { friends: req.params.id }});
                await currentUser.updateOne({$push: { friends: req.user.id }});

                return res.status(200).json(" Request has been accept");

            }else if(user.friends.includes(req.params.id)){
                return res.status(403).json("you already his friend");
            }
            else if(!user.receiverequest.includes(req.params.id)){
                return res.status(403).json("the user didn't send you a request");
            }

        } catch (error) {
            return res.status(500).json("Internal Server Error");
        }

    }else{
        return res.status(403).json("You can't follow yourself");
    }
};

const rejectFriendRequest = async (req, res) => {
    if(req.user.id !== req.params.id){

        try {
            
            const user = await User.findById(req.user.id);
            const currentUser = await User.findById(req.params.id);

            if(user.receiverequest.includes(req.params.id)){

                await currentUser.updateOne({$pull: { sendrequest: req.user.id  }});
                await user.updateOne({$pull: { receiverequest: req.params.id }});

                return res.status(200).json(" Request has been rejected");

            }else if(user.friends.includes(req.params.id)){
                return res.status(403).json("you already his friend");
            }
            else if(!user.receiverequest.includes(req.params.id)){
                return res.status(403).json("the user didn't send you a request");
            }

        } catch (error) {
            return res.status(500).json("Internal Server Error");
        }

    }else{
        return res.status(403).json("You can't follow yourself");
    }
};

const getProfile = async(req, res) => {
    if(req.user.id === req.params.id){

        try {

            const user = await User.findById(req.params.id);
            return res.status(200).json({user});
            
        } catch (error) {
            return res.status(500).json("Internal Server Error");
        }

    }else{
        return res.status(403).json("You can only see your profile");
    }
};

module.exports = {updateUser, deleteUser, getallUsers, sendFriendRequest, acceptFriendRequest, rejectFriendRequest, getProfile};