import React, { useEffect, useState } from "react";
import List from "../components/List";
import "../styles/dashboard.css";
import TopBar from "../components/TopBar";
import Drawing from "../assets/tegning.jpg";
import MachineService from "../service/MachineService";


interface Machine{
  id: string;
  name: string;
  description: string;
  resourceImage: string;
  institutionId: string;
}

const Dashboard = () => {
 const [machines, setMachines] = useState<Machine[]>([]);
 const [error, setError] = useState<string | null>(null);

 const handleMachineClick = () => {
  console.log("Clicked");
 };

useEffect(() => {
  const fetchMachines = async () => {
    try {
      const machineData = await MachineService.fetchMachines();
      setMachines(machineData); 
    }catch (error: any){
      setError(error.message);
    }
  };

  fetchMachines();
});

  return (
    <>
      <TopBar></TopBar>
      <div className="dashboard-container">
        <div className="left-sidebar">
          <List
            items={machines.map((machine) => machine.name)}
            onItemClick={handleMachineClick}
            renderItem={(item) => <span>{item}</span>}
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
