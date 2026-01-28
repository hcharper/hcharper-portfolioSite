import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getBlogById } from '../api/blogs';

// GitHub logo SVG component
const GitHubLogo = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
  </svg>
);

// Twitter Embed Component
const TwitterEmbed = ({ url }) => {
  const containerRef = useRef(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Load Twitter widgets script if not already loaded
    if (!window.twttr) {
      const script = document.createElement('script');
      script.src = 'https://platform.twitter.com/widgets.js';
      script.async = true;
      script.onload = () => {
        if (window.twttr && containerRef.current) {
          window.twttr.widgets.load(containerRef.current);
          setLoaded(true);
        }
      };
      document.body.appendChild(script);
    } else {
      if (containerRef.current) {
        window.twttr.widgets.load(containerRef.current);
        setLoaded(true);
      }
    }
  }, [url]);

  // Extract tweet ID from URL for fallback link
  const getTweetId = (tweetUrl) => {
    const match = tweetUrl.match(/status\/(\d+)/);
    return match ? match[1] : null;
  };

  return (
    <div ref={containerRef} className="my-4">
      <blockquote className="twitter-tweet" data-theme="dark">
        <a href={url}>Loading tweet...</a>
      </blockquote>
      {!loaded && (
        <a 
          href={url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-400 hover:underline text-sm"
        >
          View on Twitter →
        </a>
      )}
    </div>
  );
};

// Project Card Mini Component
const ProjectCardMini = ({ project }) => {
  if (!project) return null;
  
  return (
    <div className="bg-navy-light/50 border border-white/10 rounded-xl p-4 hover:border-teal/30 transition-colors">
      <div className="flex items-start gap-4">
        <div className="w-16 h-16 bg-gradient-to-br from-teal/20 to-green/20 rounded-lg flex items-center justify-center flex-shrink-0">
          <svg className="w-8 h-8 text-teal/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-white font-semibold text-lg truncate">{project.title}</h4>
          <p className="text-white/60 text-sm line-clamp-2 mb-2">{project.description}</p>
          <div className="flex flex-wrap gap-1 mb-2">
            {(project.technologies || []).slice(0, 3).map((tech, i) => (
              <span key={i} className="px-2 py-0.5 bg-teal/10 text-teal text-xs rounded">
                {tech}
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            {project.demoLink && (
              <a 
                href={project.demoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal text-xs hover:underline"
              >
                View Demo →
              </a>
            )}
            {project.githubLink && (
              <a 
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-white/60 text-xs hover:text-white"
              >
                <GitHubLogo /> Code
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const SingleBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const data = await getBlogById(id);
        setBlog(data);
        setError(null);
      } catch (err) {
        setError('Blog not found or failed to load.');
        console.error('Error fetching blog:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-navy px-16 py-16 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-teal"></div>
          <p className="mt-4 text-white/60">Loading blog...</p>
        </div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen bg-navy px-16 py-16 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 mb-4">{error || 'Blog not found.'}</p>
          <Link to="/blogs" className="text-teal hover:underline">
            ← Back to Blogs
          </Link>
        </div>
      </div>
    );
  }

  const linkedProjects = blog.linkedProjects || [];
  const twitterEmbeds = blog.twitterEmbeds || [];

  return (
    <div className="min-h-screen bg-navy px-16 py-16">
      <div className="max-w-4xl mx-auto animate-fadeInUp">
        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="text-teal hover:text-bright-green mb-8 flex items-center gap-2 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>

        {/* Article */}
        <article className="modern-card rounded-2xl p-8 md:p-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">{blog.title}</h1>
          
          {/* Meta info */}
          <div className="flex items-center text-white/60 mb-8 space-x-4 text-sm">
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {new Date(blog.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
            
            {blog.user?.username && (
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                {blog.user.username}
              </span>
            )}
          </div>

          {/* Content */}
          <div className="prose prose-lg prose-invert max-w-none">
            <div className="text-white/80 leading-relaxed whitespace-pre-wrap text-lg">
              {blog.content || blog.body}
            </div>
          </div>

          {/* Linked Projects Section */}
          {linkedProjects.length > 0 && (
            <div className="mt-12 pt-8 border-t border-white/10">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
                Related Projects
              </h3>
              <div className="grid gap-4 md:grid-cols-2">
                {linkedProjects.map((project) => (
                  <ProjectCardMini key={project._id} project={project} />
                ))}
              </div>
            </div>
          )}

          {/* Twitter Embeds Section */}
          {twitterEmbeds.length > 0 && (
            <div className="mt-12 pt-8 border-t border-white/10">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
                Related Posts
              </h3>
              <div className="space-y-4">
                {twitterEmbeds.map((url, index) => (
                  <TwitterEmbed key={index} url={url} />
                ))}
              </div>
            </div>
          )}

          {/* Updated timestamp */}
          {blog.updatedAt && blog.updatedAt !== blog.createdAt && (
            <div className="mt-8 pt-6 border-t border-white/10 text-sm text-white/40">
              Last updated: {new Date(blog.updatedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
          )}
        </article>

        {/* Back to blogs button */}
        <div className="mt-8 text-center">
          <Link 
            to="/blogs" 
            className="inline-block btn-primary px-8 py-3 rounded-xl text-white font-semibold"
          >
            View All Blogs
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SingleBlog;
