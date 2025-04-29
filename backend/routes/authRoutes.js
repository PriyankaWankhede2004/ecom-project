const express = require('express');
const router = express.Router();
const { loginUser, registerUser, getProfile } = require('../controllers/authController');

router.post('/login', loginUser);
router.post('/register', registerUser);
router.get('/profile/:userId', getProfile);

module.exports = router;