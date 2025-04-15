import React from "react";
import { useNavigate } from "react-router-dom"; 
import { useNutriCartContext } from "../context/NutriCartContext";


const RecipeList = () => {
    const { addToCart, allegenMarkedRecipes } = useNutriCartContext();
    const navigate = useNavigate(); 

    const handleAddRecipeToCart = (item) => {
        // if (item.quantity === 0) return;
    
        addToCart(item);
    };

    const handleRecipeClick = (recipeTitle) => {
        // Navigate to the recipe page, with the title as part of the URL
        navigate(`/recipe/${encodeURIComponent(recipeTitle).replace(/ /g, "-")}`);
    };

    return (
        <div>
            <div className="grocery-grid">
                {allegenMarkedRecipes.map((recipe, index) => (
                    <div className="grocery-card" key={index} onClick={() => handleRecipeClick(recipe.Title)}>
                        <div className="grocery-name">{recipe.Title}</div>
                        <div className="grocery-price">
                            Price per serving: ${(recipe.Nutrition["Servings Per Recipe"] / recipe.Price).toFixed(2)}
                        </div>
                        <div className="quantity-controls">
                            <button >-</button>
                            <span>{1}</span>
                            <button >+</button>
                        </div>
                        <div className="total-price">
                            Total: ${(recipe.Price * 1).toFixed(2)}
                        </div>
                        <button
                            className="add-to-cart-btn"
                            // onClick={() => handleAddToCart(item)}
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