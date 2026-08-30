import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Instagram, Facebook } from "lucide-react";
import Reveal from "./Reveal";
import { useLanguage } from "../../context/LanguageContext";
import { t } from "../../utils/translations";
import "./Footer.css";

const Footer = () => {
  const { language } = useLanguage();

  return (
    <footer className="footer">
      <Reveal as="div" className="footer-inner container">
        <div className="footer-brand">
          <div className="footer-logo-crop">
            <img src={`${process.env.PUBLIC_URL}/logonew.jpg`} alt="Barg Sushi Bar & Grill" className="footer-logo-img" />
          </div>
          <p className="footer-tagline">{t(language, "footer_tagline")}</p>
          <p className="footer-desc">{t(language, "footer_desc")}<br />{t(language, "footer_desc2")}</p>
          <div className="footer-socials">
            <a href="#" aria-label="Instagram"><Instagram size={18} /></a>
            <a href="#" aria-label="Facebook"><Facebook size={18} /></a>
          </div>
        </div>

        <div className="footer-col">
          <h4>{t(language, "footer_quick_links")}</h4>
          <ul>
            <li><Link to="/menu">{t(language, "footer_our_menu")}</Link></li>
            <li><Link to="/gallery">{t(language, "footer_gallery")}</Link></li>
            <li><Link to="/reservations">{t(language, "footer_book_table")}</Link></li>
            <li><Link to="/about">{t(language, "footer_about_us")}</Link></li>
            <li><Link to="/contact">{t(language, "footer_contact")}</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>{t(language, "footer_contact_title")}</h4>
          <ul className="footer-contact">
            <li><MapPin size={14} /> <span>{t(language, "footer_address_placeholder")}</span></li>
            <li><Phone size={14} /> <span>{t(language, "footer_tbd")}</span></li>
            <li><Mail size={14} /> <span>{t(language, "footer_tbd")}</span></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>{t(language, "footer_hours")}</h4>
          <ul className="footer-hours">
            <li><span>{language === "fr" ? "Lun – Jeu" : "Mon – Thu"}</span><span>11h – 22h</span></li>
            <li><span>{language === "fr" ? "Ven – Sam" : "Fri – Sat"}</span><span>11h – 23h</span></li>
            <li><span>{language === "fr" ? "Dimanche" : "Sunday"}</span><span>12h – 21h</span></li>
          </ul>
        </div>
      </Reveal>
      <div className="footer-bottom container">
        <p>© {new Date().getFullYear()} Barg Sushi Bar & Grill. {t(language, "footer_rights")}</p>
      </div>
    </footer>
  );
};

export default Footer;
