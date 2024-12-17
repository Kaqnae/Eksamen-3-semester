import React, { useState } from "react";
import ProfileMan from "../assets/profile.png";
import { useNavigate } from "react-router-dom";

// Component that renders a profile button with a dropdown menu
const ProfileButton = () => {
  const name = localStorage.getItem("name"); // Retrieve the user's name from local storage

  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to track whether the dropdown menu is open
  const navigate = useNavigate(); // Hook to navigate programmatically

  // Toggle the dropdown menu visibility
  const handleButtonClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Handle logout action
  const handleLogoutClick = () => {
    setIsMenuOpen(false);
    navigate("/"); // Redirect to home on logout
  };

  // Navigate to edit profile page
  const handleEditClick = () => {
    setIsMenuOpen(false);
    navigate("/profilepage");
  };

  // Navigate to bookings page
  const handleBookingClick = () => {
    setIsMenuOpen(false);
    navigate("/bookings");
  };

  // Navigate to dashboard
  const handleDashboardClick = () => {
    setIsMenuOpen(false);
    navigate("/dashboard");
  };

  return (
    <div className="profile-button-container">
      {/* Profile button with user's name and profile image */}
      <button className="profile-button" onClick={handleButtonClick}>
        {name}
        <img className="profile-img" src={ProfileMan} alt="Profile" />
      </button>

      {/* Dropdown menu that appears when the button is clicked */}
      {isMenuOpen && (
        <div className="dropdown-menu">
          <button className="dropdown-item" onClick={handleEditClick}>
            Edit Profile
          </button>
          <button className="dropdown-item" onClick={handleDashboardClick}>
            Dashboard
          </button>
          <button className="dropdown-item" onClick={handleBookingClick}>
            Bookings
          </button>
          <button className="dropdown-item" onClick={handleLogoutClick}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileButton;
