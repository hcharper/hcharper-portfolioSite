# Module 9: Authentication Implementation with Comprehensive Testing

This module implements JWT-based authentication with role-based access control (RBAC) for the blog application, along with a complete testing suite including unit tests, integration tests, and end-to-end tests.

## Features Implemented

### Backend
- ✅ JWT authentication with bcrypt password hashing
- ✅ User registration with input validation
- ✅ User login with credential verification
- ✅ Auth middleware for protected routes
- ✅ Role-based access control (admin/user)
- ✅ Updated user model with username, password, and role fields

### Frontend
- ✅ Login page (/login)
- ✅ Sign up page (/create-account)
- ✅ Profile page (/profile) - Protected route
- ✅ Admin dashboard protection with PrivateRoute
- ✅ AuthProvider context for global auth state
- ✅ Dynamic navigation (shows login/signup when logged out, profile when logged in)
- ✅ Token management with localStorage
- ✅ Protected and Private route components

### Testing Suite
- ✅ Backend unit tests using Jest and Supertest
- ✅ React component tests using Jest and React Testing Library
- ✅ End-to-end tests using Selenium WebDriver
- ✅ High test coverage for critical functionality

---

## Testing Guide

### Overview

This project includes three types of tests:

1. **Backend Unit Tests** - Test API routes, controllers, and middleware
2. **Frontend Component Tests** - Test React components and context
3. **End-to-End Tests** - Test complete user flows using Selenium

### Backend Tests

Located in `server/__tests__/`

#### Structure
```
server/__tests__/
├── setup.js                      # Test configuration with in-memory MongoDB
├── testApp.js                    # Express app for testing
├── routes/
│   ├── auth.test.js              # Authentication route tests
│   ├── blogs.test.js             # Blog CRUD route tests
│   └── users.test.js             # User management route tests
└── middlewares/
    └── auth-middleware.test.js   # JWT middleware tests
```

#### Running Backend Tests

```bash
cd server

# Install dependencies
npm install

# Run tests with coverage
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with verbose output
npm run test:verbose
```

#### Backend Test Coverage

The tests cover:
- **Authentication Routes**
  - User registration (success, validation errors, duplicates)
  - User login (success, invalid credentials)
  - Password hashing verification
  - JWT token generation

- **Blog Routes**
  - Create, Read, Update, Delete operations
  - Error handling for non-existent resources
  - Input validation

- **User Routes**
  - Protected route access
  - Admin-only operations
  - Token authentication

- **Auth Middleware**
  - Token validation
  - Role-based access control
  - Error responses

### Frontend Tests

Located in `client/src/__tests__/`

#### Structure
```
client/src/__tests__/
├── testUtils.js                    # Test utilities and helpers
├── components/
│   ├── Header.test.jsx             # Header component tests
│   └── Navigation.test.jsx         # Navigation component tests
├── context/
│   └── AuthProvider.test.jsx       # Auth context tests
└── pages/
    ├── Login.test.jsx              # Login page tests
    ├── Blogs.test.jsx              # Blogs page tests
    └── AdminDashboard.test.jsx     # Admin dashboard tests
```

#### Running Frontend Tests

```bash
cd client

# Install dependencies
npm install

# Run tests in watch mode
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in CI mode
npm run test:ci
```

#### Frontend Test Coverage

The tests cover:
- **Login Component**
  - Form rendering
  - Input handling
  - Form submission
  - Error display
  - Navigation after login

- **Blogs Component**
  - Loading state
  - Blog list rendering
  - Empty state handling
  - Error handling

- **AdminDashboard Component**
  - Tab navigation
  - Blog management table
  - User management table
  - Action buttons

- **Navigation Component**
  - Link rendering
  - Active route highlighting
  - Auth state-based display

- **AuthProvider Context**
  - Login/logout functionality
  - Registration
  - Token management
  - Role-based state

### End-to-End Tests

Located in `e2e/`

