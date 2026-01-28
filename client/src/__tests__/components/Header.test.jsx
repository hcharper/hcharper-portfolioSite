/**
 * Header Component Tests
 * Tests for the Header component
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '../../context/AuthProvider';
import Header from '../../components/Header';

// Mock the auth API
jest.mock('../../api/auth', () => ({
  login: jest.fn(),
  register: jest.fn(),
}));

const renderHeader = () => {
  return render(
    <AuthProvider>
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    </AuthProvider>
  );
};

describe('Header Component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should render the header with name', () => {
    renderHeader();

    expect(screen.getByText('Harrison Harper')).toBeInTheDocument();
  });

  it('should display title/role', () => {
    renderHeader();

    expect(screen.getByText('Full Stack Developer')).toBeInTheDocument();
  });

  it('should render the Navigation component', () => {
    renderHeader();

    // Check for navigation links
    expect(screen.getByText(/'home'/i)).toBeInTheDocument();
    expect(screen.getByText(/'projects'/i)).toBeInTheDocument();
    expect(screen.getByText(/'blogs'/i)).toBeInTheDocument();
  });

  it('should be a header element', () => {
    renderHeader();

    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();
  });
});
