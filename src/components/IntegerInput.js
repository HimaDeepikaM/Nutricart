import React, { useState } from "react";

const IntegerInput = ({value, onValueChange }) => {
  const increase = () => {
    onValueChange(value + 1); // Increase the value by 1
  };

  const decrease = () => {
    if (value > 0) {
        onValueChange(value - 1); // Decrease the value by 1, but not below 0
    }
  };

  const handleChange = (e) => {
    const inputValue = e.target.value;
    // Only allow integer values by checking if the input is a valid integer
    if (inputValue === "" || /^[0-9\b]+$/.test(inputValue)) {
        onValueChange(inputValue === "" ? "" : parseInt(inputValue, 10)); // If input is valid, update value
    }
  };

  return (
    <div className="integer-input">
      <button onClick={decrease}>-</button>
      <input
        type="text"
        value={value}
        onChange={onValueChange}
      />
      <button onClick={increase}>+</button>
    </div>
  );
};

export default IntegerInput;