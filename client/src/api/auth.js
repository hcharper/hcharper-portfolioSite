import axios from 'axios';

const API_BASE_URL = '/api/auth';

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
