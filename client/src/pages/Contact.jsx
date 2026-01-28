import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    setSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    }, 3000);
  };

  return (
    <div>
      <section className="min-h-screen px-4 sm:px-8 md:px-12 lg:px-[103px] py-8 sm:py-12 lg:py-[80px] bg-navy">
        <p className="font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-[56px] gradient-text mb-6 sm:mb-10 animate-fadeInUp leading-tight">Contact Me</p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-[1400px]">
          {/* Contact Information */}
          <div>
            <p className="font-extrabold text-xl sm:text-2xl lg:text-[32px] text-white mb-3 sm:mb-4">Get In Touch</p>
            <p className="text-white text-sm sm:text-base lg:text-[18px] mb-4 sm:mb-6">
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
          </p>
          
          <div className="space-y-6">
            <div className="flex items-start group">
              <div className="glass-strong p-4 rounded-[16px] mr-4 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="font-bold text-white text-[18px]">Email</p>
                <p className="text-white text-[16px]">harrison.c.harper@gmail.com</p>
              </div>
            </div>
            
            <div className="flex items-start group">
              <div className="glass-strong p-4 rounded-[16px] mr-4 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 text-bright-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <p className="font-bold text-white text-[18px]">Location</p>
                <p className="text-white text-[16px]">United States</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="glass p-3 rounded-[12px] mr-4 border border-teal/30">
                <svg className="w-6 h-6 text-bright-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </div>
              <div>
                <p className="font-bold text-white text-[18px]">Social</p>
                <p className="text-white text-[16px]">
                  <a href="https://github.com/hcharper" target="_blank" rel="noopener noreferrer" className="hover:text-teal transition-colors">GitHub</a>
                  {" | "}
                  <a href="https://linkedin.com/in/harperharrison" target="_blank" rel="noopener noreferrer" className="hover:text-teal transition-colors">LinkedIn</a>
                  {" | "}
                  <a href="https://x.com/harrisonharpe" target="_blank" rel="noopener noreferrer" className="hover:text-teal transition-colors">X</a>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div>
          <p className="font-extrabold text-[32px] text-white mb-4">Send a Message</p>
          
          {submitted && (
            <div className="bg-bright-green border border-green text-white px-4 py-3 rounded-[12px] mb-4 font-bold">
              Thank you! Your message has been sent successfully.
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-white font-bold text-[18px] mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 glass border border-teal/30 text-white rounded-[12px] focus:outline-none focus:ring-2 focus:ring-bright-green placeholder-gray-400 transition-all"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-white font-bold text-[18px] mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 glass border border-teal/30 text-white rounded-[12px] focus:outline-none focus:ring-2 focus:ring-bright-green placeholder-gray-400 transition-all"
              />
            </div>
            
            <div>
              <label htmlFor="subject" className="block text-white font-bold text-[18px] mb-2">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 glass border border-teal/30 text-white rounded-[12px] focus:outline-none focus:ring-2 focus:ring-bright-green placeholder-gray-400 transition-all"
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-white font-bold text-[18px] mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-3 glass border border-teal/30 text-white rounded-[12px] focus:outline-none focus:ring-2 focus:ring-bright-green placeholder-gray-400 resize-none transition-all"
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-bright-green to-green text-white font-extrabold text-[20px] py-4 rounded-[12px] hover:shadow-lg hover:shadow-bright-green/30 transition-all duration-300"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
      </section>
    </div>
  );
};

export default Contact;
