import { User } from "../model/User";

class UserService {
  private authToken: string | null;
  private userId: string | null;

  constructor() {
    this.authToken = localStorage.getItem("authToken");
    this.userId = localStorage.getItem("userId");
  }

  async getUser(): Promise<User> {

    if (!this.authToken) {
      throw new Error("No authentication token found");
    } 

    if (!this.userId) {
      throw new Error("No userId available");
    } 

    try {
      const response = await fetch(`http://localhost:5000/api/users/${this.userId}`, {
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

  async updateUser(user: User): Promise<boolean> {

    if (!this.authToken) {
      throw new Error("No authentication token found");
    } 

    if (!this.userId) {
      throw new Error("No userId available");
    } 
  
    try {
      const response = await fetch(`http://localhost:5000/api/users/${this.userId}`, {
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

export default new UserService();