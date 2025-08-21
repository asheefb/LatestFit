import apiClient from "./apiClient";

export const saveMeasurement = (data) => apiClient.post("/measurements", data);
export const getMeasurements = () => apiClient.get("/measurements");

import { BASE_URL } from "../constants/Constants";
import axios from "axios";

class MeasurementService {
  getToken() {
    return localStorage.getItem("token");
  }

  getAuthHeaders() {
    return {
      Authorization: `Bearer ${this.getToken()}`,
    };
  }

  async addMeasurement(measurementData) {
    try {
      console.log("auth", this.getAuthHeaders());
      const response = await axios.post(
        `${BASE_URL}/measurement/add`,
        measurementData,
        { headers: this.getAuthHeaders() }
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }

  async updateMeasurement(id, measurementData) {
    try {
      const response = await axios.put(
        `${BASE_URL}/measurement/update?id=${id}`,
        measurementData,
        {
          headers: {
            Authorization: `Bearer ${this.getToken()}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }

  async viewMeasurements(customerId) {
    try {
      const response = await axios.get(
        `${BASE_URL}/measurement/view?customerId=${customerId}`,
        {
          headers: {
            Authorization: `Bearer ${this.getToken()}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }

  async dashboardItems(userId) {
    try {
      const response = await axios.get(
        `${BASE_URL}/measurement/dashboard?userId=${userId}`,
        {
          headers: {
            Authorization: `Bearer ${this.getToken()}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
}

export default MeasurementService;
