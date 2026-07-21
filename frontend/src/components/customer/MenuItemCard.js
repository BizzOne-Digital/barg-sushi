import { useState } from "react";
import { Plus, Flame, Leaf, Star, Check, UtensilsCrossed } from "lucide-react";
import { useCart } from "../../context/CartContext";
import "./MenuItemCard.css";

const spicyItems = ["Spicy Tuna", "Spicy Salmon", "Spicy Kani", "Dynamite", "High Heat", "Tuna Kamikaze", "Salmon Kamikaze", "Firecracker", "Kilimanjaro", "Rock N'Roll", "Kryptonite"];
const vegItems = ["Veggie Wrap", "Veggie Maki", "Satsuma", "Sweetie", "Veggie Delight", "Avocado Blast", "Kinoko", "Green Garden", "The Batchy™", "Atomic Veggie", "Cucumber Roll", "Avocado Roll", "Yasai Poke Bowl"];

const MenuItemCard = ({ item }) => {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const isSpicy = spicyItems.some((n) => item.name.includes(n));
  const isVeg = vegItems.includes(item.name);

  const handleAdd = () => {
    addItem(item);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <div className="menu-card">
      <div className="menu-card-img">
        {item.image?.url ? (
          <img src={item.image.url} alt={item.name} loading="lazy" />
        ) : (
          <div className="menu-card-placeholder">
            <UtensilsCrossed size={28} />
          </div>
        )}
        <div className="menu-card-badges">
          {isSpicy && <span className="badge badge-red"><Flame size={10} /> Spicy</span>}
          {isVeg && <span className="badge badge-veg"><Leaf size={10} /> Veg</span>}
          {item.featured && <span className="badge badge-gold"><Star size={10} /> Popular</span>}
          {item.menuType && item.menuType !== "Standard" && (
            <span className="badge badge-gold">{item.menuType}</span>
          )}
        </div>
      </div>

      <div className="menu-card-body">
        <div className="menu-card-header">
          <h3 className="menu-card-name">{item.name}</h3>
          {item.pieces && <span className="menu-card-pieces">{item.pieces} pcs</span>}
        </div>

        {item.nameFr && item.nameFr !== item.name && (
          <p className="menu-card-namefr">{item.nameFr}</p>
        )}

        <p className="menu-card-desc">{item.description}</p>

        <div className="menu-card-footer">
          <span className="menu-card-price">${item.price.toFixed(2)}</span>
          <button
            className={`btn-add ${added ? "added" : ""}`}
            onClick={handleAdd}
            disabled={!item.available}
          >
            {added ? <Check size={18} /> : <Plus size={18} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuItemCard;
