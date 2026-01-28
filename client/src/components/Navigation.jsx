import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';

const Navigation = ({ mobile, onItemClick }) => {
  const location = useLocation();
  const { isLoggedIn, user } = useAuth();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Projects', path: '/projects' },
    { name: 'Blogs', path: '/blogs' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  // Add conditional nav items based on auth state
  // Only show Admin Dashboard when logged in as admin
  const authNavItems = isLoggedIn && user?.role === 'admin'
    ? [{ name: 'Admin', path: '/admin-dash' }]
    : [];

  const allNavItems = [...navItems, ...authNavItems];

  if (mobile) {
    return (
      <nav className="flex flex-col p-4">
        {allNavItems.map((item, index) => (
          <Link
            key={item.name}
            to={item.path}
            onClick={onItemClick}
            className={`py-3 px-4 font-mono text-base transition-colors border-b border-white/5 last:border-0 ${
              location.pathname === item.path
                ? 'text-teal'
                : 'text-white/70 hover:text-white'
            }`}
          >
            {index === 0 && <span className="text-white/50">[ </span>}
            '{item.name.toLowerCase()}'
            {index < allNavItems.length - 1 ? <span className="text-white/50">,</span> : <span className="text-white/50"> ]</span>}
          </Link>
        ))}
      </nav>
    );
  }

  return (
    <nav className="flex items-center gap-4">
      <span className="text-white/50 font-mono text-base">[</span>
      {allNavItems.map((item, index) => (
        <React.Fragment key={item.name}>
          <Link
            to={item.path}
            className={`font-mono text-sm lg:text-base transition-colors whitespace-nowrap ${
              location.pathname === item.path
                ? 'text-teal'
                : 'text-white/70 hover:text-white'
            }`}
          >
            '{item.name.toLowerCase()}'
          </Link>
          {index < allNavItems.length - 1 && (
            <span className="text-white/50 font-mono text-base">,</span>
          )}
        </React.Fragment>
      ))}
      <span className="text-white/50 font-mono text-base">]</span>
    </nav>
  );
};

export default Navigation;
