import axios from "axios";

const api = axios.create({
  baseURL: 'https://task-man-back.vercel.app/'
});

export const apiRequest = async (method, url, payload) => {
  try {
    const response = await api({
      method,
      url,
      data: payload,
      headers: {
        "Content-Type": "application/json",
        "authorization": `Bearer ${localStorage.getItem("token")}`,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    return error;
  }
};