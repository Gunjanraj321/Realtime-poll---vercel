const Poll = require("../models/pollModel");
const User = require("../models/userModel");

const createPoll = async (req, res) => {
  const { question, options } = req.body;
  const userId = req.user.id;

  // Ensuring there are options provided and at least two options
  if (!options || options.length < 2) {
    return res
      .status(400)
      .json({ message: "Poll must have at least two options" });
  }

  // Adding unique IDs to each option
  const optionsWithId = options.map((option, index) => ({
    id: (index + 1).toString(),
    text: option.text,
    votes: [],
    voteCount: 0,
  }));

  try {
    const poll = await Poll.create({
      question,
      options: optionsWithId,
      createdBy: userId,
    });
    await User.findByIdAndUpdate(userId, { $push: { createdPolls: poll._id } });
    return res.status(201).json(poll);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

const getPollResults = async (req, res) => {
  const { pollId } = req.params;
  try {
    const poll = await Poll.findById(pollId);
    if (!poll) {
      return res.status(404).json({ message: "Poll not found" });
    }
    const pollResult = {
      _id: poll._id,
      question: poll.question,
      options: poll.options.map((option) => ({
        id: option.id,
        text: option.text,
        voteCount: option.voteCount,
      })),
      totalVotes: poll.options.reduce(
        (total, option) => total + option.voteCount,
        0
      ),
    };
    return res.status(200).json(pollResult);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

const fetchPolls = async (req, res) => {
  try {
    const polls = await Poll.find().populate("createdBy", "username");
    res.json(polls);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const votePoll = (io) => async (req, res) => {
  const { pollId, optionId } = req.params;
  const userId = req.user.id;
  try {
    const poll = await Poll.findById(pollId);

    if (!poll) {
      return res.status(404).json({ message: "Poll not found" });
    }
    if (req.user.votedPolls.includes(pollId)) {
      return res
        .status(400)
        .json({ message: "You have already voted on this poll" });
    }
    const option = poll.options.find((opt) => opt.id === optionId);

    if (!option) {
      return res.status(404).json({ message: "Option not found" });
    }
    option.votes.push(userId);
    option.voteCount += 1;
    await User.findByIdAndUpdate(userId, { $push: { votedPolls: poll._id } });
    await poll.save();

    io.emit("vote", poll); 

    res.status(200).json({ message: "Vote cast successfully", poll });
  } catch (error) {
    console.error(err);
    res.status(500).json('Internal server error');
  }
};

module.exports = { createPoll, getPollResults, fetchPolls ,votePoll};
