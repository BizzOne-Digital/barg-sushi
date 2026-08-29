import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { useLanguage } from "../../context/LanguageContext";
import { t } from "../../utils/translations";
import "./Navbar.css";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { itemCount } = useCart();
  const { language, toggleLanguage } = useLanguage();

  const links = [
    { to: "/", label: t(language, "nav_home") },
    { to: "/menu", label: t(language, "nav_menu") },
    { to: "/gallery", label: t(language, "nav_gallery") },
    { to: "/reservations", label: t(language, "nav_reservations") },
    { to: "/about", label: t(language, "nav_about") },
    { to: "/contact", label: t(language, "nav_contact") },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-inner container">
        <Link to="/" className="navbar-logo">
          <img src={`${process.env.PUBLIC_URL}/logonew.jpg`} alt="Barg Sushi Bar & Grill" className="logo-img" />
        </Link>

        <ul className={`navbar-links ${open ? "open" : ""}`}>
          {links.map((l) => (
            <li key={l.to}>
              <Link to={l.to} onClick={() => setOpen(false)}>{l.label}</Link>
            </li>
          ))}
        </ul>

        <div className="navbar-actions">
          <button className="lang-toggle" onClick={toggleLanguage} title="Switch language / Changer de langue">
            {language === "fr" ? "EN" : "FR"}
          </button>

          <Link to="/cart" className="cart-btn">
            <ShoppingCart size={22} />
            {itemCount > 0 && <span className="cart-badge">{itemCount}</span>}
          </Link>

          <button className="hamburger" onClick={() => setOpen(!open)}>
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
