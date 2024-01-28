const API_BASE_URL = 'http://localhost:4000/';

const HttpService = {
  register: async (userDetails) => {
    try {
      const response = await fetch(`${API_BASE_URL}auth/registration`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userDetails),
      });

      const responseData = await response.json();

      return responseData;
    } catch (error) {
      console.error('An error occurred:', error);
    }
  },

  login: async (userDetails) => {
    try {
      const response = await fetch(`${API_BASE_URL}auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userDetails),
      });

      const responseData = await response.json();

      return responseData;
    } catch (error) {
      console.error('An error occurred:', error);
    }
  },
};

export default HttpService;
