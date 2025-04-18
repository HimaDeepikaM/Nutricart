import React from "react";

/**
    Integer input component
      - increase/decrease related value by 1 with +/- buttons that
      - keyboard input by clicking displayed value 

    On Click : 
        - No downward propigation of click event
        - Clicking +/- buttons to change value by 1
        - Clicking displayed number to manually change value via keybaord

    Input : integer value and a state function for changing it in related contexts/react states\
 */
const IntegerInput = ({value, onValueChange }) => {
  // Increase value by 1
  const increase = (e) => {
    // Stop the event from bubbling up to the parent div
    e.stopPropagation();
    onValueChange(value + 1); // Increase the value by 1
    
  };

  // Decrease value by 1
  const decrease = (e) => {
    // Stop the event from bubbling up to the parent div
    e.stopPropagation();
    if (value > 0) {
        onValueChange(value - 1); // Decrease the value by 1, but not below 0
    }
  };

  // Set value to input value
  const handleChange = (e) => {
    // Stop the event from bubbling up to the parent div
    e.stopPropagation();
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
        onChange={handleChange}
        onClick={(e) => e.stopPropagation()}
      />
      <button onClick={increase}>+</button>
    </div>
  );
};

export default IntegerInput;