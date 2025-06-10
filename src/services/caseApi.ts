import apiClient from "./apiClient";

class AdminService {
  async getCases() {
    try {
      const response = await apiClient.get("/admin/cases");
      return response.data;
    } catch (error) {
      console.error("Error fetching admin cases:", error);
      throw error;
    }
  }

  async getAllcase() {
    try {
      const response = await apiClient.get("/admin/allcases");
      return response.data;
    } catch (error) {
      console.error("Error fetching all cases:", error);
      throw error;
    }
  }

//   async updateCase(caseId, status) {
//     try {
//       const response = await apiClient.put(`/admin/cases/${caseId}`, { status });
//       return response.data;
//     } catch (error) {
//       console.error("Error updating case status:", error);
//       throw error;
//     }
//   }
}

const adminService = new AdminService();
export default adminService;