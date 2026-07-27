import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Star, MapPin, Users, Award, UtensilsCrossed, ShoppingBag, Bike, PartyPopper } from "lucide-react";
import HeroSection from "../../components/customer/HeroSection";
import MenuItemCard from "../../components/customer/MenuItemCard";
import Reveal from "../../components/common/Reveal";
import api from "../../utils/api";
import { useLanguage } from "../../context/LanguageContext";
import { t } from "../../utils/translations";
import "./HomePage.css";

const FEATURED_CATEGORIES = ["Specialties", "Crispy Collection", "Poke Bowls"];

const useStats = (language) => [
  { icon: <Star />, label: language === "fr" ? "Qualité Premium" : "Premium Quality", value: "100+" },
  { icon: <Users />, label: language === "fr" ? "Clients Satisfaits" : "Happy Customers", value: language === "fr" ? "Quotidien" : "Daily" },
  { icon: <Award />, label: language === "fr" ? "Articles au Menu" : "Menu Items", value: "97+" },
  { icon: <MapPin />, label: language === "fr" ? "Emplacements" : "Locations", value: "1" },
];

const HomePage = () => {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);
  const { language } = useLanguage();
  const stats = useStats(language);

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
          <Reveal as="p" className="section-eyebrow">{t(language, "home_favourites")}</Reveal>
          <Reveal as="h2" className="section-title" delay={80}>{t(language, "home_featured_dishes")}</Reveal>
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
              {t(language, "home_view_menu")} <ChevronRight size={16} />
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
            <p className="section-eyebrow">{t(language, "home_our_story")}</p>
            <h2 className="section-title">{t(language, "home_more_than_sushi")}</h2>
            <div className="divider" />
            <p>{t(language, "home_story_p1")}</p>
            <p style={{ marginTop: 14 }}>{t(language, "home_story_p2")}</p>
            <Link to="/about" className="btn btn-gold" style={{ marginTop: 28 }}>
              {t(language, "home_learn_more")} <ChevronRight size={16} />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Services */}
      <section className="services-section section">
        <div className="container">
          <Reveal as="p" className="section-eyebrow">{t(language, "home_how_serve")}</Reveal>
          <Reveal as="h2" className="section-title" delay={80}>{t(language, "home_order_your_way")}</Reveal>
          <Reveal className="divider" delay={140} />
          <div className="services-grid">
            {[
              { icon: UtensilsCrossed, title: t(language, "home_dine_in"), desc: t(language, "home_dine_in_desc") },
              { icon: ShoppingBag, title: t(language, "home_takeout"), desc: t(language, "home_takeout_desc") },
              { icon: Bike, title: t(language, "home_delivery"), desc: t(language, "home_delivery_desc") },
              { icon: PartyPopper, title: t(language, "home_party_orders"), desc: t(language, "home_party_orders_desc") },
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
            <h2>{t(language, "home_ready_order")}</h2>
            <p>{t(language, "home_ready_order_desc")}</p>
          </div>
          <div className="cta-btns">
            <Link to="/menu" className="btn btn-gold">{t(language, "hero_order_now")}</Link>
            <Link to="/reservations" className="btn btn-outline">{t(language, "hero_book_table")}</Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
};

export default HomePage;
