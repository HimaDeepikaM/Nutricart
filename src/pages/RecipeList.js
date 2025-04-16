import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { useNutriCartContext } from "../context/NutriCartContext";
import IntegerInput from "../components/IntegerInput";


const RecipeList = () => {
    // const [numSelected, setNumSelected] = useState([]);
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

    const handleAddRecipeToCart = (item, e) => {
        // Stop the event from bubbling up to the parent div
        e.stopPropagation();
        // if (item.quantity === 0) return;
        addToCart(item);
    };

    const handleRecipeClick = (recipeTitle) => {
        // Navigate to the recipe page, with the title as part of the URL
        navigate(`/recipe/${encodeURIComponent(recipeTitle).replace(/ /g, "-")}`);
    };

    useEffect(() => {    
        setQuantities(allegenMarkedRecipes.reduce((acc, recipe) => {
        acc[recipe.name] = 1; // initialize quantity from recipe or set to 0
        return acc;
        }, {}))
      }, [allegenMarkedRecipes]);

    return (
        <div>
            <div className="grocery-grid">
                {allegenMarkedRecipes.map((recipe, index) => (
                    <div className="grocery-card" key={index} onClick={() => handleRecipeClick(recipe.name)}>
                        <div className="grocery-name">{recipe.name}</div>
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
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecipeList;