require("dotenv").config();
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

function generateAccessToken(id) {
    return jwt.sign({ userId: id }, process.env.JWTSECRETKEY);
}

const userSignup = async (req, res) => {
  const { email, password, username } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({
      email,
      password: hashedPassword,
      username,
    });
    return res.status(201).json({
      id: user._id,
      username: user.username,
      email: user.email,
      token: generateAccessToken(user.id),
    });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
      message: "registration issue, something went wrong on server",
    });
  }
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }
    
    return res.status(200).json({
      id: user._id,
      username: user.username,
      email: user.email,
      token: generateAccessToken(user.id),

    });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
      message: "something went wrong while login",
    });
  }
};

module.exports = { userLogin, userSignup };
