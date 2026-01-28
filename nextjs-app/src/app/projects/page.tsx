"use client";

import { useState, useEffect } from "react";

interface IProject {
  _id: string;
  title: string;
  description: string;
  technologies: string[];
  localImage?: string;
  siteUrl?: string;
  demoLink?: string;
  githubLink?: string;
  featured: boolean;
}

// GitHub logo SVG component
const GitHubLogo = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
  </svg>
);

export default function ProjectsPage() {
  const [projects, setProjects] = useState<IProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("/api/projects");
        const data = await res.json();
        setProjects(data);
      } catch (err) {
        console.error("Error fetching projects:", err);
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const getProjectImage = (project: IProject) => {
    if (project.localImage) {
      return `/projects/${project.localImage}`;
    }
    return null;
  };

  const getProjectLink = (project: IProject) => {
    return project.demoLink || project.siteUrl || project.githubLink || null;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-navy px-4 sm:px-8 md:px-12 lg:px-16 py-8 sm:py-12 lg:py-16 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-teal"></div>
          <p className="mt-4 text-white/60">Loading projects...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-navy px-4 sm:px-8 md:px-12 lg:px-16 py-8 sm:py-12 lg:py-16">
      <div className="max-w-7xl animate-fadeInUp">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl gradient-text mb-8 sm:mb-12 lg:mb-16 font-bold mt-4 pb-1">Projects</h1>
        
        {projects.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-white/60 text-lg">No projects yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 auto-rows-fr">
            {projects.map((project, index) => {
              const imageUrl = getProjectImage(project);
              const projectLink = getProjectLink(project);
              
              const cardContent = (
                <>
                  {/* Project Image */}
                  <div className="w-full h-56 sm:h-64 lg:h-72 rounded-xl mb-2 sm:mb-3 overflow-hidden bg-gradient-to-br from-teal/20 to-green/20 relative">
                    {imageUrl ? (
                      <img 
                        src={imageUrl} 
                        alt={project.title}
                        className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <svg className="w-12 sm:w-16 h-12 sm:h-16 text-teal/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                        </svg>
                      </div>
                    )}
                    
                    {project.githubLink && (
                      <a 
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute top-3 right-3 p-2 bg-navy/80 rounded-lg text-white/70 hover:text-white hover:bg-navy transition-all z-10"
                        onClick={(e) => e.stopPropagation()}
                        title="View on GitHub"
                      >
                        <GitHubLogo />
                      </a>
                    )}
                  </div>
                  
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-1.5 sm:mb-2 group-hover:text-teal transition-colors">
                    {project.title}
                  </h3>
                  
                  <p className="text-white/60 mb-3 sm:mb-4 leading-relaxed text-xs sm:text-sm">
                    {project.description}
                  </p>
                  
                  {/* Technology Bubbles */}
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {(project.technologies || []).slice(0, 6).map((tech, techIndex) => (
                      <span 
                        key={techIndex} 
                        className="px-2 sm:px-3 py-1 bg-navy-light/50 border border-teal/20 rounded-lg text-teal text-xs font-medium"
                      >
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
                  className="modern-card p-4 sm:p-6 rounded-2xl group block cursor-pointer animate-fadeInUp"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {cardContent}
                </a>
              ) : (
                <div 
                  key={project._id} 
                  className="modern-card p-4 sm:p-6 rounded-2xl group animate-fadeInUp"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {cardContent}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
