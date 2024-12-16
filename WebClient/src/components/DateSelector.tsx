import React from "react";

const DateSelector = ({
  label,
  date,
  onDateChange,
  availableDates,
}: {
  label: string;
  date: string;
  onDateChange: (value: string) => void;
  availableDates: string[];
}) => {
  return (
    <label>
      {label}:
      <select
        className="select"
        value={date}
        onChange={(e) => onDateChange(e.target.value)}
      >
        {availableDates.map((d, index) => (
          <option key={index} value={d}>
            {new Date(d).toLocaleDateString()}
          </option>
        ))}
      </select>
    </label>
  );
};

export default DateSelector;
