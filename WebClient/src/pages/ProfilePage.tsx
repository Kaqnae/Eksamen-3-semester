import React, { useEffect, useState } from "react";
import TopBar from "../components/TopBar";
import "../styles/profilepage.css";
import { User } from "../model/User";
import UserService from "../service/UserService";

const ProfilePage = () => {
  // State to store the user data fetched from the server
  const [user, setUser] = useState<User | null>(null);
  // State to store any error messages
  const [error, setError] = useState<string | null>(null);

  // Fetch user data when the component is mounted
  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Call the UserService to get user details
        const fetchedUser = await new UserService().getUser();
        setUser(fetchedUser); // Update the user state with the fetched data
      } catch (error: any) {
        setError(error.message); // Set an error message if fetching fails
      }
    };

    fetchUser(); // Trigger the fetch on component mount
  }, []);

  // Handle input field changes and update the user state
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (user) {
      setUser({
        ...user, // Spread existing user data
        [e.target.name]: e.target.value === "" && 
        (e.target.name === "username" || e.target.name === "password") 
          ? null // Set username/password to null if left blank
          : e.target.value, // Otherwise update the field with the input value
      });
    }
  };

  // Handle the update form submission
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission behavior

    if (!user) {
      setError("No user data available"); // Show an error if no user data is available
      return;
    }

    try {
      // Call the UserService to update the user
      const updateSuccess = await new UserService().updateUser(user);
      if (updateSuccess) {
        setError(null); // Clear any existing errors
        alert("User updated successfully!"); // Notify the user of success
      } else {
        setError("Failed to update user"); // Set an error message if the update fails
      }
    } catch (error: any) {
      // Handle errors during the update process
      setError(error.message || "An error occurred during user update");
    }
  };

  return (
    <>
      {/* Render the top navigation bar */}
      <TopBar></TopBar>
      <div className="profile-container">
        {/* Form for updating user profile details */}
        <form className="profile-form">
          {/* Input for user's name */}
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={user?.name || ""}
              onChange={handleChange}
            />
          </div>
          {/* Input for user's email */}
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={user?.email || ""}
              onChange={handleChange}
            />
          </div>
          {/* Input for user's phone number */}
          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={user?.phone || ""}
              onChange={handleChange}
            />
          </div>
          {/* Input for user's new username */}
          <div className="form-group">
            <label htmlFor="username">New username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={user?.username || ""}
              onChange={handleChange}
            />
          </div>
          {/* Input for user's new password */}
          <div className="form-group">
            <label htmlFor="password">New password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={user?.password || ""}
              onChange={handleChange}
            />
          </div>
          {/* Submit button to trigger update */}
          <button
            type="submit"
            className="submit-button"
            onClick={handleUpdate}
          >
            Update
          </button>
        </form>
        {/* Display any error messages */}
        {error && <p className="error">{error}</p>}
      </div>
    </>
  );
};

export default ProfilePage;
