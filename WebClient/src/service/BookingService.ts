import { Booking } from "../types/Booking";

class BookingService {
  private authToken: string | null;
  private userId: string | null;

  constructor() {
    this.authToken = localStorage.getItem("authToken");
    this.userId = localStorage.getItem("userId");
  }

  async getBookings(): Promise<Booking[]> {
    const currentDate = new Date().toISOString();

    if (!this.authToken) {
      throw new Error("No authentication token found");
    } 

    if (!this.userId) {
      throw new Error("No userId available");
    } 

    try {
      const response = await fetch( `http://localhost:5000/api/bookings/pending`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.authToken}`,
          },
          body: JSON.stringify({
            UserId: this.userId,
            CurrentDate: currentDate,
          }),
        }
      );

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Error fetching bookings: ${errorMessage}`);
      }
      const responseJson = await response.json();
      return responseJson as Booking[];
    } catch (error) {
      throw new Error("Error fetching bookings");
    }
  }
}

export default new BookingService();
