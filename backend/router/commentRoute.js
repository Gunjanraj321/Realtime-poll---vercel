const express = require('express');

const router = express.Router();
const {addComment, addReply, getCommentOfPoll} = require('../controllers/commentController');

const {verify} = require('../middleware/verifyToken');

router.post('/poll/:pollId/comments', verify, addComment);
router.post('/poll/:pollId/addreply', verify, addReply);
router.get('/poll/:pollId/comments',verify, getCommentOfPoll);

module.exports = router;