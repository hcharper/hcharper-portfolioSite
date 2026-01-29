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
    institution: "Metana",
    logo: "/metana.png",
    programs: [
      "Full Stack Bootcamp",
      "Web3 Bootcamp",
    ],
  },
  {
    institution: "Auburn University",
    logo: "/auburn.png",
    programs: [
      "Information Systems Management Major",
      "Computer Science Minor",
    ],
  },
];

const certifications = [
  {
    name: "Attendance Hashgraph Developer",
    issuer: "The Hashgraph Association",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-navy px-4 sm:px-8 md:px-12 lg:px-16 py-8 sm:py-12 lg:py-16 space-y-12">
      {/* Hero Section */}
      <section className="modern-card p-8 md:p-12 rounded-2xl">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="w-48 h-48 rounded-full bg-navy-800 flex-shrink-0 overflow-hidden border-4 border-teal-400/30">
            <img 
              src="/favicon.jpg" 
              alt="Harrison Harper" 
              className="w-full h-full object-contain"
            />
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
        <div className="modern-card p-6 space-y-4 text-gray-300 rounded-2xl">
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
            <a
              key={index}
              href="https://harperwebservices.com"
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <div className="modern-card p-6 rounded-2xl hover:opacity-95">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                  <h3 className="text-xl font-semibold text-teal-400">{exp.title}</h3>
                  <span className="text-gray-500">{exp.period}</span>
                </div>
                <p className="text-gray-400 mb-2">{exp.company}</p>
                <p className="text-gray-300">{exp.description}</p>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Education */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold gradient-text">Education</h2>
        <div className="space-y-4">
          {education.map((edu, index) => (
            <div key={index} className="modern-card p-6 rounded-2xl">
              <div className="flex items-start gap-4">
                <img 
                  src={edu.logo} 
                  alt={edu.institution} 
                  className="w-12 h-12 object-contain flex-shrink-0"
                />
                <div>
                  <h3 className="text-xl font-semibold text-teal-400 mb-2">{edu.institution}</h3>
                  <ul className="space-y-1">
                    {edu.programs.map((program, pIndex) => (
                      <li key={pIndex} className="text-gray-300 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-teal-400 rounded-full"></span>
                        {program}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Certifications */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold gradient-text">Certifications</h2>
        <div className="space-y-4">
          {certifications.map((cert, index) => (
            <div key={index} className="modern-card p-6 flex items-center gap-4 rounded-2xl">
              <span className="text-3xl">🏆</span>
              <div>
                <p className="font-semibold text-white">{cert.name}</p>
                <p className="text-sm text-gray-400">Issued by {cert.issuer}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
