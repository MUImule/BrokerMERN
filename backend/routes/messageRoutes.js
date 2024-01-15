const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../middleware/auth');
const { getMessages, sendMessage } = require('../controllers/messageController');

// /api/send-message
router.post('/send-message', isAuthenticated, sendMessage);

// /api/get-messages/:userId
router.get('/get-messages/:userId', isAuthenticated, getMessages);

module.exports = router;
