import BookingService from "../service/BookingService";
import { isOverlapping } from "./timeUtils";

// Fetches all bookings for a specific resource on a given date
export const fetchBookingResource = async (
  resourceId: string,
  date: string
): Promise<any[]> => {
  try {
    // Create a new instance of the BookingService and call its method to fetch bookings
    return await new BookingService().fetchBookingByResource(resourceId, date);
  } catch (error) {
    // Log any errors that occur during the fetch operation
    console.error("Error fetching bookings:", error);
    throw new Error(
      "An unexpected error occurred while fetching bookings. Please try again later."
    );
  }
};

// Creates a new booking for a specific resource on a given date and time
export const createBooking = async (
  resourceId: string,
  date: string,
  startTime: string,
  endTime: string,
  bookings: any[]
): Promise<void> => {
  // Check if the selected time overlaps with any existing bookings
  if (isOverlapping(startTime, endTime, bookings)) {
    throw new Error(
      "The selected time overlaps with an existing booking. Please choose a different time"
    );
  }

  try {
    // Create a new instance of the BookingService and call its method to create a new booking
    await new BookingService().createBooking(
      resourceId,
      date,
      startTime,
      endTime
    );
  } catch (error) {
    // Log any errors that occur during the booking creation
    console.error("Error creating booking:", error);
    throw new Error(
      "An unexpected error occurred while creating the booking. Please try again later."
    );
  }
};
