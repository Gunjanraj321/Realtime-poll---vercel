const Comment = require("../models/commentModal");

const addComment = async (req, res) => {
  const { pollId } = req.params;
  const { text } = req.body;
  
  try {
    const comment = await Comment.create({
      text: text,
      poll: pollId,
      user: req.user._id,
    });
    return res.status(201).json(comment);
  } catch (error) {
    return res.status(500).json({ message: "Server Error while adding comment" });
  }
};

const addReply = async (req, res) => {
  const { commentId } = req.params;
  const { text } = req.body;

  try {
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    comment.replies.push({
      text: text,
      user: req.user._id,
      createdAt: new Date(),
    });

    await comment.save();
    return res.status(201).json(comment);
  } catch (err) {
    return res.status(500).json({ message: "Server Error while adding reply" });
  }
};

const getCommentOfPoll = async (req, res) => {
  const { pollId } = req.params;
  
  try {
    const comments = await Comment.find({ poll: pollId })
      .populate("user", ["username"])
      .populate("replies.user", ["username"]);
      
    return res.status(200).json(comments);
  } catch (err) {
    return res.status(500).json({ message: "Server Error while fetching comments" });
  }
};

module.exports = { addComment, addReply, getCommentOfPoll };
