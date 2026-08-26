import { apiClient } from './apiClient';

const CURRENT_USER_KEY = 'cooksmart_current_user';

// Mock system accounts in local logic are removed;
// Everything now routes to the Express backend via apiClient!

export const getRegisteredUsers = () => {
  // We no longer read all users locally. If you need a list of users (e.g. for Admin),
  // you would create a new endpoint like /api/users and fetch it.
  return [];
};

export const registerUser = async (name, email, password, phone, country) => {
  try {
    const newUser = await apiClient('/api/users/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password, phone, country })
    });
    return newUser;
  } catch (error) {
    // Pass the error message back to the UI
    if (error.message.includes('Failed to fetch')) {
      throw new Error('Could not connect to backend server. Make sure it is running on port 5000!');
    }
    throw new Error('Email is already registered or invalid data provided.');
  }
};

export const loginUser = async (email, password) => {
  try {
    const sessionUser = await apiClient('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });
    
    // Save token/session securely (for this demo, we save the user object)
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(sessionUser));
    window.dispatchEvent(new Event('cooksmart_auth_changed'));
    return sessionUser;
  } catch (error) {
    if (error.message.includes('Failed to fetch')) {
      throw new Error('Could not connect to backend server. Make sure it is running on port 5000!');
    }
    throw new Error('Invalid email or password.');
  }
};

export const oauthLogin = async (provider) => {
  // This would typically hit an OAuth endpoint on the backend.
  // For now, we simulate the backend response:
  const sessionUser = { 
    id: `oauth-${Date.now()}`, 
    name: `${provider} User`, 
    email: `user@${provider.toLowerCase()}.com`, 
    role: 'user' 
  };
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(sessionUser));
  window.dispatchEvent(new Event('cooksmart_auth_changed'));
  return sessionUser;
};

export const getCurrentUser = () => {
  // In a real app, you would fetch /api/users/me with a JWT token here.
  const data = localStorage.getItem(CURRENT_USER_KEY);
  return data ? JSON.parse(data) : null;
};

export const logoutUser = () => {
  localStorage.removeItem(CURRENT_USER_KEY);
  window.dispatchEvent(new Event('cooksmart_auth_changed'));
};
