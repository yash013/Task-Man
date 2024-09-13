import axios from "axios";

const api = axios.create({
  baseURL: 'https://task-man-back.vercel.app/api',
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  }
});

export const apiRequest = async (method, url, payload) => {
  try {
    const token = localStorage.getItem("token");
    const headers = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await api({
      method,
      url,
      data: payload,
      headers: headers,
    });

    return response.data;
  } catch (error) {
    console.error("API request error:", error.response || error);

    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status === 401) {
        // Handle unauthorized access (e.g., redirect to login page)
        console.error("Unauthorized access. Please log in again.");
        // You might want to clear the token and redirect to login page here
        localStorage.removeItem("token");
        // window.location.href = "/login"; // Uncomment if you want to redirect
      }
      throw new Error(error.response.data.message || "An error occurred");
    } else if (error.request) {
      // The request was made but no response was received
      throw new Error("No response received from server");
    } else {
      // Something happened in setting up the request that triggered an Error
      throw new Error("Error setting up the request");
    }
  }
};