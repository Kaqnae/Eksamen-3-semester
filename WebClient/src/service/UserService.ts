class UserService {
  async fetchBookings(): Promise<any[]> {
    try {
      const response = await fetch("http://localhost:5000/api/bookings/1", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || "Couldn't get bookings");
      }
      const data = await response.json();
      return data.token;
    } catch (error) {
      throw new Error("An unexpected error occured. Please try again later");
    }
  }
}

export default new UserService();
