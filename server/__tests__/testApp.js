/**
 * Test Application Setup
 * Creates an Express app instance for testing without starting the server
 */

const express = require('express');
const cors = require('cors');

const blogsRouter = require('../routes/blogsRouter');
const usersRouter = require('../routes/userRouter');
const authRouter = require('../routes/authRouter');

const createTestApp = () => {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.use('/api/blogs', blogsRouter);
  app.use('/api/users', usersRouter);
  app.use('/api/auth', authRouter);

  return app;
};

module.exports = createTestApp;
