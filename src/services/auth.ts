import apiClient from "./apiClient";

// AuthService class for handling authentication-related API calls
class AuthService {
  // User login API
  async login(userlogin: {user_name: string, password: string} ) {
    try {
      const response = await apiClient.post("auth/api/login", userlogin);
    //   console.log("Login response:", response.data);
      
      if (response.data && response.data.message === 'Login successful') {
        // console.log("Login successful, user data:", response.data.user);
      } else {
        // console.warn("Unexpected login response format:", response.data);
      }
      
      return response.data;
    } catch (error) {
      console.error("Error during login:", error);
      throw error;
    }
  }
  // User registration API
  async register(userData: { user_name: string; password: string; user_role: string; email?: string }) {
    try {
      const response = await apiClient.post("/auth/api/register", userData);
      return response.data;
    } catch (error) {
      console.error("Error during registration:", error);
      throw error;
    }
  }
  async getallusers() {
    try {
      const response = await apiClient.get("/auth/api/getallusers");
      return response.data;
    } catch (error) {
      console.error("Error fetching all users:", error);
      throw error;
    }
  }
}

export default new AuthService();