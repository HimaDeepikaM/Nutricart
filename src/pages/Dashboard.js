import React, { useState } from "react";
import "./Dashboard.css";
import Grocery from "./Grocery";
import { useNutriCartContext } from "../context/NutriCartContext";
import RecipeList from "./RecipeList";

const tabs = ["Grocery", "Recipes", "Favorites", "Orders", "Cart", "Delivery"];

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("Grocery");

  const { cartItems, removeFromCart } = useNutriCartContext();

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const renderContent = () => {
    if (activeTab === "Grocery") {
      return <Grocery />;
    } else if (activeTab === "Recipes") {
      return <RecipeList />
    } else if (activeTab === "Cart") {
      return (
        <section className="dashboard-content cart-view">
          <h2>🛒 Your Cart</h2>
          {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <>
              <ul className="cart-list">
                {cartItems.map((item, index) => (
                  <li key={index} className="cart-item">
                    <span>
                      <strong>{item.name}</strong>
                    </span>{" "}
                    — {item.quantity} × ${item.price.toFixed(2)} ={" "}
                    <strong>${(item.quantity * item.price).toFixed(2)}</strong>
                    <button onClick={() => removeFromCart(item)}>Remove</button>
                  </li>
                ))}
              </ul>
              <h4>Total: ${total.toFixed(2)}</h4>
            </>
          )}
        </section>
      );
    }

    // default fallback for other tabs
    return (
      <section className="dashboard-content">
        <h2>{activeTab}</h2>
        <p>This is the {activeTab} section.</p>
      </section>
    );
  };

  return (
    <div className="dashboard-container">
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

      {renderContent()}
    </div>
  );
};

export default Dashboard;
