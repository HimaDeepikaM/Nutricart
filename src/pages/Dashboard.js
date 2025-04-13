import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (!isAuthenticated) {
      alert("Please login first.");
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div>
      <div>
        <h2>Welcome to Your Dashboard</h2>
        <p>This is a protected page. Only logged-in users can see this.</p>

        <button
          className="create-account-btn"
          onClick={() => {
            localStorage.removeItem("isAuthenticated");
            alert("Logged out successfully!");
            navigate("/login");
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
