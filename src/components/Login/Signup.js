import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css"; // Import common authentication styles
 
const Signup = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
 
  const [error, setError] = useState("");
  const navigate = useNavigate();
 
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
 
  const handleSignup = (e) => {
    e.preventDefault();
    if (user.password !== user.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    console.log("User Registered:", user);
    navigate("/login"); // Redirect to login after successful signup
  };
 
  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Sign Up</h2>
        {error && <p className="error-msg">{error}</p>}
        <form onSubmit={handleSignup}>
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              placeholder="Enter your name"
              name="name"
              value={user.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              placeholder="Enter your email"
              name="email"
              value={user.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              placeholder="Create a password"
              name="password"
              value={user.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Confirm Password:</label>
            <input
              type="password"
              placeholder="Confirm your password"
              name="confirmPassword"
              value={user.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="auth-btn">Sign Up</button>
        </form>
        <p className="switch-auth">
          Already have an account? <span onClick={() => navigate("/login")}>Login</span>
        </p>
      </div>
    </div>
  );
};
 
export default Signup;