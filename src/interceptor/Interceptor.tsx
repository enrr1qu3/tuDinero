import axios from "axios";
import { baseUrl } from "../api/base.api";
import { refreshToken, removeTokens } from "../TokenRefreshToken";
import {} from "../components/Logout/Logout";

const api = axios.create({
  baseURL: baseUrl,
});

api.interceptors.request.use(async (config: any) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

function getTokenFromLocalStorage(): string | null {
  const token = localStorage.getItem("access_token");
  return token ? token : null;
}

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    // let token;
    const storedToken = getTokenFromLocalStorage();

    // console.log("🚀 ~ storedToken~ 🚀", storedToken);
    if (storedToken !== "null") {
      // token = storedToken;
      const originalRequest = error.config;
      const statusCode = error.response ? error.response.status : null;

      if (statusCode === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const newToken = await refreshToken();
          if (newToken) {
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            return api(originalRequest);
          }
        } catch (error) {
          return Promise.reject(error);
        }
      }
    } else {
      console.log("El token es nulo");
      removeTokens();
      window.location.href = '/login';
      return Promise.reject(error);
    }
  }
);

export default api;
