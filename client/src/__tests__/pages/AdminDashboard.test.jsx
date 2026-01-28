/**
 * AdminDashboard Component Tests
 * Tests for the Admin Dashboard page
 */

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import AdminDashboard from '../../pages/AdminDashboard';

// Mock the APIs
jest.mock('../../api/blogs', () => ({
  getAllBlogs: jest.fn(),
}));

jest.mock('../../api/users', () => ({
  getAllUsers: jest.fn(),
}));

jest.mock('../../api/auth', () => ({
  login: jest.fn(),
  register: jest.fn(),
}));

// Mock the AuthProvider context
jest.mock('../../context/AuthProvider', () => ({
  ...jest.requireActual('../../context/AuthProvider'),
  useAuth: () => ({
    token: 'mock-admin-token',
    user: { id: '1', username: 'admin', role: 'admin' },
    isAdmin: true,
    isLoggedIn: true,
  }),
  AuthProvider: ({ children }) => <>{children}</>,
}));

const { getAllBlogs } = require('../../api/blogs');
const { getAllUsers } = require('../../api/users');

const mockBlogs = [
  { _id: '1', title: 'Test Blog Post 1', createdAt: '2025-01-01T00:00:00.000Z' },
  { _id: '2', title: 'Test Blog Post 2', createdAt: '2025-01-02T00:00:00.000Z' },
  { _id: '3', title: 'Test Blog Post 3', createdAt: '2025-01-03T00:00:00.000Z' },
];

const mockUsers = [
  { _id: '1', username: 'testuser', email: 'test@example.com', role: 'user' },
  { _id: '2', username: 'adminuser', email: 'admin@example.com', role: 'admin' },
];

const renderAdminDashboard = () => {
  return render(
    <MemoryRouter initialEntries={['/admin-dash']}>
      <AdminDashboard />
    </MemoryRouter>
  );
};

describe('AdminDashboard Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    getAllBlogs.mockResolvedValue(mockBlogs);
    getAllUsers.mockResolvedValue(mockUsers);
  });

  it('should render dashboard heading', async () => {
    renderAdminDashboard();

    expect(screen.getByRole('heading', { name: /admin dashboard/i })).toBeInTheDocument();
  });

  it('should display tab navigation', async () => {
    renderAdminDashboard();

    expect(screen.getByRole('button', { name: /blog management/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /user management/i })).toBeInTheDocument();
  });

  it('should show blogs tab by default', async () => {
    renderAdminDashboard();

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /manage blogs/i })).toBeInTheDocument();
    });
  });

  it('should display blogs in the table', async () => {
    renderAdminDashboard();

    await waitFor(() => {
      expect(screen.getByText('Test Blog Post 1')).toBeInTheDocument();
      expect(screen.getByText('Test Blog Post 2')).toBeInTheDocument();
      expect(screen.getByText('Test Blog Post 3')).toBeInTheDocument();
    });
  });

  it('should switch to users tab when clicked', async () => {
    const user = userEvent.setup();
    renderAdminDashboard();

    await user.click(screen.getByRole('button', { name: /user management/i }));

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /manage users/i })).toBeInTheDocument();
    });
  });

  it('should display users in the table', async () => {
    const user = userEvent.setup();
    renderAdminDashboard();

    await user.click(screen.getByRole('button', { name: /user management/i }));

    await waitFor(() => {
      expect(screen.getByText('testuser')).toBeInTheDocument();
      expect(screen.getByText('adminuser')).toBeInTheDocument();
    });
  });

  it('should display user roles', async () => {
    const user = userEvent.setup();
    renderAdminDashboard();

    await user.click(screen.getByRole('button', { name: /user management/i }));

    await waitFor(() => {
      expect(screen.getByText('user')).toBeInTheDocument();
      expect(screen.getByText('admin')).toBeInTheDocument();
    });
  });

  it('should have Create New Blog button', async () => {
    renderAdminDashboard();

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /create new blog/i })).toBeInTheDocument();
    });
  });

  it('should have Add New User button in users tab', async () => {
    const user = userEvent.setup();
    renderAdminDashboard();

    await user.click(screen.getByRole('button', { name: /user management/i }));

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /add new user/i })).toBeInTheDocument();
    });
  });

  it('should display Edit and Delete actions for blogs', async () => {
    renderAdminDashboard();

    await waitFor(() => {
      const editButtons = screen.getAllByRole('button', { name: /edit/i });
      const deleteButtons = screen.getAllByRole('button', { name: /delete/i });
      
      expect(editButtons.length).toBeGreaterThan(0);
      expect(deleteButtons.length).toBeGreaterThan(0);
    });
  });

  it('should show "No blogs found" when blogs array is empty', async () => {
    getAllBlogs.mockResolvedValue([]);
    renderAdminDashboard();

    await waitFor(() => {
      expect(screen.getByText(/no blogs found/i)).toBeInTheDocument();
    });
  });

  it('should show "No users found" when users array is empty', async () => {
    const user = userEvent.setup();
    getAllUsers.mockResolvedValue([]);
    
    renderAdminDashboard();

    await user.click(screen.getByRole('button', { name: /user management/i }));

    await waitFor(() => {
      expect(screen.getByText(/no users found/i)).toBeInTheDocument();
    });
  });

  it('should display user emails', async () => {
    const user = userEvent.setup();
    renderAdminDashboard();

    await user.click(screen.getByRole('button', { name: /user management/i }));

    await waitFor(() => {
      expect(screen.getByText('test@example.com')).toBeInTheDocument();
      expect(screen.getByText('admin@example.com')).toBeInTheDocument();
    });
  });
});
