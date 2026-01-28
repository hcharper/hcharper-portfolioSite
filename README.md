# Dev Portfolio Site

A modern, responsive developer portfolio built with React, Node.js, MongoDB, and Tailwind CSS. Features project showcase, blog system, admin dashboard, and Web3 capabilities.

## Features

### Core Features
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ JWT-based authentication with bcrypt
- ✅ Admin-only authentication at `/admin-login` (credentials: `hcharper` / `HCh10192001$`)
- ✅ Dynamic project management with local image uploads
- ✅ Blog CRUD system with project linking
- ✅ Featured projects section on homepage
- ✅ Mobile hamburger menu navigation
- ✅ Social media links (GitHub, LinkedIn, Twitter)
- ✅ Contact form

### Project Management
- Add/edit/delete projects with custom images
- Upload project images to `/client/public/projects/`
- Display tech stack (max 6 technologies per project)
- Link to demo, site URL, and GitHub repositories
- Featured/pinned projects system
- Project ordering for custom display

### Blog System
- Full CRUD for blog posts (admin only)
- Project linking within blog posts
- Twitter embed support
- Blog snippet/preview
- Date tracking

### Technology Stack

**Frontend**
- React 19
- React Router 7
- Tailwind CSS 3
- Axios

**Backend**
- Node.js + Express 5
- MongoDB + Mongoose 9
- JWT authentication
- bcrypt password hashing

**Dev Tools**
- Jest & React Testing Library
- Selenium WebDriver (E2E tests)
- npm scripts

## Project Structure

```
.
├── client/                         # React Frontend
│   ├── public/
│   │   ├── index.html
│   │   └── projects/              # Project images (user-uploaded)
│   ├── src/
│   │   ├── api/                   # API client files
│   │   ├── components/
│   │   │   ├── Header.jsx
│   │   │   ├── Navigation.jsx
│   │   │   ├── Layout.jsx          # Responsive layout with sidebar
│   │   │   └── Footer.jsx
│   │   ├── context/               # Auth context
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Projects.jsx
│   │   │   ├── Blogs.jsx
│   │   │   ├── SingleBlog.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Contact.jsx
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── NotFound.jsx
│   │   │   ├── PrivateRoute.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── __tests__/
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
├── server/                        # Express Backend
│   ├── __tests__/                 # Backend tests
│   ├── controllers/               # Route controllers
│   ├── db/                        # Database queries
│   ├── middlewares/               # Auth middleware
│   ├── models/
│   │   ├── user.js
│   │   ├── blog.js
│   │   └── project.js
│   ├── routes/
│   │   ├── authRouter.js
│   │   ├── blogsRouter.js
│   │   ├── usersRouter.js
│   │   └── projectsRouter.js
│   ├── scripts/
│   │   └── seedDb.js              # Database seeding
│   ├── config.js
│   ├── index.js
│   └── package.json
├── e2e/                           # End-to-End tests
│   ├── tests/
│   ├── setup.js
│   └── package.json
└── README.md
```

## Getting Started

### Prerequisites
- Node.js 16+
- MongoDB (local or Atlas)
- npm

### Installation

1. **Clone repository**
```bash
git clone <repo-url>
cd hcharper-portfolioSite
```

2. **Server Setup**
```bash
cd server
npm install
cp example.env .env  # Configure your .env
npm run seed         # Seed database with admin user
npm start            # Starts on port 3001
```

3. **Client Setup**
```bash
cd ../client
npm install
npm run dev          # Starts on port 3000
```

The app will automatically proxy API requests to `http://localhost:3001`.

### Environment Variables

**Server (.env)**
```
MONGODB_URI=mongodb://localhost:27017/portfolio
PORT=3001
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=7d
```

## Admin Dashboard

Access at `/admin-login` with credentials:
- **Username**: `hcharper`
- **Password**: `HCh10192001$`

### Admin Features
- Manage projects (create, edit, delete)
- Manage blog posts
- Upload project images
- Mark projects as featured
- Set project order

### Project Image Management

1. Add images to `/client/public/projects/`
2. In admin dashboard, select image from dropdown when creating/editing projects
3. Images display instantly on frontend

**Supported formats**: JPG, JPEG, PNG, GIF, WebP, SVG

## Features Overview

### Responsive Design

**Mobile (< 640px)**
- Single column layouts
- Hamburger menu navigation
- Full-width content
- Sidebar hidden
- Optimized touch targets

**Tablet (640px - 1024px)**
- 2 column grids for projects
- Improved spacing
- Sidebar still hidden

**Desktop (1024px+)**
- 3 column project grid
- Left sidebar with profile/social links
- Full navigation visible

### Project Cards

- Display project image (from `/client/public/projects/`)
- Project title and description
- Technology badges (max 6)
- Links to demo, site, and GitHub
- GitHub logo overlay (clickable to repo)
- Hover animations

### Authentication

- **Protected Routes**: Require login
- **Private Routes**: Admin-only (e.g., `/admin-dash`)
- **JWT Tokens**: 7-day expiration, stored in localStorage
- **Password Hashing**: bcrypt with salt rounds

### Blog System

- Rich text support
- Project linking
- Twitter embed support
- Blog snippets
- Chronological ordering

## Running Tests

### Backend Tests
```bash
cd server
npm test              # Run all tests
npm run test:watch   # Watch mode
npm run test:verbose # Verbose output
```

### Frontend Tests
```bash
cd client
npm test              # Run component tests
```

### E2E Tests
```bash
cd e2e
npm install
npm test              # Run Selenium tests
```

## Database Schema

### User Model
```javascript
{
  username: String (unique),
  password: String (hashed),
  email: String,
  role: String (admin/user),
  createdAt: Date
}
```

### Project Model
```javascript
{
  title: String,
  description: String,
  technologies: [String] (max 6),
  localImage: String (filename),
  siteUrl: String,
  demoLink: String,
  githubLink: String,
  featured: Boolean,
  order: Number,
  createdAt: Date
}
```

### Blog Model
```javascript
{
  title: String,
  snippet: String,
  body: String,
  linkedProjects: [ObjectId],
  twitterEmbeds: [String],
  author: ObjectId,
  createdAt: Date
}
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout (clears token client-side)

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/featured` - Get featured projects only
- `GET /api/projects/:id` - Get single project
- `POST /api/projects` - Create project (admin)
- `PUT /api/projects/:id` - Update project (admin)
- `DELETE /api/projects/:id` - Delete project (admin)
- `GET /api/projects/images` - List available images

### Blogs
- `GET /api/blogs` - Get all blogs
- `GET /api/blogs/:id` - Get single blog
- `POST /api/blogs` - Create blog (admin)
- `PUT /api/blogs/:id` - Update blog (admin)
- `DELETE /api/blogs/:id` - Delete blog (admin)

### Users
- `GET /api/users/profile` - Get current user profile (protected)
- `PUT /api/users/profile` - Update profile (protected)

## Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for production deployment guide.

## Contributing

1. Create feature branch (`git checkout -b feature/name`)
2. Commit changes (`git commit -am 'Add feature'`)
3. Push branch (`git push origin feature/name`)
4. Open pull request

## License

MIT License - See LICENSE file for details

## Support

For issues or questions, please open an issue on GitHub or contact through the portfolio site.

---

**Portfolio**: [Visit Live Site](#)  
**GitHub**: https://github.com/hcharper  
**Email**: Contact via portfolio site
