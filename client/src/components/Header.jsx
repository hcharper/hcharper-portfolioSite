import React from 'react';
import Navigation from './Navigation';

const Header = () => {
  return (
    <header className="bg-navy-light/50 backdrop-blur-xl px-[72px] py-[24px] flex items-center justify-between border-b border-white/5">
      {/* Name */}
      <div className="flex items-center gap-3">
        <div className="flex flex-col">
          <span className="text-white font-bold text-lg tracking-tight">Harrison Harper</span>
          <span className="text-teal text-xs font-medium">Full Stack Developer</span>
        </div>
      </div>
      
      {/* Navigation */}
      <Navigation />
    </header>
  );
};

export default Header;
