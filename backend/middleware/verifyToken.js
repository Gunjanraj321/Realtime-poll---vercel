const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
require('dotenv').config();

const verify = async (req, res, next) => {
    try {
        const token = req.header('Authorization');
        const userData = jwt.verify(token, process.env.JWTSECRETKEY);
        const user = await User.findById(userData.userId);
        if (user) {
            req.user = user;
            next();
        }
    }
    catch (err) {
        res.status(500).json('User Not Authorized');
    }

}

module.exports = {verify};