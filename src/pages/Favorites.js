import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { useNutriCartContext } from "../context/NutriCartContext";
import IntegerInput from "../components/IntegerInput";
import FavoritesButton from "../components/FavoritesButton";
import "./Cart.css";
import { IoWarning } from "react-icons/io5";
import { FaHeart } from 'react-icons/fa';

/**
  Favorites Page
    - Displays Recipes/Ingredients heald in NutriCartContext.favorties

    User Operations:
    - Remove From Favorites
    - Increase/Decrease Quantity
    - Add to cart
 */
function Favorites() {
    const { addToCart, favorites } = useNutriCartContext();
    const navigate = useNavigate(); 

    // Track the quantity for each recipe
    const [quantities, setQuantities] = useState([]);

    // Update quantity for a specific recipe
    const handleQuantityChange = (recipeId, newQuantity) => {
        setQuantities(prevQuantities => ({
        ...prevQuantities,
        [recipeId]: newQuantity
        }));
    };

    // Add selected item to cart, reset quantity on page
    const handleAddRecipeToCart = (item, e) => {
        // Stop the event from bubbling up to the parent div
        e.stopPropagation();
        if (quantities[item.name] === 0) {
            alert("Error: No amount selected");
            return;
        }
        let temp = item;
        temp.quantity = quantities[item.name]
        addToCart(temp);
        // Reset quantity after adding
        setQuantities(prevQuantities => ({
        ...prevQuantities,
        [item.name]: 1
        }));
        alert("Item added to Cart!");
    };

    // Open recipe detail page
    const handleRecipeClick = (item) => {
        if (item.ingredients) {
            // Navigate to the recipe page, with the title as part of the URL
            navigate(`/recipe/${encodeURIComponent(item.name).replace(/ /g, "-")}`);
        }
    };

    // Update listed items if NutriCartContext.favorites changes
    useEffect(() => {    
        setQuantities(favorites.reduce((acc, item) => {
            acc[item.name] = 1; // initialize quantity from recipe or set to 0
            return acc;
            }, {})
        )
      }, [favorites]);

    return (
        <div className="dashboard-container">
            <div className="favorites-header">
                <FaHeart size={24} /> 
                <h2>Your Favorites</h2>
            </div>
            <div className="grocery-grid">
                {favorites.length > 0 ? (
                favorites.map((item, index) => (
                    <div className="grocery-card" key={index} onClick={() => handleRecipeClick(item)}>
                        <div className="grocery-name">
                            {item.name}
                            {item.containsAllergen ? <IoWarning size={24} color="orange" style={{ minWidth: "fit-content"}}/> : <div/>}
                        </div>
                        <IntegerInput value={quantities[item.name]}
                            onValueChange={(newValue) => handleQuantityChange(item.name, newValue)} />
                        <div className="total-price">
                            Total: ${(item.price * quantities[item.name]).toFixed(2)}
                        </div>
                        <button
                            className="add-to-cart-btn button"
                            onClick={(e) => handleAddRecipeToCart(item,e)}
                        >
                            Add to Cart
                        </button>
                        {/* <div className="grocery-category">Category: {item.category}</div> */}
                        <FavoritesButton item={item}/>
                    </div>
                ))
                ) : (
                    <p>No favorites added yet.</p>
                )}
            </div>
        </div>
    );
}

export default Favorites;

