import React from "react";

// TimeSelector component for selecting a time from a list of available times
const TimeSelector = ({
  label,
  time,
  onTimeChange,
  availableTimes,
}: {
  label: string;
  time: string;
  onTimeChange: (value: string) => void;
  availableTimes: string[];
}) => {
  return (
    <label>
      {label}:{/* Dropdown select element for selecting a time */}
      <select
        className="select"
        value={time} // The currently selected time
        onChange={(e) => onTimeChange(e.target.value)} // Function to handle time change
      >
        {/* Option for selecting the time with a placeholder */}
        <option value="" disabled>
          Select {label.toLowerCase()} time
        </option>
        {/* Mapping over availableTimes to generate option elements */}
        {availableTimes.map((availableTime) => (
          <option key={availableTime} value={availableTime}>
            {availableTime}
          </option>
        ))}
      </select>
    </label>
  );
};

export default TimeSelector;
