const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/User");

const protect = asyncHandler(async(req, res,next) => {

    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){

        try {

            token = req.headers.authorization.split(' ')[1];
            const payloud = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await User.findById(payloud.userId).select('-password');

            next()    
      } catch (error) {
            return res.status(500).json("Internal Server Error");
    }}
    if(!token){
        res.status(401).json("Not authorized");
    }
    
});

module.exports = { protect };