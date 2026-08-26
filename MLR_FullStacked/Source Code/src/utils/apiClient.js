// On Vercel, the API routes live at the same origin (/api/...).
// Locally during dev, they hit localhost:5000.
const API_URL = import.meta.env.VITE_API_URL || '';

export const apiClient = async (endpoint, options = {}) => {
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || `API error: ${response.statusText}`);
  }

  return data;
};
