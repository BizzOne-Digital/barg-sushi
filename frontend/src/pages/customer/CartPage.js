import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Trash2, Plus, Minus, ShoppingBag, ChevronRight, ArrowLeft, UtensilsCrossed } from "lucide-react";
import { useCart } from "../../context/CartContext";
import "./CartPage.css";

const TAX_RATE = 0.15;
const DELIVERY_FEE = 5;

const CartPage = () => {
  const { items, removeItem, updateQty, clearCart, subtotal, itemCount, orderType, setOrderType } = useCart();
  const navigate = useNavigate();

  const deliveryFee = orderType === "delivery" ? DELIVERY_FEE : 0;
  const tax = parseFloat((subtotal * TAX_RATE).toFixed(2));
  const total = parseFloat((subtotal + tax + deliveryFee).toFixed(2));

  if (items.length === 0) return (
    <div className="cart-empty container">
      <ShoppingBag size={60} style={{ color: "var(--gold-dark)", marginBottom: 20 }} />
      <h2>Your cart is empty</h2>
      <p>Add some delicious items from our menu!</p>
      <Link to="/menu" className="btn btn-gold" style={{ marginTop: 24 }}>Browse Menu</Link>
    </div>
  );

  return (
    <div className="cart-page">
      <div className="container">
        <h1 className="cart-title">Your Cart <span>({itemCount} items)</span></h1>

        <div className="cart-layout">
          {/* Items */}
          <div className="cart-items">
            {/* Order type selector */}
            <div className="order-type-selector">
              {["takeout", "delivery", "dine-in"].map((type) => (
                <button
                  key={type}
                  className={`type-btn ${orderType === type ? "active" : ""}`}
                  onClick={() => setOrderType(type)}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>

            {items.map((item) => (
              <div className="cart-item" key={`${item._id}-${item.specialInstructions}`}>
                <div className="cart-item-img">
                  {item.image?.url ? <img src={item.image.url} alt={item.name} /> : <UtensilsCrossed size={24} />}
                </div>
                <div className="cart-item-info">
                  <h3>{item.name}</h3>
                  {item.specialInstructions && <p className="cart-item-note">{item.specialInstructions}</p>}
                  <div className="cart-item-qty">
                    <button onClick={() => updateQty(item._id, item.specialInstructions, item.quantity - 1)}>
                      <Minus size={14} />
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQty(item._id, item.specialInstructions, item.quantity + 1)}>
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
                <div className="cart-item-right">
                  <span className="cart-item-price">${(item.price * item.quantity).toFixed(2)}</span>
                  <button className="cart-remove" onClick={() => removeItem(item._id, item.specialInstructions)}>
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}

            <button className="clear-cart" onClick={clearCart}>Clear Cart</button>
          </div>

          {/* Summary */}
          <div className="cart-summary">
            <h2>Order Summary</h2>
            <div className="summary-row"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
            <div className="summary-row"><span>Tax (15%)</span><span>${tax.toFixed(2)}</span></div>
            {deliveryFee > 0 && <div className="summary-row"><span>Delivery Fee</span><span>${deliveryFee.toFixed(2)}</span></div>}
            <div className="summary-total"><span>Total</span><span>${total.toFixed(2)}</span></div>
            <button className="btn btn-gold checkout-btn" onClick={() => navigate("/checkout")}>
              Proceed to Checkout <ChevronRight size={18} />
            </button>
            <Link to="/menu" className="continue-shopping"><ArrowLeft size={16} /> Continue Shopping</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
