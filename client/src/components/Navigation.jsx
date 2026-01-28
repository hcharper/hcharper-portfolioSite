import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';

const Navigation = () => {
  const location = useLocation();
  const { isLoggedIn } = useAuth();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Projects', path: '/projects' },
    { name: 'Blogs', path: '/blogs' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  // Add conditional nav items based on auth state
  const authNavItems = isLoggedIn
    ? [{ name: 'Profile', path: '/profile' }]
    : [{ name: 'Login', path: '/login' }];

  const allNavItems = [...navItems, ...authNavItems];

  return (
    <nav className="flex items-center gap-4">
      <span className="text-white/50 font-mono text-base">[</span>
      {allNavItems.map((item, index) => (
        <React.Fragment key={item.name}>
          <Link
            to={item.path}
            className={`font-mono text-base transition-colors ${
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
