import React from "react";
import { useNutriCartContext } from "../context/NutriCartContext";
import IntegerInput from "../components/IntegerInput";
import "./Cart.css";

const Cart = () => {
  const { cartItems, removeFromCart, updateCart } = useNutriCartContext();

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const updateQuantity = (index, newQuantity) => {
    const updatedItem = cartItems[index];

    // If quantity is 0 or less, remove the item
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
                <h3 className="item-name">{item.name}</h3>
                <p className="item-price">Price: ${item.price.toFixed(2)} per {item.unit}</p>
                <IntegerInput value={item.quantity}
                  onValueChange={(newValue) => updateQuantity(index, newValue)} />
                <p className="item-total">Total: ${(item.price * item.quantity).toFixed(2)}</p>

                <button className="remove-btn" onClick={() => removeFromCart(item)}>
                  Remove
                </button>
              </div>
            ))}
          </div>

          <h3 className="total-summary">Total: ${total.toFixed(2)}</h3>
        </>
      )}
    </div>
  );
};

export default Cart;