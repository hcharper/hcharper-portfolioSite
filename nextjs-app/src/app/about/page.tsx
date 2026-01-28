import Image from "next/image";

export const metadata = {
  title: "About | Harrison Harper",
  description: "Learn more about Harrison Harper - Full-Stack Developer",
};

const experience = [
  {
    title: "Full-Stack Developer",
    company: "Harper Web Services LLC",
    period: "Present",
    description: "Building modern web applications for clients using React, Next.js, Node.js, and various databases.",
  },
];

const education = [
  {
    degree: "Computer Science",
    institution: "Self-Taught & Online Courses",
    description: "Continuous learning through platforms like Udemy, Coursera, and hands-on project experience.",
  },
];

const certifications = [
  "AWS Cloud Practitioner",
  "MongoDB Associate Developer",
  "React Developer Certification",
];

export default function AboutPage() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="modern-card p-8 md:p-12">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="w-48 h-48 rounded-full bg-gradient-to-br from-teal-400 to-navy-600 p-1 flex-shrink-0">
            <div className="w-full h-full rounded-full bg-navy-800 flex items-center justify-center text-6xl">
              👨‍💻
            </div>
          </div>
          <div className="space-y-4 text-center md:text-left">
            <h1 className="text-4xl font-bold gradient-text">About Me</h1>
            <p className="text-xl text-gray-300">
              Hi, I&apos;m Harrison Harper, a passionate Full-Stack Developer based in the United States.
            </p>
            <p className="text-gray-400">
              I specialize in building modern, responsive web applications using cutting-edge technologies.
              With a strong foundation in both frontend and backend development, I create seamless
              user experiences backed by robust server architectures.
            </p>
          </div>
        </div>
      </section>

      {/* My Story */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold gradient-text">My Story</h2>
        <div className="modern-card p-6 space-y-4 text-gray-300">
          <p>
            My journey into software development began with a curiosity about how things work on the web.
            What started as tinkering with HTML and CSS quickly evolved into a deep passion for building
            full-stack applications.
          </p>
          <p>
            Over the years, I&apos;ve worked on a variety of projects ranging from personal passion projects
            to client work. Each project has taught me something new and helped me grow as a developer.
          </p>
          <p>
            Today, I focus on building scalable, maintainable applications using modern technologies
            like React, Next.js, Node.js, and cloud services. I&apos;m particularly interested in
            developer tools, API design, and creating exceptional user experiences.
          </p>
        </div>
      </section>

      {/* Experience */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold gradient-text">Experience</h2>
        <div className="space-y-4">
          {experience.map((exp, index) => (
            <div key={index} className="modern-card p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                <h3 className="text-xl font-semibold text-teal-400">{exp.title}</h3>
                <span className="text-gray-500">{exp.period}</span>
              </div>
              <p className="text-gray-400 mb-2">{exp.company}</p>
              <p className="text-gray-300">{exp.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold gradient-text">Education</h2>
        <div className="space-y-4">
          {education.map((edu, index) => (
            <div key={index} className="modern-card p-6">
              <h3 className="text-xl font-semibold text-teal-400">{edu.degree}</h3>
              <p className="text-gray-400 mb-2">{edu.institution}</p>
              <p className="text-gray-300">{edu.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Certifications */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold gradient-text">Certifications</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {certifications.map((cert, index) => (
            <div key={index} className="feature-card p-4 text-center">
              <span className="text-2xl mb-2 block">🏆</span>
              <p className="font-medium">{cert}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Fun Facts */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold gradient-text">Fun Facts</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="feature-card p-4 flex items-center gap-4">
            <span className="text-3xl">☕</span>
            <div>
              <p className="font-medium">Coffee Enthusiast</p>
              <p className="text-sm text-gray-400">Powered by caffeine and curiosity</p>
            </div>
          </div>
          <div className="feature-card p-4 flex items-center gap-4">
            <span className="text-3xl">🎮</span>
            <div>
              <p className="font-medium">Gamer</p>
              <p className="text-sm text-gray-400">Strategy and RPG games are my favorite</p>
            </div>
          </div>
          <div className="feature-card p-4 flex items-center gap-4">
            <span className="text-3xl">📚</span>
            <div>
              <p className="font-medium">Continuous Learner</p>
              <p className="text-sm text-gray-400">Always exploring new technologies</p>
            </div>
          </div>
          <div className="feature-card p-4 flex items-center gap-4">
            <span className="text-3xl">🌍</span>
            <div>
              <p className="font-medium">Open Source Contributor</p>
              <p className="text-sm text-gray-400">Giving back to the community</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
