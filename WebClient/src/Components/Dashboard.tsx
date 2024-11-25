import React from "react";
import List from "./List";
import "./dashboard.css";
import TopBar from "./TopBar";
import Box from "@mui/material/Box";

const Dashboard = () => {
  const tasks = [
    "Task 1",
    "Task 2",
    "Task 3",
    "Task 4",
    "Task 5",
    "Task 6",
    "Task 7",
    "Task 8",
    "Task 9",
    "Task 10",
    "Task 11",
    "Task 12",
    "Task 13",
  ];

  return (
    <div className="dashboard-container">
      <TopBar></TopBar>
      <div className="left-sidebar">
        <List items={tasks}></List>
      </div>
      <div className="main-content">
        <button className="book-button">Book</button>
      </div>
    </div>
  );
};
export default Dashboard;
