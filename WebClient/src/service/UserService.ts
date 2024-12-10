import { User } from "../model/User";

class UserService {
  private authToken: string | null; // Authentication token for API requests
  private userId: string | null; // ID of the current user

  constructor() {
    // Fetch authentication token and user ID from local storage during initialization
    this.authToken = localStorage.getItem("authToken");
    this.userId = localStorage.getItem("userId");
  }

  /**
   * Fetches the user details for the currently authenticated user.
   * @returns {Promise<User>} A promise that resolves with the user data.
   * @throws An error if the authToken or userId is missing, or if the API request fails.
   */
  async getUser(): Promise<User> {
    if (!this.authToken) {
      throw new Error("No authentication token found"); // Ensure auth token is present
    }

    if (!this.userId) {
      throw new Error("No userId available"); // Ensure user ID is present
    }

    try {
      const response = await fetch(`http://localhost:5000/api/users/${this.userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json", // Specify JSON content type
          Authorization: `Bearer ${this.authToken}`, // Include auth token in headers
        },
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Error fetching user data: ${errorMessage}`); // Handle API errors
      }

      const responseJson = await response.json();
      return responseJson as User; // Parse and return the response as a User object
    } catch (error) {
      throw new Error("Error fetching user data"); // Handle unexpected errors
    }
  }

  /**
   * Updates the details of the currently authenticated user.
   * @param {User} user The updated user object containing the new details.
   * @returns {Promise<boolean>} A promise that resolves to true if the update is successful.
   * @throws An error if the authToken or userId is missing, or if the API request fails.
   */
  async updateUser(user: User): Promise<boolean> {
    if (!this.authToken) {
      throw new Error("No authentication token found"); // Ensure auth token is present
    }

    if (!this.userId) {
      throw new Error("No userId available"); // Ensure user ID is present
    }

    try {
      const response = await fetch(`http://localhost:5000/api/users/${this.userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json", // Specify JSON content type
          Authorization: `Bearer ${this.authToken}`, // Include auth token in headers
        },
        body: JSON.stringify(user), // Send the updated user details in the request body
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Error updating user: ${errorMessage}`); // Handle API errors
      }

      return true; // Return true if the update is successful
    } catch (error) {
      throw new Error("Error updating user"); // Handle unexpected errors
    }
  }
}

export default UserService;