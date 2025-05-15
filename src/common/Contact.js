import React from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaFacebookSquare, FaLinkedin, FaInstagram, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Contact.css";

const Contact = () => {
  return (
    <div className="contact-container">
      
      {/* Hero Section */}
      <section className="contact-hero">
        <h1>Contact Us</h1>
        <p>We’d love to hear from you! Reach out to us for any queries or assistance.</p>
      </section>

      {/* Contact Information */}
      <section className="contact-info">
        <div className="info-card">
          <FaMapMarkerAlt className="icon location-icon" />
          <h3>Our Address</h3>
          <p>123 EliteStay Street, New York, NY 10001</p>
        </div>
        <div className="info-card">
          <FaPhoneAlt className="icon phone-icon" />
          <h3>Call Us</h3>
          <p>+1 234 567 890</p>
        </div>
        <div className="info-card">
          <FaEnvelope className="icon email-icon" />
          <h3>Email Us</h3>
          <p>info@elitestayhotels.com</p>
        </div>
      </section>

      {/* Contact Form */}
      <section className="contact-form-section">
        <h2>Send Us a Message</h2>
        <form className="contact-form">
          <input type="text" name="name" placeholder="Your Name" required />
          <input type="email" name="email" placeholder="Your Email" required />
          <textarea name="message" rows="5" placeholder="Your Message" required></textarea>
          <button type="submit">Send Message</button>
        </form>
      </section>

      {/* Social Media Links */}
      <section className="social-media">
        <h2>Follow Us</h2>
        <div className="social-icons">
          <Link to="#" className="facebook"><FaFacebookSquare /></Link>
          <Link to="#" className="instagram"><FaInstagram /></Link>
          <Link to="#" className="linkedin"><FaLinkedin /></Link>
          <Link to="#" className="youtube"><FaYoutube /></Link>
        </div>
      </section>

      {/* Back to Home Button */}
      <div className="back-home-container">
        <Link to="/" className="btn-secondary">Back to Home</Link>
      </div>

    </div>
  );
};

export default Contact;
