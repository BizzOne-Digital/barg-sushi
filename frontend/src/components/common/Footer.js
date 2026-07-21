import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Instagram, Facebook } from "lucide-react";
import Reveal from "./Reveal";
import "./Footer.css";

const Footer = () => (
  <footer className="footer">
    <Reveal as="div" className="footer-inner container">
      <div className="footer-brand">
        <img src={`${process.env.PUBLIC_URL}/logo.png`} alt="Barg Sushi Bar & Grill" className="footer-logo-img" />
        <p className="footer-tagline">Sushi Bar & Grill</p>
        <p className="footer-desc">Serving high quality sushi, grill and bar.<br />Dine-in · Takeout · Delivery · Party Orders.</p>
        <div className="footer-socials">
          <a href="#" aria-label="Instagram"><Instagram size={18} /></a>
          <a href="#" aria-label="Facebook"><Facebook size={18} /></a>
        </div>
      </div>

      <div className="footer-col">
        <h4>Quick Links</h4>
        <ul>
          <li><Link to="/menu">Our Menu</Link></li>
          <li><Link to="/gallery">Gallery</Link></li>
          <li><Link to="/reservations">Book a Table</Link></li>
          <li><Link to="/about">About Us</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </div>

      <div className="footer-col">
        <h4>Contact</h4>
        <ul className="footer-contact">
          <li><MapPin size={14} /> <span>Address provided by client</span></li>
          <li><Phone size={14} /> <span>To be updated</span></li>
          <li><Mail size={14} /> <span>To be updated</span></li>
        </ul>
      </div>

      <div className="footer-col">
        <h4>Hours</h4>
        <ul className="footer-hours">
          <li><span>Mon – Thu</span><span>11am – 10pm</span></li>
          <li><span>Fri – Sat</span><span>11am – 11pm</span></li>
          <li><span>Sunday</span><span>12pm – 9pm</span></li>
        </ul>
      </div>
    </Reveal>
    <div className="footer-bottom container">
      <p>© {new Date().getFullYear()} Barg Sushi Bar & Grill. All rights reserved.</p>
    </div>
  </footer>
);

export default Footer;
