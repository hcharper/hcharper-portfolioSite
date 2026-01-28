import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="text-center py-16">
      <div className="mb-8">
        <h1 className="text-9xl font-bold text-gray-300">404</h1>
        <h2 className="text-4xl font-semibold text-gray-800 mb-4">Page Not Found</h2>
        <p className="text-gray-600 text-lg mb-8">
          Oops! The page you're looking for doesn't exist.
        </p>
      </div>
      
      <div className="space-x-4">
        <Link 
          to="/" 
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Go to Homepage
        </Link>
        <Link 
          to="/blogs" 
          className="inline-block bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition"
        >
          View Blogs
        </Link>
      </div>
      
      <div className="mt-12">
        <svg 
          className="mx-auto h-64 w-64 text-gray-300" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={1} 
            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
          />
        </svg>
      </div>
    </div>
  );
};

export default NotFound;
