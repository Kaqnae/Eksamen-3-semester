import React, { useState } from "react";
import List from "./List";
import "./dashboard.css";
import TopBar from "./TopBar";
import Drawing from "../Images/tegning.jpg";

const Dashboard = () => {
  const [machines] = useState([
    { id: "1", name: "Machine 1" },
    { id: "2", name: "Machine 2" },
    { id: "3", name: "Machine 3" },
    { id: "4", name: "Machine 4" },
    { id: "5", name: "Machine 5" },
    { id: "6", name: "Machine 6" },
    { id: "7", name: "Machine 7" },
    { id: "8", name: "Machine 8" },
    { id: "9", name: "Machine 9" },
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
          <List
            items={machines}
            onItemClick={handleMachineClick}
            renderItem={(machines) => <span>{machines.name}</span>}
          ></List>
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
