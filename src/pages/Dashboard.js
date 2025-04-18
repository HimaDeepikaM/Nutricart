import React, { useState } from "react";
import "./Dashboard.css";
import Grocery from "./Grocery";
import RecipeList from "./RecipeList";
import { GiCook, GiCarrot } from 'react-icons/gi'; // Chef hat, carrot

const Dashboard = () => {
  const [displayRecipe, setDisplay] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const handleToggle = () => {
    setDisplay(!displayRecipe);
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>
          {displayRecipe ? 'Recipes' : 'Ingredients'}
        </h2>
        <input
        type="text"
            
            placeholder="Search by name or category (Example:spice/meat)"
            className="search-bar"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleToggle} className="dashboard-toggle button">
          {displayRecipe ? (
            <GiCook size={25} />
          ) : (
            <GiCarrot size={25} />
          )}
        </button>
      </div>
      {displayRecipe ?
        <RecipeList /> :
        <Grocery searchTerm={searchTerm}/>
      }
    </div>
  );
};

export default Dashboard;
