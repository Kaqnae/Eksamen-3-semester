import React, { useState } from "react";
import List from "./List";
import "./dashboard.css";
import TopBar from "./TopBar";
import Drawing from "../Images/tegning.jpg";

const Dashboard = () => {
  const [machines] = useState([
    { id: "1", name: "Booking 1" },
    { id: "2", name: "Booking 2" },
    { id: "3", name: "Booking 3" },
    { id: "4", name: "Booking 4" },
    { id: "5", name: "Booking 5" },
    { id: "6", name: "Booking 6" },
    { id: "7", name: "Boooking 7" },
    { id: "8", name: "Booking 8" },
    { id: "9", name: "Booking 9" },
  ]);
  const [selectedMachineId, setSelectedMachineId] = useState<string | null>(
    null
  );

  const handleMachineClick = (machineId: string) => {
    setSelectedMachineId(machineId);
    console.log("Selcted Machine ID:", { machineId });
  };

  return (
    <>
      <TopBar></TopBar>
      <div className="dashboard-container">
        <div className="left-sidebar">
          <List items={machines} onItemClick={handleMachineClick}></List>
        </div>
        <div className="main-content">
          <img src={Drawing} />
          <button className="book-button">Book</button>
        </div>
      </div>
    </>
  );
};
export default Dashboard;
