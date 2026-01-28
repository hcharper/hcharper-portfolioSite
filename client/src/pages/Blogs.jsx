import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllBlogs } from '../api/blogs';

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const data = await getAllBlogs();
        setBlogs(data);
      } catch (err) {
        console.error('Error fetching blogs:', err);
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-navy px-4 sm:px-8 md:px-12 lg:px-16 py-8 sm:py-12 lg:py-16 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-teal"></div>
          <p className="mt-4 text-white/60">Loading blogs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 sm:px-8 md:px-12 lg:px-16 py-8 sm:py-12 lg:py-16 bg-navy">
      <div className="max-w-7xl animate-fadeInUp">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-display gradient-text mb-4 sm:mb-6">Blog</h1>
        <p className="text-base sm:text-lg md:text-xl text-white/70 mb-8 sm:mb-12 lg:mb-16 max-w-3xl leading-relaxed">
          Thoughts, tutorials, and insights on web development, technology, and my journey as a developer.
        </p>
        
        {blogs.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-white/60 text-lg">No blog posts yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {blogs.map((blog, index) => (
              <article 
                key={blog._id} 
                className="modern-card rounded-2xl overflow-hidden group animate-fadeInUp"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Card header with gradient */}
                <div className="h-2 bg-gradient-to-r from-teal to-green"></div>
                
                <div className="p-6">
                  {/* Title */}
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-teal transition-colors line-clamp-2">
                    {blog.title}
                  </h3>
                  
                  {/* Snippet */}
                  <p className="text-white/60 mb-4 text-sm leading-relaxed line-clamp-3">
                    {blog.snippet || (blog.body || blog.content || '').substring(0, 150) + '...'}
                  </p>
                  
                  {/* Meta info */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <span className="text-xs text-white/40">
                      {new Date(blog.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </span>
                    <Link 
                      to={`/blogs/${blog._id}`} 
                      className="text-teal hover:text-bright-green font-semibold text-sm transition-colors flex items-center gap-1"
                    >
                      Read More 
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Blogs;
