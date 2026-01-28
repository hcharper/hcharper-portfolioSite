import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-navy px-16 py-16">
      {/* Hero Section */}
      <div className="max-w-5xl mb-24 animate-fadeInUp">
        <h1 className="text-display gradient-text mb-6">
          Full Stack Developer
        </h1>
        <p className="text-2xl text-white/70 leading-relaxed max-w-3xl font-light">
          Building scalable, performant web applications with modern technologies. 
          Specialized in React, Node.js, and blockchain development.
        </p>
        <div className="flex gap-4 mt-8">
          <Link to="/projects" className="btn-primary px-8 py-4 rounded-xl text-white font-semibold text-lg inline-block">
            View Projects
          </Link>
          <Link to="/contact" className="bg-navy-light hover:bg-navy-light/80 border border-teal/30 px-8 py-4 rounded-xl text-white font-semibold text-lg transition-all inline-block">
            Contact Me
          </Link>
        </div>
      </div>

      {/* Skills Section */}
      <div className="mb-24 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
        <h2 className="text-heading text-white mb-12">Core Expertise</h2>
        <div className="grid grid-cols-3 gap-6">
          {[
            { name: 'Frontend', skills: 'React, Tailwind, Figma', icon: '⚛️' },
            { name: 'Backend', skills: 'Node.js, Express, PostgreSQL, REST APIs', icon: '🔧' },
            { name: 'Web3', skills: 'Solidity, Web3.js, Ethers.js, Hedera SDK', icon: '⛓️' },
          ].map((category, index) => (
            <div key={index} className="feature-card p-8 rounded-2xl">
              <div className="text-5xl mb-4">{category.icon}</div>
              <h3 className="text-xl font-bold text-white mb-3">{category.name}</h3>
              <p className="text-white/60 leading-relaxed">{category.skills}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Projects */}
      <div className="mb-24 animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-heading text-white">Featured Projects</h2>
          <Link to="/projects" className="text-teal hover:text-bright-green font-semibold transition-colors flex items-center gap-2">
            View All
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-8">
          {[1, 2].map((item) => (
            <div key={item} className="modern-card p-8 rounded-2xl group cursor-pointer">
              <div className="w-full h-64 bg-gradient-to-br from-teal/20 to-green/20 rounded-xl mb-6 overflow-hidden">
                <img src="https://via.placeholder.com/600x400" alt={`Project ${item}`} className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-teal transition-colors">
                Project Title
              </h3>
              <p className="text-white/60 mb-6 leading-relaxed">
                Sample project description. This is a placeholder text for a project that demonstrates various technical skills and implementation details.
              </p>
              <div className="flex flex-wrap gap-2">
                {['React', 'Node.js', 'PostgreSQL'].map((tech) => (
                  <span key={tech} className="px-4 py-2 bg-navy-light/50 border border-teal/20 rounded-lg text-teal text-sm font-medium">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* About Preview */}
      <div className="animate-fadeInUp" style={{ animationDelay: '0.6s' }}>
        <div className="modern-card p-12 rounded-2xl">
          <div className="flex gap-12 items-center">
            <div className="flex-shrink-0">
              <img src="https://github.com/hcharper.png" alt="Harrison Harper" className="w-48 h-48 rounded-full object-cover" />
            </div>
            <div className="flex-1">
              <h2 className="text-heading text-white mb-6">About Me</h2>
              <p className="text-white/70 text-lg leading-relaxed mb-6">
                Passionate developer with 5+ years of experience building modern web applications. 
                I specialize in creating seamless user experiences backed by robust, scalable systems.
              </p>
              <Link to="/about" className="inline-flex items-center gap-2 text-teal hover:text-bright-green font-semibold transition-colors">
                Learn More
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle admin link */}
      <div className="text-center pt-12 pb-4">
        <Link to="/admin-dash" className="text-white/30 hover:text-white/50 text-xs transition-colors">
          •
        </Link>
      </div>
    </div>
  );
};

export default Home;
