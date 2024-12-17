import React, { useEffect, useState } from "react";
import List from "../components/List";
import "../styles/dashboard.css";
import TopBar from "../components/TopBar";
import Drawing from "../assets/tegning.jpg";
import ResourceService from "../service/ResourceService";
import { Resource } from "../model/Resource";
import MakeBooking from "../components/MachineBooking";
import ErrorReportService from "../service/ErrorReportService";
import InstitutionService from "../service/InstitutionService";

// Dashboard component representing the main dashboard view
const Dashboard = () => {
  // State hooks for managing resources, error messages, selected resource, error reports, and institution image
  const [resources, setResources] = useState<Resource[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedResource, setSelectedResource] = useState<Resource | null>(
    null
  );
  const [errorReports, setErrorReports] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [institutionImg, setInstitutionImg] = useState<string>("");

  // Retrieve institution ID from local storage
  const institutionId = localStorage.getItem("institutionId");

  // Event handler for when a machine/resource is clicked in the list
  const handleMachineClick = (resource: Resource) => {
    setSelectedResource(resource);
  };

  // Event handler to close the booking form
  const handleCloseBooking = () => {
    setSelectedResource(null);
  };

  // Function to refresh error reports for all resources
  const refreshErrorReports = async () => {
    try {
      const errorReportService = new ErrorReportService();
      const statuses: { [key: string]: boolean } = {};

      // Check error report status for each resource
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

  // Fetch resources and institution details on component mount
  useEffect(() => {
    const fetchResources = async () => {
      try {
        const resourceData = await new ResourceService().fetchResource();
        setResources(resourceData);
        await refreshErrorReports();

        if (institutionId) {
          const institutionService = new InstitutionService();
          const institutionData = await institutionService.fetchInstitution(
            institutionId
          );
          setInstitutionImg(institutionData.imageUrl);
        }
      } catch (error: any) {
        setError(error.message);
      }
    };

    fetchResources();
  }, []); // Empty dependency array to run only once on component mount

  // Refresh error reports whenever the resources state changes
  useEffect(() => {
    refreshErrorReports();
  }, [resources]);

  return (
    <>
      {/* Top navigation bar */}
      <TopBar></TopBar>
      <div className="dashboard-container">
        {/* Left sidebar displaying a list of resources */}
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
            listClassName="machineList-dashboard"
          />
        </div>
        {/* Main content area displaying either the institution image or the booking form */}
        <div className="main-content">
          {/* If no resource is selected, display institution image */}
          {!selectedResource && (
            <img src={institutionImg} alt="Institution Logo" />
          )}
          {/* If a resource is selected, display the booking form for that resource */}
          {selectedResource && (
            <MakeBooking
              instituionId={selectedResource.institutionId}
              resourceId={selectedResource.id}
              onErrorReported={refreshErrorReports}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
