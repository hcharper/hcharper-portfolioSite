import React from 'react';
import { useAuth } from '../context/AuthProvider';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-navy px-16 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-display gradient-text mb-12 animate-fadeInUp">My Profile</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="md:col-span-1 animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
            <div className="modern-card p-8 rounded-2xl text-center">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-teal via-green to-bright-green mx-auto mb-6 flex items-center justify-center">
                <span className="text-white text-5xl font-bold">
                  {user?.username?.charAt(0).toUpperCase()}
                </span>
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">{user?.username}</h2>
              <p className="text-teal font-semibold mb-4 capitalize">{user?.role}</p>
              
              {isAdmin && (
                <div className="bg-teal/20 border border-teal/30 rounded-lg px-4 py-2 mb-4">
                  <span className="text-teal font-semibold text-sm">Admin Access</span>
                </div>
              )}

              <button
                onClick={handleLogout}
                className="w-full bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 text-red-300 hover:text-red-200 px-6 py-3 rounded-xl font-semibold transition-all"
              >
                Logout
              </button>
            </div>
          </div>

          {/* Profile Details */}
          <div className="md:col-span-2 space-y-6">
            <div className="modern-card p-8 rounded-2xl animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
              <h3 className="text-heading text-white mb-6">Account Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-white/60 text-sm mb-1">Username</label>
                  <p className="text-white text-lg font-semibold">{user?.username}</p>
                </div>
                <div>
                  <label className="block text-white/60 text-sm mb-1">Email</label>
                  <p className="text-white text-lg font-semibold">{user?.email}</p>
                </div>
                <div>
                  <label className="block text-white/60 text-sm mb-1">Role</label>
                  <p className="text-white text-lg font-semibold capitalize">{user?.role}</p>
                </div>
                <div>
                  <label className="block text-white/60 text-sm mb-1">User ID</label>
                  <p className="text-white/70 text-sm font-mono">{user?.id}</p>
                </div>
              </div>
            </div>

            {isAdmin && (
              <div className="modern-card p-8 rounded-2xl animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
                <h3 className="text-heading text-white mb-6">Admin Actions</h3>
                <p className="text-white/70 mb-6">
                  As an admin, you have access to the dashboard where you can manage users and blog posts.
                </p>
                <button
                  onClick={() => navigate('/admin-dash')}
                  className="btn-primary px-6 py-3 rounded-xl text-white font-semibold"
                >
                  Go to Admin Dashboard
                </button>
              </div>
            )}

            <div className="modern-card p-8 rounded-2xl animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
              <h3 className="text-heading text-white mb-6">Quick Links</h3>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => navigate('/blogs')}
                  className="bg-navy-light/50 hover:bg-navy-light border border-white/10 hover:border-teal/30 px-6 py-4 rounded-xl text-white font-semibold transition-all text-left"
                >
                  <span className="block text-teal mb-1">📝</span>
                  View Blogs
                </button>
                <button
                  onClick={() => navigate('/projects')}
                  className="bg-navy-light/50 hover:bg-navy-light border border-white/10 hover:border-teal/30 px-6 py-4 rounded-xl text-white font-semibold transition-all text-left"
                >
                  <span className="block text-teal mb-1">💼</span>
                  Projects
                </button>
                <button
                  onClick={() => navigate('/about')}
                  className="bg-navy-light/50 hover:bg-navy-light border border-white/10 hover:border-teal/30 px-6 py-4 rounded-xl text-white font-semibold transition-all text-left"
                >
                  <span className="block text-teal mb-1">👤</span>
                  About
                </button>
                <button
                  onClick={() => navigate('/contact')}
                  className="bg-navy-light/50 hover:bg-navy-light border border-white/10 hover:border-teal/30 px-6 py-4 rounded-xl text-white font-semibold transition-all text-left"
                >
                  <span className="block text-teal mb-1">📧</span>
                  Contact
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
