import { Booking } from "../model/Booking";

class BookingService {
  private authToken: string | null; // Authentication token for API calls
  private userId: string | null; // User ID for identifying the current user

  constructor() {
    // Fetch auth token and user ID from local storage during initialization
    this.authToken = localStorage.getItem("authToken");
    this.userId = localStorage.getItem("userId");
  }

  /**
   * Fetches pending bookings for the current user from the API.
   * @returns {Promise<Booking[]>} A promise that resolves with an array of Booking objects.
   * @throws An error if the authToken or userId is missing, or if the request fails.
   */
  async getBookings(): Promise<Booking[]> {
    const currentDate = new Date().toISOString(); // Get the current date in ISO format

    if (!this.authToken) {
      throw new Error("No authentication token found"); // Ensure auth token is available
    }

    if (!this.userId) {
      throw new Error("No userId available"); // Ensure user ID is available
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/bookings/pending`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.authToken}`, // Include auth token in headers
          },
          body: JSON.stringify({
            UserId: this.userId,
            CurrentDate: currentDate,
          }), // Pass user ID and current date in the request body
        }
      );

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Error fetching bookings: ${errorMessage}`); // Handle API errors
      }

      const responseJson = await response.json();
      return responseJson as Booking[]; // Parse and return the response as an array of bookings
    } catch (error) {
      throw new Error("Error fetching bookings"); // Handle unexpected errors
    }
  }

  /**
   * Deletes a specific booking by its ID.
   * @param {string} bookingId The ID of the booking to delete.
   * @returns {Promise<boolean>} A promise that resolves to true if the deletion is successful, false otherwise.
   * @throws An error if the authToken is missing or the request fails.
   */
  async deleteBooking(bookingId: string): Promise<boolean> {
    if (!this.authToken) {
      throw new Error("No authentication token found"); // Ensure auth token is available
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/bookings/${bookingId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.authToken}`, // Include auth token in headers
          },
        }
      );

      if (response.ok) {
        return true; // Return true if the response indicates success
      }
      return false; // Return false if the response indicates failure
    } catch (error) {
      throw new Error("Error deleting booking"); // Handle unexpected errors
    }
  }

  /**
   * Creates a new booking for a resource.
   * @param {string} resourceId The ID of the resource to book.
   * @param {string} date The date of the booking.
   * @param {string} startTime The start time of the booking.
   * @param {string} endTime The end time of the booking.
   * @returns {Promise<any>} A promise that resolves with the newly created booking.
   * @throws An error if the request fails or required data is missing.
   */
  async createBooking(resourceId: string, date: string, startTime: string, endTime: string): Promise<any> {
    const authToken = localStorage.getItem("authToken"); // Fetch auth token from local storage
    const userId = localStorage.getItem("userId"); // Fetch user ID from local storage
    const institutionId = localStorage.getItem("institutionId"); // Fetch institution ID from local storage

    try {
      const response = await fetch(`http://localhost:5000/api/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`, // Include auth token in headers
        },
        body: JSON.stringify({
          institutionId, // Include institution ID
          userId, // Include user ID
          resourceId, // Include resource ID
          date, // Include booking date
          startTime, // Include start time
          endTime, // Include end time
        }),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || "Couldn't create booking."); // Handle API errors
      }

      const newBooking: Booking = await response.json();
      return newBooking; // Return the newly created booking
    } catch (error) {
      throw new Error("An unexpected error occurred while creating the booking."); // Handle unexpected errors
    }
  }

  /**
   * Fetches all bookings for a specific resource.
   * @param {string} resourceId The ID of the resource to fetch bookings for.
   * @returns {Promise<any[]>} A promise that resolves with an array of bookings.
   * @throws An error if the request fails or required data is missing.
   */
  async fetchBookingByResource(resourceId: string): Promise<any[]> {
    const authToken = localStorage.getItem("authToken"); // Fetch auth token from local storage

    try {
      const response = await fetch(
        `http://localhost:5000/api/bookings/all?resourceId=${resourceId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`, // Include auth token in headers
          },
        }
      );

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || "Couldn't get bookings"); // Handle API errors
      }

      const data = await response.json();
      return data; // Return the fetched bookings
    } catch (error) {
      throw new Error("An unexpected error occurred. Please try again later."); // Handle unexpected errors
    }
  }
}

export default BookingService;