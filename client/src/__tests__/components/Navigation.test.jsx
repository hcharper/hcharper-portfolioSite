/**
 * Navigation Component Tests
 * Tests for the Navigation component
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '../../context/AuthProvider';
import Navigation from '../../components/Navigation';

// Mock the auth API
jest.mock('../../api/auth', () => ({
  login: jest.fn(),
  register: jest.fn(),
}));

// Helper to render with MemoryRouter for route testing
const renderNavigation = (initialRoute = '/') => {
  return render(
    <AuthProvider>
      <MemoryRouter initialEntries={[initialRoute]}>
        <Navigation />
      </MemoryRouter>
    </AuthProvider>
  );
};

describe('Navigation Component', () => {
  beforeEach(() => {
    localStorage.clear();
    // Reset mockLocation to default
    global.mockLocation.pathname = '/';
  });

  it('should render all main navigation links', () => {
    renderNavigation();

    expect(screen.getByText(/'home'/i)).toBeInTheDocument();
    expect(screen.getByText(/'projects'/i)).toBeInTheDocument();
    expect(screen.getByText(/'blogs'/i)).toBeInTheDocument();
    expect(screen.getByText(/'about'/i)).toBeInTheDocument();
    expect(screen.getByText(/'contact'/i)).toBeInTheDocument();
  });

  it('should show Login link when not authenticated', () => {
    renderNavigation();

    expect(screen.getByText(/'login'/i)).toBeInTheDocument();
    expect(screen.queryByText(/'profile'/i)).not.toBeInTheDocument();
  });

  it('should show Profile link when authenticated', () => {
    // Set up localStorage to simulate logged in state
    localStorage.setItem('token', 'test-token');
    localStorage.setItem('user', JSON.stringify({ id: '1', username: 'test', role: 'user' }));

    renderNavigation();

    expect(screen.getByText(/'profile'/i)).toBeInTheDocument();
    expect(screen.queryByText(/'login'/i)).not.toBeInTheDocument();
  });

  it('should have correct href attributes', () => {
    renderNavigation();

    expect(screen.getByRole('link', { name: /'home'/i })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: /'projects'/i })).toHaveAttribute('href', '/projects');
    expect(screen.getByRole('link', { name: /'blogs'/i })).toHaveAttribute('href', '/blogs');
    expect(screen.getByRole('link', { name: /'about'/i })).toHaveAttribute('href', '/about');
    expect(screen.getByRole('link', { name: /'contact'/i })).toHaveAttribute('href', '/contact');
  });

  it('should highlight current route', () => {
    // Update mock location to match the blogs route for this test
    global.mockLocation.pathname = '/blogs';
    
    renderNavigation('/blogs');

    const blogsLink = screen.getByRole('link', { name: /'blogs'/i });
    // Check for the active class (text-teal)
    expect(blogsLink).toHaveClass('text-teal');
  });

  it('should render nav element', () => {
    renderNavigation();

    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('should render array-style brackets', () => {
    renderNavigation();

    // The navigation displays items in array format with brackets
    const brackets = screen.getAllByText(/\[|\]/);
    expect(brackets.length).toBeGreaterThan(0);
  });
});
