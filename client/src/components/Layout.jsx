import React from 'react';
import Header from './Header';

const Layout = ({ children }) => {
  return (
    <div className="bg-navy h-screen flex flex-col overflow-hidden">
      {/* Header */}
      <Header />
      
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Static */}
        <aside className="w-[380px] bg-navy-light/30 px-8 py-8 flex flex-col gap-8 border-r border-white/5">
          {/* Profile Card */}
          <div className="bg-gradient-to-br from-navy-light to-navy p-8 rounded-2xl border border-white/10 shadow-2xl">
            <h3 className="text-white text-2xl font-bold text-center mb-2">Web3 Developer</h3>
            <p className="text-white/60 text-sm text-center leading-relaxed">
              Building fast, user-friendly applications with modern technologies
            </p>
          </div>
          
          {/* Quick Info */}
          <div className="bg-navy-light/50 backdrop-blur-sm p-6 rounded-xl border border-white/5">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-green animate-pulse"></div>
                <span className="text-white/80 text-sm">Available for work</span>
              </div>
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-white/60 text-sm">United States</span>
              </div>
            </div>
          </div>
          
          {/* Social Links */}
          <div className="mt-auto">
            <p className="text-white/40 text-xs uppercase tracking-wider mb-4 font-semibold">Connect</p>
            <div className="flex gap-3">
              {/* GitHub */}
              <a href="https://github.com/hcharper" target="_blank" rel="noopener noreferrer" 
                 className="flex-1 bg-navy-light/50 hover:bg-navy-light border border-white/5 hover:border-teal/50 rounded-lg p-3 transition-all duration-300 group">
                <svg className="w-6 h-6 mx-auto text-white/60 group-hover:text-teal transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                </svg>
              </a>
              
              {/* LinkedIn */}
              <a href="https://linkedin.com/in/harperharrison" target="_blank" rel="noopener noreferrer"
                 className="flex-1 bg-navy-light/50 hover:bg-navy-light border border-white/5 hover:border-teal/50 rounded-lg p-3 transition-all duration-300 group">
                <svg className="w-6 h-6 mx-auto text-white/60 group-hover:text-teal transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              
              {/* Twitter */}
              <a href="https://x.com/harrisonharpe" target="_blank" rel="noopener noreferrer"
                 className="flex-1 bg-navy-light/50 hover:bg-navy-light border border-white/5 hover:border-teal/50 rounded-lg p-3 transition-all duration-300 group">
                <svg className="w-6 h-6 mx-auto text-white/60 group-hover:text-teal transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
          </div>
        </aside>

        {/* Right Content - Scrollable */}
        <main className="flex-1 overflow-y-auto scrollbar-hide bg-navy">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
