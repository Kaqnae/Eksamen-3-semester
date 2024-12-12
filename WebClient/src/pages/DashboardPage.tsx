import React, { useEffect, useState } from "react";
import List from "../components/List";
import "../styles/dashboard.css";
import TopBar from "../components/TopBar";
import Drawing from "../assets/tegning.jpg";
import ResourceService from "../service/ResourceService";
import { Resource } from "../model/Resource";
import MakeBooking from "../components/MachineBooking";
import ErrorReportService from "../service/ErrorReportService";

const Dashboard = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedResource, setSelectedResource] = useState<Resource | null>(
    null
  );
  const [errorReports, setErrorReports] = useState<{ [key: string]: boolean }>(
    {}
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
        const resourceData = await new ResourceService().fetchResource();
        setResources(resourceData);
      } catch (error: any) {
        setError(error.message);
      }
    };

    fetchResources();
  }, []);

  useEffect(() => {
    const errorReportService = new ErrorReportService();
    const fetchErrorReports = async () => {
      try {
        const statuses: { [key: string]: boolean } = {};
        for (const resource of resources) {
          const resourceId = resource.id;
          const isActive = await errorReportService.isErrorReportActive(
            resourceId
          );
          statuses[resourceId] = isActive;
        }
        setErrorReports(statuses);
      } catch (error) {
        console.error("Error fetching error report statuses:", error);
      }
    };
    fetchErrorReports();
  }, [resources]);

  return (
    <>
      <TopBar></TopBar>
      <div className="dashboard-container">
        <div className="left-sidebar">
          <List
            items={resources}
            onItemClick={handleMachineClick}
            renderItem={(resource) => (
              <span
                className={`resource ${
                  errorReports[resource.id] ? "resource-error" : ""
                }`}
              >
                {resource.name}
              </span>
            )}
          />
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
