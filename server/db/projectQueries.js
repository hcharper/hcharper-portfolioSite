const Project = require('../models/project');

const createProject = async (data) => {
  const project = await Project.create(data);
  return project;
};

const getAllProjects = async () => {
  // Sort by featured first, then by order, then by createdAt
  return Project.find().sort({ featured: -1, order: 1, createdAt: -1 });
};

const getFeaturedProjects = async () => {
  // Only return projects marked as featured
  return Project.find({ featured: true }).sort({ order: 1, createdAt: -1 });
};

const getProjectById = async (id) => {
  return Project.findById(id);
};

const updateProject = async (id, data) => {
  return Project.findByIdAndUpdate(id, data, { new: true });
};

const deleteProject = async (id) => {
  return Project.findByIdAndDelete(id);
};

module.exports = {
  createProject,
  getAllProjects,
  getFeaturedProjects,
  getProjectById,
  updateProject,
  deleteProject,
};
