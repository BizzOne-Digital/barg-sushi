import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Reveal from "../../components/common/Reveal";
import api from "../../utils/api";
import "./ReservationPage.css";

const ReservationPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "", email: "", phone: "",
    date: "", time: "", partySize: "2",
    occasion: "", specialRequests: "",
  });
  const [loading, setLoading] = useState(false);

  const times = ["12:00 PM","12:30 PM","1:00 PM","1:30 PM","2:00 PM","5:00 PM","5:30 PM","6:00 PM","6:30 PM","7:00 PM","7:30 PM","8:00 PM","8:30 PM","9:00 PM"];

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/reservations", form);
      toast.success("Reservation request sent! Check your email for confirmation.");
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send reservation");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reservation-page">
      <div className="res-hero">
        <div className="container">
          <p className="section-eyebrow">Reserve Your Spot</p>
          <h1>Book a Table</h1>
          <div className="divider" style={{ margin: "12px auto 0" }} />
        </div>
      </div>

      <div className="container res-body">
        <div className="res-layout">
          <Reveal as="form" variant="left" className="res-form" onSubmit={handleSubmit}>
            <h2>Reservation Details</h2>

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
            <div className="form-row">
              <div className="form-group">
                <label>Phone *</label>
                <input name="phone" value={form.phone} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Party Size *</label>
                <select name="partySize" value={form.partySize} onChange={handleChange} required>
                  {Array.from({ length: 20 }, (_, i) => i + 1).map((n) => (
                    <option key={n} value={n}>{n} {n === 1 ? "person" : "people"}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Date *</label>
                <input type="date" name="date" value={form.date} onChange={handleChange}
                  min={new Date().toISOString().split("T")[0]} required />
              </div>
              <div className="form-group">
                <label>Time *</label>
                <select name="time" value={form.time} onChange={handleChange} required>
                  <option value="">Select time</option>
                  {times.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
            </div>
            <div className="form-group">
              <label>Occasion (optional)</label>
              <select name="occasion" value={form.occasion} onChange={handleChange}>
                <option value="">No special occasion</option>
                <option>Birthday</option>
                <option>Anniversary</option>
                <option>Business Dinner</option>
                <option>Date Night</option>
                <option>Family Gathering</option>
                <option>Other</option>
              </select>
            </div>
            <div className="form-group">
              <label>Special Requests</label>
              <textarea name="specialRequests" rows={3} value={form.specialRequests} onChange={handleChange}
                placeholder="Allergies, accessibility needs, high chairs, etc." />
            </div>

            <button type="submit" className="btn btn-gold res-submit" disabled={loading}>
              {loading ? "Sending..." : "Request Reservation"}
            </button>
            <p className="res-note">We will confirm your reservation via email within 1 hour.</p>
          </Reveal>

          <Reveal as="div" variant="right" delay={120} className="res-info">
            <div className="res-info-card">
              <h3>Opening Hours</h3>
              <ul>
                <li><span>Mon – Thu</span><span>11:00 AM – 10:00 PM</span></li>
                <li><span>Fri – Sat</span><span>11:00 AM – 11:00 PM</span></li>
                <li><span>Sunday</span><span>12:00 PM – 9:00 PM</span></li>
              </ul>
            </div>
            <div className="res-info-card">
              <h3>Good to Know</h3>
              <ul className="res-tips">
                <li>Reservations are held for 15 minutes.</li>
                <li>Groups of 10+ please call us directly.</li>
                <li>Large party / event? We handle full catering.</li>
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
};

export default ReservationPage;
