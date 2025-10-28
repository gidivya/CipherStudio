// API Configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: `${API_BASE_URL}/api/auth/login`,
    REGISTER: `${API_BASE_URL}/api/auth/register`,
    ME: `${API_BASE_URL}/api/auth/me`,
  },
  CODE: {
    BASE: `${API_BASE_URL}/api/code`,
    USER: (userId) => `${API_BASE_URL}/api/code/user/${userId}`,
  },
  COMPILE: {
    EXECUTE: `${API_BASE_URL}/api/compile/execute`,
  },
};

export default API_BASE_URL;
