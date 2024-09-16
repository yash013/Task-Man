import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'https://task-man-0.vercel.app/',
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
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
      if (error.response.status === 401) {
        console.error("Unauthorized access. Please log in again.");
        localStorage.removeItem("token");
        // window.location.href = "/login"; // Uncomment if you want to redirect
      }
      throw new Error(error.response.data.message || "An error occurred");
    } else if (error.request) {
      throw new Error("No response received from server");
    } else {
      throw new Error("Error setting up the request");
    }
  }
};
