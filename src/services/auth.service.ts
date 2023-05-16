import axios from "axios";
import { baseUrl } from "../api/base.api";
import { saveTokens } from "../TokenRefreshToken";

// const baseURl = 'https://rickandmortyapi.com/api/';

// const characterUrl = baseURl + 'character/';
// export const getMorty = () => {
//   return fetch(characterUrl + '2').then(res => res.json())
// }

class AuthService {
  login(username: string, password: string) {
    return axios
      .post(baseUrl + "Auth/WebAdm/Login", {
        username,
        password,
      })
      .then((response) => {
        console.log(response);
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data));
          saveTokens(response.data.token, response.data.refreshToken);
        }
        return response.data;
      });
  }

  logout(){
    localStorage.removeItem('user');
  }

  register(
    userName: string,
    password: string,
    email: string,
    firstName: string,
    lastNameP: string,
    lastNameM: string,
    roles: [string],
    birthDate: string
  ) {
    return axios.post(baseUrl + "Auth/WebAdm/Register", {
      userName,
      password,
      email,
      firstName,
      lastNameP,
      lastNameM,
      roles,
      birthDate,
    });
  }

  getCurrentUser() {
    const userStr = localStorage.getItem("user");
    if (userStr) return JSON.parse(userStr);

    return null;
  }
}

export default new AuthService();