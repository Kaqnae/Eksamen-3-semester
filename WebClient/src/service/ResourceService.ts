class ResourceService {
  private authToken: string | null; // Authentication token for API calls
  private userId: string | null; // User ID for identifying the current user

  constructor() {
    // Fetch auth token and user ID from local storage during initialization
    this.authToken = sessionStorage.getItem("authToken");
    this.userId = localStorage.getItem("userId");
  }

  async fetchResource(): Promise<any[]> {
    const userId = localStorage.getItem("userId");
    const authToken = sessionStorage.getItem("authToken");
    const institutionId = localStorage.getItem("institutionId");

    try {
      const response = await fetch(
        `http://localhost:5000/api/resources/all?institutionId=${institutionId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || "Couldn't get resources");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error("An unexpected error occured. Please try again later");
    }
  }

  async fetchResourceDescription(resourceId: string): Promise<string> {
    const authToken = localStorage.getItem("authToken");

    try {
      const response = await fetch(
        `http://localhost:5000/api/resources/${resourceId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(
          errorMessage || "Failed to fetch resource description."
        );
      }

      const data = await response.json();
      return data.description;
    } catch (error) {
      console.error("Error fetching resource description:", error);
      throw error;
    }
  }

async fetchResourceName(resourceId: string): Promise<string> {

  if (!this.authToken) {
    throw new Error("No authentication token found"); // Ensure auth token is available
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
      const errorMessage = await response.text();
      throw new Error(
        errorMessage || "Failed to fetch resource name."
      );
    }

      const data = await response.json();
      return data.name;
    } catch (error) {
      console.error("Error fetching resource name:", error);
      throw error;
    }
  }
}

export default ResourceService;
