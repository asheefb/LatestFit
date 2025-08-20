import axios from "axios";
import { BASE_URL } from "../constants/Constants";

class AuthService {
  async login(email, password) {
    try {
      const response = await axios.post(`${BASE_URL}/auth/login`, {
        email,
        password,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }

  async register(userData) {
    try {
      const response = await axios.post(`${BASE_URL}/auth/register`, userData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
}

// export as singleton
export default new AuthService();
