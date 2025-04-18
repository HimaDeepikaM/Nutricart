import React from "react";
import { useNutriCartContext } from "../context/NutriCartContext";
import IntegerInput from "../components/IntegerInput";
import "./Cart.css";
import { IoWarning } from "react-icons/io5";
import { useNavigate } from "react-router-dom"; // 🔹 Added for navigation

const Cart = () => {
  const { cartItems, removeFromCart, updateCart } = useNutriCartContext();
  const navigate = useNavigate(); // 🔹 Used for redirection

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const updateQuantity = (index, newQuantity) => {
    const updatedItem = cartItems[index];

    if (newQuantity <= 0) {
      removeFromCart(updatedItem);
    } else {
      updateCart({ ...updatedItem, quantity: newQuantity });
    }
  };

  return (
    <div className="cart-page">
      <h2>🛒 Your Cart</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="cart-grid">
            {cartItems.map((item, index) => (
              <div className="cart-card" key={index}>
                <h3 className="item-name">
                  {item.name}
                  {item.containsAllergen ? (
                    <IoWarning size={24} color="orange" style={{ minWidth: "fit-content" }} />
                  ) : (
                    <div />
                  )}
                </h3>
                <p className="item-price">
                  Price: ${item.price.toFixed(2)} per {item.unit}
                </p>
                <IntegerInput
                  value={item.quantity}
                  onValueChange={(newValue) => updateQuantity(index, newValue)}
                />
                <p className="item-total">
                  Total: ${(item.price * item.quantity).toFixed(2)}
                </p>

                <button className="remove-btn" onClick={() => removeFromCart(item)}>
                  Remove
                </button>
              </div>
            ))}
          </div>

          <h3 className="total-summary">Total: ${total.toFixed(2)}</h3>

          {/* 🔹 Proceed to Checkout Button */}
          <button className="checkout-btn" onClick={() => navigate("/checkout")}>
            Proceed to Checkout
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;
