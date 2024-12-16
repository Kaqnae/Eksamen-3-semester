import React from "react";

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
      {label}:
      <select
        className="select"
        value={time}
        onChange={(e) => onTimeChange(e.target.value)}
      >
        <option value="" disabled>
          Select {label.toLocaleLowerCase()} time
        </option>
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
