import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useCart } from "../../context/CartContext";
import "./Navbar.css";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { itemCount } = useCart();

  const links = [
    { to: "/", label: "Home" },
    { to: "/menu", label: "Menu" },
    { to: "/gallery", label: "Gallery" },
    { to: "/reservations", label: "Book a Table" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-inner container">
        <Link to="/" className="navbar-logo">
          <img src={`${process.env.PUBLIC_URL}/logo.png`} alt="Barg Sushi Bar & Grill" className="logo-img" />
        </Link>

        <ul className={`navbar-links ${open ? "open" : ""}`}>
          {links.map((l) => (
            <li key={l.to}>
              <Link to={l.to} onClick={() => setOpen(false)}>{l.label}</Link>
            </li>
          ))}
        </ul>

        <div className="navbar-actions">
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
