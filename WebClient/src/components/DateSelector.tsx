import React from "react";

// DateSelector component props type definition
const DateSelector = ({
  label,
  date,
  onDateChange,
  availableDates,
}: {
  label: string; // Label for the date selector dropdown
  date: string; // Currently selected date in ISO format
  onDateChange: (value: string) => void; // Function to handle date change
  availableDates: string[]; // Array of available dates in ISO format
}) => {
  return (
    <label>
      {label}: {/* Label for the dropdown */}
      <select
        className="select" // Class for styling the select dropdown
        value={date} // Currently selected date to show as selected in the dropdown
        onChange={(e) => onDateChange(e.target.value)} // Handle change in the dropdown selection
      >
        {availableDates.map((d, index) => (
          <option key={index} value={d}>
            {new Date(d).toLocaleDateString()}{" "}
            {/* Display the date in a readable format */}
          </option>
        ))}
      </select>
    </label>
  );
};

export default DateSelector;
