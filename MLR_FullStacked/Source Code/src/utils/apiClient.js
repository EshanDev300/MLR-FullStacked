// API URL automatically switches based on environment (.env or .env.production)
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

/**
 * A reusable fetch client for backend communication.
 * Ready for deployment and production use.
 */
export const apiClient = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });
    
    if (!response.ok) {
      throw new Error(`API Request Failed: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error("API Fetch Error:", error);
    throw error;
  }
};

// Example usage ready for backend integration:
export const fetchUsers = () => apiClient('/api/users');
export const submitOrder = (data) => apiClient('/api/orders', { method: 'POST', body: JSON.stringify(data) });
