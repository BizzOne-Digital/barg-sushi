import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Star, MapPin, Users, Award, UtensilsCrossed, ShoppingBag, Bike, PartyPopper } from "lucide-react";
import HeroSection from "../../components/customer/HeroSection";
import MenuItemCard from "../../components/customer/MenuItemCard";
import Reveal from "../../components/common/Reveal";
import api from "../../utils/api";
import "./HomePage.css";

const FEATURED_CATEGORIES = ["Specialties", "Crispy Collection", "Poke Bowls"];

const stats = [
  { icon: <Star />, label: "Premium Quality", value: "100+" },
  { icon: <Users />, label: "Happy Customers", value: "Daily" },
  { icon: <Award />, label: "Menu Items", value: "97+" },
  { icon: <MapPin />, label: "Locations", value: "1" },
];

const HomePage = () => {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/menu?featured=true").then(({ data }) => {
      setFeatured(data.data.slice(0, 8));
    }).catch(console.error).finally(() => setLoading(false));
  }, []);

  return (
    <div className="homepage">
      <HeroSection />

      {/* Stats bar */}
      <div className="stats-bar">
        <div className="container stats-inner">
          {stats.map((s, i) => (
            <Reveal as="div" className="stat-item" key={i} delay={i * 90}>
              <div className="stat-icon">{s.icon}</div>
              <div>
                <div className="stat-value">{s.value}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Featured Items */}
      <section className="section featured-section">
        <div className="container">
          <Reveal as="p" className="section-eyebrow">Crowd Favourites</Reveal>
          <Reveal as="h2" className="section-title" delay={80}>Featured Dishes</Reveal>
          <Reveal className="divider" delay={140} />
          {loading ? (
            <div className="spinner" />
          ) : (
            <div className="featured-grid">
              {featured.map((item, i) => (
                <Reveal key={item._id} variant="scale" delay={(i % 4) * 90}>
                  <MenuItemCard item={item} />
                </Reveal>
              ))}
            </div>
          )}
          <div style={{ textAlign: "center", marginTop: 40 }}>
            <Link to="/menu" className="btn btn-outline">
              View Full Menu <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* About teaser */}
      <section className="about-teaser section">
        <div className="container about-teaser-inner">
          <Reveal
            variant="left"
            className="about-teaser-visual"
            style={{ "--about-bg-image": `url(${process.env.PUBLIC_URL}/home.png)` }}
          >
            <div className="about-accent-box">
              <div className="accent-line" />
              <div className="accent-text">
                <span>Sushi</span>
                <span>Grill</span>
                <span>Bar</span>
              </div>
            </div>
          </Reveal>
          <Reveal variant="right" className="about-teaser-text" delay={120}>
            <p className="section-eyebrow">Our Story</p>
            <h2 className="section-title">More Than Just Sushi</h2>
            <div className="divider" />
            <p>At Barg Sushi Bar & Grill, we combine the artistry of Japanese cuisine with the warmth of a neighbourhood restaurant. Every roll is crafted fresh, every dish prepared with care.</p>
            <p style={{ marginTop: 14 }}>Whether you're dining in, ordering for pickup, or planning a party — we've got you covered.</p>
            <Link to="/about" className="btn btn-gold" style={{ marginTop: 28 }}>
              Learn More <ChevronRight size={16} />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Services */}
      <section className="services-section section">
        <div className="container">
          <Reveal as="p" className="section-eyebrow">How We Serve You</Reveal>
          <Reveal as="h2" className="section-title" delay={80}>Order Your Way</Reveal>
          <Reveal className="divider" delay={140} />
          <div className="services-grid">
            {[
              { icon: UtensilsCrossed, title: "Dine-In", desc: "Enjoy a premium experience at our restaurant. Book a table for any occasion." },
              { icon: ShoppingBag, title: "Takeout", desc: "Order ahead and pick up your favourites — ready when you are." },
              { icon: Bike, title: "Delivery", desc: "Fresh sushi delivered to your door. Fast, reliable, and hot." },
              { icon: PartyPopper, title: "Party Orders", desc: "Feeding a crowd? We accept large orders. Contact us to plan your event." },
            ].map((s, i) => (
              <Reveal as="div" className="service-card" key={s.title} delay={i * 100} variant="scale">
                <div className="service-emoji"><s.icon size={28} /></div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="cta-banner">
        <Reveal className="container cta-inner">
          <div>
            <h2>Ready to Order?</h2>
            <p>Browse our full menu and place your order online.</p>
          </div>
          <div className="cta-btns">
            <Link to="/menu" className="btn btn-gold">Order Now</Link>
            <Link to="/reservations" className="btn btn-outline">Book a Table</Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
};

export default HomePage;
