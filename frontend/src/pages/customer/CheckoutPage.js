import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Banknote, CreditCard } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import api from "../../utils/api";
import "./CheckoutPage.css";

const TAX = 0.15;
const DELIVERY_FEE = 5;

const CheckoutPage = () => {
  const { items, subtotal, clearCart, orderType } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    street: "", city: "", province: "QC", postalCode: "",
    tableNumber: "",
    notes: "",
    paymentMethod: "cash",
  });
  const [submitting, setSubmitting] = useState(false);

  const deliveryFee = orderType === "delivery" ? DELIVERY_FEE : 0;
  const tax = parseFloat((subtotal * TAX).toFixed(2));
  const total = parseFloat((subtotal + tax + deliveryFee).toFixed(2));

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (items.length === 0) return toast.error("Cart is empty");
    setSubmitting(true);
    try {
      const payload = {
        items: items.map((i) => ({
          menuItem: i._id, name: i.name, price: i.price,
          quantity: i.quantity, specialInstructions: i.specialInstructions,
        })),
        orderType,
        guestName: form.name,
        guestEmail: form.email,
        guestPhone: form.phone,
        notes: form.notes,
        paymentMethod: form.paymentMethod,
        tableNumber: form.tableNumber,
        deliveryAddress: orderType === "delivery" ? {
          street: form.street, city: form.city,
          province: form.province, postalCode: form.postalCode,
        } : undefined,
      };
      const { data } = await api.post("/orders", payload);
      clearCart();
      toast.success("Order placed successfully!");
      navigate(`/order-confirmation/${data.data.orderNumber}`);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to place order");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="checkout-page">
      <div className="container">
        <h1 className="checkout-title">Checkout</h1>
        <div className="checkout-layout">
          <form className="checkout-form" onSubmit={handleSubmit}>
            <div className="form-section">
              <h2>Contact Information</h2>
              <div className="form-row">
                <div className="form-group">
                  <label>Full Name *</label>
                  <input name="name" value={form.name} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label>Email *</label>
                  <input type="email" name="email" value={form.email} onChange={handleChange} required />
                </div>
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <input name="phone" value={form.phone} onChange={handleChange} />
              </div>
            </div>

            {orderType === "delivery" && (
              <div className="form-section">
                <h2>Delivery Address</h2>
                <div className="form-group">
                  <label>Street Address *</label>
                  <input name="street" value={form.street} onChange={handleChange} required />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>City *</label>
                    <input name="city" value={form.city} onChange={handleChange} required />
                  </div>
                  <div className="form-group">
                    <label>Postal Code *</label>
                    <input name="postalCode" value={form.postalCode} onChange={handleChange} required />
                  </div>
                </div>
              </div>
            )}

            {orderType === "dine-in" && (
              <div className="form-section">
                <h2>Dine-In Details</h2>
                <div className="form-group">
                  <label>Table Number</label>
                  <input name="tableNumber" value={form.tableNumber} onChange={handleChange} />
                </div>
              </div>
            )}

            <div className="form-section">
              <h2>Payment Method</h2>
              <div className="payment-options">
                {["cash", "card"].map((method) => (
                  <label key={method} className={`payment-option ${form.paymentMethod === method ? "active" : ""}`}>
                    <input type="radio" name="paymentMethod" value={method}
                      checked={form.paymentMethod === method} onChange={handleChange} />
                    <span>{method === "cash" ? <><Banknote size={16} /> Cash</> : <><CreditCard size={16} /> Card at Pickup</>}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="form-section">
              <h2>Special Instructions</h2>
              <textarea name="notes" rows={3} placeholder="Any allergies or special requests..."
                value={form.notes} onChange={handleChange} />
            </div>

            <button type="submit" className="btn btn-gold submit-order" disabled={submitting}>
              {submitting ? "Placing Order..." : `Place Order — $${total.toFixed(2)}`}
            </button>
          </form>

          {/* Order summary */}
          <div className="checkout-summary">
            <h2>Order Summary</h2>
            <div className="checkout-items">
              {items.map((item) => (
                <div className="checkout-item" key={item._id}>
                  <span className="checkout-item-name">{item.name} <span className="checkout-qty">×{item.quantity}</span></span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="checkout-totals">
              <div className="co-row"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
              <div className="co-row"><span>Tax (TPS + TVQ)</span><span>${tax.toFixed(2)}</span></div>
              {deliveryFee > 0 && <div className="co-row"><span>Delivery</span><span>${deliveryFee.toFixed(2)}</span></div>}
              <div className="co-total"><span>Total</span><span>${total.toFixed(2)}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
