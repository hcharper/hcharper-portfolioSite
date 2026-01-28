# Harrison Harper Portfolio Site - Next.js

A modern portfolio site built with Next.js 16, TypeScript, Tailwind CSS v4, and MongoDB.

## Features

- 🎨 Modern, responsive UI with dark theme
- 📝 Blog posts with rich text content
- 🚀 Project showcase with featured projects
- 🔐 Admin dashboard for content management
- 🔒 JWT authentication
- 📱 Mobile-friendly design

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT with bcrypt

## Getting Started

### Prerequisites

- Node.js 20.x or later
- MongoDB Atlas account (or local MongoDB)

### Environment Variables

Create a `.env.local` file in the root directory:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
src/
├── app/                  # Next.js App Router pages
│   ├── api/              # API routes
│   │   ├── auth/         # Authentication endpoints
│   │   ├── blogs/        # Blog CRUD endpoints
│   │   └── projects/     # Project CRUD endpoints
│   ├── about/            # About page
│   ├── admin/            # Admin dashboard
│   ├── admin-login/      # Admin login page
│   ├── blogs/            # Blog listing & single blog pages
│   ├── contact/          # Contact page
│   └── projects/         # Projects page
├── components/           # Reusable components
│   ├── Header.tsx
│   ├── Navigation.tsx
│   └── Sidebar.tsx
├── context/              # React contexts
│   └── AuthProvider.tsx
└── lib/                  # Utilities and models
    ├── db.ts             # MongoDB connection
    └── models/           # Mongoose models
        ├── user.ts
        ├── blog.ts
        └── project.ts
```

## Deploy on Vercel

1. Push your code to GitHub
2. Import the repository in Vercel
3. Set the **Root Directory** to `nextjs-app`
4. Add environment variables in Vercel dashboard:
   - `MONGODB_URI`
   - `JWT_SECRET`
5. Deploy!

The app will automatically deploy on every push to the main branch.

## API Endpoints

### Public

- `GET /api/blogs` - Get all blogs
- `GET /api/blogs/:id` - Get single blog
- `GET /api/projects` - Get all projects
- `GET /api/projects/featured` - Get featured projects
- `GET /api/health` - Health check

### Authentication

- `POST /api/auth/login` - Login with username/password
