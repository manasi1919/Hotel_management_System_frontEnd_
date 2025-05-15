import React, { useState, useEffect } from 'react';
import './Home.css'; // Import necessary styles
import NavBar from './NavBar';
import hotel1 from '../Assets/Images/hotel1.jpg';
import hotel3 from '../Assets/Images/hotel3.jpeg';
import { useNavigate } from 'react-router-dom'; // React Router for navigation
import { Link } from 'react-router-dom';

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate(); // Hook for navigation

  const images = [hotel1, hotel3];

  // Change background image every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval); // Cleanup interval
  }, []);

  // Function to handle the "Book Now" button click
  const handleBookNow = () => {
    navigate('/filter'); // Redirect to the booking page
  };

  return (
    <div className="home" style={{ backgroundImage: `url(${images[currentIndex]})` }}>
      {/* <NavBar /> */}
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to Our Luxury Hotel</h1>
          <p>Book your dream vacation with us.</p>

          {/* Book Now Button */}
          <button className="book-now-btn" onClick={handleBookNow}>
            Book Now
          </button>
          {/* Login and Sign-up buttons */}
          {/* <ul className="nav-list">
            <li className="nav-item">
              <Link className="nav-link" to="/login">
                <button type="button" className="btn btn-outline-success">
                  Log in
                </button>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/signup">
                <button type="button" className="btn btn-outline-danger">
                  Sign up
                </button>
              </Link>
            </li>
          </ul> */}
        </div>
      </section>

    </div>
  );
};

export default Home;
