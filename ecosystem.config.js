// PM2 Configuration File
// Use this to manage your Node.js server process
// Start: pm2 start ecosystem.config.js
// Monitor: pm2 monit
// Logs: pm2 logs portfolio-server
// Restart: pm2 restart portfolio-server

module.exports = {
  apps: [{
    name: 'portfolio-server',
    script: './server/index.js',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 5000
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_file: './logs/combined.log',
    time: true
  }]
};
