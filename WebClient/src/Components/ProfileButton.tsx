import React, { useState } from "react";
import ProfileMan from "../Images/profile.png";

const ProfileButton = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleButtonClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuItemClick = () => {
    setIsMenuOpen(false);
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
          <button className="dropdown-item" onClick={handleMenuItemClick}>
            Rediger
          </button>
          <button className="dropdown-item" onClick={handleMenuItemClick}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileButton;
