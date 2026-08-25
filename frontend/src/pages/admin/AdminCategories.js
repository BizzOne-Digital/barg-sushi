import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, Tags, Check, X } from "lucide-react";
import toast from "react-hot-toast";
import AdminLayout from "../../components/admin/AdminLayout";
import api from "../../utils/api";
import "./AdminCategories.css";

const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newName, setNewName] = useState("");
  const [adding, setAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");
  const [saving, setSaving] = useState(false);

  const fetchCategories = () => {
    api.get("/categories").then(({ data }) => setCategories(data.data)).finally(() => setLoading(false));
  };

  useEffect(() => { fetchCategories(); }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    const name = newName.trim();
    if (!name) return;
    setAdding(true);
    try {
      await api.post("/categories", { name });
      toast.success("Category added");
      setNewName("");
      fetchCategories();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add category");
    } finally {
      setAdding(false);
    }
  };

  const startEdit = (cat) => {
    setEditingId(cat._id);
    setEditName(cat.name);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditName("");
  };

  const saveEdit = async (cat) => {
    const name = editName.trim();
    if (!name || name === cat.name) return cancelEdit();
    setSaving(true);
    try {
      await api.put(`/categories/${cat._id}`, { name });
      toast.success("Category renamed — items updated automatically");
      cancelEdit();
      fetchCategories();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to rename category");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (cat) => {
    if (cat.itemCount > 0) {
      toast.error(`Can't delete — ${cat.itemCount} menu item(s) still use "${cat.name}". Move or delete them first.`);
      return;
    }
    if (!window.confirm(`Delete category "${cat.name}"?`)) return;
    try {
      await api.delete(`/categories/${cat._id}`);
      toast.success("Category deleted");
      setCategories((prev) => prev.filter((c) => c._id !== cat._id));
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete category");
    }
  };

  return (
    <AdminLayout>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Menu Categories</h1>
          <p className="admin-page-sub">Add, rename, or remove the sections customers see on your menu</p>
        </div>
      </div>

      <form className="cat-add-form" onSubmit={handleAdd}>
        <input
          className="admin-search"
          style={{ width: 320 }}
          placeholder="New category name..."
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
        <button type="submit" className="btn btn-gold" disabled={adding || !newName.trim()}>
          <Plus size={16} /> Add Category
        </button>
      </form>

      {loading ? <div className="spinner" /> : (
        <div className="admin-card">
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Items</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.length === 0 ? (
                  <tr><td colSpan={3} className="empty-row">No categories yet</td></tr>
                ) : categories.map((cat) => (
                  <tr key={cat._id}>
                    <td>
                      {editingId === cat._id ? (
                        <input
                          className="admin-search"
                          style={{ padding: "6px 10px", fontSize: "0.85rem" }}
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          autoFocus
                        />
                      ) : (
                        <div className="item-name-cell">
                          <strong><Tags size={14} style={{ marginRight: 6, verticalAlign: -2 }} />{cat.name}</strong>
                        </div>
                      )}
                    </td>
                    <td>
                      <span className="cat-pill">{cat.itemCount} item{cat.itemCount === 1 ? "" : "s"}</span>
                    </td>
                    <td>
                      <div className="item-actions">
                        {editingId === cat._id ? (
                          <>
                            <button className="action-btn edit-btn" title="Save" onClick={() => saveEdit(cat)} disabled={saving}>
                              <Check size={15} />
                            </button>
                            <button className="action-btn" title="Cancel" onClick={cancelEdit}>
                              <X size={15} />
                            </button>
                          </>
                        ) : (
                          <>
                            <button className="action-btn edit-btn" title="Rename" onClick={() => startEdit(cat)}>
                              <Pencil size={15} />
                            </button>
                            <button className="action-btn del-btn" title="Delete" onClick={() => handleDelete(cat)}>
                              <Trash2 size={15} />
                            </button>
                          </>
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

export default AdminCategories;