#### Structure
```
e2e/
├── package.json                    # E2E test dependencies
├── setup.js                        # Selenium configuration
└── tests/
    ├── navigation.e2e.test.js      # Navigation flow tests
    ├── auth.e2e.test.js            # Authentication flow tests
    ├── blogs.e2e.test.js           # Blog viewing tests
    └── admin.e2e.test.js           # Admin dashboard tests
```

#### Prerequisites for E2E Tests

1. **Chrome Browser** - Required for Selenium WebDriver
2. **ChromeDriver** - Automatically installed via npm
3. **Running Application** - Both server and client must be running

#### Running E2E Tests

```bash
cd e2e

# Install dependencies
npm install

# Start the application first (in separate terminals)
# Terminal 1: cd ../server && npm start
# Terminal 2: cd ../client && npm start

# Run E2E tests
npm test

# Run E2E tests in headless mode
npm run test:headless

# Run with verbose output
npm run test:verbose
```

#### E2E Test Coverage

The tests cover:
- **Navigation**
  - Home page loading
  - Navigation between pages
  - Link functionality
  - 404 page handling

- **Authentication**
  - Login form display
  - Form input handling
  - Error message display
  - Sign up navigation

- **Blogs**
  - Blog list display
  - Blog card rendering
  - Read More navigation
  - Loading states

- **Admin Dashboard**
  - Access control for unauthenticated users
  - Access control for non-admin users
  - Tab navigation
  - Action buttons

---

## Test Commands Summary

