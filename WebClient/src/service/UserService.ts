import { User } from "../types/User";

export class UserService {
  private authToken: string | null;

  constructor() {
    this.authToken = localStorage.getItem("authToken");
  }

  async getUser(userId: string): Promise<User> {

    if (!this.authToken) {
      throw new Error("No authentication token found");
    } 

    try {
      const response = await fetch(`http://localhost:5000/api/users/${userId}`, {
        method: "GET",
        headers: { 
          "Content-Type": "application/json" ,
          Authorization: `Bearer ${this.authToken}`
        }
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Error fetching user data: ${errorMessage}`);
      }
      const responseJson = await response.json();
      return responseJson as User;
    } catch (error) {
      throw new Error("Error fetching user data");
    }
  }

  async updateUser(userId: string, user: User): Promise<boolean> {

    if (!this.authToken) {
      throw new Error("No authentication token found");
    } 
  
    try {
      const response = await fetch(`http://localhost:5000/api/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.authToken}`,
        },
        body: JSON.stringify(user),
      });
  
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Error updating user: ${errorMessage}`);
      }
  
      return true;
    } catch (error) {
      throw new Error("Error updating user");
    }
  }
}