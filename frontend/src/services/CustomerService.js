import { BASE_URL } from "../constants/Constants";

class CustomerService {
  getToken() {
    return localStorage.getItem("token");
  }

  getAuthHeaders() {
    return {
      Authorization: `Bearer ${this.getToken()}`,
    };
  }
  async addCustomer(customerData) {
    try {
      const response = await axios.post(
        `${BASE_URL}/customer/add`,
        customerData,
        { headers: this.getAuthHeaders() }
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }

  async viewAllCustomersBySearch(regex) {
    try {
      const response = await axios.get(
        `${BASE_URL}/customers/search?regex=${regex}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
}

export default CustomerService;
