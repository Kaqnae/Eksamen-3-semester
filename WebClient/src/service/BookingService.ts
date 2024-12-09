import {Booking} from "../model/Booking"

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

  async deleteBooking(bookingId: string): Promise<boolean> {

    if (!this.authToken) {
      throw new Error("No authentication token found");
    } 

    try {
      const response = await fetch(
        `http://localhost:5000/api/bookings/${bookingId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.authToken}`,
          },
        }
      );
  
      if (response.ok) {
        return true; 
      }
      return false; 
    } catch (error) {
      throw new Error("Error deleting booking");
    }
  }

  async createBooking(resourceId: string, date: string, startTime: string, endTime: string): Promise<any>{
    const authToken = localStorage.getItem("authToken");
    const userId = localStorage.getItem("userId");
    const institutionId = localStorage.getItem("institutionId");

    try{
      const response = await fetch(`http://localhost:5000/api/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          institutionId,
          userId,
          resourceId,
          date,
          startTime,
          endTime,
        }),
      });

      if(!response.ok){
        const errorMessage = await response.text();
        throw new Error(errorMessage || "Couldn't create booking.");
      }

      const newBooking: Booking = await response.json();
      return newBooking;
    }catch(error){
      throw new Error("An unexpected error occurred while creatin the booking.");
    }
  }

  async fetchBookingByResource(resourceId: string): Promise<any[]>{
    const authToken = localStorage.getItem("authToken");

    try{
      const response = await fetch(
        `http://localhost:5000/api/bookings/all?resourceId=${resourceId}`,
        {
          method: "GET",
          headers:{
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      if (!response.ok){
        const errorMessage = await response.text();
        throw new Error(errorMessage || "Couldn't get bookings");
      }
      const data = await response.json();
      return data;
    }catch(error){
      throw new Error("An unexpected error occurred. Please try again later");
    }
  }
}

export default new BookingService();
