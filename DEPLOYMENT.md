# Deployment Guide for EC2 with SSL

## Prerequisites on EC2
- Node.js (v16+) and npm installed
- MongoDB installed and running
- Nginx installed with SSL certificates
- PM2 installed globally: `npm install -g pm2`
- Git installed

## Step 1: Clone/Update Repository on EC2

```bash
# SSH into your EC2 instance
ssh -i your-key.pem ubuntu@your-ec2-ip

# If this is a new deployment, clone the repo
cd ~
git clone <your-repo-url> hcharper-portfolioSite

# If updating from old repo, just navigate to the directory
cd hcharper-portfolioSite
git pull origin main
```

## Step 2: Configure Environment Variables

```bash
# Copy example.env to .env
cd server
cp example.env .env

# Edit the .env file with production values
nano .env
```

Update these values in `.env`:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/portfolio-db
JWT_SECRET=<generate-a-strong-random-secret>
NODE_ENV=production
```

To generate a strong JWT secret:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## Step 3: Run Deployment Script

```bash
cd /home/ubuntu/hcharper-portfolioSite
chmod +x deploy.sh
./deploy.sh
```

This will:
- Install all dependencies (server + client)
- Build the React production bundle
- Seed the database with admin user

## Step 4: Configure Nginx

```bash
# If you already have an nginx config, update it with the new paths
sudo nano /etc/nginx/sites-available/your-site

# Or copy the example config
sudo cp nginx.conf.example /etc/nginx/sites-available/portfolio
```

Update these in your nginx config:
- `server_name` → your actual domain
- `ssl_certificate` paths → your SSL cert paths
- `root` path → `/home/ubuntu/hcharper-portfolioSite/client/build`
- Backend proxy port → should match your server PORT (5000)

```bash
# Test nginx configuration
sudo nginx -t

# Reload nginx
sudo systemctl reload nginx
```

## Step 5: Start the Server with PM2

```bash
cd /home/ubuntu/hcharper-portfolioSite

# Start the server
pm2 start ecosystem.config.js

# Save PM2 process list and configure to start on boot
pm2 save
pm2 startup
```

## Step 6: Verify Deployment

1. Check server is running:
```bash
pm2 status
pm2 logs portfolio-server
```

2. Check MongoDB is running:
```bash
sudo systemctl status mongod
```

3. Test the site:
- Visit your domain in a browser
- Go to `/admin-login`
- Login with: `hcharper` / `HCh10192001$`

## Troubleshooting

### Server won't start
```bash
# Check logs
pm2 logs portfolio-server

# Common issues:
# - MongoDB not running: sudo systemctl start mongod
# - Port already in use: Check .env PORT and kill old process
# - Missing .env file: Copy from example.env
```

### 502 Bad Gateway
- Server not running: `pm2 restart portfolio-server`
- Wrong proxy port in nginx: Check nginx config matches server PORT
- Firewall blocking port: `sudo ufw allow 5000`

### Static files not loading
- Client not built: `cd client && npm run build`
- Wrong nginx root path: Should point to `client/build`
- Nginx not reloaded: `sudo systemctl reload nginx`

### Can't login
- Admin user not seeded: `cd server && node scripts/seedDb.js`
- Wrong JWT_SECRET: Check server .env file
- MongoDB connection issue: Check MONGODB_URI in .env

## Updating the Site

When you make changes:

```bash
cd /home/ubuntu/hcharper-portfolioSite
git pull origin main

# If server code changed:
cd server
npm install
pm2 restart portfolio-server

# If client code changed:
cd ../client
npm install
npm run build
sudo systemctl reload nginx
```

## Admin Credentials
- **Username**: hcharper
- **Password**: HCh10192001$
- **Login URL**: https://your-domain.com/admin-login

## PM2 Commands Cheat Sheet
```bash
pm2 list                    # Show all processes
pm2 logs portfolio-server   # Show logs
pm2 restart portfolio-server # Restart server
pm2 stop portfolio-server   # Stop server
pm2 delete portfolio-server # Remove from PM2
pm2 monit                   # Monitor in real-time
```
