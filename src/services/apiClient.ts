import axios from "axios";

// Create base axios instance for API requests
const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:3001",
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;