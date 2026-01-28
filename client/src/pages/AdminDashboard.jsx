import React, { useState, useEffect } from 'react';
import { getAllBlogs, createBlog, updateBlog, deleteBlog } from '../api/blogs';
import { getAllProjects, createProject, updateProject, deleteProject, getProjectImages } from '../api/projects';
import { useAuth } from '../context/AuthProvider';

const AdminDashboard = () => {
  const { token } = useAuth();
  const [blogs, setBlogs] = useState([]);
  const [projects, setProjects] = useState([]);
  const [availableImages, setAvailableImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('blogs');
  
  // Modal states
  const [showBlogModal, setShowBlogModal] = useState(false);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [editingProject, setEditingProject] = useState(null);
  
  // Blog form state
  const [blogForm, setBlogForm] = useState({
    title: '',
    snippet: '',
    body: '',
    linkedProjects: [],
    twitterEmbeds: []
  });
  
  // Project form state
  const [projectForm, setProjectForm] = useState({
    title: '',
    description: '',
    technologies: [],
    imageSource: 'local',
    localImage: '',
    siteUrl: '',
    demoLink: '',
    githubLink: '',
    featured: false,
    order: 0
  });
  
  const [techInput, setTechInput] = useState('');
  const [twitterInput, setTwitterInput] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [blogsData, projectsData, imagesData] = await Promise.all([
          getAllBlogs(),
          getAllProjects(),
          getProjectImages()
        ]);
        setBlogs(blogsData);
        setProjects(projectsData);
        setAvailableImages(imagesData);
      } catch (err) {
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  // Blog handlers
  const openBlogModal = (blog = null) => {
    if (blog) {
      setEditingBlog(blog);
      setBlogForm({
        title: blog.title || '',
        snippet: blog.snippet || '',
        body: blog.body || blog.content || '',
        linkedProjects: blog.linkedProjects || [],
        twitterEmbeds: blog.twitterEmbeds || []
      });
    } else {
      setEditingBlog(null);
      setBlogForm({ title: '', snippet: '', body: '', linkedProjects: [], twitterEmbeds: [] });
    }
    setShowBlogModal(true);
  };

  const closeBlogModal = () => {
    setShowBlogModal(false);
    setEditingBlog(null);
    setBlogForm({ title: '', snippet: '', body: '', linkedProjects: [], twitterEmbeds: [] });
  };

  const handleBlogSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingBlog) {
        const updated = await updateBlog(editingBlog._id, blogForm, token);
        setBlogs(blogs.map(b => b._id === updated._id ? updated : b));
      } else {
        const created = await createBlog(blogForm, token);
        setBlogs([created, ...blogs]);
      }
      closeBlogModal();
    } catch (err) {
      console.error('Error saving blog:', err);
      alert('Failed to save blog');
    }
  };

  const handleDeleteBlog = async (id) => {
    if (!window.confirm('Are you sure you want to delete this blog?')) return;
    try {
      await deleteBlog(id, token);
      setBlogs(blogs.filter(b => b._id !== id));
    } catch (err) {
      console.error('Error deleting blog:', err);
      alert('Failed to delete blog');
    }
  };

  const addTwitterEmbed = () => {
    if (twitterInput.trim() && blogForm.twitterEmbeds.length < 5) {
      setBlogForm({
        ...blogForm,
        twitterEmbeds: [...blogForm.twitterEmbeds, twitterInput.trim()]
      });
      setTwitterInput('');
    }
  };

  const removeTwitterEmbed = (index) => {
    setBlogForm({
      ...blogForm,
      twitterEmbeds: blogForm.twitterEmbeds.filter((_, i) => i !== index)
    });
  };

  const toggleLinkedProject = (projectId) => {
    const linked = blogForm.linkedProjects.includes(projectId)
      ? blogForm.linkedProjects.filter(id => id !== projectId)
      : [...blogForm.linkedProjects, projectId];
    setBlogForm({ ...blogForm, linkedProjects: linked });
  };

  // Project handlers
  const openProjectModal = (project = null) => {
    if (project) {
      setEditingProject(project);
      setProjectForm({
        title: project.title || '',
        description: project.description || '',
        technologies: project.technologies || [],
        imageSource: 'local',
        localImage: project.localImage || '',
        siteUrl: project.siteUrl || '',
        demoLink: project.demoLink || '',
        githubLink: project.githubLink || '',
        featured: project.featured || false,
        order: project.order || 0
      });
    } else {
      setEditingProject(null);
      setProjectForm({
        title: '',
        description: '',
        technologies: [],
        imageSource: 'local',
        localImage: '',
        siteUrl: '',
        demoLink: '',
        githubLink: '',
        featured: false,
        order: 0
      });
    }
    setShowProjectModal(true);
  };

  const closeProjectModal = () => {
    setShowProjectModal(false);
    setEditingProject(null);
    setTechInput('');
  };

  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingProject) {
        const updated = await updateProject(editingProject._id, projectForm, token);
        setProjects(projects.map(p => p._id === updated._id ? updated : p));
      } else {
        const created = await createProject(projectForm, token);
        setProjects([created, ...projects]);
      }
      closeProjectModal();
    } catch (err) {
      console.error('Error saving project:', err);
      alert('Failed to save project');
    }
  };

  const handleDeleteProject = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    try {
      await deleteProject(id, token);
      setProjects(projects.filter(p => p._id !== id));
    } catch (err) {
      console.error('Error deleting project:', err);
      alert('Failed to delete project');
    }
  };

  const addTechnology = () => {
    if (techInput.trim() && projectForm.technologies.length < 6) {
      setProjectForm({
        ...projectForm,
        technologies: [...projectForm.technologies, techInput.trim()]
      });
      setTechInput('');
    }
  };

  const removeTechnology = (index) => {
    setProjectForm({
      ...projectForm,
      technologies: projectForm.technologies.filter((_, i) => i !== index)
    });
  };

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
          onClick={() => setActiveTab('projects')}
          className={`px-6 py-3 font-semibold transition-colors ${
            activeTab === 'projects'
              ? 'border-b-2 border-teal text-teal'
              : 'text-white/60 hover:text-white'
          }`}
        >
          Project Management
        </button>
      </div>

      {/* Blog Management Tab */}
      {activeTab === 'blogs' && (
        <div className="animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-heading text-white">Manage Blogs</h2>
            <button 
              onClick={() => openBlogModal()}
              className="btn-primary px-6 py-3 rounded-xl text-white font-semibold"
            >
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
                      Snippet
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
                      <td colSpan="4" className="px-6 py-8 text-center text-white/60">
                        No blogs found
                      </td>
                    </tr>
                  ) : (
                    blogs.map((blog) => (
                      <tr key={blog._id} className="hover:bg-navy-light/30 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-white">{blog.title}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-white/60 truncate max-w-xs">
                            {blog.snippet || (blog.body || '').substring(0, 50) + '...'}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-white/60">
                            {new Date(blog.createdAt).toLocaleDateString()}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button 
                            onClick={() => openBlogModal(blog)}
                            className="text-teal hover:text-bright-green mr-4 transition-colors"
                          >
                            Edit
                          </button>
                          <button 
                            onClick={() => handleDeleteBlog(blog._id)}
                            className="text-red-400 hover:text-red-300 transition-colors"
                          >
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

      {/* Project Management Tab */}
      {activeTab === 'projects' && (
        <div className="animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-heading text-white">Manage Projects</h2>
            <button 
              onClick={() => openProjectModal()}
              className="btn-primary px-6 py-3 rounded-xl text-white font-semibold"
            >
              + Add New Project
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
                      Technologies
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-white/70 uppercase tracking-wider">
                      Links
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-white/70 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {projects.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="px-6 py-8 text-center text-white/60">
                        No projects found
                      </td>
                    </tr>
                  ) : (
                    projects.map((project) => (
                      <tr key={project._id} className="hover:bg-navy-light/30 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-white">{project.title}</div>
                          {project.featured && (
                            <span className="text-xs text-teal">★ Featured</span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-wrap gap-1">
                            {(project.technologies || []).slice(0, 3).map((tech, i) => (
                              <span key={i} className="px-2 py-0.5 bg-teal/20 text-teal text-xs rounded">
                                {tech}
                              </span>
                            ))}
                            {(project.technologies || []).length > 3 && (
                              <span className="text-xs text-white/40">+{project.technologies.length - 3}</span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex gap-2">
                            {project.demoLink && (
                              <a href={project.demoLink} target="_blank" rel="noopener noreferrer" className="text-teal text-xs hover:underline">
                                Demo
                              </a>
                            )}
                            {project.githubLink && (
                              <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="text-white/60 text-xs hover:underline">
                                GitHub
                              </a>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button 
                            onClick={() => openProjectModal(project)}
                            className="text-teal hover:text-bright-green mr-4 transition-colors"
                          >
                            Edit
                          </button>
                          <button 
                            onClick={() => handleDeleteProject(project._id)}
                            className="text-red-400 hover:text-red-300 transition-colors"
                          >
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

      {/* Blog Modal */}
      {showBlogModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-navy-light rounded-2xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-white mb-6">
              {editingBlog ? 'Edit Blog' : 'Create New Blog'}
            </h2>
            <form onSubmit={handleBlogSubmit} className="space-y-4">
              <div>
                <label className="block text-white/70 mb-2">Title</label>
                <input
                  type="text"
                  value={blogForm.title}
                  onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                  className="w-full bg-navy border border-white/20 rounded-lg px-4 py-3 text-white focus:border-teal outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-white/70 mb-2">Snippet (short preview)</label>
                <input
                  type="text"
                  value={blogForm.snippet}
                  onChange={(e) => setBlogForm({ ...blogForm, snippet: e.target.value })}
                  className="w-full bg-navy border border-white/20 rounded-lg px-4 py-3 text-white focus:border-teal outline-none"
                  maxLength={200}
                />
              </div>
              <div>
                <label className="block text-white/70 mb-2">Content</label>
                <textarea
                  value={blogForm.body}
                  onChange={(e) => setBlogForm({ ...blogForm, body: e.target.value })}
                  className="w-full bg-navy border border-white/20 rounded-lg px-4 py-3 text-white focus:border-teal outline-none min-h-[200px]"
                  required
                />
              </div>
              
              {/* Linked Projects */}
              <div>
                <label className="block text-white/70 mb-2">Link Projects</label>
                <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto p-2 bg-navy rounded-lg border border-white/10">
                  {projects.map((project) => (
                    <button
                      key={project._id}
                      type="button"
                      onClick={() => toggleLinkedProject(project._id)}
                      className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                        blogForm.linkedProjects.includes(project._id)
                          ? 'bg-teal text-white'
                          : 'bg-white/10 text-white/60 hover:bg-white/20'
                      }`}
                    >
                      {project.title}
                    </button>
                  ))}
                  {projects.length === 0 && (
                    <span className="text-white/40 text-sm">No projects available</span>
                  )}
                </div>
              </div>
              
              {/* Twitter Embeds */}
              <div>
                <label className="block text-white/70 mb-2">Twitter Embeds (max 5)</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="url"
                    value={twitterInput}
                    onChange={(e) => setTwitterInput(e.target.value)}
                    placeholder="https://twitter.com/user/status/..."
                    className="flex-1 bg-navy border border-white/20 rounded-lg px-4 py-2 text-white focus:border-teal outline-none text-sm"
                  />
                  <button
                    type="button"
                    onClick={addTwitterEmbed}
                    disabled={blogForm.twitterEmbeds.length >= 5}
                    className="px-4 py-2 bg-teal/20 text-teal rounded-lg hover:bg-teal/30 disabled:opacity-50"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {blogForm.twitterEmbeds.map((url, index) => (
                    <span key={index} className="flex items-center gap-1 px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs">
                      Tweet {index + 1}
                      <button type="button" onClick={() => removeTwitterEmbed(index)} className="text-red-400 hover:text-red-300">×</button>
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-end gap-4 pt-4">
                <button
                  type="button"
                  onClick={closeBlogModal}
                  className="px-6 py-3 text-white/60 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary px-6 py-3 rounded-xl text-white font-semibold"
                >
                  {editingBlog ? 'Update Blog' : 'Create Blog'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Project Modal */}
      {showProjectModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-navy-light rounded-2xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-white mb-6">
              {editingProject ? 'Edit Project' : 'Add New Project'}
            </h2>
            <form onSubmit={handleProjectSubmit} className="space-y-4">
              <div>
                <label className="block text-white/70 mb-2">Title</label>
                <input
                  type="text"
                  value={projectForm.title}
                  onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                  className="w-full bg-navy border border-white/20 rounded-lg px-4 py-3 text-white focus:border-teal outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-white/70 mb-2">Description</label>
                <textarea
                  value={projectForm.description}
                  onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                  className="w-full bg-navy border border-white/20 rounded-lg px-4 py-3 text-white focus:border-teal outline-none min-h-[100px]"
                  required
                />
              </div>
              
              {/* Technologies */}
              <div>
                <label className="block text-white/70 mb-2">Technologies (max 6)</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={techInput}
                    onChange={(e) => setTechInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTechnology())}
                    placeholder="React, Node.js, etc..."
                    className="flex-1 bg-navy border border-white/20 rounded-lg px-4 py-2 text-white focus:border-teal outline-none"
                  />
                  <button
                    type="button"
                    onClick={addTechnology}
                    disabled={projectForm.technologies.length >= 6}
                    className="px-4 py-2 bg-teal/20 text-teal rounded-lg hover:bg-teal/30 disabled:opacity-50"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {projectForm.technologies.map((tech, index) => (
                    <span key={index} className="flex items-center gap-1 px-3 py-1 bg-teal/20 text-teal rounded-lg text-sm">
                      {tech}
                      <button type="button" onClick={() => removeTechnology(index)} className="text-red-400 hover:text-red-300">×</button>
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Project Image */}
              <div>
                <label className="block text-white/70 mb-2">Project Image</label>
                <select
                  value={projectForm.localImage}
                  onChange={(e) => setProjectForm({ ...projectForm, localImage: e.target.value })}
                  className="w-full bg-navy border border-white/20 rounded-lg px-4 py-2 text-white focus:border-teal outline-none"
                >
                  <option value="">Select an image...</option>
                  {availableImages.map((img) => (
                    <option key={img} value={img}>{img}</option>
                  ))}
                </select>
                {availableImages.length === 0 && (
                  <p className="text-white/40 text-sm mt-1">
                    No images found. Upload images to /client/public/projects/
                  </p>
                )}
                {projectForm.localImage && (
                  <div className="mt-2">
                    <img 
                      src={`/projects/${projectForm.localImage}`} 
                      alt="Preview" 
                      className="h-24 rounded-lg object-cover"
                    />
                  </div>
                )}
              </div>
              
              {/* Links */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/70 mb-2">Demo Link</label>
                  <input
                    type="url"
                    value={projectForm.demoLink}
                    onChange={(e) => setProjectForm({ ...projectForm, demoLink: e.target.value })}
                    placeholder="https://demo-site.com"
                    className="w-full bg-navy border border-white/20 rounded-lg px-4 py-2 text-white focus:border-teal outline-none"
                  />
                </div>
                <div>
                  <label className="block text-white/70 mb-2">GitHub Link (optional)</label>
                  <input
                    type="url"
                    value={projectForm.githubLink}
                    onChange={(e) => setProjectForm({ ...projectForm, githubLink: e.target.value })}
                    placeholder="https://github.com/user/repo"
                    className="w-full bg-navy border border-white/20 rounded-lg px-4 py-2 text-white focus:border-teal outline-none"
                  />
                </div>
              </div>
              
              {/* Featured & Order */}
              <div className="flex gap-6 items-center">
                <label className="flex items-center gap-2 text-white cursor-pointer">
                  <input
                    type="checkbox"
                    checked={projectForm.featured}
                    onChange={(e) => setProjectForm({ ...projectForm, featured: e.target.checked })}
                    className="w-5 h-5 text-teal rounded"
                  />
                  Featured Project
                </label>
                <div className="flex items-center gap-2">
                  <label className="text-white/70">Order:</label>
                  <input
                    type="number"
                    value={projectForm.order}
                    onChange={(e) => setProjectForm({ ...projectForm, order: parseInt(e.target.value) || 0 })}
                    className="w-20 bg-navy border border-white/20 rounded-lg px-3 py-2 text-white focus:border-teal outline-none"
                  />
                </div>
              </div>
              
              <div className="flex justify-end gap-4 pt-4">
                <button
                  type="button"
                  onClick={closeProjectModal}
                  className="px-6 py-3 text-white/60 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary px-6 py-3 rounded-xl text-white font-semibold"
                >
                  {editingProject ? 'Update Project' : 'Create Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
