const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUserProfile, listAllUsers } = require('../controllers/userController');
const { protect } = require('../middlewares/authMidlleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', getUserProfile);
router.get('/list-user', listAllUsers);

module.exports = router;
