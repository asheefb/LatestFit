import apiClient from "./apiClient";

export const saveMeasurement = (data) => apiClient.post("/measurements", data);
export const getMeasurements = () => apiClient.get("/measurements");

import { BASE_URL } from "../constants/Constants";

class MeasurementService {
  async addMeasurement(measurementData) {
    try {
      const response = await axios.post(
        `${BASE_URL}/measurements/add`,
        measurementData
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }

  async updateMeasurement(id, measurementData) {
    try {
      const response = await axios.put(
        `${BASE_URL}/measurements/update/${id}`,
        measurementData
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }

  async viewMeasurement(id) {
    try {
      const response = await axios.get(`${BASE_URL}/measurements/view/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }

  async viewMeasurementsOfCustomer(customerId) {
    try {
      const response = await axios.get(
        `${BASE_URL}/measurements/customer/${customerId}`
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
}

export default MeasurementService;

