import { isOverlapping } from "./timeUtils";

// Function to calculate available start times for a given date based on existing bookings
export const calculateAvailableStartTimes = (
  intervals: string[], // Array of time intervals
  bookings: any[], // Array of existing bookings
  date: string // The date for which to calculate available times
): string[] => {
  // Filters intervals to include only those that are not overlapping with existing bookings on the given date
  return intervals.filter((interval) =>
    bookings.every((booking) => {
      // If the booking date is different from the specified date, it doesn't affect availability
      if (booking.date !== date) return true;
      // Check if the interval overlaps with any existing booking for the specified date
      return !isOverlapping(interval, interval, bookings);
    })
  );
};

// Function to calculate available end times for a given start time and date based on existing bookings
export const calculateAvailableEndTimes = (
  intervals: string[], // Array of time intervals
  selectedStartTime: string, // Selected start time for a booking
  bookings: any[], // Array of existing bookings
  date: string // The date for which to calculate available times
): string[] => {
  if (!selectedStartTime) return [];

  // Filters intervals to include only those that are not overlapping with any booking that starts after the selected start time on the given date
  return intervals.filter((interval) =>
    bookings.every((booking) => {
      // If the booking date is different from the specified date, it doesn't affect availability
      if (booking.date !== date) return true;
      // Check if the interval overlaps with any booking starting after the selected start time for the specified date
      return !isOverlapping(selectedStartTime, interval, bookings);
    })
  );
};
