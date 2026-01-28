const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/auth');

// POST /api/auth/create-account - User Registration
router.post('/create-account', register);

// POST /api/auth/login - User Login
router.post('/login', login);

module.exports = router;
