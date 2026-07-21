import { createContext, useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(() => {
    try { return JSON.parse(localStorage.getItem("cart")) || []; } catch { return []; }
  });
  const [orderType, setOrderType] = useState("takeout");

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  const addItem = (item, qty = 1, instructions = "") => {
    setItems((prev) => {
      const exists = prev.find((i) => i._id === item._id && i.specialInstructions === instructions);
      if (exists) {
        return prev.map((i) =>
          i._id === item._id && i.specialInstructions === instructions
            ? { ...i, quantity: i.quantity + qty }
            : i
        );
      }
      return [...prev, { ...item, quantity: qty, specialInstructions: instructions }];
    });
    toast.success(`${item.name} added to cart`, { style: { background: "#202020", color: "#f5f0e8", border: "1px solid #a07c2a" } });
  };

  const removeItem = (id, instructions) => {
    setItems((prev) => prev.filter((i) => !(i._id === id && i.specialInstructions === instructions)));
  };

  const updateQty = (id, instructions, qty) => {
    if (qty < 1) return removeItem(id, instructions);
    setItems((prev) =>
      prev.map((i) =>
        i._id === id && i.specialInstructions === instructions ? { ...i, quantity: qty } : i
      )
    );
  };

  const clearCart = () => setItems([]);

  const subtotal = items.reduce((acc, i) => acc + i.price * i.quantity, 0);
  const itemCount = items.reduce((acc, i) => acc + i.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQty, clearCart, subtotal, itemCount, orderType, setOrderType }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