### Backend (server/)
| Command | Description |
|---------|-------------|
| `npm test` | Run all tests with coverage |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:verbose` | Run tests with detailed output |

### Frontend (client/)
| Command | Description |
|---------|-------------|
| `npm test` | Run tests in watch mode |
| `npm run test:coverage` | Run tests with coverage report |
| `npm run test:ci` | Run tests in CI mode |

### E2E (e2e/)
| Command | Description |
|---------|-------------|
| `npm test` | Run all E2E tests |
| `npm run test:headless` | Run in headless Chrome |
| `npm run test:verbose` | Run with verbose output |

---

## Mocking Strategy

### Backend Tests
- Uses `mongodb-memory-server` for an isolated in-memory MongoDB instance
- No mocking of database calls - tests actual Mongoose operations
- Tests run in isolation with database cleanup between tests

### Frontend Tests
- Uses `jest.mock()` for API calls
- Uses custom render helpers with providers
- Mocks localStorage and navigation

### E2E Tests
- Tests against actual running application
- Uses localStorage manipulation for auth state
- Takes screenshots on failure (stored in `e2e/screenshots/`)

---

## Installation

### Install All Dependencies
From the server directory, run:
```bash
npm run install:all
```

This will install dependencies for both the server and client.

### Environment Variables
Create a `.env` file in the server directory:
```
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key_change_this_in_production
```

## Running the Application

### Start the Server
```bash
cd server
npm start
```
Server will run on http://localhost:3001

### Start the Client
```bash
cd client
npm start
```
Client will run on http://localhost:3000

## API Endpoints

### Authentication Routes
- `POST /api/auth/create-account` - Register a new user
  - Body: `{ username, email, password, role? }`
  - Returns: JWT token and user data

- `POST /api/auth/login` - Login user
  - Body: `{ username, password }`
  - Returns: JWT token and user data

### User Routes (Protected)
- `GET /api/users` - Get all users (requires authentication)
- `GET /api/users/:id` - Get user by ID (requires authentication)
- `PUT /api/users/:id` - Update user (requires authentication)
- `DELETE /api/users/:id` - Delete user (requires authentication)

## User Roles

### Regular User
- Can access: Home, Projects, Blogs, About, Contact, Profile
- Cannot access: Admin Dashboard

### Admin User
- Can access: All pages including Admin Dashboard
- Can manage all users and blog posts

## Creating an Admin User

To create an admin user, register with the `role` field set to `admin`:

```bash
POST /api/auth/create-account
{
  "username": "admin",
  "email": "admin@example.com",
  "password": "admin123",
  "role": "admin"
}
```

Or register normally and manually update the user role in MongoDB.

## Security Features

- Passwords are hashed using bcrypt with 10 salt rounds
- JWT tokens expire after 7 days
- Input validation using the validator package
- Email format validation
- Password strength requirements (minimum 6 characters)
- Protected routes require valid JWT token
- Admin-only routes check user role

## Authentication Flow

### Registration
1. User fills out sign-up form
2. Frontend validates password match and length
3. Backend validates email format and checks for existing users
4. Password is hashed with bcrypt
5. User is created in database
6. JWT token is generated and returned
7. Token and user data stored in localStorage
8. User redirected to profile page

### Login
1. User enters username and password
2. Backend verifies credentials
3. JWT token is generated if credentials are valid
4. Token and user data stored in localStorage
5. User redirected to profile page

### Protected Routes
1. Component checks if user is logged in via AuthProvider
2. If not logged in, redirects to login page
3. If logged in, renders the protected component

### Private Routes (Admin Only)
1. Component checks if user is logged in and is admin
2. If not logged in, redirects to login page
3. If not admin, redirects to 404 page
4. If admin, renders the component

## Testing Authentication

### Test Regular User
1. Go to http://localhost:3001/create-account
2. Create a new account (will have 'user' role by default)
3. After registration, you'll be logged in automatically
4. Try accessing /profile (should work)
5. Try accessing /admin-dash (should redirect to 404)

### Test Admin User
1. Create an admin user via API or database
2. Login with admin credentials
3. Access /admin-dash (should work)
4. See admin-specific features in profile page

## Logout
- Click the "Logout" button in the profile page
- Clears token and user data from localStorage
- Redirects to login page
- Navigation updates to show login/signup links

## Styling
All authentication pages follow the existing design system:
- Dark navy background (#0A1929)
- Teal accent colors (#1FB2A6)
- Modern card styling with blur effects
- Consistent animations and transitions
- Responsive design

## Notes
- JWT_SECRET should be changed in production
- Default token expiry is 7 days
- Minimum password length is 6 characters
- Users are automatically logged in after registration
- Navigation dynamically updates based on auth state
---

## Tips for Success

1. **Write Comprehensive Tests**: The suite includes unit tests for individual functions/components, integration tests for data flow, and end-to-end tests for critical user workflows.

2. **Test Edge Cases**: Tests cover edge cases like invalid input, empty fields, and authentication failures.

3. **Use Mocking for API Calls**: Frontend tests use `jest.mock()` to mock API responses and avoid real API requests during testing.

4. **Run Tests Regularly**: Use `npm test` frequently during development. Use `--coverage` flag to ensure comprehensive test coverage.

---

## Project Structure

```
module-9/
├── client/                         # React Frontend
│   ├── src/
│   │   ├── __tests__/              # Frontend tests
│   │   │   ├── components/         # Component tests
│   │   │   ├── context/            # Context tests
│   │   │   ├── pages/              # Page tests
│   │   │   └── testUtils.js        # Test utilities
│   │   ├── api/                    # API functions
│   │   ├── components/             # React components
│   │   ├── context/                # Context providers
│   │   └── pages/                  # Page components
│   └── package.json
├── server/                         # Express Backend
│   ├── __tests__/                  # Backend tests
│   │   ├── routes/                 # Route tests
│   │   ├── middlewares/            # Middleware tests
│   │   ├── setup.js                # Test setup
│   │   └── testApp.js              # Test app
│   ├── controllers/                # Route controllers
│   ├── db/                         # Database queries
│   ├── middlewares/                # Auth middleware
│   ├── models/                     # Mongoose models
│   ├── routes/                     # Express routes
│   └── package.json
├── e2e/                            # End-to-End tests
│   ├── tests/                      # Selenium tests
│   ├── setup.js                    # E2E setup
│   └── package.json
└── README.md
```