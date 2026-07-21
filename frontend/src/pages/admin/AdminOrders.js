import { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import api from "../../utils/api";
import "../admin/AdminDashboard.css";

const STATUS_COLORS = {
  pending: "#f39c12", confirmed: "#3498db", preparing: "#9b59b6",
  ready: "#27ae60", "out-for-delivery": "#e67e22", delivered: "#2ecc71", cancelled: "#e74c3c",
};

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [expanded, setExpanded] = useState(null);

  const fetchOrders = () => {
    const q = filter === "all" ? "" : `?status=${filter}`;
    api.get(`/orders${q}`).then(({ data }) => setOrders(data.data)).finally(() => setLoading(false));
  };

  useEffect(() => { fetchOrders(); }, [filter]);

  const updateStatus = async (id, status) => {
    await api.put(`/orders/${id}/status`, { status });
    setOrders((prev) => prev.map((o) => o._id === id ? { ...o, status } : o));
  };

  return (
    <AdminLayout>
      <h1 className="admin-page-title">Orders</h1>
      <p className="admin-page-sub">Manage all incoming orders</p>

      <div className="admin-cat-tabs" style={{ marginBottom: 20 }}>
        {["all","pending","confirmed","preparing","ready","out-for-delivery","delivered","cancelled"].map((s) => (
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
                  <th>Order #</th><th>Customer</th><th>Type</th>
                  <th>Items</th><th>Total</th><th>Time</th><th>Status</th><th>Update</th>
                </tr>
              </thead>
              <tbody>
                {orders.length === 0 ? (
                  <tr><td colSpan={8} className="empty-row">No orders found</td></tr>
                ) : orders.map((order) => (
                  <>
                    <tr key={order._id} style={{ cursor: "pointer" }} onClick={() => setExpanded(expanded === order._id ? null : order._id)}>
                      <td className="order-num">{order.orderNumber}</td>
                      <td>{order.customer?.name || order.guestName || "Guest"}<br />
                        <small style={{ color: "var(--white-dim)" }}>{order.customer?.email || order.guestEmail}</small>
                      </td>
                      <td className="capitalize">{order.orderType}</td>
                      <td>{order.items?.reduce((a, i) => a + i.quantity, 0)} items</td>
                      <td style={{ color: "var(--gold)", fontWeight: 700 }}>${order.total.toFixed(2)}</td>
                      <td style={{ color: "var(--white-dim)", fontSize: "0.78rem" }}>
                        {new Date(order.createdAt).toLocaleDateString("en-CA")}<br />
                        {new Date(order.createdAt).toLocaleTimeString("en-CA", { hour: "2-digit", minute: "2-digit" })}
                      </td>
                      <td>
                        <span className="status-dot" style={{ background: STATUS_COLORS[order.status] }} />
                        <span className="capitalize">{order.status}</span>
                      </td>
                      <td onClick={(e) => e.stopPropagation()}>
                        <select className="status-select" value={order.status} onChange={(e) => updateStatus(order._id, e.target.value)}>
                          {["pending","confirmed","preparing","ready","out-for-delivery","delivered","cancelled"].map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </td>
                    </tr>
                    {expanded === order._id && (
                      <tr key={`${order._id}-detail`}>
                        <td colSpan={8} style={{ background: "rgba(201,168,76,0.04)", padding: "16px 20px" }}>
                          <strong style={{ color: "var(--gold)", fontSize: "0.85rem" }}>Order Items:</strong>
                          <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 6 }}>
                            {order.items?.map((item, i) => (
                              <div key={i} style={{ display: "flex", gap: 12, fontSize: "0.83rem", color: "var(--white-dim)" }}>
                                <span>{item.name}</span>
                                <span>×{item.quantity}</span>
                                <span style={{ color: "var(--gold)" }}>${(item.price * item.quantity).toFixed(2)}</span>
                                {item.specialInstructions && <span style={{ fontStyle: "italic" }}>— {item.specialInstructions}</span>}
                              </div>
                            ))}
                          </div>
                          {order.notes && <p style={{ marginTop: 10, fontSize: "0.82rem", color: "var(--white-dim)" }}>Note: {order.notes}</p>}
                          {order.deliveryAddress?.street && (
                            <p style={{ marginTop: 6, fontSize: "0.82rem", color: "var(--white-dim)" }}>
                              Deliver to: {order.deliveryAddress.street}, {order.deliveryAddress.city} {order.deliveryAddress.postalCode}
                            </p>
                          )}
                        </td>
                      </tr>
                    )}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminOrders;
