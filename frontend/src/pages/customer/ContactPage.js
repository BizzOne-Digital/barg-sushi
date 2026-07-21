import { useState } from "react";
import toast from "react-hot-toast";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import Reveal from "../../components/common/Reveal";
import api from "../../utils/api";
import "./ContactPage.css";

const ContactPage = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/contact", form);
      toast.success("Message sent! We'll get back to you soon.");
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page">
      <div className="contact-hero">
        <div className="container">
          <p className="section-eyebrow">Get in Touch</p>
          <h1>Contact Us</h1>
          <div className="divider" style={{ margin: "12px auto 0" }} />
        </div>
      </div>

      <div className="container contact-body">
        <div className="contact-layout">
          {/* Info */}
          <Reveal as="div" variant="left" className="contact-info">
            <h2>Visit Us</h2>
            <div className="contact-cards">
              {[
                { icon: MapPin, title: "Address", body: <p>To be updated by client</p> },
                { icon: Phone, title: "Phone", body: <p>To be updated by client</p> },
                { icon: Mail, title: "Email", body: <p>To be updated by client</p> },
                { icon: Clock, title: "Hours", body: <>
                    <p>Mon–Thu: 11am – 10pm</p>
                    <p>Fri–Sat: 11am – 11pm</p>
                    <p>Sun: 12pm – 9pm</p>
                  </> },
              ].map((c, i) => (
                <Reveal as="div" className="contact-info-item" key={c.title} delay={i * 80}>
                  <div className="contact-icon"><c.icon size={20} /></div>
                  <div>
                    <h4>{c.title}</h4>
                    {c.body}
                  </div>
                </Reveal>
              ))}
            </div>
          </Reveal>

          {/* Form */}
          <Reveal as="form" variant="right" delay={120} className="contact-form" onSubmit={handleSubmit}>
            <h2>Send a Message</h2>
            <div className="form-row">
              <div className="form-group">
                <label>Your Name *</label>
                <input name="name" value={form.name} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Email *</label>
                <input type="email" name="email" value={form.email} onChange={handleChange} required />
              </div>
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input name="phone" value={form.phone} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Message *</label>
              <textarea name="message" rows={5} value={form.message} onChange={handleChange} required
                placeholder="Party bookings, catering inquiries, feedback..." />
            </div>
            <button type="submit" className="btn btn-gold contact-submit" disabled={loading}>
              {loading ? "Sending..." : "Send Message"}
            </button>
          </Reveal>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
