import React, { useState } from "react";
import ErrorReportService from "../service/ErrorReportService";
import { ErrorReportProps } from "../model/ErrorReport";

const ErrorReport: React.FC<ErrorReportProps> = ({
  resourceId,
  institutionId,
  onClose,
}) => {
  const [description, setDescription] = useState("");

  const handleSubmit = async () => {
    const errorReportService = new ErrorReportService();
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        alert("User not logged in");
        return;
      }
      await errorReportService.createErrorReport({
        resourceId,
        institutionId,
        description,
        createdDate: new Date().toISOString(),
        resolved: false,
        userId,
      });
      alert("Error report created successfully");
      onClose();
    } catch (error) {
      console.error(error);
      alert("Failed to submit error report");
    }
  };

  return (
    <div>
      <h2>Report an issue</h2>
      <textarea
        placeholder="Describe the issue..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={4}
        cols={50}
      />
      <button onClick={handleSubmit}>Submit Report</button>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default ErrorReport;
