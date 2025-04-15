import React, { useEffect, useState } from "react";
import "./Grocery.css";
import { useNutriCartContext } from "../context/NutriCartContext";
import recipesData from "../data/recipes.json";

const Grocery = () => {
  const [groceries, setGroceries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const { addToCart, allegenMarkedRecipes } = useNutriCartContext();

  useEffect(() => {
    const fetchData = async () => {
      const data = recipesData;

      const ingredientMap = new Map();

      allegenMarkedRecipes.forEach(recipe => {
        recipe.ingredientMap.forEach(ingredient => {
            if (!ingredientMap.has(ingredient.cleanName)) {
                ingredientMap.set(ingredient.cleanName, ingredient);
            }
        });
      });
      console.log(ingredientMap);

      setGroceries(Array.from(ingredientMap.values()));
    };

    fetchData();
  }, [allegenMarkedRecipes]);

  const updateQuantity = (index, delta) => {
    setGroceries(prev =>
      prev.map((item, i) =>
        i === index
          ? { ...item, quantity: Math.max(0, item.quantity + delta) }
          : item
      )
    );
  };

  const handleAddToCart = (item) => {
    if (item.quantity === 0) return;

    addToCart(item);

    // Reset quantity after adding
    setGroceries(prev =>
      prev.map(i =>
        i.name === item.name ? { ...i, quantity: 0 } : i
      )
    );
  };

  const filteredGroceries = groceries.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search by name or category (e.g., 'spices', 'meat')"
        className="search-bar"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="grocery-grid">
        {filteredGroceries.map((item, index) => (
          <div className="grocery-card" key={index}>
            <div className="grocery-name">{item.name}</div>
            <div className="grocery-price">
              Price per {item.unit}: ${item.price.toFixed(2)}
            </div>
            <div className="quantity-controls">
              <button onClick={() => updateQuantity(index, -1)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => updateQuantity(index, 1)}>+</button>
            </div>
            <div className="total-price">
              Total: ${(item.price * item.quantity).toFixed(2)}
            </div>
            <button
              className="add-to-cart-btn"
              onClick={() => handleAddToCart(item)}
            >
              Add to Cart
            </button>
            <div className="grocery-category">Category: {item.category}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Grocery;
