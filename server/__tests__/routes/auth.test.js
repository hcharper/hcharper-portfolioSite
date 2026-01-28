/**
 * Authentication Routes Unit Tests
 * Tests user registration and login endpoints
 */

const request = require('supertest');
const bcrypt = require('bcrypt');
const createTestApp = require('../testApp');
const User = require('../../models/user');

const app = createTestApp();

describe('Auth Routes', () => {
  describe('POST /api/auth/create-account (Registration)', () => {
    it('should register a new user successfully', async () => {
      const newUser = {
        username: 'newuser',
        email: 'newuser@example.com',
        password: 'password123'
      };

      const response = await request(app)
        .post('/api/auth/create-account')
        .send(newUser)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe('User registered successfully');
      expect(response.body.token).toBeDefined();
      expect(response.body.user).toBeDefined();
      expect(response.body.user.username).toBe('newuser');
      expect(response.body.user.email).toBe('newuser@example.com');
      expect(response.body.user.role).toBe('user');
      // Password should not be returned
      expect(response.body.user.password).toBeUndefined();
    });

    it('should ignore admin role when specified (security: prevents privilege escalation)', async () => {
      const attemptedAdmin = {
        username: 'hackeruser',
        email: 'hacker@example.com',
        password: 'password123',
        role: 'admin'  // Attempting to self-assign admin
      };

      const response = await request(app)
        .post('/api/auth/create-account')
        .send(attemptedAdmin)
        .expect(201);

      // Should always be 'user', not 'admin' - prevents privilege escalation
      expect(response.body.user.role).toBe('user');
    });

    it('should return 400 when username is missing', async () => {
      const invalidUser = {
        email: 'test@example.com',
        password: 'password123'
      };

      const response = await request(app)
        .post('/api/auth/create-account')
        .send(invalidUser)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Username, email, and password are required');
    });

    it('should return 400 when email is missing', async () => {
      const invalidUser = {
        username: 'testuser',
        password: 'password123'
      };

      const response = await request(app)
        .post('/api/auth/create-account')
        .send(invalidUser)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Username, email, and password are required');
    });

    it('should return 400 when password is missing', async () => {
      const invalidUser = {
        username: 'testuser',
        email: 'test@example.com'
      };

      const response = await request(app)
        .post('/api/auth/create-account')
        .send(invalidUser)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Username, email, and password are required');
    });

    it('should return 400 for invalid email format', async () => {
      const invalidUser = {
        username: 'testuser',
        email: 'invalid-email',
        password: 'password123'
      };

      const response = await request(app)
        .post('/api/auth/create-account')
        .send(invalidUser)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Invalid email format');
    });

    it('should return 400 for password shorter than 6 characters', async () => {
      const invalidUser = {
        username: 'testuser',
        email: 'test@example.com',
        password: '12345'
      };

      const response = await request(app)
        .post('/api/auth/create-account')
        .send(invalidUser)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Password must be at least 6 characters long');
    });

    it('should return 409 when email already exists', async () => {
      // Create existing user
      await User.create({
        username: 'existinguser',
        email: 'existing@example.com',
        password: 'hashedpassword123'
      });

      const duplicateEmailUser = {
        username: 'newuser',
        email: 'existing@example.com',
        password: 'password123'
      };

      const response = await request(app)
        .post('/api/auth/create-account')
        .send(duplicateEmailUser)
        .expect(409);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Email already registered');
    });

    it('should return 409 when username already exists', async () => {
      // Create existing user
      await User.create({
        username: 'existinguser',
        email: 'existing@example.com',
        password: 'hashedpassword123'
      });

      const duplicateUsernameUser = {
        username: 'existinguser',
        email: 'new@example.com',
        password: 'password123'
      };

      const response = await request(app)
        .post('/api/auth/create-account')
        .send(duplicateUsernameUser)
        .expect(409);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Username already taken');
    });

    it('should hash the password before storing', async () => {
      const newUser = {
        username: 'hashtest',
        email: 'hash@example.com',
        password: 'plainpassword123'
      };

      await request(app)
        .post('/api/auth/create-account')
        .send(newUser)
        .expect(201);

      const storedUser = await User.findOne({ username: 'hashtest' });
      expect(storedUser.password).not.toBe('plainpassword123');
      
      // Verify it's a valid bcrypt hash
      const isValidHash = await bcrypt.compare('plainpassword123', storedUser.password);
      expect(isValidHash).toBe(true);
    });
  });

  describe('POST /api/auth/login', () => {
    beforeEach(async () => {
      // Create a test user with hashed password
      const hashedPassword = await bcrypt.hash('correctpassword', 10);
      await User.create({
        username: 'loginuser',
        email: 'login@example.com',
        password: hashedPassword,
        role: 'user'
      });
    });

    it('should login successfully with correct credentials', async () => {
      const credentials = {
        username: 'loginuser',
        password: 'correctpassword'
      };

      const response = await request(app)
        .post('/api/auth/login')
        .send(credentials)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe('Login successful');
      expect(response.body.token).toBeDefined();
      expect(response.body.user).toBeDefined();
      expect(response.body.user.username).toBe('loginuser');
    });

    it('should return 400 when username is missing', async () => {
      const credentials = {
        password: 'somepassword'
      };

      const response = await request(app)
        .post('/api/auth/login')
        .send(credentials)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Username and password are required');
    });

    it('should return 400 when password is missing', async () => {
      const credentials = {
        username: 'loginuser'
      };

      const response = await request(app)
        .post('/api/auth/login')
        .send(credentials)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Username and password are required');
    });

    it('should return 401 for non-existent username', async () => {
      const credentials = {
        username: 'nonexistent',
        password: 'somepassword'
      };

      const response = await request(app)
        .post('/api/auth/login')
        .send(credentials)
        .expect(401);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Invalid credentials');
    });

    it('should return 401 for incorrect password', async () => {
      const credentials = {
        username: 'loginuser',
        password: 'wrongpassword'
      };

      const response = await request(app)
        .post('/api/auth/login')
        .send(credentials)
        .expect(401);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Invalid credentials');
    });

    it('should return a valid JWT token on successful login', async () => {
      const credentials = {
        username: 'loginuser',
        password: 'correctpassword'
      };

      const response = await request(app)
        .post('/api/auth/login')
        .send(credentials)
        .expect(200);

      // JWT tokens have 3 parts separated by dots
      const tokenParts = response.body.token.split('.');
      expect(tokenParts.length).toBe(3);
    });

    it('should return user info without password', async () => {
      const credentials = {
        username: 'loginuser',
        password: 'correctpassword'
      };

      const response = await request(app)
        .post('/api/auth/login')
        .send(credentials)
        .expect(200);

      expect(response.body.user.password).toBeUndefined();
      expect(response.body.user.id).toBeDefined();
      expect(response.body.user.email).toBe('login@example.com');
      expect(response.body.user.role).toBe('user');
    });
  });
});
