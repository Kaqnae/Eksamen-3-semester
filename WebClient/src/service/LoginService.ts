class LoginService {
  async login(username: string, password: string): Promise<void> {
    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || "Login failed.");
      }
      const data = await response.json();
      sessionStorage.setItem("authToken", data.accessToken);
      localStorage.setItem("userId", data.userId);
      localStorage.setItem("institutionId", data.institutionId);
      localStorage.setItem("name", data.name);
    } catch (error) {
      throw new Error("An unexpected error occured. Please try again later");
    }
  }
}

export default new LoginService();
