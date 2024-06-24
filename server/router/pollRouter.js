const express = require('express');
const router = express.Router();
const { verify } = require('../middleware/verifyToken');
const { createPoll, getPollResults, fetchPolls, votePoll } = require('../controllers/pollController');

module.exports = (io) => {
    router.post('/poll/createPoll', verify, createPoll);
    router.get('/poll/:pollId/pollResult', getPollResults);
    router.get('/poll', fetchPolls);
    router.post('/poll/vote/:pollId/:optionId', verify, votePoll(io));

    return router;
};
