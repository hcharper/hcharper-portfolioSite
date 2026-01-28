/**
 * Login Component Tests
 * Tests for the Login page component
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '../../context/AuthProvider';
import Login from '../../pages/Login';

// Mock the auth API
jest.mock('../../api/auth', () => ({
  login: jest.fn(),
  register: jest.fn(),
}));

const { login: mockLoginAPI } = require('../../api/auth');

// Wrapper component with all providers
const AllProviders = ({ children }) => (
  <AuthProvider>
    <MemoryRouter initialEntries={['/login']}>
      {children}
    </MemoryRouter>
  </AuthProvider>
);

const renderLogin = () => {
  return render(<Login />, { wrapper: AllProviders });
};

describe('Login Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it('should render login form correctly', () => {
    renderLogin();

    expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
    expect(screen.getByText(/don't have an account/i)).toBeInTheDocument();
  });

  it('should update input values on change', async () => {
    const user = userEvent.setup();
    renderLogin();

    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);

    await user.type(usernameInput, 'testuser');
    await user.type(passwordInput, 'testpassword');

    expect(usernameInput).toHaveValue('testuser');
    expect(passwordInput).toHaveValue('testpassword');
  });

  it('should show loading state during submission', async () => {
    const user = userEvent.setup();
    mockLoginAPI.mockImplementation(() => new Promise(resolve => setTimeout(() => resolve({ success: true, token: 'test-token', user: { id: '1', username: 'test' } }), 100)));

    renderLogin();

    await user.type(screen.getByLabelText(/username/i), 'testuser');
    await user.type(screen.getByLabelText(/password/i), 'testpassword');
    
    const loginButton = screen.getByRole('button', { name: /login/i });
    await user.click(loginButton);

    expect(screen.getByRole('button', { name: /logging in/i })).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('should display error message on login failure', async () => {
    const user = userEvent.setup();
    mockLoginAPI.mockResolvedValue({
      success: false,
      message: 'Invalid credentials'
    });

    renderLogin();

    await user.type(screen.getByLabelText(/username/i), 'wronguser');
    await user.type(screen.getByLabelText(/password/i), 'wrongpassword');
    await user.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument();
    });
  });

  it('should display generic error message when no message provided', async () => {
    const user = userEvent.setup();
    mockLoginAPI.mockResolvedValue({
      success: false
    });

    renderLogin();

    await user.type(screen.getByLabelText(/username/i), 'testuser');
    await user.type(screen.getByLabelText(/password/i), 'testpassword');
    await user.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(screen.getByText(/login failed. please try again/i)).toBeInTheDocument();
    });
  });

  it('should clear error when user types', async () => {
    const user = userEvent.setup();
    mockLoginAPI.mockResolvedValue({
      success: false,
      message: 'Invalid credentials'
    });

    renderLogin();

    // First, trigger an error
    await user.type(screen.getByLabelText(/username/i), 'wronguser');
    await user.type(screen.getByLabelText(/password/i), 'wrongpassword');
    await user.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument();
    });

    // Now type again to clear the error
    await user.type(screen.getByLabelText(/username/i), 'a');

    await waitFor(() => {
      expect(screen.queryByText(/invalid credentials/i)).not.toBeInTheDocument();
    });
  });

  it('should have required fields', () => {
    renderLogin();

    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);

    expect(usernameInput).toBeRequired();
    expect(passwordInput).toBeRequired();
  });

  it('should have link to sign up page', () => {
    renderLogin();

    const signUpLink = screen.getByRole('link', { name: /sign up/i });
    expect(signUpLink).toHaveAttribute('href', '/create-account');
  });
});
