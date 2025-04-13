// src/context/NutriCartContext.js
import React, { createContext, useState, useContext, useEffect } from "react";
import recipesData from "../data/recipes.json";

// Create a Context to manage favorites and cart items
const NutriCartContext = createContext();

// Custom hook to use the NutriCartContext
export const useNutriCartContext = () => useContext(NutriCartContext);

// Create a provider component
export const NutriCartProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [allergens, setAllergens] = useState(["chicken"]);
  const [allegenMarkedRecipes, setAllegenMarkedRecipes] = useState([]);

  useEffect(() => {
    // Read in recipes from json
    setRecipes(recipesData);
  }, []);

  useEffect(() => {
    if (recipes.length > 0 ) {
      setAllegenMarkedRecipes(filteredRecipes(allergens));
    }
  }, [recipes, allergens])

  // FAVORITES ---------------------------------------------------------------------
  // Add item to favorites
  const addToFavorites = (item) => {
    setFavorites((prevFavorites) => [...prevFavorites, item]);
  };
  // Remove item from favorites
  const removeFromFavorites = (item) => {
    setFavorites((prevFavorites) => prevFavorites.filter(fav => fav !== item));
  };

  // CART ---------------------------------------------------------------------------
  // Add item to cart
  const addToCart = (item) => {
    setCartItems((prevCartItems) => [...prevCartItems, item]);
  };
  // Remove item from cart
  const removeFromCart = (item) => {
    setCartItems((prevCartItems) => prevCartItems.filter(cartItem => cartItem !== item));
  };

  // RECIPES -------------------------------------------------------------------------
  const filteredRecipes = (allergens) => {
    allergens = allergens || [];
    // Mark if recipe has user's allergens
    const markRecipes = recipes.map((recipe) => {
      const containsAllergen = !allergens ? allergens.some((allergen) =>
        recipe.ingredients.some((ingredient) =>
          ingredient.toLowerCase().includes(allergen.toLowerCase())
        )
      ) : false;

      // Add containsAllergen property to the recipe
      return { ...recipe, containsAllergen };
    });
    return markRecipes;
  }

  // ALERGENS ------------------------------------------------------------------------
  // Add item to cart
  const addToAllergens = (item) => {
    setAllergens((prevAllergen) => [...prevAllergen, item]);
  };
  // Remove item from cart
  const removeFromAllergens = (item) => {
    setAllergens((prevAllergen) => prevAllergen.filter(allergen => allergen !== item));
  };



  return (
    <NutriCartContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        cartItems,
        addToCart,
        removeFromCart,
        allegenMarkedRecipes,
        allergens,
        addToAllergens,
        removeFromAllergens,
        recipes,
      }}
    >
      {children}
    </NutriCartContext.Provider>
  );
};
