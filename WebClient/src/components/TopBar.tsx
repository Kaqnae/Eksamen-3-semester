import React from "react";
import ProfileMan from "../assets/profile.png";
import "../styles/dashboard.css";
import ProfileButton from "../components/ProfileButton";
import { useNavigate, useLocation } from "react-router-dom";

const TopBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const pageTitles: {
    "/dashboard": string;
    "/bookings": string;
    "/profilepage": string;
  } = {
    "/dashboard": "Dashboard",
    "/bookings": "Bookings",
    "/profilepage": "Profile",
  };

  const currentPageTitle =
    pageTitles[location.pathname as keyof typeof pageTitles] || "Dashboard";

  return (
    <div className="top-bar">
      <div className="left-section">
        <span className="logo">{currentPageTitle}</span>
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
