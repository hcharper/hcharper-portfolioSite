import React from 'react';

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: 'Project Title One',
      description: 'Sample project description demonstrating full-stack development capabilities with modern web technologies.',
      technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
      demoLink: '#',
      githubLink: '#',
    },
    {
      id: 2,
      title: 'Project Title Two',
      description: 'Sample project description showcasing real-time features and collaborative functionality.',
      technologies: ['React', 'Firebase', 'Material-UI'],
      demoLink: '#',
      githubLink: '#',
    },
    {
      id: 3,
      title: 'Project Title Three',
      description: 'Sample project description featuring API integration and data visualization components.',
      technologies: ['React', 'OpenWeather API', 'Chart.js'],
      demoLink: '#',
      githubLink: '#',
    },
    {
      id: 4,
      title: 'Project Title Four',
      description: 'Sample project description highlighting content management and authentication systems.',
      technologies: ['React', 'Express', 'PostgreSQL', 'JWT'],
      demoLink: '#',
      githubLink: '#',
    },
    {
      id: 5,
      title: 'Project Title Five',
      description: 'Sample project description demonstrating Web3 integration and blockchain technology.',
      technologies: ['React', 'Ethers.js', 'Web3', 'The Graph'],
      demoLink: '#',
      githubLink: '#',
    },
    {
      id: 6,
      title: 'Project Title Six',
      description: 'Sample project description featuring real-time communication and file sharing capabilities.',
      technologies: ['React', 'Socket.io', 'Node.js', 'MongoDB'],
      demoLink: '#',
      githubLink: '#',
    },
  ];

  return (
    <div className="min-h-screen bg-navy px-16 py-16">
      <div className="max-w-7xl animate-fadeInUp">
        <h1 className="text-display gradient-text mb-6">Projects</h1>
        <p className="text-xl text-white/70 mb-16 max-w-3xl leading-relaxed">
          A collection of projects showcasing my skills in full-stack development, 
          Web3, and modern web technologies.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div 
              key={project.id} 
              className="modern-card p-8 rounded-2xl group animate-fadeInUp"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-full h-48 bg-gradient-to-br from-teal/20 to-green/20 rounded-xl mb-6 flex items-center justify-center">
                <svg className="w-16 h-16 text-teal/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-teal transition-colors">
                {project.title}
              </h3>
              
              <p className="text-white/60 mb-6 leading-relaxed text-sm">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {project.technologies.map((tech) => (
                  <span 
                    key={tech} 
                    className="px-3 py-1 bg-navy-light/50 border border-teal/20 rounded-lg text-teal text-xs font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              
              <div className="flex gap-4 pt-4 border-t border-white/5">
                <a 
                  href={project.demoLink}
                  className="flex-1 text-center px-4 py-2 bg-teal/20 hover:bg-teal/30 border border-teal/30 rounded-lg text-teal font-semibold text-sm transition-all"
                >
                  Demo
                </a>
                <a 
                  href={project.githubLink}
                  className="flex-1 text-center px-4 py-2 bg-navy-light/50 hover:bg-navy-light border border-white/10 rounded-lg text-white/70 hover:text-white font-semibold text-sm transition-all"
                >
                  Code
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
