import React, { useState } from "react";
import ErrorReportService from "../service/ErrorReportService";
import { ErrorReportProps } from "../model/ErrorReport";

// ErrorReport component props type definition
const ErrorReport: React.FC<
  ErrorReportProps & { onErrorReported: () => void }
> = ({ resourceId, institutionId, onClose, onErrorReported }) => {
  const [description, setDescription] = useState(""); // State for storing the error report description

  // Function to handle the form submission
  const handleSubmit = async () => {
    const errorReportService = new ErrorReportService(); // Instantiate the error report service
    try {
      const userId = localStorage.getItem("userId"); // Retrieve the user ID from local storage
      if (!userId) {
        alert("User not logged in");
        return;
      }

      // Create a new error report
      await errorReportService.createErrorReport({
        resourceId,
        institutionId,
        description,
        createdDate: new Date().toISOString(), // Current date and time as the creation date
        resolved: false, // Report is not resolved by default
        userId,
      });
      alert("Error report created successfully");
      onErrorReported(); // Notify that an error report was created
      onClose(); // Close the error report form
    } catch (error) {
      console.error(error);
      alert("Failed to submit error report"); // Show an alert if the submission fails
    }
  };

  return (
    <div>
      <h2>Report an issue</h2>
      <textarea
        placeholder="Describe the issue..."
        value={description}
        onChange={(e) => setDescription(e.target.value)} // Update description state on text change
        rows={4}
        cols={50}
      />
      <button onClick={handleSubmit}>Submit Report</button>{" "}
      {/* Button to submit the error report */}
      <button onClick={onClose}>Close</button>{" "}
      {/* Button to close the error report form */}
    </div>
  );
};

export default ErrorReport;
