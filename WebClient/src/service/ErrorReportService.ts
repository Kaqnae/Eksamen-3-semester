import { ErrorReport } from "../model/ErrorReport";

class ErrorReportService {
  // Stores the authentication token from session storage and the user ID from local storage.
  private authToken: string | null;
  private userId: string | null;

  constructor() {
    // Retrieve the auth token from session storage and the user ID from local storage when the service is instantiated.
    this.authToken = sessionStorage.getItem("authToken");
    this.userId = localStorage.getItem("userId");
  }

  // Method to create a new error report
  async createErrorReport(errorReport: ErrorReport): Promise<ErrorReport> {
    try {
      // Make a POST request to the backend API to create a new error report
      const response = await fetch(`http://localhost:5000/api/error-reports`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.authToken}`, // Include the authentication token in the request headers
        },
        body: JSON.stringify(errorReport), // Convert the error report object to a JSON string for the request body
      });

      // Check if the request was successful
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || "Couldn't create error reports");
      }

      // Parse and return the response JSON data
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error creating error report:", error);
      // Throw a generic error if something goes wrong
      throw new Error("An unexpected error occurred. Please try again later.");
    }
  }

  // Method to check if an error report is active for a specific resource ID
  async isErrorReportActive(resourceId: string): Promise<boolean> {
    try {
      // Make a GET request to the backend API to check the status of an error report for the given resource ID
      const response = await fetch(
        `http://localhost:5000/api/error-reports/active?resourceId=${resourceId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.authToken}`, // Include the authentication token in the request headers
          },
        }
      );

      // Check if the request was successful
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || "Couldn't fetch error report status");
      }

      // Parse and return the response JSON data indicating if the error report is active
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching error report status:", error);
      // Throw a generic error if something goes wrong
      throw new Error("An unexpected error occurred. Please try again later.");
    }
  }
}

export default ErrorReportService;
