import apiClient from "./apiClient";

class AdminService {
  async insertCase(caseData: { district: string; Police_Station: string; CR_NO: string; Section_of_law: string; Crime_type: string; Year: number; Accused_Name: string; Accused_Nick_Name: string; Accused_Gender: string; Guardian: string; Accused_Age: string; Accused_Address: string; }) {
    try {
      const response = await apiClient.post("/auth/data/newdata", caseData);
      return response.data;
      
    } catch (error) {
      console.error("Error inserting case:", error);
      throw error;
    }
  }

  async getAllcase() {
    try {
      const response = await apiClient.get("/auth/data/getdata");
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