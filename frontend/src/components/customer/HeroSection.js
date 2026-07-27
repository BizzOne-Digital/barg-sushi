import { Link } from "react-router-dom";
import { ChevronRight, Clock, Truck, Phone } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { t } from "../../utils/translations";
import "./HeroSection.css";

const HeroSection = () => {
  const { language } = useLanguage();

  return (
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
          <span>{t(language, "hero_badge_year")}</span>
          <span className="eyebrow-line" />
        </div>

        <h1 className="hero-title">
          {t(language, "hero_title_1")}<br />
          <span className="hero-title-gold">{t(language, "hero_title_gold")}</span>{" "}
          <span className="hero-title-light">{t(language, "hero_title_light")}</span>
        </h1>

        <p className="hero-subtitle">
          {t(language, "hero_subtitle")}<br />
          {t(language, "hero_subtitle2")}
        </p>

        <div className="hero-cta">
          <Link to="/menu" className="btn btn-gold hero-btn-primary">
            {t(language, "hero_order_now")} <ChevronRight size={18} />
          </Link>
          <Link to="/reservations" className="btn btn-outline hero-btn-secondary">
            {t(language, "hero_book_table")}
          </Link>
        </div>

        <div className="hero-badges">
          <div className="hero-badge">
            <Clock size={16} />
            <span>{t(language, "hero_ready_time")}</span>
          </div>
          <div className="hero-badge-divider" />
          <div className="hero-badge">
            <Truck size={16} />
            <span>{t(language, "hero_delivery")}</span>
          </div>
          <div className="hero-badge-divider" />
          <div className="hero-badge">
            <Phone size={16} />
            <span>{t(language, "hero_party")}</span>
          </div>
        </div>
      </div>

      <div className="hero-scroll-indicator">
        <div className="scroll-line" />
      </div>
    </section>
  );
};

export default HeroSection;
