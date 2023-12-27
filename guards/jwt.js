/*const jwt = require("jsonwebtoken");
const User = require("../models/User");


    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            token = req.headers.authorization.split(' ')[1];
            const payloud = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await User.findById(payloud.id).select('-password');

        } catch (error) {
            res.status(500).json("Internal Server Error");
        }
    }
    if(!token){
        res.status(401).json("Not authorized");
    }
}

module.exports = { protect };*/