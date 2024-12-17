// Function to generate time intervals within a given open and close time span with a specified interval
export const generateTimeIntervals = (
  openTime: string, // Opening time of the institution (e.g., "08:00")
  closeTime: string, // Closing time of the institution (e.g., "17:00")
  interval: number // Interval duration in minutes (e.g., 30)
) => {
  const intervals: string[] = [];
  const today = new Date().toISOString().split("T")[0]; // Today's date
  let current = new Date(`${today}T${openTime}:00`); // Start time
  const end = new Date(`${today}T${closeTime}:00`); // End time

  // Generate intervals until the end time is reached
  while (current <= end) {
    intervals.push(current.toTimeString().slice(0, 5)); // Format time as "HH:MM"
    current = new Date(current.getTime() + interval * 60000); // Increment by the interval duration in milliseconds
  }

  return intervals; // Return the generated time intervals
};

// Function to check if a booking time overlaps with any existing bookings
export const isOverlapping = (
  start: string, // Start time of the proposed booking (e.g., "10:00")
  end: string, // End time of the proposed booking (e.g., "11:00")
  bookings: any[] // Array of existing bookings with startTime and endTime properties
): boolean => {
  // Iterate through each booking to check for overlaps
  return bookings.some((booking) => {
    // Check if the proposed start and end times overlap with existing booking times
    return (
      (start >= booking.startTime && start < booking.endTime) || // Overlaps with booking's start and end
      (end > booking.startTime && end <= booking.endTime) || // Overlaps with booking's end time
      (start <= booking.startTime && end >= booking.endTime) // Contains the existing booking
    );
  });
};

// Function to generate an array of date strings for the next 7 days
export const generateDateOptions = () => {
  const dateOptions = [];
  const today = new Date(); // Current date
  for (let i = 0; i < 7; i++) {
    const dates = new Date(today);
    dates.setDate(today.getDate() + i); // Increment the date by the number of days ahead
    dateOptions.push(dates.toISOString().split("T")[0]); // Format the date as "YYYY-MM-DD"
  }
  return dateOptions; // Return the array of formatted date strings
};
