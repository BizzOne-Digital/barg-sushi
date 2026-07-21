import { Link } from "react-router-dom";
import { ChevronRight, Clock, Truck, Phone } from "lucide-react";
import "./HeroSection.css";

const HeroSection = () => (
  <section
    className="hero"
    style={{
      "--hero-bg-image": `url(${process.env.PUBLIC_URL}/hero.png)`,
      "--hero-bg-image-mobile": `url(${process.env.PUBLIC_URL}/mobile-hero.png)`,
    }}
  >
    {/* Particle overlay */}
    <div className="hero-overlay" />

    <div className="hero-content container">
      <div className="hero-eyebrow">
        <span className="eyebrow-line" />
        <span>EST. 2026</span>
        <span className="eyebrow-line" />
      </div>

      <h1 className="hero-title">
        Authentic<br />
        <span className="hero-title-gold">Sushi</span>{" "}
        <span className="hero-title-light">Experience</span>
      </h1>

      <p className="hero-subtitle">
        Premium sushi, grill & bar — crafted with the finest ingredients.<br />
        Dine with us, take it out, or have it delivered to your door.
      </p>

      <div className="hero-cta">
        <Link to="/menu" className="btn btn-gold hero-btn-primary">
          Order Now <ChevronRight size={18} />
        </Link>
        <Link to="/reservations" className="btn btn-outline hero-btn-secondary">
          Book a Table
        </Link>
      </div>

      <div className="hero-badges">
        <div className="hero-badge">
          <Clock size={16} />
          <span>Ready in 20–30 min</span>
        </div>
        <div className="hero-badge-divider" />
        <div className="hero-badge">
          <Truck size={16} />
          <span>Delivery Available</span>
        </div>
        <div className="hero-badge-divider" />
        <div className="hero-badge">
          <Phone size={16} />
          <span>Party Orders Welcome</span>
        </div>
      </div>
    </div>

    <div className="hero-scroll-indicator">
      <div className="scroll-line" />
    </div>
  </section>
);

export default HeroSection;
