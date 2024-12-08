import React, { useEffect, useState } from "react";
import TopBar from "../components/TopBar";
import "../styles/profilepage.css";
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (user) {
      setUser({
        ...user,
        [e.target.name]: e.target.value == "" &&
        (e.target.name === "username" || e.target.name === "password")
        ? null : e.target.value,
      });
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userId) {
      setError("UserId is missing");
      return;
    }

    if (!user) {
      setError("No user data available");
      return;
    }

    try {
      const updateSucces = await new UserService().updateUser(userId, user);
      if (updateSucces) {
        setError(null);
        alert("User updated successfully!")
      } else {
        setError("Failed to update user");
      }
    } catch (error: any) {
      setError(error.message || "An error occurred during user update");
    }
  }

  return (
    <>
      <TopBar></TopBar>
      <div className="profile-container">
        <form className="profile-form">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" value={user?.name || ""} onChange={handleChange}/>
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" value={user?.email || ""} onChange={handleChange}/>
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input type="tel" id="phone" name="phone" value={user?.phone || ""} onChange={handleChange}/>
          </div>
          <div className="form-group">
            <label htmlFor="username">New username</label>
            <input type="text" id="username" name="username" value={user?.username || ""} onChange={handleChange}/>
          </div>
          <div className="form-group">
            <label htmlFor="password">New password</label>
            <input type="password" id="password" name="password" value={user?.password || ""} onChange={handleChange}/>
          </div>
          <button type="submit" className="submit-button" onClick={handleUpdate}>
            Update
          </button>
        </form>
        {error && <p className="error">{error}</p>} {/* Vist fejlmeddelelser */}
      </div>
    </>
  );
};

export default ProfilePage;
