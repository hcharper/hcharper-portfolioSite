const express = require('express');
const router = express.Router();
const blogQueries = require('../db/blogQueries');
const { authenticateToken } = require('../middlewares/auth-middleware');

// Create a new blog (requires authentication)
router.post('/', authenticateToken, async (req, res) => {
  try {
    // Attach the authenticated user's ID to the blog
    const blogData = {
      ...req.body,
      user: req.user.userId
    };
    const blog = await blogQueries.createBlog(blogData);
    res.status(201).json(blog);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all blogs
router.get('/', async (req, res) => {
  try {
    const blogs = await blogQueries.getAllBlogs();
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get specific blog
router.get('/:id', async (req, res) => {
  try {
    const blog = await blogQueries.getBlogById(req.params.id);
    if (!blog) return res.status(404).json({ error: 'Not found' });
    res.json(blog);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update blog (requires authentication)
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    // First check if blog exists and user owns it (or is admin)
    const existingBlog = await blogQueries.getBlogById(req.params.id);
    if (!existingBlog) return res.status(404).json({ error: 'Not found' });
    
    // Check ownership: user must own the blog or be admin
    const isOwner = existingBlog.user && existingBlog.user._id.toString() === req.user.userId;
    const isAdmin = req.user.role === 'admin';
    
    if (!isOwner && !isAdmin) {
      return res.status(403).json({ error: 'Not authorized to update this blog' });
    }
    
    const blog = await blogQueries.updateBlog(req.params.id, req.body);
    res.json(blog);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete blog (requires authentication)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    // First check if blog exists and user owns it (or is admin)
    const existingBlog = await blogQueries.getBlogById(req.params.id);
    if (!existingBlog) return res.status(404).json({ error: 'Not found' });
    
    // Check ownership: user must own the blog or be admin
    const isOwner = existingBlog.user && existingBlog.user._id.toString() === req.user.userId;
    const isAdmin = req.user.role === 'admin';
    
    if (!isOwner && !isAdmin) {
      return res.status(403).json({ error: 'Not authorized to delete this blog' });
    }
    
    const blog = await blogQueries.deleteBlog(req.params.id);
    res.json(blog);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
