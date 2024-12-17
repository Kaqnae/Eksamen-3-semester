import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "../components/TextField";
import Button from "../components/Button";
import SDU from "../assets/resourceplanner.png";
import { useNavigate } from "react-router-dom";
import "../styles/loginpage.css";
import LoginService from "../service/LoginService";
import { red } from "@mui/material/colors";

// LoginForm component that handles user login functionality
const LoginForm = () => {
  const navigate = useNavigate();

  // State hooks for managing the username, password, and error message
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  // Event handler for the login button click
  const handleLogin = async () => {
    // Check if both username and password are entered
    if (!username || !password) {
      setError("Both username and password are required");
      return;
    }

    try {
      // Attempt to login using the provided username and password
      await LoginService.login(username, password);
      setError(null); // Clear any existing error messages
      navigate("/dashboard"); // Navigate to the dashboard on successful login
      const userId = localStorage.getItem("userId");
      console.log(userId);
    } catch (err: any) {
      // Set the error message if the login attempt fails
      setError(err.message);
    }
  };

  return (
    <Box
      className="main-content"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        "& .MuiTextField-root": { m: 1, width: "100%", maxWidth: "25ch" }, // Material-UI TextField styles
        "& .MuiButton-root": { m: 1, width: "100%", maxWidth: "25ch" }, // Material-UI Button styles
      }}
    >
      {/* Application logo and title */}
      <h1>ResourcePlanner</h1>
      <img
        className="resourceplanner-picture"
        src={SDU}
        alt="Logo"
        width="20%"
      ></img>

      {/* Display error message if there is one */}
      {error && (
        <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>
      )}

      {/* Username input field */}
      <TextField
        required
        id="outlined-username"
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)} // Update username state on input change
      />

      {/* Password input field */}
      <TextField
        required
        id="outlined-password"
        label="Password"
        type="password"
        autoComplete="current-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)} // Update password state on input change
      />

      {/* Login button */}
      <Button variant="contained" color="primary" onClick={handleLogin}>
        Login
      </Button>
    </Box>
  );
};

export default LoginForm;
