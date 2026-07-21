import { useParams, Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import "./OrderConfirmation.css";

const OrderConfirmation = () => {
  const { orderNumber } = useParams();
  return (
    <div className="order-confirm-page">
      <div className="order-confirm-card">
        <div className="confirm-icon"><CheckCircle size={60} /></div>
        <h1>Order Placed!</h1>
        <p className="confirm-sub">Thank you for your order.</p>
        <div className="confirm-order-num">
          <span>Order Number</span>
          <strong>{orderNumber}</strong>
        </div>
        <p className="confirm-note">A confirmation email has been sent to you. We'll start preparing your order shortly.</p>
        <div className="confirm-actions">
          <Link to="/menu" className="btn btn-outline">Order More</Link>
          <Link to="/" className="btn btn-gold">Back to Home</Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
