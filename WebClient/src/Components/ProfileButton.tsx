import React, { useState } from "react";
import ProfileMan from "../Images/profile.png";
import { useNavigate } from "react-router-dom";

const ProfileButton = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleButtonClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogoutClick = () => {
    setIsMenuOpen(false);
    navigate("/");
  };

  const handleEditClick = () => {
    setIsMenuOpen(false);
    navigate("/profilepage");
  };
  const handleBookingClick = () => {
    setIsMenuOpen(false);
    navigate("/bookings");
  };

  return (
    <div className="profile-button-container">
      <button className="profile-button" onClick={handleButtonClick}>
        {" "}
        Placeholder-name
        <img className="profile-img" src={ProfileMan} />
      </button>

      {isMenuOpen && (
        <div className="dropdown-menu">
          <button className="dropdown-item" onClick={handleEditClick}>
            Rediger
          </button>
          <button className="dropdown-item" onClick={handleBookingClick}>
            Bookinger
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
