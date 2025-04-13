import React from "react";
import { useParams } from "react-router-dom";
import { useNutriCartContext } from "../context/NutriCartContext"; // Import your context
import ErrorPage from "./ErrorPage";
import IntegerInput from "../components/IntegerInput";

const Recipe = () => {
  const { title } = useParams(); // Access the recipe Title from the URL
  const { recipes } = useNutriCartContext(); // Get the recipes from the context

  // Convert title from URL format back to regular format
  const formattedTitle = decodeURIComponent(title.replace(/-/g, " "));

  // Find the recipe by Title
  const recipe = recipes.find((recipe) => recipe.Title.toLowerCase() === formattedTitle.toLowerCase());
  console.log(recipe);

  if (!recipe) {
    // Direct to Error Page
    return (
      <ErrorPage />
    );
  }

   // Function to handle the display of the nutrition value
   const formatNutritionValue = (value) => {
    if (typeof value === 'string') {
      // Check if the value contains both a numeric part and a percentage part
      const numericMatch = value.match(/[\d\.]+(?:g|mg|%)/g); // Match the numeric part with units (g, mg, %)
      const percentageMatch = value.match(/\d+%/); // Match percentage part (e.g., 39%)
      if (numericMatch && percentageMatch) {
        return (
          <div>
            <span>{numericMatch[0]}</span>
            <span> ({percentageMatch[0]})</span>
          </ div>
        );
      }
      // If only a numeric part exists (like '30g', '50mg', etc.)
      if (numericMatch) {
        return <span>{numericMatch[0]}</span>;
      }
      // If only a percentage exists
      if (percentageMatch) {
        return <span>{percentageMatch[0]}</span>;
      }
    }
    return <span>{value}</span>; // For other values
  };

  return (
    <div>
      <div className="details-header">
        <img src={recipe["Image URL"]} alt={recipe.Title} className="details-image"/>
        <div className="details-details">
          <h2>{recipe.Title}</h2>
          <span>{recipe.Description}</span>
          <span>Serving Size: {recipe.Nutrition["Servings Per Recipe"]}</span>
          <span>Calories Per Serving: {recipe.Nutrition["Calories"]}</span>
        </div>
        <div className="details-cart">
          <span>${recipe.Price}</span>
          <span>${recipe.Price / recipe.Nutrition["Servings Per Recipe"]}</span>
          <IntegerInput />
          <button className="button-sub">Remove Some Ingredients</button>
          <button className="button">Add To Cart</button>
        </div>
      </div>
      <div className="details-ingredients">
        <h3>Ingredients</h3>
        <ul>
          {recipe.Ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      </div>

      <div>
        <h3>Nutrition Information</h3>
        {Object.entries(recipe.Nutrition).map(([key, value]) => (
        <span key={key}>
          {key}: {formatNutritionValue(value)}
        </span>
      ))}
    </div>
    </div>
  );
};

export default Recipe;
