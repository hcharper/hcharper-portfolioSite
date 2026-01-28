/**
 * Jest DOM Setup for React Testing Library
 * Extends Jest matchers for DOM testing
 */

import '@testing-library/jest-dom';

// Create mock router values before the mock
const mockNavigate = jest.fn();
const mockLocation = { pathname: '/', search: '', hash: '', state: null, key: 'default' };

// Expose mocks globally for tests
global.mockNavigate = mockNavigate;
global.mockLocation = mockLocation;

// Mock react-router-dom - use virtual module approach to avoid resolution issues
jest.mock('react-router-dom', () => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const React = require('react');
  return {
    __esModule: true,
    useNavigate: () => global.mockNavigate,
    useLocation: () => global.mockLocation,
    useParams: () => ({}),
    useSearchParams: () => [new URLSearchParams(), jest.fn()],
    useMatch: () => null,
    MemoryRouter: ({ children }) => React.createElement('div', { 'data-testid': 'memory-router' }, children),
    BrowserRouter: ({ children }) => React.createElement('div', { 'data-testid': 'browser-router' }, children),
    Routes: ({ children }) => React.createElement('div', { 'data-testid': 'routes' }, children),
    Route: ({ element }) => element || null,
    Link: ({ children, to, className, ...props }) => React.createElement('a', { href: to, className, ...props }, children),
    NavLink: ({ children, to, className, ...props }) => {
      const resolvedClassName = typeof className === 'function' 
        ? className({ isActive: false, isPending: false })
        : className;
      return React.createElement('a', { href: to, className: resolvedClassName, ...props }, children);
    },
    Navigate: ({ to }) => React.createElement('div', { 'data-testid': 'navigate', 'data-to': to }),
    Outlet: () => React.createElement('div', { 'data-testid': 'outlet' }),
  };
}, { virtual: true });

// Mock window.matchMedia for responsive components
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock;

// Suppress console errors during tests (optional - remove if you want to see errors)
const originalError = console.error;
beforeAll(() => {
  console.error = (...args) => {
    if (
      typeof args[0] === 'string' &&
      (args[0].includes('Warning: ReactDOM.render is no longer supported') ||
        args[0].includes('Warning: An update to') ||
        args[0].includes('act(...)'))
    ) {
      return;
    }
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
});
