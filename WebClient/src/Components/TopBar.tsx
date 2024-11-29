import React from "react";
import Button from "./Button";
import ProfileMan from "../Images/profile.png";
import "./dashboard.css";
import ProfileButton from "./ProfileButton";
import { useNavigate } from "react-router-dom";

const TopBar = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/dashboard");
  };

  return (
    <div className="top-bar">
      <div className="left-section">
        <span className="logo" onClick={handleClick}>
          My Dashboard
        </span>
      </div>
      <div className="right-section">
        <div className="profile-icon-container">
          <ProfileButton></ProfileButton>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
