import { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import api from "../../utils/api";
import "../admin/AdminDashboard.css";

const AdminReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("pending");

  useEffect(() => {
    setLoading(true);
    api.get(`/reservations?status=${filter}`).then(({ data }) => setReservations(data.data)).finally(() => setLoading(false));
  }, [filter]);

  const updateStatus = async (id, status) => {
    await api.put(`/reservations/${id}/status`, { status });
    setReservations((prev) => prev.filter((r) => r._id !== id));
  };

  const STATUS_COLORS = {
    pending: "#f39c12", confirmed: "#2ecc71",
    cancelled: "#e74c3c", completed: "#3498db",
  };

  return (
    <AdminLayout>
      <h1 className="admin-page-title">Reservations</h1>
      <p className="admin-page-sub">Manage table bookings and requests</p>

      <div className="admin-cat-tabs" style={{ marginBottom: 20 }}>
        {["pending","confirmed","completed","cancelled"].map((s) => (
          <button key={s} className={`admin-cat-tab ${filter === s ? "active" : ""}`} onClick={() => setFilter(s)}>
            {s.charAt(0).toUpperCase() + s.slice(1)}
          </button>
        ))}
      </div>

      {loading ? <div className="spinner" /> : (
        <div className="admin-card">
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Code</th><th>Name</th><th>Contact</th>
                  <th>Date & Time</th><th>Party</th><th>Occasion</th>
                  <th>Status</th><th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {reservations.length === 0 ? (
                  <tr><td colSpan={8} className="empty-row">No {filter} reservations</td></tr>
                ) : reservations.map((r) => (
                  <tr key={r._id}>
                    <td style={{ color: "var(--gold)", fontFamily: "monospace", fontWeight: 600 }}>{r.confirmationCode}</td>
                    <td>{r.name}</td>
                    <td>
                      <div style={{ fontSize: "0.8rem", color: "var(--white-dim)" }}>
                        <div>{r.email}</div>
                        <div>{r.phone}</div>
                      </div>
                    </td>
                    <td>
                      <div>{new Date(r.date).toLocaleDateString("en-CA")}</div>
                      <div style={{ color: "var(--gold)", fontSize: "0.82rem" }}>{r.time}</div>
                    </td>
                    <td style={{ textAlign: "center" }}>{r.partySize}</td>
                    <td>{r.occasion || <span style={{ color: "var(--white-dim)" }}>—</span>}</td>
                    <td>
                      <span className="status-dot" style={{ background: STATUS_COLORS[r.status] }} />
                      <span className="capitalize">{r.status}</span>
                    </td>
                    <td>
                      <div className="item-actions">
                        {r.status === "pending" && (
                          <>
                            <button className="btn-sm btn-confirm" onClick={() => updateStatus(r._id, "confirmed")}>Confirm</button>
                            <button className="btn-sm btn-cancel" onClick={() => updateStatus(r._id, "cancelled")}>Cancel</button>
                          </>
                        )}
                        {r.status === "confirmed" && (
                          <button className="btn-sm btn-confirm" onClick={() => updateStatus(r._id, "completed")}>Complete</button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminReservations;
