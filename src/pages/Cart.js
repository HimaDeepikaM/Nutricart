import React from "react";
import { useNutriCartContext } from "../context/NutriCartContext";
import "./Cart.css";

const Cart = () => {
  const { cartItems, removeFromCart, addToCart } = useNutriCartContext();

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const increaseQuantity = (item) => {
    addToCart({ ...item, quantity: 1 });
  };

  const decreaseQuantity = (item) => {
    if (item.quantity <= 1) {
      removeFromCart(item);
    } else {
      addToCart({ ...item, quantity: -1 });
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

                <div className="quantity-controls">
                  <button onClick={() => decreaseQuantity(item)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => increaseQuantity(item)}>+</button>
                </div>

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