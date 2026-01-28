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

module.exports = {
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/blogapp',
  PORT: process.env.PORT || 3001,
  JWT_SECRET: process.env.JWT_SECRET || 'fallback-secret-key-change-in-production',
};
