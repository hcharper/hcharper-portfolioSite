import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getFeaturedProjects } from '../api/projects';

// GitHub logo SVG component
const GitHubLogo = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
  </svg>
);

const Home = () => {
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const data = await getFeaturedProjects();
        setFeaturedProjects(data);
      } catch (err) {
        console.error('Error fetching featured projects:', err);
      } finally {
        setLoadingProjects(false);
      }
    };

    fetchFeatured();
  }, []);

  const getProjectImage = (project) => {
    if (project.localImage) {
      return `/projects/${project.localImage}`;
    }
    return null;
  };

  const getProjectLink = (project) => {
    return project.demoLink || project.siteUrl || project.githubLink || null;
  };

  return (
    <div className="min-h-screen bg-navy px-4 sm:px-8 md:px-12 lg:px-16 py-8 sm:py-12 lg:py-16">
      {/* Hero Section */}
      <div className="max-w-5xl mb-12 sm:mb-16 lg:mb-24 animate-fadeInUp">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-display gradient-text mb-4 sm:mb-6">
          Full Stack Developer
        </h1>
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/70 leading-relaxed max-w-3xl font-light">
          Building scalable, performant web applications with modern technologies. 
          Specialized in React, Node.js, and blockchain development.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 sm:mt-8">
          <Link to="/projects" className="btn-primary px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-white font-semibold text-base sm:text-lg inline-block text-center">
            View Projects
          </Link>
          <Link to="/contact" className="bg-navy-light hover:bg-navy-light/80 border border-teal/30 px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-white font-semibold text-base sm:text-lg transition-all inline-block text-center">
            Contact Me
          </Link>
        </div>
      </div>

      {/* Skills Section */}
      <div className="mb-12 sm:mb-16 lg:mb-24 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
        <h2 className="text-2xl sm:text-3xl lg:text-heading text-white mb-6 sm:mb-8 lg:mb-12">Core Expertise</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {[
            { name: 'Frontend', skills: 'React, Tailwind, Figma', icon: '⚛️' },
            { name: 'Backend', skills: 'Node.js, Express, PostgreSQL, REST APIs', icon: '🔧' },
            { name: 'Web3', skills: 'Solidity, Web3.js, Ethers.js, Hedera SDK', icon: '⛓️' },
          ].map((category, index) => (
            <div key={index} className="feature-card p-6 sm:p-8 rounded-2xl">
              <div className="text-4xl sm:text-5xl mb-3 sm:mb-4">{category.icon}</div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">{category.name}</h3>
              <p className="text-white/60 leading-relaxed text-sm sm:text-base">{category.skills}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Projects */}
      <div className="mb-12 sm:mb-16 lg:mb-24 animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8 lg:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-heading text-white">Featured Projects</h2>
          <Link to="/projects" className="text-teal hover:text-bright-green font-semibold transition-colors flex items-center gap-2">
            View All
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
        
        {loadingProjects ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-teal"></div>
          </div>
        ) : featuredProjects.length === 0 ? (
          <div className="text-center py-12 text-white/50">
            No featured projects yet.
          </div>
        ) : (
          <div className={`grid grid-cols-1 ${featuredProjects.length === 1 ? 'max-w-2xl' : 'md:grid-cols-2'} gap-6 sm:gap-8`}>
            {featuredProjects.map((project) => {
              const imageUrl = getProjectImage(project);
              const projectLink = getProjectLink(project);
              
              const cardContent = (
                <>
                  <div className="w-full h-48 sm:h-56 lg:h-64 bg-gradient-to-br from-teal/20 to-green/20 rounded-xl mb-4 sm:mb-6 overflow-hidden relative">
                    {imageUrl ? (
                      <img 
                        src={imageUrl} 
                        alt={project.title} 
                        className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-5xl sm:text-6xl opacity-30">🚀</span>
                      </div>
                    )}
                    
                    {project.githubLink && (
                      <a 
                        href={project.githubLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="absolute top-3 sm:top-4 right-3 sm:right-4 p-2 bg-navy/80 rounded-lg text-white/70 hover:text-white hover:bg-navy transition-all z-10"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <GitHubLogo />
                      </a>
                    )}
                  </div>
                  
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-3 group-hover:text-teal transition-colors">
                    {project.title}
                  </h3>
                  
                  <p className="text-white/60 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {project.technologies?.slice(0, 6).map((tech) => (
                      <span key={tech} className="px-3 sm:px-4 py-1.5 sm:py-2 bg-navy-light/50 border border-teal/20 rounded-lg text-teal text-xs sm:text-sm font-medium">
                        {tech}
                      </span>
                    ))}
                  </div>
                </>
              );
              
              return projectLink ? (
                <a 
                  key={project._id}
                  href={projectLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="modern-card p-6 sm:p-8 rounded-2xl group block cursor-pointer"
                >
                  {cardContent}
                </a>
              ) : (
                <div key={project._id} className="modern-card p-6 sm:p-8 rounded-2xl group">
                  {cardContent}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* About Preview */}
      <div className="animate-fadeInUp" style={{ animationDelay: '0.6s' }}>
        <div className="modern-card p-6 sm:p-8 lg:p-12 rounded-2xl">
          <div className="flex flex-col md:flex-row gap-6 sm:gap-8 lg:gap-12 items-center">
            <div className="flex-shrink-0">
              <img src="https://github.com/hcharper.png" alt="Harrison Harper" className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 rounded-full object-cover" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl sm:text-3xl lg:text-heading text-white mb-4 sm:mb-6">About Me</h2>
              <p className="text-white/70 text-base sm:text-lg leading-relaxed mb-4 sm:mb-6">
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
      <div className="text-center pt-8 sm:pt-12 pb-4">
        <Link to="/admin-login" className="text-white/30 hover:text-white/50 text-xs transition-colors">
          •
        </Link>
      </div>
    </div>
  );
};

export default Home;
