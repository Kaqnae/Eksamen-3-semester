import { Institution } from "../model/Institution";
import InstitutionService from "../service/InstitutionService";
import { generateTimeIntervals } from "./timeUtils";

// Fetches institution data along with available booking intervals based on its operational hours
export const fetchInstitutionWithIntervals = async (
  institutionId: string
): Promise<{ institution: Institution; intervals: string[] }> => {
  // Instantiate the InstitutionService to interact with the API
  const institutionService = new InstitutionService();

  try {
    // Fetch institution details using the provided ID
    const institution = await institutionService.fetchInstitution(
      institutionId
    );

    // Destructure necessary fields from the institution data
    const { openTime, closeTime, bookingInterval } = institution;

    // Generate available booking intervals using utility function
    const intervals = generateTimeIntervals(
      openTime,
      closeTime,
      bookingInterval
    );

    // Return both the institution data and the generated intervals
    return { institution, intervals };
  } catch (error) {
    // Log any errors that occur during the fetching process
    console.error("Error fetching institution with intervals:", error);
    throw new Error(
      "An unexpected error occurred while fetching the institution details and intervals. Please try again later."
    );
  }
};
