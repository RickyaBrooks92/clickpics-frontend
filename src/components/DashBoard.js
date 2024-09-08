import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  // Check if the user is authenticated (i.e., token exists in localStorage)
  const token = localStorage.getItem("authToken");
  if (!token) {
    // If no token, redirect to login page
    navigate("/login");
  }

  return (
    <div>
      <h1>Welcome to your Dashboard</h1>
      <p>You are logged in!</p>
    </div>
  );
};

export default Dashboard;
