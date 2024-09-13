import axios from "axios";

const api = axios.create({
  baseURL: 'http://localhost:5000/',
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
    console.log(response.data)
    return response.data;
  } catch (error) {
    return error;
  }
};
