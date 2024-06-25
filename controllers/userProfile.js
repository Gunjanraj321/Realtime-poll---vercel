const User = require("../models/userModel");

const getUserProfile = async (req, res) => {
  const userId = req.params.userId;
  try {
    const user = await User.findById(userId).select(
      "username email profilePicture"
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(201).json(user);
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};


module.exports = { getUserProfile };