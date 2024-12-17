import ResourceService from "../service/ResourceService";

// Fetches details for a specific resource based on its ID
export const fetchResourceDetails = async (
  resourceId: string
): Promise<{ imageUrl: string; description: string }> => {
  // Instantiate the ResourceService to interact with the API
  const resourceService = new ResourceService();

  try {
    // Fetch resource details using the provided resource ID
    const details = await resourceService.fetchResourceDetails(resourceId);

    // If the details are not returned (e.g., resource not found), throw an error
    if (!details) {
      throw new Error("Failed to fetch details");
    }

    // Return the fetched resource details containing image URL and description
    return details;
  } catch (error) {
    // Log any errors that occur during the fetching process
    console.error("Error fetching resource details:", error);
    // Throw a user-friendly error message for the caller
    throw new Error(
      "An unexpected error occurred while fetching the resource details. Please try again later."
    );
  }
};
