export const CHATBOT_CONFIG = {
  API_URL: process.env.REACT_APP_CHATBOT_API_URL,
  API_KEY: process.env.REACT_APP_CHATBOT_API_KEY,

  getAuthToken: async () => {
    try {
      const response = await fetch(`${CHATBOT_CONFIG.API_URL}/auth`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ api_key: CHATBOT_CONFIG.API_KEY })
      });

      if (!response.ok) {
        throw new Error(`Auth failed with status: ${response.status}`);
      }

      const data = await response.json();
      sessionStorage.setItem('chatbot_token', data.token);
      sessionStorage.setItem('chatbot_token_expiry', Date.now() + (data.expires_in * 1000));
      return data.token;
    } catch (error) {
      console.error('Auth failed:', error);
      return null;
    }
  },

  getValidToken: async () => {
    const token = sessionStorage.getItem('chatbot_token');
    const expiry = sessionStorage.getItem('chatbot_token_expiry');

    if (token && expiry && Date.now() < parseInt(expiry)) {
      return token;
    }
    return await CHATBOT_CONFIG.getAuthToken();
  }
};