import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useNutriCartContext } from "../context/NutriCartContext";
import ErrorPage from "./ErrorPage";
import IntegerInput from "../components/IntegerInput";
import PieChart from "../components/PieChart";
import { FaArrowLeft, FaHeart, FaRegHeart } from 'react-icons/fa';

const Recipe = () => {
  // IntegerInput
  const [numSelected, setNumSelected] = useState(1);
  const handleIntegerChange = (newValue) => {
    setNumSelected(newValue);
  }

  const { title } = useParams(); // Access the recipe Title from the URL
  const { recipes } = useNutriCartContext(); // Get the recipes from the context

  // Convert title from URL format back to regular format
  const formattedTitle = decodeURIComponent(title.replace(/-/g, " "));

  // Find the recipe by Title
  const recipe = recipes.find((recipe) => recipe.Title.toLowerCase() === formattedTitle.toLowerCase());

  if (!recipe) {
    // Direct to Error Page
    return (
      <ErrorPage />
    );
  }

   // Function to handle the display of the nutrition value
   const formatNutritionValue = (value, key) => {
    if (Array.isArray(value)) {
      return (
        <div className="details-nutrition">
          <div className="details-nutrition-inner">
            <span>{key}</span>
            <span className="details-nutrition-g">{value[0]}</span>
          </div>
          <span>{value[1]}</span>
        </div>
      )
    }
    return (
      <div className="details-nutrition">
        <span>{key}</span>
        <span>{value[1]}</span>
      </div>
    );
  };

  const nutritional_pi = [recipe.Nutrition["Total Carbohydrate"][0].replace(/\D/, ''), recipe.Nutrition["Total Fat"][0].replace(/\D/, ''), recipe.Nutrition["Protein"][0].replace(/\D/, ''), recipe.Nutrition["Dietary Fiber"][0].replace(/\D/, '')];

  return (
    <div>
      <button onClick={() => window.history.back()} className="details-back">
        <FaArrowLeft size={24} />
      </button>
      <div className="details-header">
        <img src={recipe["Image URL"]} alt={recipe.Title} className="details-image"/>
        <div className="details-info">
          <h2>{recipe.Title}</h2>
          <span>{recipe.Description}</span>
          <span>Serving Size: {recipe.Nutrition["Servings Per Recipe"]}</span>
          <span>Calories Per Serving: {recipe.Nutrition["Calories"]}</span>
        </div>
        <div>
          <div className="details-cart">
            <span>Total: ${recipe.Price * numSelected}</span>
            <span>Per Serving: ${recipe.Price / recipe.Nutrition["Servings Per Recipe"]}</span>
            <IntegerInput value={numSelected} onValueChange={handleIntegerChange}/>
            <button className="button-sub">Remove Some Ingredients</button>
            <button className="button">Add To Cart</button>
          </div>
          <button onClick={() => alert("Recipe Saved To Favorites!")} className="details-heart">
            <FaHeart size={24} color="red" />
          </button>
        </div>
      </div>

      <div className="details-nutrit-sec">
        <div>
          <div className="details-details">
            <h3 className="details-title-sub">Ingredients</h3>
            {recipe.Ingredients.map((ingredient, index) => (
              <div>
                {ingredient.map((subIngredient, index2) => (
                  <span>{subIngredient} </span>
                ))}
              </ div>
            ))}
          </div>

            <div className="details-details">
              <h3 className="details-title-sub">Nutrition Information</h3>
              {Object.entries(recipe.Nutrition).map(([key, value]) => (
                <div>
                  {formatNutritionValue(value, key)}
                </div>
              ))}
            </div>
          </div>

          <PieChart data={nutritional_pi}/>
        </div>

      </div>
  );
};

export default Recipe;
