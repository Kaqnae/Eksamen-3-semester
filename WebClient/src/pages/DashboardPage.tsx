import React, { useEffect, useState } from "react";
import List from "../components/List";
import "../styles/dashboard.css";
import TopBar from "../components/TopBar";
import Drawing from "../assets/tegning.jpg";
import ResourceService from "../service/ResourceService";
import { Resource } from "../model/Resource";
import MakeBooking from "../components/MachineBooking";

const Dashboard = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedResource, setSelectedResource] = useState<Resource | null>(
    null
  );

  const handleMachineClick = (resource: Resource) => {
    setSelectedResource(resource);
  };

  const handleCloseBooking = () => {
    setSelectedResource(null);
  };

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const resourceData = await ResourceService.fetchResource();
        setResources(resourceData);
      } catch (error: any) {
        setError(error.message);
      }
    };

    fetchResources();
  }, []);

  return (
    <>
      <TopBar></TopBar>
      <div className="dashboard-container">
        <div className="left-sidebar">
          <List
            items={resources}
            onItemClick={handleMachineClick}
            renderItem={(resource) => <span>{resource.name}</span>}
          ></List>
        </div>
        <div className="main-content">
          <img src={Drawing} />
          {selectedResource && (
            <MakeBooking
              instituionId={selectedResource.institutionId}
              resourceId={selectedResource.id}
            />
          )}
        </div>
      </div>
    </>
  );
};
export default Dashboard;
