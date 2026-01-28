const express = require('express');
const router = express.Router();
const userQueries = require('../db/userQueries');
const { authenticateToken, isAdmin } = require('../middlewares/auth-middleware');

// Helper to remove password from user object
const sanitizeUser = (user) => {
  if (!user) return null;
  const { password, ...safeUser } = user.toObject ? user.toObject() : user;
  return safeUser;
};

// Create user (protected - admin only)
router.post('/', authenticateToken, isAdmin, async (req, res) => {
  try {
    const user = await userQueries.createUser(req.body);
    res.status(201).json(sanitizeUser(user));
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all users (protected - admin only)
router.get('/', authenticateToken, isAdmin, async (req, res) => {
  try {
    const users = await userQueries.getAllUsers();
    res.json(users.map(sanitizeUser));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get user by id (protected)
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const user = await userQueries.getUserById(req.params.id);
    if (!user) return res.status(404).json({ error: 'Not found' });
    res.json(sanitizeUser(user));
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update user (protected - admin only)
router.put('/:id', authenticateToken, isAdmin, async (req, res) => {
  try {
    const user = await userQueries.updateUser(req.params.id, req.body);
    if (!user) return res.status(404).json({ error: 'Not found' });
    res.json(sanitizeUser(user));
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete user (protected - admin only)
router.delete('/:id', authenticateToken, isAdmin, async (req, res) => {
  try {
    const user = await userQueries.deleteUser(req.params.id);
    if (!user) return res.status(404).json({ error: 'Not found' });
    res.json(sanitizeUser(user));
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
