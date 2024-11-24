import React from "react";
import List from "./List";

const Dashboard = () => {
  const tasks = ["Task 1", "Task 2", "Task 3"];

  return <List items={tasks}></List>;
};
export default Dashboard;
