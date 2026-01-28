import axios from 'axios';

// Base URL for API requests - proxy will forward to backend
const API_BASE_URL = '/api';

// Get all blogs
export const getAllBlogs = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/blogs`);
    return response.data;
  } catch (error) {
    console.error('Error fetching all blogs:', error);
    throw error;
  }
};

// Get a single blog by ID
export const getBlogById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/blogs/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching blog with id ${id}:`, error);
    throw error;
  }
};

// Create a new blog
export const createBlog = async (blogData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/blogs`, blogData);
    return response.data;
  } catch (error) {
    console.error('Error creating blog:', error);
    throw error;
  }
};

// Update an existing blog
export const updateBlog = async (id, blogData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/blogs/${id}`, blogData);
    return response.data;
  } catch (error) {
    console.error(`Error updating blog with id ${id}:`, error);
    throw error;
  }
};

// Delete a blog
export const deleteBlog = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/blogs/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting blog with id ${id}:`, error);
    throw error;
  }
};
