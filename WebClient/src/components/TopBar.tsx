import React from "react";
import ProfileMan from "../assets/profile.png";
import "../styles/dashboard.css";
import ProfileButton from "../components/ProfileButton";
import { useNavigate, useLocation } from "react-router-dom";

// TopBar component that displays the top navigation bar with profile and page title
const TopBar = () => {
  // Hooks for navigation and access to the current location
  const navigate = useNavigate();
  const location = useLocation();

  // Mapping of route paths to page titles
  const pageTitles: {
    "/dashboard": string;
    "/bookings": string;
    "/profilepage": string;
  } = {
    "/dashboard": "Dashboard",
    "/bookings": "Bookings",
    "/profilepage": "Profile",
  };

  // Get the current page title based on the location's pathname
  const currentPageTitle =
    pageTitles[location.pathname as keyof typeof pageTitles] || "Dashboard";

  return (
    <div className="top-bar">
      {/* Left section of the top bar displaying the page title */}
      <div className="left-section">
        <span className="logo">{currentPageTitle}</span>
      </div>
      {/* Right section containing the profile button */}
      <div className="right-section">
        <div className="profile-icon-container">
          <ProfileButton></ProfileButton>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
