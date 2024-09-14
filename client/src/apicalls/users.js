const { apiRequest } = require("./index");

export const RegisterUser = async (payload) => {
    try {
      const response = await apiRequest('POST', '/api/users/register', payload);
      return response;
    } catch (error) {
      console.error("Error during registration:", error);
      throw error;
    }
  };
export const LoginUser = async (payload) => apiRequest('POST', '/api/users/login', payload);
export const GetLoggedInUser = async () => apiRequest('GET', '/api/users/get-logged-in-user');