import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { useNutriCartContext } from "../context/NutriCartContext";
import IntegerInput from "../components/IntegerInput";
import { IoWarning } from "react-icons/io5";
import FavoritesButton from "../components/FavoritesButton";

/**
  Recipe List Page
    - Displays Recipes NutriCartContext.allegenMarkedRecipes

    User Operations:
    - Add/Remove From Favorites
    - Increase/Decrease Quantity
    - Add to cart
 */
const RecipeList = () => {
    const { addToCart, allegenMarkedRecipes } = useNutriCartContext();
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

    
    // Add item to cart, reset quantity of item on page
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

    // Navigate to selected recipes detailed page
    const handleRecipeClick = (recipeTitle) => {
        // Navigate to the recipe page, with the title as part of the URL
        navigate(`/recipe/${encodeURIComponent(recipeTitle).replace(/ /g, "-")}`);
    };

    // Update displayed list if NutriCartContext.allegenMarkedRecipes changes
    useEffect(() => {    
        setQuantities(allegenMarkedRecipes.reduce((acc, recipe) => {
            acc[recipe.name] = 1; // initialize quantity from recipe or set to 0
            return acc;
            }, {})
        )
      }, [allegenMarkedRecipes]);

    return (
        <div>
            <div className="grocery-grid">
                {allegenMarkedRecipes.map((recipe, index) => (
                    <div className="grocery-card" key={index} onClick={() => handleRecipeClick(recipe.name)}>
                        <div className="grocery-name">
                            {recipe.name}
                            {recipe.containsAllergen ? <IoWarning size={24} color="orange" style={{ minWidth: "fit-content"}}/> : <div/>}
                        </div>
                        <div className="grocery-price">
                            Price per serving: ${(recipe.price / recipe.nutrition["Servings Per Recipe"]).toFixed(2)}
                        </div>
                        <IntegerInput value={quantities[recipe.name]}
                            onValueChange={(newValue) => handleQuantityChange(recipe.name, newValue)} />
                        <div className="total-price">
                            Total: ${(recipe.price * quantities[recipe.name]).toFixed(2)}
                        </div>
                        <button
                            className="add-to-cart-btn button"
                            onClick={(e) => handleAddRecipeToCart(recipe,e)}
                        >
                            Add to Cart
                        </button>
                        {/* <div className="grocery-category">Category: {item.category}</div> */}
                        <FavoritesButton item={recipe}/>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecipeList;