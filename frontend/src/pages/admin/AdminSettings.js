import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import AdminLayout from "../../components/admin/AdminLayout";
import api from "../../utils/api";
import "./AdminSettings.css";

const AdminSettings = () => {
  const [settings, setSettings] = useState(null);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [pwForm, setPwForm] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
  const [pwSaving, setPwSaving] = useState(false);

  useEffect(() => {
    api.get("/settings").then(({ data }) => setSettings(data.data)).finally(() => setLoading(false));
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings((s) => ({ ...s, [name]: type === "checkbox" ? checked : value }));
  };

  const handleHours = (day, field, value) => {
    setSettings((s) => ({ ...s, hours: { ...s.hours, [day]: { ...s.hours?.[day], [field]: value } } }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.put("/settings", settings);
      toast.success("Settings saved");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  const handlePwChange = (e) => {
    const { name, value } = e.target;
    setPwForm((f) => ({ ...f, [name]: value }));
  };

  const handlePwSubmit = async (e) => {
    e.preventDefault();
    if (pwForm.newPassword !== pwForm.confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }
    if (pwForm.newPassword.length < 6) {
      toast.error("New password must be at least 6 characters");
      return;
    }
    setPwSaving(true);
    try {
      await api.put("/auth/change-password", {
        currentPassword: pwForm.currentPassword,
        newPassword: pwForm.newPassword,
      });
      toast.success("Password updated");
      setPwForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update password");
    } finally {
      setPwSaving(false);
    }
  };

  if (loading) return <AdminLayout><div className="spinner" /></AdminLayout>;

  const days = ["monday","tuesday","wednesday","thursday","friday","saturday","sunday"];

  return (
    <AdminLayout>
      <h1 className="admin-page-title">Site Settings</h1>
      <p className="admin-page-sub">Control all content and configuration from here</p>

      <form onSubmit={handleSave}>
        {/* Store status — master ordering switch */}
        <div className="settings-section" style={{
          border: settings.orderingEnabled === false ? "1px solid var(--red, #c0392b)" : undefined,
        }}>
          <h2>Store Status</h2>
          <div className="form-group">
            <label className="toggle-label" style={{ marginBottom: 12 }}>
              <input
                type="checkbox"
                name="orderingEnabled"
                checked={settings.orderingEnabled !== false}
                onChange={handleChange}
              />
              <span>Accepting Online Orders</span>
            </label>
            <p style={{ fontSize: "0.82rem", color: "var(--white-dim)", margin: "0 0 12px" }}>
              Turn this off to immediately stop customers from placing any new order (delivery, takeout, or dine-in) —
              they'll see the message below instead of the checkout form.
            </p>
          </div>
          <div className="form-group">
            <label>Message shown when orders are closed</label>
            <input
              name="orderingClosedMessage"
              value={settings.orderingClosedMessage || ""}
              onChange={handleChange}
              placeholder="We're currently not accepting online orders."
            />
          </div>
        </div>

        {/* General */}
        <div className="settings-section">
          <h2>General Information</h2>
          <div className="settings-grid">
            <div className="form-group">
              <label>Restaurant Name</label>
              <input name="restaurantName" value={settings.restaurantName || ""} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Tagline</label>
              <input name="tagline" value={settings.tagline || ""} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input name="phone" value={settings.phone || ""} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input name="email" value={settings.email || ""} onChange={handleChange} />
            </div>
            <div className="form-group" style={{ gridColumn: "1 / -1" }}>
              <label>Address</label>
              <input name="address" value={settings.address || ""} onChange={handleChange} />
            </div>
          </div>
        </div>

        {/* Hero */}
        <div className="settings-section">
          <h2>Hero Section</h2>
          <div className="settings-grid">
            <div className="form-group">
              <label>Hero Title</label>
              <input name="heroTitle" value={settings.heroTitle || ""} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Hero Subtitle</label>
              <input name="heroSubtitle" value={settings.heroSubtitle || ""} onChange={handleChange} />
            </div>
          </div>
        </div>

        {/* Special Offer */}
        <div className="settings-section">
          <h2>Special Offer Banner</h2>
          <div className="form-group">
            <label className="toggle-label" style={{ marginBottom: 12 }}>
              <input type="checkbox" name="specialOfferEnabled" checked={settings.specialOfferEnabled || false} onChange={handleChange} />
              <span>Enable special offer banner</span>
            </label>
          </div>
          <div className="form-group">
            <label>Offer Text</label>
            <input name="specialOffer" value={settings.specialOffer || ""} onChange={handleChange}
              placeholder="e.g. 20% off all rolls on Tuesdays!" />
          </div>
        </div>

        {/* Ordering */}
        <div className="settings-section">
          <h2>Ordering Configuration</h2>
          <div className="settings-grid">
            <div className="form-group">
              <label>Delivery Fee ($)</label>
              <input type="number" step="0.50" name="deliveryFee" value={settings.deliveryFee || ""} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Minimum Order ($)</label>
              <input type="number" name="minimumOrder" value={settings.minimumOrder || ""} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Tax Rate (e.g. 0.15 for 15%)</label>
              <input type="number" step="0.01" name="taxRate" value={settings.taxRate || ""} onChange={handleChange} />
            </div>
          </div>
          <div className="settings-toggles">
            {[
              { key: "deliveryEnabled", label: "Delivery Enabled" },
              { key: "takeoutEnabled", label: "Takeout Enabled" },
              { key: "dineInEnabled", label: "Dine-In Enabled" },
              { key: "reservationsEnabled", label: "Reservations Enabled" },
            ].map(({ key, label }) => (
              <label key={key} className="toggle-label">
                <input type="checkbox" name={key} checked={settings[key] || false} onChange={handleChange} />
                <span>{label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Hours */}
        <div className="settings-section">
          <h2>Opening Hours</h2>
          <div className="hours-grid">
            {days.map((day) => (
              <div className="hours-row" key={day}>
                <div className="hours-day">{day.charAt(0).toUpperCase() + day.slice(1)}</div>
                <label className="toggle-label" style={{ width: 90 }}>
                  <input type="checkbox"
                    checked={!(settings.hours?.[day]?.closed)}
                    onChange={(e) => handleHours(day, "closed", !e.target.checked)}
                  />
                  <span style={{ fontSize: "0.78rem" }}>Open</span>
                </label>
                <input type="time" value={settings.hours?.[day]?.open || ""} onChange={(e) => handleHours(day, "open", e.target.value)}
                  disabled={settings.hours?.[day]?.closed} style={{ width: 120 }} />
                <span style={{ color: "var(--white-dim)" }}>to</span>
                <input type="time" value={settings.hours?.[day]?.close || ""} onChange={(e) => handleHours(day, "close", e.target.value)}
                  disabled={settings.hours?.[day]?.closed} style={{ width: 120 }} />
              </div>
            ))}
          </div>
        </div>

        {/* Social */}
        <div className="settings-section">
          <h2>Social Media</h2>
          <div className="settings-grid">
            <div className="form-group">
              <label>Facebook URL</label>
              <input name="socialFacebook" value={settings.socialFacebook || ""} onChange={handleChange} placeholder="https://facebook.com/..." />
            </div>
            <div className="form-group">
              <label>Instagram URL</label>
              <input name="socialInstagram" value={settings.socialInstagram || ""} onChange={handleChange} placeholder="https://instagram.com/..." />
            </div>
            <div className="form-group">
              <label>TikTok URL</label>
              <input name="socialTiktok" value={settings.socialTiktok || ""} onChange={handleChange} placeholder="https://tiktok.com/..." />
            </div>
          </div>
        </div>

        <div className="settings-save-bar">
          <button type="submit" className="btn btn-gold" disabled={saving}>
            {saving ? "Saving..." : "Save All Settings"}
          </button>
        </div>
      </form>

      {/* Change Password — separate form/submit from site settings above */}
      <form onSubmit={handlePwSubmit}>
        <div className="settings-section">
          <h2>Change Password</h2>
          <div className="settings-grid">
            <div className="form-group">
              <label>Current Password</label>
              <input type="password" name="currentPassword" value={pwForm.currentPassword} onChange={handlePwChange} required />
            </div>
            <div className="form-group">
              <label>New Password</label>
              <input type="password" name="newPassword" value={pwForm.newPassword} onChange={handlePwChange} required minLength={6} />
            </div>
            <div className="form-group">
              <label>Confirm New Password</label>
              <input type="password" name="confirmPassword" value={pwForm.confirmPassword} onChange={handlePwChange} required minLength={6} />
            </div>
          </div>
        </div>
        <div className="settings-save-bar">
          <button type="submit" className="btn btn-gold" disabled={pwSaving}>
            {pwSaving ? "Updating..." : "Update Password"}
          </button>
        </div>
      </form>
    </AdminLayout>
  );
};

export default AdminSettings;
