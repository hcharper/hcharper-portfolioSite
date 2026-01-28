const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const connectDB = require('./db/dbconn');
const { PORT } = require('./config');

const blogsRouter = require('./routes/blogsRouter');
const usersRouter = require('./routes/userRouter');
const authRouter = require('./routes/authRouter');
const projectsRouter = require('./routes/projectsRouter');

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.use('/api/blogs', blogsRouter);
app.use('/api/users', usersRouter);
app.use('/api/auth', authRouter);
app.use('/api/projects', projectsRouter);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../client/build')));

// Handle React routing - fallback for all non-API requests
app.use((req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

const start = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error('Failed to start server', err.message);
    process.exit(1);
  }
};

// Only start server if not in serverless environment
if (process.env.VERCEL !== '1') {
  start();
}

// Export for Vercel serverless
module.exports = app;
