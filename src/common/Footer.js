import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaFacebookSquare, FaLinkedin } from "react-icons/fa";
import { IoLogoYoutube } from "react-icons/io";
import { AiFillInstagram } from "react-icons/ai";
import "./Footer.css"; // Import the updated CSS file

function Footer() {
  return (
    <footer className="unique-footer bg-dark text-white py-4">
      <Container>
        {/* Sections - ABOUT, EXPLORE, SUPPORT (Side by Side) */}
        <Row className="justify-content-center text-center text-md-start">
          <Col xs={12} md={9}>
            <div className="unique-footer-sections d-flex justify-content-between">
              {/* About Section */}
              <div className="unique-footer-column">
                <h6 className="unique-footer-heading">ABOUT</h6>
                <ul className="list-unstyled">
                  <li><a href="/about">About Us</a></li>
                  <li><a href="/services">Our Services</a></li>
                  <li><a href="/careers">Careers</a></li>
                  <li><a href="/news">News & Updates</a></li>
                </ul>
              </div>

              {/* Explore Section */}
              <div className="unique-footer-column">
                <h6 className="unique-footer-heading">EXPLORE</h6>
                <ul className="list-unstyled">
                  <li><a href="/rooms">Rooms & Suites</a></li>
                  <li><a href="/dining">Dining</a></li>
                  <li><a href="/spa">Spa & Wellness</a></li>
                  <li><a href="/offers">Special Offers</a></li>
                </ul>
              </div>

              {/* Support Section */}
              <div className="unique-footer-column">
                <h6 className="unique-footer-heading">SUPPORT</h6>
                <ul className="list-unstyled">
                  <li><a href="/contact">Contact Us</a></li>
                  <li><a href="/faq">FAQs</a></li>
                  <li><a href="/privacy-policy">Privacy Policy</a></li>
                  <li><a href="/terms">Terms & Conditions</a></li>
                </ul>
              </div>
            </div>
          </Col>

          {/* Connect with Us Section (Separate) */}
          <Col xs={12} md={3} className="text-center text-md-end">
            <h6 className="unique-footer-heading">CONNECT WITH US</h6>
            <div className="unique-social-icons">
              <a href="https://facebook.com" className="unique-social-icon">
                <FaFacebookSquare />
              </a>
              <a href="https://linkedin.com" className="unique-social-icon">
                <FaLinkedin />
              </a>
              <a href="https://instagram.com" className="unique-social-icon">
                <AiFillInstagram />
              </a>
              <a href="https://youtube.com" className="unique-social-icon">
                <IoLogoYoutube />
              </a>
            </div>
          </Col>
        </Row>

        {/* Copyright Section */}
        <Row className="mt-3 border-top pt-3 text-center">
          <Col>
            <p className="mb-0">© 2025 Hotel Management. All Rights Reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
