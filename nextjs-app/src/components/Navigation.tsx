'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthProvider';

interface NavigationProps {
  mobile?: boolean;
  onItemClick?: () => void;
}

export default function Navigation({ mobile, onItemClick }: NavigationProps) {
  const pathname = usePathname();
  const { isLoggedIn, user } = useAuth();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Projects', path: '/projects' },
    { name: 'Blogs', path: '/blogs' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const authNavItems = isLoggedIn && user?.role === 'admin'
    ? [{ name: 'Admin', path: '/admin' }]
    : [];

  const allNavItems = [...navItems, ...authNavItems];

  if (mobile) {
    return (
      <nav className="flex flex-col p-4">
        {allNavItems.map((item, index) => (
          <Link
            key={item.name}
            href={item.path}
            onClick={onItemClick}
            className={`py-3 px-4 font-mono text-base transition-colors border-b border-white/5 last:border-0 ${
              pathname === item.path
                ? 'text-teal'
                : 'text-white/70 hover:text-white'
            }`}
          >
            {index === 0 && <span className="text-white/50">[ </span>}
            &apos;{item.name.toLowerCase()}&apos;
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
        <span key={item.name} className="flex items-center">
          <Link
            href={item.path}
            className={`font-mono text-sm lg:text-base transition-colors whitespace-nowrap ${
              pathname === item.path
                ? 'text-teal'
                : 'text-white/70 hover:text-white'
            }`}
          >
            &apos;{item.name.toLowerCase()}&apos;
          </Link>
          {index < allNavItems.length - 1 && (
            <span className="text-white/50 font-mono text-base ml-4">,</span>
          )}
        </span>
      ))}
      <span className="text-white/50 font-mono text-base">]</span>
    </nav>
  );
}
