import api from "./interceptor/Interceptor";

export const saveTokens = (accessToken: string, refreshToken: string) => {
    localStorage.setItem("access_token", accessToken);
    localStorage.setItem("refresh_token", refreshToken);
  };
  
  export const getAccessToken = () => {
    return localStorage.getItem("access_token");
  };
  
  export const getRefreshToken = () => {
    return localStorage.getItem("refresh_token");
  };

  export const removeTokens = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");
    localStorage.removeItem("username");
  };
  
  export const refreshToken = async () => {
    const refreshToken = getRefreshToken();
    const token = getAccessToken();
    if (refreshToken) {
      try {
        const response = await api.post("Auth/RefreshToken", { token, refreshToken });
        saveTokens(response.data.token, response.data.refreshToken);
        return response.data.token;
      } catch (error) {
        removeTokens();
        throw error;
      }
    }
    return null;
  };
