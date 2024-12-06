import React, { useEffect, useState } from "react";
import TopBar from "../components/TopBar";
import "../styles/profilepage.css";
import { TextField } from "@mui/material";
import { User } from "../types/User";
import { UserService } from "../service/UserService";

const ProfilePage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchUser = async () => {
      if (!userId) {
        setError("User ID is missing");
        return;
      }
      
      try {
        const fetchedUser = await new UserService().getUser(userId);
        setUser(fetchedUser);
      } catch (error: any) {
        setError(error.message);
      }
    }

    fetchUser();
  }, [userId])

  return (
    <>
      <TopBar></TopBar>
      <div className="profile-container">
        <form className="profile-form">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" defaultValue={user?.name}/>
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" defaultValue={user?.email}/>
          </div>
          <div className="form-group">
            <label htmlFor="phone">Tlf-nr</label>
            <input type="tel" id="phone" name="phone" defaultValue={user?.phone}/>
          </div>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" name="username" defaultValue={"*****"}/>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" defaultValue={"*****"}/>
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
