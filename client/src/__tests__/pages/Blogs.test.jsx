/**
 * Blogs Page Component Tests
 * Tests for the Blogs listing page
 */

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '../../context/AuthProvider';
import Blogs from '../../pages/Blogs';

// Mock the blogs API
jest.mock('../../api/blogs', () => ({
  getAllBlogs: jest.fn(),
}));

// Mock the auth API (required by AuthProvider)
jest.mock('../../api/auth', () => ({
  login: jest.fn(),
  register: jest.fn(),
}));

const { getAllBlogs } = require('../../api/blogs');

const mockBlogs = [
  {
    _id: '1',
    title: 'Test Blog Post 1',
    content: 'This is the content of test blog post 1',
    snippet: 'Test snippet 1',
    createdAt: '2025-01-01T00:00:00.000Z',
  },
  {
    _id: '2',
    title: 'Test Blog Post 2',
    content: 'This is the content of test blog post 2',
    snippet: 'Test snippet 2',
    createdAt: '2025-01-02T00:00:00.000Z',
  },
  {
    _id: '3',
    title: 'Test Blog Post 3',
    content: 'This is the content of test blog post 3',
    snippet: 'Test snippet 3',
    createdAt: '2025-01-03T00:00:00.000Z',
  }
];

// Wrapper component with all providers
const AllProviders = ({ children }) => (
  <AuthProvider>
    <MemoryRouter initialEntries={['/blogs']}>
      {children}
    </MemoryRouter>
  </AuthProvider>
);

const renderBlogs = () => {
  return render(<Blogs />, { wrapper: AllProviders });
};

describe('Blogs Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should show loading state initially', () => {
    getAllBlogs.mockImplementation(() => new Promise(() => {})); // Never resolves
    
    renderBlogs();

    expect(screen.getByText(/loading blogs/i)).toBeInTheDocument();
  });

  it('should render blog list successfully', async () => {
    getAllBlogs.mockResolvedValue(mockBlogs);

    renderBlogs();

    await waitFor(() => {
      expect(screen.getByText('Test Blog Post 1')).toBeInTheDocument();
      expect(screen.getByText('Test Blog Post 2')).toBeInTheDocument();
      expect(screen.getByText('Test Blog Post 3')).toBeInTheDocument();
    });
  });

  it('should display blog heading', async () => {
    getAllBlogs.mockResolvedValue(mockBlogs);

    renderBlogs();

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /blog/i, level: 1 })).toBeInTheDocument();
    });
  });

  it('should display blog content snippets', async () => {
    getAllBlogs.mockResolvedValue(mockBlogs);

    renderBlogs();

    await waitFor(() => {
      expect(screen.getByText(/this is the content of test blog post 1/i)).toBeInTheDocument();
    });
  });

  it('should display Read More links for each blog', async () => {
    getAllBlogs.mockResolvedValue(mockBlogs);

    renderBlogs();

    await waitFor(() => {
      const readMoreLinks = screen.getAllByText(/read more/i);
      expect(readMoreLinks).toHaveLength(3);
    });
  });

  it('should link to individual blog pages', async () => {
    getAllBlogs.mockResolvedValue(mockBlogs);

    renderBlogs();

    await waitFor(() => {
      const readMoreLinks = screen.getAllByRole('link', { name: /read more/i });
      expect(readMoreLinks[0]).toHaveAttribute('href', '/blogs/1');
      expect(readMoreLinks[1]).toHaveAttribute('href', '/blogs/2');
      expect(readMoreLinks[2]).toHaveAttribute('href', '/blogs/3');
    });
  });

  it('should display message when no blogs exist', async () => {
    getAllBlogs.mockResolvedValue([]);

    renderBlogs();

    await waitFor(() => {
      expect(screen.getByText(/no blog posts yet/i)).toBeInTheDocument();
    });
  });

  it('should handle API errors gracefully with fallback data', async () => {
    getAllBlogs.mockRejectedValue(new Error('API Error'));

    renderBlogs();

    // The component falls back to sample data on error
    await waitFor(() => {
      expect(screen.getByText(/sample blog post one/i)).toBeInTheDocument();
    });
  });

  it('should render blog cards with proper structure', async () => {
    getAllBlogs.mockResolvedValue([mockBlogs[0]]);

    renderBlogs();

    await waitFor(() => {
      // Check for title
      expect(screen.getByText('Test Blog Post 1')).toBeInTheDocument();
      // Check for content snippet
      expect(screen.getByText(/this is the content/i)).toBeInTheDocument();
      // Check for read more link
      expect(screen.getByRole('link', { name: /read more/i })).toBeInTheDocument();
    });
  });
});
