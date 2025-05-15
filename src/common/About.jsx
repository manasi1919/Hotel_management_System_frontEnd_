import React from "react";
import { FaFacebookSquare, FaLinkedin } from "react-icons/fa";
import { IoLogoYoutube } from "react-icons/io";
import { AiFillInstagram } from "react-icons/ai";
import { Link } from "react-router-dom";
import svg from "../Assets/Images/about.svg";
import customersvg1 from "../Assets/Images/customer1.png";
import customersvg2 from "../Assets/Images/customer2.svg";
import customersvg3 from "../Assets/Images/customer3.svg";
import "./About.css"; // Importing CSS

const About = () => {
  return (
    <div className="about-container">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-content">
          <h1>Welcome to EliteStay Hotels</h1>
          <p>
            Where luxury meets comfort. We offer the best hospitality experience
            with top-notch services, seamless bookings, and unmatched guest
            satisfaction.
          </p>
          <Link to="/contact" className="btn btn-primary">Contact Us</Link>
        </div>
        <div className="about-image">
          <img src={svg} alt="About Us" />
        </div>
      </section>

      {/* About Company */}
      <section className="about-company">
        <h2>About Our Company</h2>
        <p>
          At <strong>EliteStay Hotels</strong>, we redefine the hospitality
          experience with smart technology, ensuring seamless operations from{" "}
          <strong>room reservations</strong> to{" "}
          <strong>customer engagement</strong>.
        </p>
      </section>

      {/* Testimonials */}
      <section className="testimonials">
        <h2>What Our Clients Say</h2>
        <div className="testimonial-cards">
          {[
            {
              name: "John Doe",
              feedback:
                "An outstanding experience! The booking process was seamless, and the service was impeccable.",
              img: customersvg1,
            },
            {
              name: "Sophia Williams",
              feedback:
                "A game-changer for hotel management! This system makes everything so efficient and smooth.",
              img: customersvg2,
            },
            {
              name: "Michael Brown",
              feedback:
                "A seamless and user-friendly system that has truly transformed our hotel operations!",
              img: customersvg3,
            },
          ].map((testimonial, index) => (
            <div key={index} className="testimonial-card">
              <img src={testimonial.img} alt={testimonial.name} />
              <h3>{testimonial.name}</h3>
              <p>{testimonial.feedback}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Meet Our Team */}
      <section className="team-section">
        <h2>Meet Our Team</h2>
        <div className="team-members">
          {[
            {
              name: "Emma Johnson",
              role: "CEO & Founder",
              experience: "10 years",
              img: "https://source.unsplash.com/TMgQMXoglsM/500x350",
            },
            {
              name: "James Smith",
              role: "Operations Manager",
              experience: "8 years",
              img: "https://source.unsplash.com/sNut2MqSmds/500x350",
            },
            {
              name: "Olivia Taylor",
              role: "Customer Relations Head",
              experience: "6 years",
              img: "https://source.unsplash.com/9UVmlIb0wJU/500x350",
            },
          ].map((member, index) => (
            <div key={index} className="team-card">
              <img src={member.img} alt={member.name} />
              <h3>{member.name}</h3>
              <p>{member.role}</p>
              <p>{member.experience} experience</p>
              <div className="social-icons">
                <FaFacebookSquare className="facebook-icon" />
                <AiFillInstagram className="instagram-icon" />
                <FaLinkedin className="linkedin-icon" />
                <IoLogoYoutube className="youtube-icon" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Back to Home Button */}
      <div className="back-home-container">
        <Link to="/" className="btn btn-secondary">⬅ Back to Home</Link>
      </div>
    </div>
  );
};

export default About;
