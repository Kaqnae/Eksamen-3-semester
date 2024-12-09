class ResourceService {
  async fetchResource(): Promise<any[]> {
    const userId = localStorage.getItem("userId");
    const authToken = localStorage.getItem("authToken");
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

  async fetchResourceDescription(resourceId: string): Promise<string>{
    const authToken = localStorage.getItem("authToken");

    try{
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

      if(!response.ok){
        const errorMessage = await response.text();
        throw new Error(errorMessage || "Failed to fetch resource description.");
      }

      const data = await response.json();
      return data.description;
    }catch(error){
      console.error("Error fetching resource description:", error)
      throw error;
    }
  }
}

export default new ResourceService();
