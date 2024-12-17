class ResourceService {
  private authToken: string | null; // Stores the authentication token for API requests
  private userId: string | null; // Stores the user ID for identifying the current user

  constructor() {
    // Fetch auth token and user ID from sessionStorage/localStorage when the service is instantiated
    this.authToken = sessionStorage.getItem("authToken");
    this.userId = localStorage.getItem("userId");
  }

  // Fetches all resources associated with the current institution
  async fetchResource(): Promise<any[]> {
    const institutionId = localStorage.getItem("institutionId");

    try {
      const response = await fetch(
        `http://localhost:5000/api/resources/all?institutionId=${institutionId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.authToken}`,
          },
        }
      );

      if (!response.ok) {
        // If the response is not successful, throw an error with the response text
        const errorMessage = await response.text();
        throw new Error(errorMessage || "Couldn't get resources");
      }

      // Parse and return the JSON data from the response
      const data = await response.json();
      return data;
    } catch (error) {
      // Handle unexpected errors during the request
      throw new Error("An unexpected error occurred. Please try again later");
    }
  }

  // Fetches detailed information about a specific resource
  async fetchResourceDetails(
    resourceId: string
  ): Promise<{ imageUrl: string; description: string } | null> {
    try {
      const response = await fetch(
        `http://localhost:5000/api/resources/${resourceId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.authToken}`,
          },
        }
      );

      if (!response.ok) {
        // If the response is not successful, throw an error with the response text
        const errorMessage = await response.text();
        throw new Error(
          errorMessage || "Failed to fetch resource description."
        );
      }

      // Parse and return the JSON data from the response
      const data = await response.json();
      return {
        imageUrl: data.imageUrl,
        description: data.description,
      };
    } catch (error) {
      // Log the error and throw it for further handling
      console.error("Error fetching resource description:", error);
      throw error;
    }
  }

  // Fetches the name of a specific resource by its ID
  async fetchResourceName(resourceId: string): Promise<string | null> {
    if (!this.authToken) {
      // Ensure that an authentication token is available before making the request
      throw new Error("No authentication token found");
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/resources/${resourceId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.authToken}`,
          },
        }
      );

      if (!response.ok) {
        // If the response is not successful, return null indicating the resource name could not be fetched
        return null;
      }

      // Parse and return the resource name from the JSON response
      const data = await response.json();
      return data.name;
    } catch (error) {
      // Log the error and throw it for further handling
      console.error("Error fetching resource name:", error);
      throw error;
    }
  }
}

// Export the `ResourceService` class as the default export
export default ResourceService;
