import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.css";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Handle login submission
  const handleLogin = (e) => {
    e.preventDefault();

    // Get stored user data
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser || storedUser.email !== email || storedUser.password !== password) {
      alert("Invalid credentials. Please try again.");
      return;
    }

    // Store login status
    localStorage.setItem("isAuthenticated", "true");

    alert("Login successful!");
    navigate("/dashboard");
  };

  return (
    <div className="signup-container">
      <div className="signup-content">
        <h2>Login</h2>
        <p>Don't have an account? <Link to="/signup" className="login-link">Sign up</Link></p>

        <form onSubmit={handleLogin}>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />

          <button type="submit" className="create-account-btn">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
