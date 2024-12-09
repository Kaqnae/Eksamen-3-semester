import {Booking} from "../model/Booking"

class BookingService {
  async fetchBookings(): Promise<any[]> {
    const userId = localStorage.getItem("userId");
    const authToken = localStorage.getItem("authToken");

    try {
      const response = await fetch(
        `http://localhost:5000/api/bookings/all?userId=${userId}`,
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
        throw new Error(errorMessage || "Couldn't get bookings");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error("An unexpected error occured. Please try again later");
    }
  }

 

  async createBooking(resourceId: string, date: string, startTime: string, endTime: string, active: boolean): Promise<any>{
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
          active,
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
