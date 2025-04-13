import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.css";

function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validatePassword = (password) => {
    if (password.length < 8) return "Password must be at least 8 characters long.";
    if (!/[A-Z]/.test(password)) return "Password must have an uppercase letter.";
    if (!/[a-z]/.test(password)) return "Password must have a lowercase letter.";
    if (!/\d/.test(password)) return "Password must contain a number.";
    if (!/[\W_]/.test(password)) return "Password must contain a special character.";
    return "";
  };

  const handleSignup = (e) => {
    e.preventDefault();
    const error = validatePassword(password);
    if (error) {
      setPasswordError(error);
      return;
    }

    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match.");
      return;
    }

    const newUser = { name, email, password };
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    const alreadyExists = existingUsers.find((user) => user.email === email);

    if (alreadyExists) {
      alert("User already exists with this email.");
      return;
    }

    existingUsers.push(newUser);
    localStorage.setItem("users", JSON.stringify(existingUsers));
    alert("Signup successful!");
    navigate("/login");
  };

  return (
    <div className="signup-container">
      <div className="signup-content">
        <h2>Create an Account</h2>
        <form onSubmit={handleSignup}>
          <input type="text" placeholder="Name" required onChange={(e) => setName(e.target.value)} />
          <input type="email" placeholder="Email" required onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" required onChange={(e) => setPassword(e.target.value)} />
          <input type="password" placeholder="Confirm Password" required onChange={(e) => setConfirmPassword(e.target.value)} />
          {passwordError && <p className="password-error">{passwordError}</p>}
          <button type="submit" className="create-account-btn">Sign Up</button>
        </form>
        <p>Already have an account? <Link to="/login" className="login-link">Login</Link></p>
      </div>
    </div>
  );
}

export default Signup;
