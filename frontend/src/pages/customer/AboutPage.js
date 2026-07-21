import { Link } from "react-router-dom";
import { Target, Fish, Users, Rocket } from "lucide-react";
import Reveal from "../../components/common/Reveal";
import "./AboutPage.css";

const AboutPage = () => (
  <div className="about-page">
    <div className="about-hero">
      <div className="container">
        <p className="section-eyebrow">Our Story</p>
        <h1>About Barg</h1>
        <div className="divider" style={{ margin: "12px auto 0" }} />
      </div>
    </div>

    <div className="container about-body">
      <div className="about-intro">
        <Reveal as="div" variant="left" className="about-intro-text">
          <h2>More Than a Meal — It's an Experience</h2>
          <div className="divider" />
          <p>At Barg Sushi Bar & Grill, we are passionate about the art of Japanese cuisine. Every roll, every plate, every bowl is crafted with the finest ingredients and a commitment to quality that sets us apart.</p>
          <p>Whether you're joining us for a quiet dinner, celebrating a special occasion, or ordering a party platter — we bring the same level of care and precision to everything we serve.</p>
          <p>We serve inside the restaurant, offer takeout, deliver to your door, and accept large orders for parties and corporate events.</p>
        </Reveal>
        <Reveal as="div" variant="right" delay={120} className="about-logo-visual">
          <div className="logo-display">
            <img src={`${process.env.PUBLIC_URL}/logo.png`} alt="Barg Sushi Bar & Grill" className="logo-display-img" />
            <div className="logo-accent" />
          </div>
        </Reveal>
      </div>

      {/* Values */}
      <div className="about-values">
        <h2 className="section-title" style={{ textAlign: "center" }}>What We Stand For</h2>
        <div className="divider" style={{ margin: "12px auto 40px" }} />
        <div className="values-grid">
          {[
            { icon: Target, title: "Quality First", desc: "We source premium fish and fresh ingredients daily. No shortcuts, ever." },
            { icon: Fish, title: "Authentic Craft", desc: "Traditional techniques combined with creative innovation in every roll we make." },
            { icon: Users, title: "Community", desc: "We are proud to serve our neighbourhood and be part of your everyday and celebrations." },
            { icon: Rocket, title: "Consistency", desc: "Whether you're dining in or ordering delivery, the quality is always the same." },
          ].map((v, i) => (
            <Reveal as="div" className="value-card" key={v.title} delay={i * 90} variant="scale">
              <div className="value-icon"><v.icon size={28} /></div>
              <h3>{v.title}</h3>
              <p>{v.desc}</p>
            </Reveal>
          ))}
        </div>
      </div>

      {/* CTA */}
      <Reveal as="div" className="about-cta">
        <h2>Ready to Experience It?</h2>
        <p>Browse our full menu or book a table today.</p>
        <div className="about-cta-btns">
          <Link to="/menu" className="btn btn-gold">View Menu</Link>
          <Link to="/reservations" className="btn btn-outline">Book a Table</Link>
        </div>
      </Reveal>
    </div>
  </div>
);

export default AboutPage;
