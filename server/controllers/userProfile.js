const User = require("../models/userModel");

const getUserProfile = async (req, res) => {
  const userId = req.params.userId;
console.log(userId)
  try {
    const user = await User.findById(userId).select(
      "username email profilePicture"
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};


module.exports = { getUserProfile };