import React, { useEffect, useState } from "react";
import "./Grocery.css";
import { useNutriCartContext } from "../context/NutriCartContext";
import recipesData from "../data/recipes.json";

// Categorize by keywords
const categorizeIngredient = (name) => {
  const lower = name.toLowerCase();

  if (
    lower.includes("chicken") || lower.includes("beef") ||
    lower.includes("pork") || lower.includes("meat") ||
    lower.includes("fish") || lower.includes("salmon") ||
    lower.includes("tilapia") || lower.includes("shrimp") ||
    lower.includes("bacon") || lower.includes("mutton") ||
    lower.includes("sausage") || lower.includes("ham")
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

const Grocery = () => {
  const [groceries, setGroceries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const { addToCart } = useNutriCartContext();

  useEffect(() => {
    const fetchData = async () => {
      const data = recipesData;

      const ingredientMap = new Map();

      data.forEach(recipe => {
        recipe.Ingredients.forEach(([qty, unit, name]) => {
          const cleanName = name.toLowerCase().split(",")[0].trim();
          if (!ingredientMap.has(cleanName)) {
            const category = categorizeIngredient(cleanName);

            ingredientMap.set(cleanName, {
              name: cleanName.replace(/\b\w/g, l => l.toUpperCase()),
              unit,
              price: parseFloat((Math.random() * 3 + 0.5).toFixed(2)),
              quantity: 0,
              category
            });
          }
        });
      });

      setGroceries(Array.from(ingredientMap.values()));
    };

    fetchData();
  }, []);

  const updateQuantity = (index, delta) => {
    setGroceries(prev =>
      prev.map((item, i) =>
        i === index
          ? { ...item, quantity: Math.max(0, item.quantity + delta) }
          : item
      )
    );
  };

  const handleAddToCart = (item) => {
    if (item.quantity === 0) return;

    addToCart(item);

    // Reset quantity after adding
    setGroceries(prev =>
      prev.map(i =>
        i.name === item.name ? { ...i, quantity: 0 } : i
      )
    );
  };

  const filteredGroceries = groceries.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search by name or category (e.g., 'spices', 'meat')"
        className="search-bar"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="grocery-grid">
        {filteredGroceries.map((item, index) => (
          <div className="grocery-card" key={index}>
            <div className="grocery-name">{item.name}</div>
            <div className="grocery-price">
              Price per {item.unit}: ${item.price.toFixed(2)}
            </div>
            <div className="quantity-controls">
              <button onClick={() => updateQuantity(index, -1)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => updateQuantity(index, 1)}>+</button>
            </div>
            <div className="total-price">
              Total: ${(item.price * item.quantity).toFixed(2)}
            </div>
            <button
              className="add-to-cart-btn"
              onClick={() => handleAddToCart(item)}
            >
              Add to Cart
            </button>
            <div className="grocery-category">Category: {item.category}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Grocery;
