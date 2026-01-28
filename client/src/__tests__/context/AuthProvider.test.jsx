/**
 * AuthProvider Context Tests
 * Tests for the Authentication context provider
 */

import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AuthProvider, useAuth } from '../../context/AuthProvider';

// Mock the auth API
jest.mock('../../api/auth', () => ({
  login: jest.fn(),
  register: jest.fn(),
}));

import { login as mockLoginAPI, register as mockRegisterAPI } from '../../api/auth';

// Test component to access auth context
const TestComponent = () => {
  const { user, token, isLoggedIn, isAdmin, loading, login, logout, register } = useAuth();

  return (
    <div>
      <span data-testid="loading">{loading ? 'loading' : 'loaded'}</span>
      <span data-testid="isLoggedIn">{isLoggedIn ? 'yes' : 'no'}</span>
      <span data-testid="isAdmin">{isAdmin ? 'yes' : 'no'}</span>
      <span data-testid="username">{user?.username || 'no-user'}</span>
      <span data-testid="token">{token || 'no-token'}</span>
      <button onClick={() => login({ username: 'test', password: 'test' })} data-testid="login-btn">
        Login
      </button>
      <button onClick={logout} data-testid="logout-btn">
        Logout
      </button>
      <button onClick={() => register({ username: 'new', email: 'new@test.com', password: 'test' })} data-testid="register-btn">
        Register
      </button>
    </div>
  );
};

describe('AuthProvider', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it('should start with loading state', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    // Initially should show loaded after useEffect runs
    expect(screen.getByTestId('isLoggedIn')).toHaveTextContent('no');
  });

  it('should restore auth state from localStorage', async () => {
    localStorage.setItem('token', 'stored-token');
    localStorage.setItem('user', JSON.stringify({ id: '1', username: 'storeduser', role: 'user' }));

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('isLoggedIn')).toHaveTextContent('yes');
      expect(screen.getByTestId('username')).toHaveTextContent('storeduser');
      expect(screen.getByTestId('token')).toHaveTextContent('stored-token');
    });
  });

  it('should login successfully', async () => {
    const user = userEvent.setup();
    mockLoginAPI.mockResolvedValue({
      success: true,
      token: 'new-token',
      user: { id: '1', username: 'loginuser', role: 'user' }
    });

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await user.click(screen.getByTestId('login-btn'));

    await waitFor(() => {
      expect(screen.getByTestId('isLoggedIn')).toHaveTextContent('yes');
      expect(screen.getByTestId('username')).toHaveTextContent('loginuser');
    });

    expect(localStorage.getItem('token')).toBe('new-token');
  });

  it('should handle login failure', async () => {
    const user = userEvent.setup();
    mockLoginAPI.mockResolvedValue({
      success: false,
      message: 'Invalid credentials'
    });

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await user.click(screen.getByTestId('login-btn'));

    await waitFor(() => {
      expect(screen.getByTestId('isLoggedIn')).toHaveTextContent('no');
    });
  });

  it('should logout successfully', async () => {
    const user = userEvent.setup();
    localStorage.setItem('token', 'stored-token');
    localStorage.setItem('user', JSON.stringify({ id: '1', username: 'logoutuser', role: 'user' }));

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('isLoggedIn')).toHaveTextContent('yes');
    });

    await user.click(screen.getByTestId('logout-btn'));

    await waitFor(() => {
      expect(screen.getByTestId('isLoggedIn')).toHaveTextContent('no');
      expect(screen.getByTestId('username')).toHaveTextContent('no-user');
    });

    expect(localStorage.getItem('token')).toBeNull();
    expect(localStorage.getItem('user')).toBeNull();
  });

  it('should register successfully', async () => {
    const user = userEvent.setup();
    mockRegisterAPI.mockResolvedValue({
      success: true,
      token: 'register-token',
      user: { id: '2', username: 'newuser', role: 'user' }
    });

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await user.click(screen.getByTestId('register-btn'));

    await waitFor(() => {
      expect(screen.getByTestId('isLoggedIn')).toHaveTextContent('yes');
      expect(screen.getByTestId('username')).toHaveTextContent('newuser');
    });
  });

  it('should handle registration failure', async () => {
    const user = userEvent.setup();
    mockRegisterAPI.mockResolvedValue({
      success: false,
      message: 'Email already exists'
    });

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await user.click(screen.getByTestId('register-btn'));

    await waitFor(() => {
      expect(screen.getByTestId('isLoggedIn')).toHaveTextContent('no');
    });
  });

  it('should correctly identify admin users', async () => {
    localStorage.setItem('token', 'admin-token');
    localStorage.setItem('user', JSON.stringify({ id: '1', username: 'admin', role: 'admin' }));

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('isAdmin')).toHaveTextContent('yes');
    });
  });

  it('should correctly identify non-admin users', async () => {
    localStorage.setItem('token', 'user-token');
    localStorage.setItem('user', JSON.stringify({ id: '1', username: 'user', role: 'user' }));

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('isAdmin')).toHaveTextContent('no');
    });
  });

  it('should handle API errors during login', async () => {
    const user = userEvent.setup();
    mockLoginAPI.mockRejectedValue(new Error('Network error'));

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await user.click(screen.getByTestId('login-btn'));

    await waitFor(() => {
      expect(screen.getByTestId('isLoggedIn')).toHaveTextContent('no');
    });
  });
});
