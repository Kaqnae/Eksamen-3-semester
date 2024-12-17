import { Institution } from "../model/Institution";

class InstitutionService {
  // Method to fetch institution details based on institution ID
  async fetchInstitution(institutionId: string): Promise<Institution> {
    const authToken = sessionStorage.getItem("authToken"); // Retrieve authentication token from session storage for authorized API access

    try {
      // Make a GET request to the backend API to fetch the institution data
      const response = await fetch(
        `http://localhost:5000/api/institutions/${institutionId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`, // Include the authentication token in the request headers
          },
        }
      );

      // Check if the request was successful
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || "Couldn't fetch institution data.");
      }

      // Parse and return the institution data
      const data: Institution = await response.json();
      return data;
    } catch (error) {
      // Log the error and throw a general error message
      throw new Error("An unexpected error occurred. Please try again later");
    }
  }
}

export default InstitutionService;
