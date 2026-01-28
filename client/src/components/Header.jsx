import React, { useState } from 'react';
import Navigation from './Navigation';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-navy-light/50 backdrop-blur-xl px-4 sm:px-8 md:px-12 lg:px-[72px] py-4 lg:py-[24px] flex items-center justify-between border-b border-white/5">
      {/* Name */}
      <div className="flex items-center gap-3">
        <div className="flex flex-col">
          <span className="text-white font-bold text-base sm:text-lg tracking-tight">Harrison Harper</span>
          <span className="text-teal text-xs font-medium">Full Stack Developer</span>
        </div>
      </div>
      
      {/* Mobile Menu Button */}
      <button 
        className="lg:hidden p-2 text-white/70 hover:text-white"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label="Toggle menu"
      >
        {mobileMenuOpen ? (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>
      
      {/* Desktop Navigation */}
      <div className="hidden lg:block">
        <Navigation />
      </div>
      
      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-navy-light/95 backdrop-blur-xl border-b border-white/5 lg:hidden z-50">
          <Navigation mobile onItemClick={() => setMobileMenuOpen(false)} />
        </div>
      )}
    </header>
  );
};

export default Header;
