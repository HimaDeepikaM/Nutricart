import React, { useEffect, useState } from "react";
import "./Grocery.css";
import { useNutriCartContext } from "../context/NutriCartContext";
import IntegerInput from "../components/IntegerInput";
import FavoritesButton from "../components/FavoritesButton";
import { IoWarning } from "react-icons/io5";

const Grocery = ({searchTerm}) => {
  const [groceries, setGroceries] = useState([]);

  const { addToCart, allegenMarkedRecipes } = useNutriCartContext();

  useEffect(() => {
    const ingredientMap = new Map();
    allegenMarkedRecipes.forEach(recipe => {
      recipe.ingredientMap.forEach(ingredient => {
          if (!ingredientMap.has(ingredient.cleanName)) {
              ingredientMap.set(ingredient.cleanName, ingredient);
          }
      });
    });

    setGroceries(Array.from(ingredientMap.values()));
  }, [allegenMarkedRecipes]);

  const updateQuantity = (index, delta) => {
    setGroceries(prev =>
      prev.map((item, i) =>
        i === index
          ? { ...item, quantity: Math.max(0, delta) }
          : item
      )
    );
  };

  const handleAddToCart = (item) => {
    if (item.quantity === 0) {
      alert("Error: No amount selected");
      return;
    }
    addToCart(item);
    // Reset quantity after adding
    setGroceries(prev =>
      prev.map(i =>
        i.name === item.name ? { ...i, quantity: 0 } : i
      )
    );
    alert("Item added to Cart!");
  };

  const filteredGroceries = groceries.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="grocery-grid">
        {filteredGroceries.map((item, index) => (
          <div className="grocery-card" key={index}>
            <div className="grocery-name">
              {item.name}
              {item.containsAllergen ? <IoWarning size={24} color="orange" style={{ minWidth: "fit-content"}}/> : <div/>}
            </div>
            <div className="grocery-price">
              Price per {item.unit}: ${item.price.toFixed(2)}
            </div>
            <IntegerInput value={item.quantity}
              onValueChange={(newValue) => updateQuantity(index, newValue)} />
            <div className="total-price">
              Total: ${(item.price * item.quantity).toFixed(2)}
            </div>
            <button
              className="add-to-cart-btn button"
              onClick={() => handleAddToCart(item)}
            >
              Add to Cart
            </button>
            <FavoritesButton item={item}/>
            <div className="grocery-category">Category: {item.category}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Grocery;
