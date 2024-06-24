const router = require('express').Router();

const {userSignup, userLogin} = require('../controllers/userController');
const { getUserProfile } = require('../controllers/userProfile');

router.post('/signup', userSignup);
router.post('/login', userLogin);
router.get('/profile/:userId', getUserProfile);

module.exports = router;