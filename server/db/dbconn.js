const mongoose = require('mongoose');
const { MONGODB_URI } = require('../config');

// Connection options for serverless environments
const options = {
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  maxPoolSize: 10,
  minPoolSize: 1,
  maxIdleTimeMS: 10000,
};

const connectDB = async () => {
  try {
    // Check if already connected
    if (mongoose.connection.readyState === 1) {
      console.log('MongoDB already connected');
      return mongoose.connection;
    }

    console.log('Attempting MongoDB connection...');
    await mongoose.connect(MONGODB_URI, options);
    console.log('MongoDB connected successfully');
    return mongoose.connection;
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    console.error('Connection string prefix:', MONGODB_URI?.substring(0, 20));
    throw err;
  }
};

module.exports = connectDB;
