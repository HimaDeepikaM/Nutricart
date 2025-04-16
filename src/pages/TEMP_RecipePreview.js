import React from "react";
import { useNutriCartContext } from "../context/NutriCartContext";
function PREVIEW() {
    const { allegenMarkedRecipes } = useNutriCartContext();
    return (
        <div>
        {allegenMarkedRecipes != undefined ? (
            allegenMarkedRecipes.map((recipe, index) => (
              <div>
                  <h2>{recipe.name}</h2> {/* Render the title of the recipe */}
                  <p>{recipe.Description}</p> {/* Render the description */}
                  
                  <ul>
                    {recipe.Ingredients && recipe.Ingredients.map((ingredient, i) => (
                      <li key={i}>{ingredient}</li>
                    ))}
                  </ul>
                  
                  <div>
                    <h3>Nutrition Information</h3>
                    <p>Servings Per Recipe: {recipe.Nutrition["Servings Per Recipe"]}</p>
                    <p>Calories: {recipe.Nutrition["Calories"]}</p>
                    <p>Total Fat: {recipe.Nutrition["Total Fat"]}</p>
                    <p>Saturated Fat: {recipe.Nutrition["Saturated Fat"]}</p>
                    <p>Cholesterol: {recipe.Nutrition["Cholesterol"]}</p>
                    <p>Sodium: {recipe.Nutrition["Sodium"]}</p>
                    <p>Total Carbohydrate: {recipe.Nutrition["Total Carbohydrate"]}</p>
                    <p>Dietary Fiber: {recipe.Nutrition["Dietary Fiber"]}</p>
                    <p>Protein: {recipe.Nutrition["Protein"]}</p>
                    <p>Vitamin C: {recipe.Nutrition["Vitamin C"]}</p>
                    <p>Calcium: {recipe.Nutrition["Calcium"]}</p>
                    <p>Iron: {recipe.Nutrition["Iron"]}</p>
                    <p>Potassium: {recipe.Nutrition["Potassium"]}</p>
                  </div>
                  
                  {recipe["Image URL"] && (
                    <img src={recipe["Image URL"]} alt={recipe.Title} />
                  )} {/* Display the image */}
            </div>
            ))
            ) : (
            <p>No recipes added yet.</p>
          )}
          </div>
    );
}

export default PREVIEW;