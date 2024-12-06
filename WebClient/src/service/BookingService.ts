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
}

export default new BookingService();
