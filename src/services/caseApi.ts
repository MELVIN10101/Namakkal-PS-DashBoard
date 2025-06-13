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

// update case details api
  async updateCase(caseId: string, caseData: { 
    district?: string; 
    Police_Station?: string; 
    CR_NO?: string; 
    Section_of_law?: string; 
    Crime_type?: string; 
    Year?: number; 
    Accused_Name?: string; 
    Accused_Nick_Name?: string; 
    Accused_Gender?: string;
    Guardian?: string;
    Accused_Age?: string;
    Accused_Address?: string;
  }) {
    try {
      const response = await apiClient.put(`/auth/data/update/${caseId}`, caseData);
      // console.log(caseData)
      return response.data;
    } catch (error) {
      console.error("Error updating case:", error);
      throw error;
    }
  }
async deleteCase(caseId: string) {
    try {
      const response = await apiClient.delete(`/auth/data/delete/${caseId}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting case:", error);
      throw error;
    }
  }
  async crimetypecount() {
    try {
      const response = await apiClient.get("/auth/data/crimetypecount");
      return response.data;
    } catch (error) {
      console.error("Error fetching crime type count:", error);
      throw error;
    }
  }

  async caseCount() {
    try {
      const response = await apiClient.get("/auth/data/casecount");
      return response.data;
    } catch (error) {
      console.error("Error fetching case count:", error);
      throw error;
    }
  }


}
  


const adminService = new AdminService();
export default adminService;