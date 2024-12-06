import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "../components/TextField";
import Button from "../components/Button";
import SDU from "../assets/SDU.webp";
import { useNavigate } from "react-router-dom";
import "../styles/loginpage.css";
import LoginService from "../service/LoginService";
import { red } from "@mui/material/colors";

const LoginForm = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    if (!username || !password) {
      setError("Both username and password are required");
      return;
    }

    try {
      await LoginService.login(username, password);
      setError(null);
      navigate("/dashboard");
      const userId = localStorage.getItem("userId");
      console.log(userId);
    } catch (err: any) {
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
        "& .MuiTextField-root": { m: 1, width: "100%", maxWidth: "25ch" },
        "& .MuiButton.root": { m: 1, width: "100%", maxWidth: "25ch" },
      }}
    >
      <img src={SDU} alt="Logo" width="20%"></img>
      {error && (
        <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>
      )}
      <TextField
        required
        id="outlined-username"
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        required
        id="outlined-password"
        label="Password"
        type="password"
        autoComplete="current-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={handleLogin}>
        Login
      </Button>
    </Box>
  );
};

export default LoginForm;
