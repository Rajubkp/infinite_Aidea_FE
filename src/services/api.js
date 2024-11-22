import axios from 'axios';

const refreshToken = async () => {
  try {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) throw new Error('No refresh token available.');

    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/auth/refresh-tokens`,
      { refreshToken },
    );

    const { access, refresh } = response.data.tokens;

    // Update tokens in localStorage
    localStorage.setItem('accessToken', access.token);
    localStorage.setItem('refreshToken', refresh.token);

    return access.token; // Return the new access token
  } catch (err) {
    console.error('Failed to refresh token:', err);
    throw err;
  }
};
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

// Request interceptor to include the access token
api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Response interceptor to handle expired tokens
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Check if the error is due to an expired access token
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true; // Prevent infinite retry loops

      try {
        const newAccessToken = await refreshToken();

        // Update the Authorization header with the new token
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        // Retry the original request
        return api(originalRequest);
      } catch (err) {
        // If refreshing the token fails, redirect to login or show an error
        console.error('Failed to refresh token:', err);
        localStorage.clear(); // Clear tokens and user data
        window.location.href = '/auth/login'; // Redirect to login
      }
    }

    return Promise.reject(error);
  },
);

export default api;
