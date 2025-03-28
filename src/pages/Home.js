import React from "react";
import "./Home.css";  // Import styles

import { Link } from "react-router-dom"; // Import Link for navigation

function Home() {
  return (
    <div className="home-container">

    
      <Link to="/signup" className="order-button">Order Now</Link>
    </div>
  );
}

export default Home;

