import React, { useState } from "react";
import "./Dashboard.css";

const tabs = ["Grocery", "Recipes", "Favorites", "Orders", "Cart", "Delivery"];

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("Grocery");

  return (
    <div>
      <nav className="dashboard-tabs">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={activeTab === tab ? "active" : ""}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </nav>

      <section className="dashboard-content">
        <h2>{activeTab}</h2>
        <p>This is the {activeTab} section.</p>
      </section>
    </div>
  );
};

export default Dashboard;
