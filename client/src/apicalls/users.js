const { apiRequest } = require(".");

export const RegisterUser = async (payload) => {
    try {
      const response = await apiRequest('post', '/api/users/register', payload);
      return response;
    } catch (error) {
      console.error("Error during registration:", error);
      throw error;
    }
  };
export const LoginUser = async (payload) => apiRequest('post', '/api/users/login', payload);
export const GetLoggedInUser = async () => apiRequest('get', '/api/users/get-logged-in-user');