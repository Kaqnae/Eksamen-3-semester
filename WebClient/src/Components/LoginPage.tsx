import React from "react";
import Box from "@mui/material/Box";
import TextField from "./TextField";
import Button from "./Button";
import SDU from "../Images/SDU.webp";
import { useNavigate } from "react-router-dom";
import "./loginpage.css";

const LoginForm = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/dashboard");
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
      <TextField
        required
        id="outlined-username"
        label="Username"
        defaultValue=""
      />
      <TextField
        required
        id="outlined-password"
        label="Password"
        type="password"
        autoComplete="current-password"
      />
      <Button variant="contained" color="primary" onClick={handleLogin}>
        Login
      </Button>
    </Box>
  );
};

export default LoginForm;
