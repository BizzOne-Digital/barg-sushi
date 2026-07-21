import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import MenuItemCard from "../../components/customer/MenuItemCard";
import Reveal from "../../components/common/Reveal";
import api from "../../utils/api";
import "./MenuPage.css";

const MenuPage = () => {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.get("/menu"),
      api.get("/menu/categories"),
    ]).then(([itemsRes, catsRes]) => {
      setItems(itemsRes.data.data);
      setCategories(["All", ...catsRes.data.data]);
    }).finally(() => setLoading(false));
  }, []);

  const filtered = items.filter((item) => {
    const matchCat = activeCategory === "All" || item.category === activeCategory;
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  // Group by category for display
  const grouped = filtered.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  return (
    <div className="menu-page">
      <div className="menu-hero">
        <div className="container">
          <p className="section-eyebrow">Fresh Daily</p>
          <h1 className="menu-hero-title">Our Menu</h1>
          <div className="divider" style={{ margin: "12px auto 0" }} />
        </div>
      </div>

      <div className="menu-controls container">
        <div className="search-box">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search items..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="menu-categories container">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`cat-btn ${activeCategory === cat ? "active" : ""}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="menu-body container">
        {loading ? (
          <div className="spinner" />
        ) : Object.keys(grouped).length === 0 ? (
          <p style={{ color: "var(--white-dim)", textAlign: "center", padding: "60px 0" }}>No items found.</p>
        ) : (
          Object.entries(grouped).map(([cat, catItems]) => (
            <div key={cat} className="menu-category-group">
              <Reveal as="div" className="cat-heading">
                <h2>{cat}</h2>
                <span className="cat-count">{catItems.length} items</span>
              </Reveal>
              <div className="menu-grid">
                {catItems.map((item, i) => (
                  <Reveal key={item._id} variant="scale" delay={(i % 4) * 80}>
                    <MenuItemCard item={item} />
                  </Reveal>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MenuPage;
