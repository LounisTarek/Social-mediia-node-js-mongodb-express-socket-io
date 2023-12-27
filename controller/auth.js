
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {

    try {
        const hashPassword = await bcrypt.hash(req.body.password, 12);

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashPassword,
        });

        const user = await newUser.save();
        res.status(200).json(user);
    }catch(err) {
        console.log(err);
    }
};

const loginUser = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            return res.status(404).json("User not found");
        }

        const validatePassword = await bcrypt.compare(req.body.password, user.password);

        if (!validatePassword) {
            return res.status(400).json("Wrong password");
        }
        const token = jwt.sign({ userId:user.id }, process.env.JWT_SECRET,{
            expiresIn : '30d',
        })
        return res.status(200).json({token});
        
    } catch (error) {
        return res.status(500).json("Internal Server Error");
    }
};

module.exports = {registerUser, loginUser};
