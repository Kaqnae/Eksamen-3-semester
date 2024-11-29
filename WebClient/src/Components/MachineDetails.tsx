import React, { useState, useEffect } from "react";

interface MachineDetailsProps {
  machineId: string;
}

const MachineDetails: React.FC<MachineDetailsProps> = ({ machineId }) => {
  const [machine, setMachine] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMachineDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch("");
        if (!response.ok) {
          throw new Error("Failed to fetch machine details");
        }
        const data = await response.json();
        setMachine(data);
        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchMachineDetails();
  }, [machineId]);

  if (loading) {
    return <p>Loading machine details...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!machine) {
    return <p>No details available for this machine.</p>;
  }

  return (
    <div>
      <h2>{machine.name}</h2>
      <p>{machine.description}</p>
      <p>Status: {machine.status}</p>
      <p>Last Updated: {machine.lastUpdated}</p>
    </div>
  );
};

export default MachineDetails;
