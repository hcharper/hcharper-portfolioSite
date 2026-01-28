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

// Create a new blog (requires auth token)
export const createBlog = async (blogData, token) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/blogs`, blogData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error('Error creating blog:', error);
    throw error;
  }
};

// Update an existing blog (requires auth token)
export const updateBlog = async (id, blogData, token) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/blogs/${id}`, blogData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error(`Error updating blog with id ${id}:`, error);
    throw error;
  }
};

// Delete a blog (requires auth token)
export const deleteBlog = async (id, token) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/blogs/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error(`Error deleting blog with id ${id}:`, error);
    throw error;
  }
};
