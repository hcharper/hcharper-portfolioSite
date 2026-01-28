/**
 * Auth Middleware Unit Tests
 * Tests JWT authentication and authorization middleware
 */

const jwt = require('jsonwebtoken');
const { authenticateToken, isAdmin } = require('../../middlewares/auth-middleware');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

describe('Auth Middleware', () => {
  let mockReq;
  let mockRes;
  let mockNext;

  beforeEach(() => {
    mockReq = {
      headers: {}
    };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    mockNext = jest.fn();
  });

  describe('authenticateToken', () => {
    it('should call next() with valid token', (done) => {
      const token = jwt.sign(
        { userId: '123', username: 'testuser', role: 'user' },
        JWT_SECRET,
        { expiresIn: '7d' }
      );
      mockReq.headers['authorization'] = `Bearer ${token}`;

      mockNext = jest.fn(() => {
        expect(mockReq.user).toBeDefined();
        expect(mockReq.user.username).toBe('testuser');
        done();
      });

      authenticateToken(mockReq, mockRes, mockNext);
    });

    it('should return 401 when no token provided', () => {
      authenticateToken(mockReq, mockRes, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(401);
      expect(mockRes.json).toHaveBeenCalledWith({
        success: false,
        message: 'Access token required'
      });
      expect(mockNext).not.toHaveBeenCalled();
    });

    it('should return 401 when Authorization header is empty', () => {
      mockReq.headers['authorization'] = '';

      authenticateToken(mockReq, mockRes, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(401);
      expect(mockNext).not.toHaveBeenCalled();
    });

    it('should return 403 for invalid token', (done) => {
      mockReq.headers['authorization'] = 'Bearer invalid-token';

      mockRes.status = jest.fn().mockReturnThis();
      mockRes.json = jest.fn(() => {
        expect(mockRes.status).toHaveBeenCalledWith(403);
        expect(mockRes.json).toHaveBeenCalledWith({
          success: false,
          message: 'Invalid or expired token'
        });
        done();
      });

      authenticateToken(mockReq, mockRes, mockNext);
    });

    it('should return 403 for expired token', (done) => {
      const expiredToken = jwt.sign(
        { userId: '123', username: 'testuser' },
        JWT_SECRET,
        { expiresIn: '-1s' } // Already expired
      );
      mockReq.headers['authorization'] = `Bearer ${expiredToken}`;

      mockRes.status = jest.fn().mockReturnThis();
      mockRes.json = jest.fn(() => {
        expect(mockRes.status).toHaveBeenCalledWith(403);
        done();
      });

      authenticateToken(mockReq, mockRes, mockNext);
    });
  });

  describe('isAdmin', () => {
    it('should call next() for admin user', () => {
      mockReq.user = {
        userId: '123',
        username: 'admin',
        role: 'admin'
      };

      isAdmin(mockReq, mockRes, mockNext);

      expect(mockNext).toHaveBeenCalled();
    });

    it('should return 401 when user is not authenticated', () => {
      mockReq.user = null;

      isAdmin(mockReq, mockRes, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(401);
      expect(mockRes.json).toHaveBeenCalledWith({
        success: false,
        message: 'Authentication required'
      });
      expect(mockNext).not.toHaveBeenCalled();
    });

    it('should return 403 for non-admin user', () => {
      mockReq.user = {
        userId: '123',
        username: 'regularuser',
        role: 'user'
      };

      isAdmin(mockReq, mockRes, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(403);
      expect(mockRes.json).toHaveBeenCalledWith({
        success: false,
        message: 'Admin access required'
      });
      expect(mockNext).not.toHaveBeenCalled();
    });

    it('should return 403 for user without role', () => {
      mockReq.user = {
        userId: '123',
        username: 'noroleuser'
      };

      isAdmin(mockReq, mockRes, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(403);
      expect(mockNext).not.toHaveBeenCalled();
    });
  });
});
