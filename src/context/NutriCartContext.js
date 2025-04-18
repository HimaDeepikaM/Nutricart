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
  const [allergens, setAllergens] = useState([]);
  const [allegenMarkedRecipes, setAllegenMarkedRecipes] = useState([]);

  const [user, setUser] = useState(null);
  
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
    setFavorites((prevFavorites) => prevFavorites.filter(fav => fav.name !== item.name));
  };

  // CART ---------------------------------------------------------------------------
  // Add item to cart or update item if exists
  const addToCart = (item) => {
    setCartItems((prevItems) => {
      // Check if the item already exists in the cart
      const existingItemIndex = prevItems.findIndex(
        (cartItem) => cartItem.name === item.name
      );

      if (existingItemIndex !== -1) {
        // If the item exists, update the quantity
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + item.quantity,
        };
        return updatedItems;
      }

      // If the item doesn't exist, add it to the cart
      return [...prevItems, item];
    });
  };
  // Remove item from cart
  const removeFromCart = (item) => {
    setCartItems((prevCartItems) => prevCartItems.filter(cartItem => cartItem !== item));
  };
  const updateCart = (item) => {
    setCartItems((prevItems) => {
      // Check if the item already exists in the cart
      const existingItemIndex = prevItems.findIndex(
        (cartItem) => cartItem.name === item.name
      );

      if (existingItemIndex !== -1) {
        // If the item exists, update the quantity
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: item.quantity,
        };
        return updatedItems;
      }

      // If the item doesn't exist, add it to the cart
      return [...prevItems, item];
    });
  };

  // RECIPES -------------------------------------------------------------------------

  // Categorize by keywords
  const categorizeIngredient = (name) => {
    const lower = name.toLowerCase();

    if (
      lower.includes("chicken") || lower.includes("beef") ||
      lower.includes("pork") || lower.includes("meat") ||
      lower.includes("fish") || lower.includes("salmon") ||
      lower.includes("tilapia") || lower.includes("shrimp") ||
      lower.includes("bacon") || lower.includes("mutton") ||
      lower.includes("sausage") || lower.includes("ham") ||
      lower.includes("flounder")
    ) return "meat";

    if (
      lower.includes("onion") || lower.includes("tomato") ||
      lower.includes("potato") || lower.includes("spinach") ||
      lower.includes("broccoli") || lower.includes("carrot") ||
      lower.includes("cauliflower") || lower.includes("pepper") ||
      lower.includes("cucumber") || lower.includes("cabbage") ||
      lower.includes("beans") || lower.includes("lettuce") ||
      lower.includes("zucchini") || lower.includes("eggplant") ||
      lower.includes("lemon zest") || lower.includes("lemon juice")
    ) return "vegetable";

    if (
      lower.includes("apple") || lower.includes("banana") ||
      lower.includes("orange") || lower.includes("grape") ||
      lower.includes("mango") || lower.includes("berry") ||
      lower.includes("pineapple") || lower.includes("papaya") ||
      lower.includes("peach") || lower.includes("fruit")
    ) return "fruits";

    if (
      lower.includes("honey") || lower.includes("syrup") ||
      lower.includes("sugar") || lower.includes("maple")
    ) return "sweeteners";

    if (
      lower.includes("salt") || lower.includes("paprika") ||
      lower.includes("cumin") || lower.includes("turmeric") ||
      lower.includes("chili") || lower.includes("masala") ||
      lower.includes("spice") || lower.includes("herb") ||
      lower.includes("basil") || lower.includes("oregano") ||
      lower.includes("garam") || lower.includes("ginger") ||
      lower.includes("garlic") || lower.includes("parsley") ||
      lower.includes("coriander") || lower.includes("thyme") ||
      lower.includes("rosemary")
    ) return "spice";

    if (
      lower.includes("milk") || lower.includes("cheese") ||
      lower.includes("butter") || lower.includes("yogurt") ||
      lower.includes("cream") || lower.includes("paneer") ||
      lower.includes("curd") || lower.includes("ghee")
    ) return "dairy";

    if (
      lower.includes("olive oil") || lower.includes("oil")
    ) return "oil";

    return "uncategorized";
  };

  const filteredRecipes = (allergens) => {
    allergens = allergens || [];
    // Mark if recipe has user's allergens
    const markRecipes = recipes.map((recipe) => {
      const containsAllergen = allergens.length > 0 ? 
        allergens.some((allergen) => // Check for direct words
          recipe.ingredients.some(([qty, unit, name]) =>
            name.toLowerCase().includes(allergen.toLowerCase())
          )
        ) 
        ||  
        allergens.some((allergen) => // Check categories
          recipe.ingredients.some(([qty, unit, name]) =>
              categorizeIngredient(name.toLowerCase()) === allergen
          )
        )
        : false;

      const ingredientMap = new Map();
      recipe.ingredients.forEach(([qty, unit, name]) => {
        const cleanName = name.toLowerCase().split(",")[0].trim();
        if (!ingredientMap.has(cleanName)) {
          const category = categorizeIngredient(cleanName.toLowerCase());

          const containsAllergenIngredient =  allergens.some((allergen) => 
            name.toLowerCase().includes(allergen.toLowerCase()) || categorizeIngredient(name.toLowerCase()) === allergen
          )

          ingredientMap.set(cleanName, {
            name: cleanName.replace(/\b\w/g, l => l.toUpperCase()),
            unit,
            price: parseFloat((Math.random() * 3 + 0.5).toFixed(2)),
            quantity: 0,
            category,
            cleanName: cleanName,
            containsAllergen: containsAllergenIngredient
          });
        }
      });

      // Add containsAllergen property to the recipe
      return { ...recipe, containsAllergen, ingredientMap };
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



  // AUTHENTICATION ------------------------------------------------------------------
  const login = (userData) => {
    setUser(userData);
    setAllergens(userData.allergens);
  };

  const logout = () => {
    setUser(null);
    setCartItems([]);
    setFavorites([]);
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
        updateCart,
        allegenMarkedRecipes,
        allergens,
        addToAllergens,
        removeFromAllergens,
        recipes,
        user,
        setUser,
        login,
        logout,
      }}
    >
      {children}
    </NutriCartContext.Provider>
  );
};
