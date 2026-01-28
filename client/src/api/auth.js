import axios from 'axios';

// Use environment variable for production, fallback to proxy for development
const API_BASE_URL = process.env.REACT_APP_API_URL 
  ? `${process.env.REACT_APP_API_URL}/api/auth`
  : '/api/auth';

// Register a new user
export const register = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/create-account`, userData);
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error.response?.data || error;
  }
};

// Login user
export const login = async (credentials) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, credentials);
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error.response?.data || error;
  }
};
