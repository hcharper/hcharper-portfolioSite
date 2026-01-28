const express = require('express');
const router = express.Router();
const { login } = require('../controllers/auth');

// POST /api/auth/login - Admin Login
router.post('/login', login);

module.exports = router;
