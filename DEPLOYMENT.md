# Deployment Guide

This guide walks through deploying the Harper Portfolio Site to production using:
- **Frontend:** Vercel (separate project)
- **Backend:** Vercel (Serverless)
- **Database:** MongoDB Atlas

## Prerequisites

- GitHub repository with your code pushed
- MongoDB Atlas account (free tier available)
- Vercel account (free tier available)

---

## Part 1: Set Up MongoDB Atlas

1. **Create a MongoDB Atlas Account**
   - Go to [https://www.mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
   - Sign up for a free account

2. **Create a New Cluster**
   - Click "Build a Database"
   - Choose "M0 (Free)" tier
   - Select your preferred cloud provider and region
   - Click "Create Cluster"

3. **Create a Database User**
   - Go to "Database Access" in the left sidebar
   - Click "Add New Database User"
   - Choose "Password" authentication
   - Create username and password (save these securely!)
   - Set privileges to "Read and write to any database"
   - Click "Add User"

4. **Configure Network Access**
   - Go to "Network Access" in the left sidebar
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
   - This is required for Vercel serverless functions
   - Click "Confirm"

5. **Get Connection String**
   - Go to "Database" in the left sidebar
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string (looks like: `mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/`)
   - Replace `<password>` with your database user password
   - Add your database name after `.net/` (e.g., `portfoliodb`)
   - Final format: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/portfoliodb`

---

## Part 2: Deploy Backend to Vercel

1. **Push Code to GitHub**
   ```bash
   git add .
   git commit -m "Configure for Vercel deployment"
   git push
   ```

2. **Import Project to Vercel**
   - Go to [https://vercel.com](https://vercel.com)
   - Click "Add New" → "Project"
   - Import your GitHub repository
   - Click "Import"

3. **Configure Project**
   - **Framework Preset:** Other
   - **Root Directory:** `./` (leave as default)
   - **Build Command:** Leave empty (not needed for serverless)
   - **Output Directory:** Leave empty
   - **Install Command:** `npm install` (in server directory)

4. **Set Environment Variables**
   Click "Environment Variables" and add the following:

   | Name | Value | Example |
   |------|-------|---------|
   | `MONGODB_URI` | Your MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/portfoliodb` |
   | `JWT_SECRET` | A random secure string | `your-super-secret-jwt-key-12345` |
   | `JWT_EXPIRES_IN` | Token expiration time | `7d` |
   | `CLIENT_URL` | Your Cloudflare Pages URL | `https://your-site.pages.dev` (add after frontend deployment) |
   | `NODE_ENV` | Environment | `production` |

5. **Deploy**
   - Click "Deploy"
   - Wait for deployment to complete
   - Copy your Vercel URL (e.g., `https://your-project.vercel.app`)

6. **Update CLIENT_URL**
   - After deploying frontend (Part 3), come back here
   - Go to Settings → Environment Variables
   - Update `CLIENT_URL` with your Cloudflare Pages URL
   - Redeploy from Deployments tab

---

## Part 3: Deploy Frontend to Vercel (Separate Project)

1. **Update Production Environment**
   - Edit `client/.env.production`
   - Update `REACT_APP_API_URL` with your Vercel backend URL:
     ```
     REACT_APP_API_URL=https://your-backend-project.vercel.app
     ```
   - Commit and push:
     ```bash
     git add client/.env.production
     git commit -m "Update production API URL"
     git push
     ```

2. **Create New Vercel Project for Frontend**
   - Go to [https://vercel.com](https://vercel.com)
   - Click "Add New" → "Project"
   - Import the **same** GitHub repository
   - Click "Import"

3. **Configure Frontend Project**
   - **Framework Preset:** Create React App (should auto-detect)
   - **Root Directory:** Click "Edit" and enter `client`
   - **Build Command:** `npm run build` (auto-configured)
   - **Output Directory:** `build` (auto-configured)
   - **Install Command:** `npm install --legacy-peer-deps`

4. **Set Environment Variables**
   Click "Environment Variables" and add:
   
   | Variable | Value |
   |----------|-------|
   | `REACT_APP_API_URL` | Your Vercel backend URL (e.g., `https://your-backend.vercel.app`) |

5. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Your site will be live at `https://your-frontend.vercel.app`

6. **Update Backend CLIENT_URL**
   - Go to your **backend** Vercel project
   - Settings → Environment Variables
   - Update `CLIENT_URL` with your frontend Vercel URL
   - Go to Deployments → Click "..." on latest → "Redeploy"

---

## Part 4: Verify Deployment

1. **Test Frontend**
   - Visit your Cloudflare Pages URL
   - Navigate through the site
   - Check that pages load correctly

2. **Test API Connection**
   - Open browser DevTools (F12) → Network tab
   - Navigate to Projects or Blogs page
   - Verify API requests go to your Vercel backend
   - Check for successful 200 responses

3. **Test Admin Login**
   - Go to `/admin-login`
   - Login with: `hcharper` / `HCh10192001$`
   - Verify you can access admin dashboard
   - Test creating/editing projects and blogs

4. **Check Vercel Logs**
   - Go to Vercel dashboard → Your project → Logs
   - Check for any errors
   - Verify database connections are successful

---

## Part 5: Seed Database (Optional)

If you need to populate the database with initial data:

1. **Update MongoDB URI locally**
   - Create `server/.env` file
   - Add: `MONGODB_URI=your-atlas-connection-string`

2. **Run seed script**
   ```bash
   cd server
   node scripts/seedDb.js
   ```

3. **Verify in MongoDB Atlas**
   - Go to your cluster → "Browse Collections"
   - Check that data was inserted

---

## Environment Variables Reference

### Backend (Vercel)
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfoliodb
JWT_SECRET=your-super-secret-jwt-key-12345
JWT_EXPIRES_IN=7d
CLIENT_URL=https://your-site.pages.dev
NODE_ENV=production
```

### Frontend (Vercel - separate project)
```
REACT_APP_API_URL=https://your-backend.vercel.app
```

---

## Troubleshooting

### CORS Errors
- Verify `CLIENT_URL` in Vercel matches your Cloudflare Pages URL exactly
- Check that there's no trailing slash
- Redeploy backend after updating environment variables

### Database Connection Errors
- Verify MongoDB Atlas allows connections from 0.0.0.0/0
- Check that `MONGODB_URI` has correct username and password
- Ensure database name is included in connection string

### 404 on API Requests
- Verify `REACT_APP_API_URL` in Cloudflare Pages is set correctly
- Check browser DevTools → Network tab for actual request URL
- Ensure `vercel.json` is in project root

### Serverless Function Timeout
- Vercel free tier has 10-second timeout for serverless functions
- Optimize database queries if hitting limits
- Consider indexing frequently queried fields in MongoDB

### Build Fails on Cloudflare Pages
- Check build command includes `cd client &&`
- Verify `client/build` directory is correct output location
- Check Cloudflare Pages build logs for specific errors

---

## Updating the Site

### Code Changes
1. Make changes locally and test
2. Commit and push to GitHub
3. Vercel automatically redeploys backend
4. Cloudflare Pages automatically redeploys frontend

### Environment Variable Changes
- **Vercel:** Settings → Environment Variables → Edit → Redeploy
- **Cloudflare Pages:** Workers & Pages → Your project → Settings → Environment variables → Edit → Redeploy

---

## Custom Domain (Optional)

### Cloudflare Pages
1. Go to your project → Custom domains
2. Click "Set up a custom domain"
3. Enter your domain
4. Follow DNS configuration instructions

### Vercel
1. Go to your project → Settings → Domains
2. Add your domain
3. Configure DNS as instructed

---

## Monitoring

- **Vercel Logs:** Dashboard → Your project → Logs (real-time)
- **Cloudflare Analytics:** Pages → Your project → Analytics
- **MongoDB Metrics:** Atlas → Metrics (database performance)

---

## Cost Breakdown

All services used have free tiers that should cover most personal portfolio sites:

- **MongoDB Atlas:** 512MB storage, shared resources (FREE)
- **Vercel:** 100GB bandwidth, unlimited API requests (FREE)
- **Cloudflare Pages:** Unlimited sites, unlimited requests, 500 builds/month (FREE)

---

## Security Best Practices

1. **Never commit `.env` files** - Already in `.gitignore`
2. **Use strong JWT_SECRET** - Generate with: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`
3. **Keep MongoDB Atlas IP restricted** - 0.0.0.0/0 is required for Vercel but monitor access
4. **Regularly update dependencies** - Run `npm audit fix` periodically
5. **Use HTTPS only** - Both Vercel and Cloudflare provide SSL by default

---

## Next Steps

After successful deployment:
- [ ] Set up a custom domain
- [ ] Configure MongoDB backups in Atlas
- [ ] Set up monitoring/alerts
- [ ] Create content (blogs, projects)
- [ ] Test on multiple devices/browsers
- [ ] Share your portfolio! 🚀
