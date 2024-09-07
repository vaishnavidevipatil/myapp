import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if the token exists in localStorage
    const token = localStorage.getItem("authToken");

    if (token) {
      setIsAuthenticated(true);
      // Optional: Validate token with backend to ensure it hasn't expired or been tampered with
    }
  }, []);

  return (
    <div>
      {isAuthenticated ? (
        <h1>Welcome to your Dashboard!</h1>
      ) : (
        <h1>Please log in to access your Dashboard</h1>
      )}
    </div>
  );
};

export default Dashboard;
