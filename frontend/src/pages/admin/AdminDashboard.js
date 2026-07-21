import { useEffect, useState } from "react";
import { ShoppingBag, CalendarDays, DollarSign, Clock } from "lucide-react";
import AdminLayout from "../../components/admin/AdminLayout";
import api from "../../utils/api";
import "./AdminDashboard.css";

const STATUS_COLORS = {
  pending: "#f39c12", confirmed: "#3498db", preparing: "#9b59b6",
  ready: "#27ae60", "out-for-delivery": "#e67e22", delivered: "#2ecc71", cancelled: "#e74c3c",
};

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [recentOrders, setRecentOrders] = useState([]);
  const [upcomingRes, setUpcomingRes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.get("/orders/stats"),
      api.get("/orders?status=pending"),
      api.get("/reservations?status=pending"),
    ]).then(([statsRes, ordersRes, resRes]) => {
      setStats(statsRes.data.data);
      setRecentOrders(ordersRes.data.data.slice(0, 8));
      setUpcomingRes(resRes.data.data.slice(0, 5));
    }).finally(() => setLoading(false));
  }, []);

  const updateOrderStatus = async (id, status) => {
    await api.put(`/orders/${id}/status`, { status });
    setRecentOrders((prev) => prev.map((o) => o._id === id ? { ...o, status } : o));
  };

  if (loading) return <AdminLayout><div className="spinner" /></AdminLayout>;

  return (
    <AdminLayout>
      <div className="admin-dashboard">
        <h1 className="admin-page-title">Dashboard</h1>
        <p className="admin-page-sub">Overview of today's operations</p>

        {/* Stat cards */}
        <div className="dashboard-stats">
          {[
            { icon: <ShoppingBag size={22} />, label: "Today's Orders", value: stats?.todayOrders ?? 0, color: "#c9a84c" },
            { icon: <Clock size={22} />, label: "Pending", value: stats?.pendingOrders ?? 0, color: "#e67e22" },
            { icon: <DollarSign size={22} />, label: "Total Revenue", value: `$${(stats?.totalRevenue ?? 0).toFixed(2)}`, color: "#2ecc71" },
            { icon: <CalendarDays size={22} />, label: "Total Orders", value: stats?.totalOrders ?? 0, color: "#3498db" },
          ].map((s) => (
            <div className="stat-card" key={s.label}>
              <div className="stat-card-icon" style={{ color: s.color, background: `${s.color}15` }}>
                {s.icon}
              </div>
              <div>
                <div className="stat-card-value" style={{ color: s.color }}>{s.value}</div>
                <div className="stat-card-label">{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="dashboard-grid">
          {/* Recent Orders */}
          <div className="admin-card">
            <div className="admin-card-header">
              <h2>Pending Orders</h2>
            </div>
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Order #</th>
                    <th>Customer</th>
                    <th>Type</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.length === 0 ? (
                    <tr><td colSpan={6} className="empty-row">No pending orders</td></tr>
                  ) : recentOrders.map((order) => (
                    <tr key={order._id}>
                      <td className="order-num">{order.orderNumber}</td>
                      <td>{order.customer?.name || order.guestName || "Guest"}</td>
                      <td className="capitalize">{order.orderType}</td>
                      <td>${order.total.toFixed(2)}</td>
                      <td>
                        <span className="status-dot" style={{ background: STATUS_COLORS[order.status] }} />
                        <span className="capitalize">{order.status}</span>
                      </td>
                      <td>
                        <select
                          className="status-select"
                          value={order.status}
                          onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                        >
                          {["pending","confirmed","preparing","ready","out-for-delivery","delivered","cancelled"].map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Upcoming Reservations */}
          <div className="admin-card">
            <div className="admin-card-header">
              <h2>Pending Reservations</h2>
            </div>
            <div className="res-list">
              {upcomingRes.length === 0 ? (
                <p className="empty-state">No pending reservations</p>
              ) : upcomingRes.map((r) => (
                <div className="res-item" key={r._id}>
                  <div className="res-item-info">
                    <strong>{r.name}</strong>
                    <span>{new Date(r.date).toLocaleDateString("en-CA")} at {r.time}</span>
                    <span>{r.partySize} people</span>
                    {r.occasion && <span className="badge badge-gold">{r.occasion}</span>}
                  </div>
                  <div className="res-item-actions">
                    <button className="btn-sm btn-confirm" onClick={() => api.put(`/reservations/${r._id}/status`, { status: "confirmed" }).then(() => setUpcomingRes((p) => p.filter((i) => i._id !== r._id)))}>
                      Confirm
                    </button>
                    <button className="btn-sm btn-cancel" onClick={() => api.put(`/reservations/${r._id}/status`, { status: "cancelled" }).then(() => setUpcomingRes((p) => p.filter((i) => i._id !== r._id)))}>
                      Cancel
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
