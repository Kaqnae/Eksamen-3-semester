import React from "react";
import TopBar from "../components/TopBar";
import "../styles/profilepage.css";
import { TextField } from "@mui/material";

const ProfilePage = () => {
  return (
    <>
      <TopBar></TopBar>
      <div className="profile-container">
        <form className="profile-form">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Tlf-nr</label>
            <input type="tel" id="phone" name="phone" />
          </div>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" name="username" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" />
          </div>
          <div className="form-group">
            <label htmlFor="repeat-password">Gentag Password</label>
            <input
              type="password"
              id="repeat-password"
              name="repeat-password"
            />
          </div>
          <button type="submit" className="submit-button">
            Gem
          </button>
        </form>
      </div>
    </>
  );
};

export default ProfilePage;
