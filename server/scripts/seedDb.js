// requirements
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const connectDB = require('../db/dbconn');
const Blog = require('../models/blog');
const User = require('../models/user');

// Admin user credentials
const adminUser = {
  username: 'hcharper',
  email: 'admin@devportfolio.com',
  password: 'HCh10192001$',
  role: 'admin'
};

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

    // Seed admin user
    await User.deleteMany({});
    console.log('Old users cleared');
    
    const hashedPassword = await bcrypt.hash(adminUser.password, 10);
    const createdAdmin = await User.create({
      ...adminUser,
      password: hashedPassword
    });
    console.log(`Admin user created: ${createdAdmin.username}`);

    // Seed blog posts with admin as author
    await Blog.deleteMany({});
    console.log('Old posts cleared');

    const postsWithUser = seedPosts.map(post => ({
      ...post,
      user: createdAdmin._id
    }));
    const createdPosts = await Blog.create(postsWithUser);
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