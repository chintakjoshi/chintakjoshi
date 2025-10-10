export const CHATBOT_CONFIG = {
  // Make sure this matches your running backend
  API_URL: process.env.REACT_APP_CHATBOT_API_URL || 'http://localhost:8080/api/v1',

  // Simple authentication
  getAuthToken: async () => {
    try {
      const response = await fetch(`${CHATBOT_CONFIG.API_URL}/auth/simple`);

      if (!response.ok) {
        throw new Error(`Auth failed with status: ${response.status}`);
      }

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await response.text();
        throw new Error(`Expected JSON but got: ${text.substring(0, 100)}`);
      }

      const data = await response.json();

      // Store token in sessionStorage
      sessionStorage.setItem('chatbot_token', data.token);
      sessionStorage.setItem('chatbot_token_expiry', Date.now() + (data.expires_in * 1000));
      return data.token;
    } catch (error) {
      console.error('Auth failed:', error);
      return null;
    }
  },

  // Check if token is valid
  getValidToken: async () => {
    const token = sessionStorage.getItem('chatbot_token');
    const expiry = sessionStorage.getItem('chatbot_token_expiry');

    // Check if token exists and isn't expired
    if (token && expiry && Date.now() < parseInt(expiry)) {
      return token;
    }

    // Get new token
    return await CHATBOT_CONFIG.getAuthToken();
  }
};