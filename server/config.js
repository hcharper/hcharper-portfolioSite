const fs = require('fs');
const path = require('path');

// Prefer a repo-root .env (one level up), fall back to local m5-blogSite/.env
const rootEnv = path.resolve(__dirname, '..', '.env');
const localEnv = path.resolve(__dirname, '.env');
let envPath;
if (fs.existsSync(rootEnv)) envPath = rootEnv;
else if (fs.existsSync(localEnv)) envPath = localEnv;

if (envPath) {
  require('dotenv').config({ path: envPath });
}

// Log for debugging (hide password in production logs)
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/blogapp';
if (process.env.VERCEL === '1') {
  const maskedUri = mongoUri.replace(/\/\/([^:]+):([^@]+)@/, '//$1:****@');
  console.log('MongoDB URI configured:', maskedUri ? 'YES' : 'NO');
  console.log('URI format check:', maskedUri.substring(0, 20));
}

module.exports = {
  MONGODB_URI: mongoUri,
  PORT: process.env.PORT || 3001,
  JWT_SECRET: process.env.JWT_SECRET || 'fallback-secret-key-change-in-production',
};
