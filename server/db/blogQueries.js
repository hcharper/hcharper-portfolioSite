const Blog = require('../models/blog');

const createBlog = async (data) => {
  const blog = await Blog.create(data);
  return blog;
};

const getAllBlogs = async () => {
  return Blog.find().populate('user').populate('linkedProjects');
};

const getBlogById = async (id) => {
  return Blog.findById(id).populate('user').populate('linkedProjects');
};

const updateBlog = async (id, data) => {
  return Blog.findByIdAndUpdate(id, data, { new: true }).populate('linkedProjects');
};

const deleteBlog = async (id) => {
  return Blog.findByIdAndDelete(id);
};

module.exports = {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
};
