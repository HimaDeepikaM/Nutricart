import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useNutriCartContext } from "../context/NutriCartContext";
import "./Signup.css";

function Login() {
  const navigate = useNavigate();
  const { login } = useNutriCartContext(); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const matchedUser = users.find((user) => user.email === email && user.password === password);

    if (!matchedUser) {
      alert("Invalid credentials. Please try again.");
      return;
    }

    localStorage.setItem("isAuthenticated", "true");

    // Save full user info
    login({
      username: matchedUser.name,
      email: matchedUser.email,
      joinedDate: matchedUser.joinedDate || new Date().toISOString(), 
      password: matchedUser.password
    });

    alert(`Welcome, ${matchedUser.name}!`);
    navigate("/dashboard");
  };

  const handleForgotPassword = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find((u) => u.email === email);
    if (user) {
      alert(`Password for ${email} is: ${user.password}`);
    } else {
      alert("No account found with that email.");
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-content">
        <h2>Login</h2>
        <p>Don't have an account? <Link to="/signup" className="login-link">Sign up</Link></p>
        <form onSubmit={handleLogin}>
          <input 
            type="email" 
            placeholder="Email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
          <p className="forgot-password" onClick={handleForgotPassword}>Forgot Password?</p>
          <button type="submit" className="create-account-btn">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
