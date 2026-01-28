"use client";

import { useState, FormEvent } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      // Construct mailto link with form data
      const mailtoLink = `mailto:harrison.c.harper@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`From: ${formData.name} (${formData.email})\n\n${formData.message}`)}`;
      window.location.href = mailtoLink;
      
      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-navy px-4 sm:px-8 md:px-12 lg:px-16 py-8 sm:py-12 lg:py-16">
      <div className="max-w-3xl space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold gradient-text">Get in Touch</h1>
        <p className="text-gray-400 text-lg">
          Have a question or want to work together? I&apos;d love to hear from you.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <a
          href="mailto:harrison.c.harper@gmail.com"
          className="feature-card p-6 text-center hover:border-teal-500/50 transition-colors rounded-2xl"
        >
          <span className="text-3xl mb-3 block">📧</span>
          <h3 className="font-semibold mb-1">Email</h3>
          <p className="text-xs text-gray-400 break-all">harrison.c.harper@gmail.com</p>
        </a>
        <a
          href="https://github.com/hcharper"
          target="_blank"
          rel="noopener noreferrer"
          className="feature-card p-6 text-center hover:border-teal-500/50 transition-colors rounded-2xl"
        >
          <span className="text-3xl mb-3 block">💻</span>
          <h3 className="font-semibold mb-1">GitHub</h3>
          <p className="text-sm text-gray-400">@hcharper</p>
        </a>
        <a
          href="https://linkedin.com/in/hcharper"
          target="_blank"
          rel="noopener noreferrer"
          className="feature-card p-6 text-center hover:border-teal-500/50 transition-colors rounded-2xl"
        >
          <span className="text-3xl mb-3 block">💼</span>
          <h3 className="font-semibold mb-1">LinkedIn</h3>
          <p className="text-sm text-gray-400">Harrison Harper</p>
        </a>
      </div>

      <form onSubmit={handleSubmit} className="modern-card p-8 space-y-6 rounded-2xl">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium text-gray-300">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="w-full px-4 py-3 bg-navy-700 border border-gray-600 rounded-lg focus:outline-none focus:border-teal-500 transition-colors"
              placeholder="Your name"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="w-full px-4 py-3 bg-navy-700 border border-gray-600 rounded-lg focus:outline-none focus:border-teal-500 transition-colors"
              placeholder="your@email.com"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="subject" className="block text-sm font-medium text-gray-300">
            Subject
          </label>
          <input
            type="text"
            id="subject"
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            required
            className="w-full px-4 py-3 bg-navy-700 border border-gray-600 rounded-lg focus:outline-none focus:border-teal-500 transition-colors"
            placeholder="What's this about?"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="message" className="block text-sm font-medium text-gray-300">
            Message
          </label>
          <textarea
            id="message"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            required
            rows={6}
            className="w-full px-4 py-3 bg-navy-700 border border-gray-600 rounded-lg focus:outline-none focus:border-teal-500 transition-colors resize-none"
            placeholder="Your message..."
          />
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            disabled={status === "sending"}
            className="btn-primary px-12 py-3 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl"
          >
            {status === "sending" ? (
              <>
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Sending...
              </>
            ) : (
              "Send Message"
            )}
          </button>
        </div>

        {status === "success" && (
          <div className="p-4 bg-green-500/20 border border-green-500/50 rounded-lg text-green-400 text-center">
            Message sent successfully! I&apos;ll get back to you soon.
          </div>
        )}

        {status === "error" && (
          <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 text-center">
            Something went wrong. Please try again or email me directly.
          </div>
        )}
      </form>
      </div>
    </div>
  );
}
