import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/users";

export const getUsers = async () => {
  const response = await axios.get(API_BASE_URL);
  return response.data;
};
