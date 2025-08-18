import apiClient from "./apiClient";

export const saveMeasurement = (data) => apiClient.post("/measurements", data);
export const getMeasurements = () => apiClient.get("/measurements");
