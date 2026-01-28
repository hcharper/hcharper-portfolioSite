import React, { useState, useEffect } from 'react';
import { getAllBlogs } from '../api/blogs';
import { getAllUsers } from '../api/users';
import { useAuth } from '../context/AuthProvider';

const AdminDashboard = () => {
  const { token } = useAuth();
  const [blogs, setBlogs] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('blogs');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [blogsData, usersData] = await Promise.all([
          getAllBlogs(),
          getAllUsers(token)
        ]);
        setBlogs(blogsData);
        setUsers(usersData);
      } catch (err) {
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  return (
    <div className="min-h-screen bg-navy px-16 py-16">
      <h1 className="text-display gradient-text mb-12 animate-fadeInUp">Admin Dashboard</h1>

      {/* Tabs */}
      <div className="flex border-b border-white/10 mb-8 animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
        <button
          onClick={() => setActiveTab('blogs')}
          className={`px-6 py-3 font-semibold transition-colors ${
            activeTab === 'blogs'
              ? 'border-b-2 border-teal text-teal'
              : 'text-white/60 hover:text-white'
          }`}
        >
          Blog Management
        </button>
        <button
          onClick={() => setActiveTab('users')}
          className={`px-6 py-3 font-semibold transition-colors ${
            activeTab === 'users'
              ? 'border-b-2 border-teal text-teal'
              : 'text-white/60 hover:text-white'
          }`}
        >
          User Management
        </button>
      </div>

      {/* Blog Management Tab */}
      {activeTab === 'blogs' && (
        <div className="animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-heading text-white">Manage Blogs</h2>
            <button className="btn-primary px-6 py-3 rounded-xl text-white font-semibold">
              + Create New Blog
            </button>
          </div>

          {loading ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-teal"></div>
            </div>
          ) : (
            <div className="modern-card rounded-2xl overflow-hidden">
              <table className="min-w-full">
                <thead className="bg-navy-light/50 border-b border-white/10">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-white/70 uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-white/70 uppercase tracking-wider">
                      Created At
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-white/70 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {blogs.length === 0 ? (
                    <tr>
                      <td colSpan="3" className="px-6 py-8 text-center text-white/60">
                        No blogs found
                      </td>
                    </tr>
                  ) : (
                    blogs.map((blog) => (
                      <tr key={blog._id} className="hover:bg-navy-light/30 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-white">{blog.title}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-white/60">
                            {new Date(blog.createdAt).toLocaleDateString()}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button className="text-teal hover:text-bright-green mr-4 transition-colors">
                            Edit
                          </button>
                          <button className="text-red-400 hover:text-red-300 transition-colors">
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* User Management Tab */}
      {activeTab === 'users' && (
        <div className="animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-heading text-white">Manage Users</h2>
            <button className="btn-primary px-6 py-3 rounded-xl text-white font-semibold">
              + Add New User
            </button>
          </div>

          <div className="modern-card rounded-2xl overflow-hidden">
            <table className="min-w-full">
              <thead className="bg-navy-light/50 border-b border-white/10">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-white/70 uppercase tracking-wider">
                    Username
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-white/70 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-white/70 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-white/70 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {users.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="px-6 py-8 text-center text-white/60">
                      No users found
                    </td>
                  </tr>
                ) : (
                  users.map((user) => (
                    <tr key={user._id} className="hover:bg-navy-light/30 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-white">{user.username}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-white/60">{user.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          user.role === 'admin' 
                            ? 'bg-teal/20 text-teal border border-teal/30' 
                            : 'bg-green/20 text-green border border-green/30'
                        }`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-teal hover:text-bright-green mr-4 transition-colors">
                          Edit
                        </button>
                        <button className="text-red-400 hover:text-red-300 transition-colors">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
