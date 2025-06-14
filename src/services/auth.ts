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
  }  // User registration API
  async register(userData: { 
    user_name: string; 
    password: string; 
    user_role: string; 
    email?: string;
    case_entry?: string;
    case_view?: string;
    analytics?: string;
    chat?: string;
    // For backward compatibility
    case_entry_access?: number;
    case_view_access?: number;
    analytics_access?: number;
    chat_access?: number;
  }) {
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
  }  async upadteuser(userData: {
    id: string;
    user_name: string;
    password?: string;
    user_role: string;
    case_entry?: string;
    case_view?: string;
    analytics?: string;
    chat?: string;
    updated_by?: string;
    // For backward compatibility
    case_entry_access?: number;
    case_view_access?: number;
    analytics_access?: number;
    chat_access?: number;
  }) {
    try {
      // Extract id from userData for URL parameter
      const { id, ...updateData } = userData;
      const response = await apiClient.put(`/auth/api/updateuser/${id}`, updateData);
      return response.data;
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  }
  async deleteuser(userId: string) {
    try {
      const response = await apiClient.delete(`/auth/api/deleteuser/${userId}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting user:", error);
      throw error;
    }
  }
}

export default new AuthService();