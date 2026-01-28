// requirements
const mongoose = require('mongoose');
const connectDB = require('../db/dbconn');
const Blog = require('../models/blog');

// sample posts
const seedPosts = [
  {
    title: 'Sample Blog 1',
    snippet: 'sample blog seeded to mongoDB',
    body: 'This is a sample blog body, coming from the seed file.',
  },
  {
    title: 'Sample Blog 2',
    snippet: 'sample blog seeded to mongoDB',
    body: 'This is a sample blog body, coming from the seed file.',
  },
  {
    title: 'Sample Blog 3',
    snippet: 'sample blog seeded to mongoDB',
    body: 'This is a sample blog body, coming from the seed file.',
  },
];

// seeding function
const seedDB = async () => {
  try {
    await connectDB();

    await Blog.deleteMany({});
    console.log('Old posts cleared');

    const createdPosts = await Blog.create(seedPosts);
    console.log(`${createdPosts.length} posts seeded`);

    await mongoose.connection.close();
    console.log('DB connection closed. Done');
    process.exit(0);
  } catch (err) {
    console.error('Seeding failed:', err.message);
    await mongoose.connection.close();
    process.exit(1);
  }
}

// run
seedDB();