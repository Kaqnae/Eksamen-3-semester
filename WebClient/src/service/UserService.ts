import { User } from "../types/User";

export class UserService {

  async getUser(userId: string): Promise<User> {
    const authToken = localStorage.getItem("authToken");

    if (!authToken) {
      throw new Error("No authentication token found");
    }

    try {
      const response = await fetch(`http://localhost:5000/api/users/${userId}`, {
        method: "GET",
        headers: { 
          "Content-Type": "application/json" ,
          Authorization: `Bearer ${authToken}`
        }
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Error fetching user data: ${errorMessage}`);
      }
      const responseJson = await response.json();
      console.log(responseJson);
      return responseJson as User;
    } catch (error) {
      throw new Error("Error fetching user data");
    }
  }
}