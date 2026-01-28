import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllBlogs } from '../api/blogs';

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const data = await getAllBlogs();
        setBlogs(data);
        setError(null);
      } catch (err) {
        // Use sample data if API fails
        setBlogs([
          {
            _id: '1',
            title: 'Sample Blog Post One',
            content: 'This is a sample blog post demonstrating the blog layout and styling. In a production environment, this would be replaced with real content from the database.',
            createdAt: new Date().toISOString()
          },
          {
            _id: '2',
            title: 'Sample Blog Post Two',
            content: 'Another sample blog post to showcase the grid layout and card design. The actual blog functionality would connect to your backend API.',
            createdAt: new Date().toISOString()
          },
          {
            _id: '3',
            title: 'Sample Blog Post Three',
            content: 'A third sample post to fill out the blog grid. This demonstrates how multiple blog posts would appear on the page with proper spacing and styling.',
            createdAt: new Date().toISOString()
          }
        ]);
        setError(null);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <p className="mt-4 text-gray-600">Loading blogs...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-[103px] py-[80px] bg-navy">
        <h1 className="text-[56px] font-extrabold gradient-text mb-8 animate-fadeInUp leading-tight">Blog</h1>
      {blogs.length === 0 ? (
        <p className="text-[18px] text-white/60">No blog posts yet. Check back soon!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <div key={blog._id} className="bg-gradient-to-br from-teal to-green rounded-[20px] p-6 card-hover">
                <h3 className="text-[24px] font-semibold mb-3 text-white">{blog.title}</h3>
                <p className="text-white/70 mb-4">
                  {(blog.content || blog.snippet || blog.body || '').substring(0, 150)}...
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-white/60">
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </span>
                  <Link 
                    to={`/blogs/${blog._id}`} 
                    className="text-bright-green hover:underline font-semibold"
                  >
                    Read More →
                  </Link>
                </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Blogs;
