import React from 'react';

const About = () => {
  const skills = [
    'JavaScript', 'TypeScript', 'React', 'Next.js', 'Node.js', 'Express',
    'PostgreSQL', 'MongoDB', 'Tailwind CSS', 'Git', 'REST APIs', 'GraphQL',
    'Solidity', 'Web3', 'Docker', 'AWS'
  ];

  const experience = [
    {
      role: 'Job Title',
      company: 'Company Name',
      period: '2020 - Present',
      description: 'Sample job description highlighting key responsibilities and achievements in this role.'
    },
    {
      role: 'Previous Job Title',
      company: 'Previous Company',
      period: '2018 - 2020',
      description: 'Sample job description describing responsibilities and accomplishments during this position.'
    },
  ];

  return (
    <div className="min-h-screen bg-navy px-4 sm:px-8 md:px-12 lg:px-16 py-8 sm:py-12 lg:py-16">
      {/* Header */}
      <div className="max-w-5xl mb-12 sm:mb-16 lg:mb-24 animate-fadeInUp">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-display gradient-text mb-4 sm:mb-6">About Me</h1>
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/70 leading-relaxed font-light">
          Passionate full-stack developer with expertise in modern web technologies 
          and a focus on building exceptional user experiences.
        </p>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 mb-12 sm:mb-16 lg:mb-24">
        {/* Profile Card */}
        <div className="lg:col-span-1 animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
          <div className="modern-card p-6 sm:p-8 rounded-2xl">
            <img src="https://github.com/hcharper.png" alt="Harrison Harper" className="w-32 h-32 sm:w-full sm:aspect-square rounded-full sm:rounded-2xl mb-4 sm:mb-6 object-cover mx-auto sm:mx-0" />
            <h2 className="text-2xl font-bold text-white mb-4">Harrison Harper</h2>
            <p className="text-teal font-semibold mb-6">Full Stack Developer</p>
            
            <div className="space-y-4 text-white/60 text-sm">
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>harrison.c.harper@gmail.com</span>
              </div>
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>United States</span>
              </div>
            </div>
          </div>
        </div>

        {/* About Content */}
        <div className="lg:col-span-2 space-y-12">
          {/* Bio */}
          <div className="animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
            <h2 className="text-heading text-white mb-6">Background</h2>
            <div className="space-y-4 text-white/70 text-lg leading-relaxed">
              <p>
                I'm a passionate full-stack developer with over 5 years of experience building 
                modern web applications. My journey in software development began with a curiosity 
                about how things work on the web, and it has evolved into a career dedicated to 
                creating efficient, scalable, and user-friendly applications.
              </p>
              <p>
                I specialize in the MERN stack and have extensive experience with TypeScript, 
                Next.js, and various cloud platforms. Recently, I've been exploring Web3 
                technologies and building decentralized applications.
              </p>
            </div>
          </div>

          {/* Experience */}
          <div className="animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
            <h2 className="text-heading text-white mb-6">Experience</h2>
            <div className="space-y-6">
              {experience.map((exp, index) => (
                <div key={index} className="feature-card p-6 rounded-xl">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">{exp.role}</h3>
                      <p className="text-teal font-semibold">{exp.company}</p>
                    </div>
                    <span className="text-white/50 text-sm">{exp.period}</span>
                  </div>
                  <p className="text-white/60 leading-relaxed">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Skills */}
      <div className="animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
        <h2 className="text-heading text-white mb-8">Skills & Technologies</h2>
        <div className="modern-card p-12 rounded-2xl">
          <div className="flex flex-wrap gap-3">
            {skills.map((skill) => (
              <span 
                key={skill} 
                className="px-6 py-3 bg-navy-light/50 hover:bg-teal/20 border border-white/10 hover:border-teal/30 rounded-xl text-white hover:text-teal font-medium transition-all"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
