import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard, UtensilsCrossed, ShoppingBag, CalendarDays,
  Settings, LogOut, Menu, X, ChevronRight, Image, ImagePlus,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import "./AdminLayout.css";

const navItems = [
  { path: "/admin", icon: <LayoutDashboard size={18} />, label: "Dashboard" },
  { path: "/admin/menu", icon: <UtensilsCrossed size={18} />, label: "Menu Items" },
  { path: "/admin/product-images", icon: <ImagePlus size={18} />, label: "Product Images" },
  { path: "/admin/gallery", icon: <Image size={18} />, label: "Gallery" },
  { path: "/admin/orders", icon: <ShoppingBag size={18} />, label: "Orders" },
  { path: "/admin/reservations", icon: <CalendarDays size={18} />, label: "Reservations" },
  { path: "/admin/settings", icon: <Settings size={18} />, label: "Settings" },
];

const AdminLayout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleLogout = () => { logout(); navigate("/login"); };

  return (
    <div className={`admin-layout ${sidebarOpen ? "sidebar-open" : "sidebar-closed"}`}>
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="sidebar-header">
          <Link to="/admin" className="sidebar-logo">
            <span className="sidebar-logo-barg">BARG</span>
            <span className="sidebar-logo-sub">Admin Panel</span>
          </Link>
          <button className="sidebar-toggle-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <X size={18} />
          </button>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`sidebar-link ${location.pathname === item.path ? "active" : ""}`}
            >
              {item.icon}
              <span>{item.label}</span>
              {location.pathname === item.path && <ChevronRight size={14} className="active-indicator" />}
            </Link>
          ))}
        </nav>

        <div className="sidebar-footer">
          <Link to="/" className="sidebar-link" target="_blank">
            <Menu size={18} />
            <span>View Site</span>
          </Link>
          <button className="sidebar-link sidebar-logout" onClick={handleLogout}>
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="admin-main">
        <header className="admin-topbar">
          <button className="topbar-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <Menu size={20} />
          </button>
          <div className="topbar-right">
            <span className="topbar-user">
              {user?.name} <span className="topbar-role">Admin</span>
            </span>
          </div>
        </header>
        <div className="admin-content">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
