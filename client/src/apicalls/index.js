import axios from "axios";

const api = axios.create({
  baseURL: ['http://task-man-back.vercel.app/', 'https://task-man-back.vercel.app/', 'http://localhost:5000'],
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  }
});

export const apiRequest = async (method, url, payload) => {
  try {
    const response = await api({
      method,
      url,
      data: payload,
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error;  // Rethrow the error so it can be caught and handled by the caller
  }
};