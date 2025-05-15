import React, { useState } from 'react';
import './NavBar.css'; // Ensure this file is correctly linked
import { Link } from 'react-router-dom';

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Toggle the menu visibility when hamburger is clicked
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };


  return (
    <nav className="navbar">
      <div className="logo">
        <h1 className="navbar-brand">Hotel Management</h1>
      </div>

      {/* Hamburger Icon */}
      <div className={`hamburger ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>

      {/* Navigation Links */}
      <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
        <li><Link className="nav-link" to="/">Home</Link></li>
        <li><Link className="nav-link" to="/amenity">Amenities</Link></li>
        <li><Link className="nav-link" to="/rooms">Rooms</Link></li>
        {/* <li><Link className="nav-link" to="/roomType">Room Types</Link></li> */}
        <li><Link className='nav-link ' to="/hotel">Hotels</Link></li>
        <li><Link className='nav-link' to="/admin">Admin</Link></li>
      </ul>
    </nav>
  );
};

export default NavBar;
