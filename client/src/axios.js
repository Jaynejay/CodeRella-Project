import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/api",
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  const isAuthEndpoint =
    config.url.includes("/auth/signup") || config.url.includes("/auth/login");

  if (token && !isAuthEndpoint) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  return config;
});

export default instance;
