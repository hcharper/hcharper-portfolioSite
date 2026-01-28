/**
 * Blog Routes Unit Tests
 * Tests CRUD operations for blog endpoints
 * Includes security tests for authentication and authorization
 */

const request = require('supertest');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const createTestApp = require('../testApp');
const Blog = require('../../models/blog');
const User = require('../../models/user');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

const app = createTestApp();

// Helper function to generate auth token
const generateAuthToken = (user) => {
  return jwt.sign(
    { 
      userId: user._id.toString(), 
      username: user.username, 
      email: user.email,
      role: user.role 
    },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
};

describe('Blog Routes', () => {
  let testUser;
  let testBlog;
  let authToken;
  let adminUser;
  let adminToken;

  beforeEach(async () => {
    // Create a test user
    testUser = await User.create({
      username: 'testuser',
      email: 'test@example.com',
      password: 'hashedpassword123',
      role: 'user'
    });
    authToken = generateAuthToken(testUser);

    // Create an admin user
    adminUser = await User.create({
      username: 'adminuser',
      email: 'admin@example.com',
      password: 'hashedpassword123',
      role: 'admin'
    });
    adminToken = generateAuthToken(adminUser);

    // Create a test blog owned by testUser
    testBlog = await Blog.create({
      title: 'Test Blog Post',
      content: 'This is test content for the blog post.',
      snippet: 'Test snippet',
      body: 'Test body content',
      user: testUser._id
    });
  });

  describe('GET /api/blogs', () => {
    it('should return all blogs', async () => {
      const response = await request(app)
        .get('/api/blogs')
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBe(1);
      expect(response.body[0].title).toBe('Test Blog Post');
    });

    it('should return empty array when no blogs exist', async () => {
      await Blog.deleteMany({});
      
      const response = await request(app)
        .get('/api/blogs')
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBe(0);
    });

    it('should populate user information', async () => {
      const response = await request(app)
        .get('/api/blogs')
        .expect(200);

      expect(response.body[0].user).toBeDefined();
      expect(response.body[0].user.username).toBe('testuser');
    });
  });

  describe('GET /api/blogs/:id', () => {
    it('should return a specific blog by ID', async () => {
      const response = await request(app)
        .get(`/api/blogs/${testBlog._id}`)
        .expect(200);

      expect(response.body.title).toBe('Test Blog Post');
      expect(response.body.content).toBe('This is test content for the blog post.');
    });

    it('should return 404 for non-existent blog', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      
      const response = await request(app)
        .get(`/api/blogs/${fakeId}`)
        .expect(404);

      expect(response.body.error).toBe('Not found');
    });

    it('should return 400 for invalid blog ID format', async () => {
      const response = await request(app)
        .get('/api/blogs/invalid-id')
        .expect(400);

      expect(response.body.error).toBeDefined();
    });
  });

  describe('POST /api/blogs', () => {
    it('should create a new blog when authenticated', async () => {
      const newBlog = {
        title: 'New Blog Post',
        content: 'New content here',
        snippet: 'New snippet'
      };

      const response = await request(app)
        .post('/api/blogs')
        .set('Authorization', `Bearer ${authToken}`)
        .send(newBlog)
        .expect(201);

      expect(response.body.title).toBe('New Blog Post');
      expect(response.body.content).toBe('New content here');
      expect(response.body._id).toBeDefined();
      // Blog should be associated with authenticated user
      expect(response.body.user.toString()).toBe(testUser._id.toString());
    });

    it('should return 401 when no auth token provided', async () => {
      const newBlog = {
        title: 'Unauthorized Blog',
        content: 'Should not be created'
      };

      const response = await request(app)
        .post('/api/blogs')
        .send(newBlog)
        .expect(401);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Access token required');
    });

    it('should return 403 when invalid token provided', async () => {
      const newBlog = {
        title: 'Invalid Token Blog',
        content: 'Should not be created'
      };

      const response = await request(app)
        .post('/api/blogs')
        .set('Authorization', 'Bearer invalid-token')
        .send(newBlog)
        .expect(403);

      expect(response.body.success).toBe(false);
    });

    it('should return 400 when title is missing', async () => {
      const invalidBlog = {
        content: 'Content without title'
      };

      const response = await request(app)
        .post('/api/blogs')
        .set('Authorization', `Bearer ${authToken}`)
        .send(invalidBlog)
        .expect(400);

      expect(response.body.error).toBeDefined();
    });

    it('should create blog with timestamps', async () => {
      const newBlog = {
        title: 'Timestamped Blog',
        content: 'Content with timestamps'
      };

      const response = await request(app)
        .post('/api/blogs')
        .set('Authorization', `Bearer ${authToken}`)
        .send(newBlog)
        .expect(201);

      expect(response.body.createdAt).toBeDefined();
      expect(response.body.updatedAt).toBeDefined();
    });
  });

  describe('PUT /api/blogs/:id', () => {
    it('should update an existing blog when owner is authenticated', async () => {
      const updates = {
        title: 'Updated Blog Title',
        content: 'Updated content'
      };

      const response = await request(app)
        .put(`/api/blogs/${testBlog._id}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send(updates)
        .expect(200);

      expect(response.body.title).toBe('Updated Blog Title');
      expect(response.body.content).toBe('Updated content');
    });

    it('should allow admin to update any blog', async () => {
      const updates = {
        title: 'Admin Updated Title'
      };

      const response = await request(app)
        .put(`/api/blogs/${testBlog._id}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send(updates)
        .expect(200);

      expect(response.body.title).toBe('Admin Updated Title');
    });

    it('should return 401 when no auth token provided', async () => {
      const response = await request(app)
        .put(`/api/blogs/${testBlog._id}`)
        .send({ title: 'Updated' })
        .expect(401);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Access token required');
    });

    it('should return 403 when non-owner tries to update', async () => {
      // Create another user who doesn't own the blog
      const otherUser = await User.create({
        username: 'otheruser',
        email: 'other@example.com',
        password: 'hashedpassword123',
        role: 'user'
      });
      const otherToken = generateAuthToken(otherUser);

      const response = await request(app)
        .put(`/api/blogs/${testBlog._id}`)
        .set('Authorization', `Bearer ${otherToken}`)
        .send({ title: 'Unauthorized Update' })
        .expect(403);

      expect(response.body.error).toBe('Not authorized to update this blog');
    });

    it('should return 404 for non-existent blog', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      
      const response = await request(app)
        .put(`/api/blogs/${fakeId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({ title: 'Updated' })
        .expect(404);

      expect(response.body.error).toBe('Not found');
    });

    it('should update only provided fields', async () => {
      const updates = {
        title: 'Only Title Updated'
      };

      const response = await request(app)
        .put(`/api/blogs/${testBlog._id}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send(updates)
        .expect(200);

      expect(response.body.title).toBe('Only Title Updated');
      expect(response.body.content).toBe('This is test content for the blog post.');
    });
  });

  describe('DELETE /api/blogs/:id', () => {
    it('should delete an existing blog when owner is authenticated', async () => {
      const response = await request(app)
        .delete(`/api/blogs/${testBlog._id}`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body.title).toBe('Test Blog Post');

      // Verify deletion
      const deletedBlog = await Blog.findById(testBlog._id);
      expect(deletedBlog).toBeNull();
    });

    it('should allow admin to delete any blog', async () => {
      const response = await request(app)
        .delete(`/api/blogs/${testBlog._id}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);

      expect(response.body.title).toBe('Test Blog Post');
    });

    it('should return 401 when no auth token provided', async () => {
      const response = await request(app)
        .delete(`/api/blogs/${testBlog._id}`)
        .expect(401);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Access token required');
    });

    it('should return 403 when non-owner tries to delete', async () => {
      // Create another user who doesn't own the blog
      const otherUser = await User.create({
        username: 'otheruser2',
        email: 'other2@example.com',
        password: 'hashedpassword123',
        role: 'user'
      });
      const otherToken = generateAuthToken(otherUser);

      const response = await request(app)
        .delete(`/api/blogs/${testBlog._id}`)
        .set('Authorization', `Bearer ${otherToken}`)
        .expect(403);

      expect(response.body.error).toBe('Not authorized to delete this blog');
    });

    it('should return 404 for non-existent blog', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      
      const response = await request(app)
        .delete(`/api/blogs/${fakeId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(404);

      expect(response.body.error).toBe('Not found');
    });

    it('should not affect other blogs when deleting', async () => {
      // Create another blog
      const anotherBlog = await Blog.create({
        title: 'Another Blog',
        content: 'Another content',
        user: testUser._id
      });

      await request(app)
        .delete(`/api/blogs/${testBlog._id}`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      // Verify other blog still exists
      const remainingBlog = await Blog.findById(anotherBlog._id);
      expect(remainingBlog).not.toBeNull();
      expect(remainingBlog.title).toBe('Another Blog');
    });
  });
});
