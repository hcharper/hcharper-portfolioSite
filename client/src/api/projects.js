import axios from 'axios';

// Use environment variable for production, fallback to proxy for development
const API_BASE_URL = process.env.REACT_APP_API_URL 
  ? `${process.env.REACT_APP_API_URL}/api`
  : '/api';

// Get all projects
export const getAllProjects = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/projects`);
    return response.data;
  } catch (error) {
    console.error('Error fetching all projects:', error);
    throw error;
  }
};

// Get featured projects only
export const getFeaturedProjects = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/projects/featured`);
    return response.data;
  } catch (error) {
    console.error('Error fetching featured projects:', error);
    throw error;
  }
};

// Get a single project by ID
export const getProjectById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/projects/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching project with id ${id}:`, error);
    throw error;
  }
};

// Create a new project (requires admin auth)
export const createProject = async (projectData, token) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/projects`, projectData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error('Error creating project:', error);
    throw error;
  }
};

// Update an existing project (requires admin auth)
export const updateProject = async (id, projectData, token) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/projects/${id}`, projectData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error(`Error updating project with id ${id}:`, error);
    throw error;
  }
};

// Delete a project (requires admin auth)
export const deleteProject = async (id, token) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/projects/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error(`Error deleting project with id ${id}:`, error);
    throw error;
  }
};

// Get list of available local project images
export const getProjectImages = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/projects/images`);
    return response.data;
  } catch (error) {
    console.error('Error fetching project images:', error);
    throw error;
  }
};
