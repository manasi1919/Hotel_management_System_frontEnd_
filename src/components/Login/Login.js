import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css"; // Import common authentication styles
 
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
 
  const handleLogin = (e) => {
    e.preventDefault();
 
    // Dummy authentication
    if (email === "admin@hotel.com" && password === "admin123") {
      navigate("/dashboard"); // Redirect to dashboard after successful login
    } else {
      setError("Invalid email or password");
    }
  };
 
  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Login</h2>
        {error && <p className="error-msg">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="auth-btn">Login</button>
        </form>
        <p className="switch-auth">
          Don't have an account? <span onClick={() => navigate("/signup")}>Sign Up</span>
        </p>
      </div>
    </div>
  );
};
 
export default Login;