class LoginService {
  // Method to handle user login
  async login(username: string, password: string): Promise<void> {
    try {
      // Send a POST request to the login endpoint with the provided username and password
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }), // Include username and password in the request body
      });

      // Check if the response indicates a successful login
      if (!response.ok) {
        // If not, retrieve and throw an error message from the response
        const errorMessage = await response.text();
        throw new Error(errorMessage || "Login failed.");
      }

      // Parse the JSON response containing authentication data
      const data = await response.json();

      // Store the received authentication token and user information in local/session storage for later use
      sessionStorage.setItem("authToken", data.accessToken);
      localStorage.setItem("userId", data.userId);
      localStorage.setItem("institutionId", data.institutionId);
      localStorage.setItem("name", data.name);
    } catch (error) {
      // Log the error and throw a generic error message
      throw new Error("An unexpected error occurred. Please try again later");
    }
  }
}

// Export an instance of LoginService for use in other parts of the application
export default new LoginService();
