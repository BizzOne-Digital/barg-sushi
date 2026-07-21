import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, Upload, Eye, EyeOff, Star, UtensilsCrossed, X } from "lucide-react";
import toast from "react-hot-toast";
import AdminLayout from "../../components/admin/AdminLayout";
import api from "../../utils/api";
import "./AdminMenu.css";

const CATEGORIES = [
  "Appetizers","Salads","Nigiri","Sashimi","Hand Rolls","Our Classics",
  "Veggie Rolls","Rolls","Crispy Collection","Light & Fresh",
  "Specialties","Poke Bowls","Tataki & Tartar","Platters & Combos","Drinks",
];

const EMPTY_FORM = {
  name: "", nameFr: "", category: "Our Classics", price: "", pieces: "",
  description: "", descriptionFr: "", available: true, featured: false, tags: "",
};

const AdminMenu = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState("");

  const fetchItems = () => {
    api.get("/menu?available=all").then(({ data }) => setItems(data.data)).finally(() => setLoading(false));
  };

  useEffect(() => { fetchItems(); }, []);

  const openAdd = () => {
    setEditItem(null);
    setForm(EMPTY_FORM);
    setImageFile(null);
    setImagePreview("");
    setModalOpen(true);
  };

  const openEdit = (item) => {
    setEditItem(item);
    setForm({
      name: item.name, nameFr: item.nameFr || "", category: item.category,
      price: item.price, pieces: item.pieces || "",
      description: item.description, descriptionFr: item.descriptionFr || "",
      available: item.available, featured: item.featured,
      tags: item.tags?.join(", ") || "",
    });
    setImagePreview(item.image?.url || "");
    setImageFile(null);
    setModalOpen(true);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      let imageData = editItem?.image || { url: "", publicId: "" };

      // Upload image if selected
      if (imageFile) {
        const fd = new FormData();
        fd.append("image", imageFile);
        const { data: uploadData } = await api.post("/upload/image", fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        imageData = uploadData.data;
      }

      const payload = {
        ...form,
        price: parseFloat(form.price),
        pieces: form.pieces ? parseInt(form.pieces) : null,
        tags: form.tags ? form.tags.split(",").map((t) => t.trim()) : [],
        image: imageData,
      };

      if (editItem) {
        await api.put(`/menu/${editItem._id}`, payload);
        toast.success("Item updated");
      } else {
        await api.post("/menu", payload);
        toast.success("Item added");
      }

      setModalOpen(false);
      fetchItems();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete "${name}"?`)) return;
    try {
      await api.delete(`/menu/${id}`);
      toast.success("Item deleted");
      setItems((prev) => prev.filter((i) => i._id !== id));
    } catch {
      toast.error("Failed to delete");
    }
  };

  const toggleAvail = async (id) => {
    const { data } = await api.patch(`/menu/${id}/toggle`);
    setItems((prev) => prev.map((i) => i._id === id ? data.data : i));
  };

  const filtered = items.filter((i) => {
    const matchCat = activeCategory === "All" || i.category === activeCategory;
    const matchSearch = i.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <AdminLayout>
      <div className="admin-menu-page">
        <div className="admin-page-header">
          <div>
            <h1 className="admin-page-title">Menu Management</h1>
            <p className="admin-page-sub">{items.length} items across {CATEGORIES.length} categories</p>
          </div>
          <button className="btn btn-gold" onClick={openAdd}>
            <Plus size={16} /> Add Item
          </button>
        </div>

        <div className="menu-controls-admin">
          <input
            className="admin-search"
            placeholder="Search items..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="admin-cat-tabs">
            {["All", ...CATEGORIES].map((cat) => (
              <button
                key={cat}
                className={`admin-cat-tab ${activeCategory === cat ? "active" : ""}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {loading ? <div className="spinner" /> : (
          <div className="admin-card">
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Image</th><th>Name</th><th>Category</th>
                    <th>Price</th><th>Pcs</th><th>Status</th><th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.length === 0 ? (
                    <tr><td colSpan={7} className="empty-row">No items found</td></tr>
                  ) : filtered.map((item) => (
                    <tr key={item._id}>
                      <td>
                        <div className="item-thumb">
                          {item.image?.url ? <img src={item.image.url} alt={item.name} /> : <UtensilsCrossed size={20} />}
                        </div>
                      </td>
                      <td>
                        <div className="item-name-cell">
                          <strong>{item.name}</strong>
                          {item.featured && <span className="badge badge-gold" style={{ fontSize: "0.68rem" }}><Star size={10} /> Popular</span>}
                          {item.nameFr && <span className="item-name-fr">{item.nameFr}</span>}
                        </div>
                      </td>
                      <td><span className="cat-pill">{item.category}</span></td>
                      <td style={{ color: "var(--gold)", fontWeight: 700 }}>${item.price.toFixed(2)}</td>
                      <td style={{ color: "var(--white-dim)" }}>{item.pieces || "—"}</td>
                      <td>
                        <span className={`avail-badge ${item.available ? "avail" : "unavail"}`}>
                          {item.available ? "Available" : "Hidden"}
                        </span>
                      </td>
                      <td>
                        <div className="item-actions">
                          <button className="action-btn" title="Toggle visibility" onClick={() => toggleAvail(item._id)}>
                            {item.available ? <EyeOff size={15} /> : <Eye size={15} />}
                          </button>
                          <button className="action-btn edit-btn" title="Edit" onClick={() => openEdit(item)}>
                            <Pencil size={15} />
                          </button>
                          <button className="action-btn del-btn" title="Delete" onClick={() => handleDelete(item._id, item.name)}>
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editItem ? "Edit Item" : "Add Menu Item"}</h2>
              <button className="modal-close" onClick={() => setModalOpen(false)}><X size={20} /></button>
            </div>
            <form onSubmit={handleSubmit} className="modal-form">
              {/* Image upload */}
              <div className="image-upload-zone">
                {imagePreview ? (
                  <div className="image-preview-wrap">
                    <img src={imagePreview} alt="preview" />
                    <button type="button" className="change-img-btn" onClick={() => document.getElementById("imgInput").click()}>
                      Change Image
                    </button>
                  </div>
                ) : (
                  <div className="upload-placeholder" onClick={() => document.getElementById("imgInput").click()}>
                    <Upload size={24} />
                    <span>Click to upload image</span>
                    <span className="upload-hint">JPG, PNG, WEBP — max 5MB</span>
                  </div>
                )}
                <input id="imgInput" type="file" accept="image/*" hidden onChange={handleImageChange} />
              </div>

              <div className="modal-form-grid">
                <div className="form-group">
                  <label>Name (EN) *</label>
                  <input value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} required />
                </div>
                <div className="form-group">
                  <label>Name (FR)</label>
                  <input value={form.nameFr} onChange={(e) => setForm((f) => ({ ...f, nameFr: e.target.value }))} />
                </div>
                <div className="form-group">
                  <label>Category *</label>
                  <select value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}>
                    {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label>Price ($) *</label>
                  <input type="number" step="0.01" value={form.price} onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))} required />
                </div>
                <div className="form-group">
                  <label>Pieces</label>
                  <input type="number" value={form.pieces} onChange={(e) => setForm((f) => ({ ...f, pieces: e.target.value }))} />
                </div>
                <div className="form-group">
                  <label>Tags (comma-separated)</label>
                  <input placeholder="spicy, vegetarian, gluten-free" value={form.tags} onChange={(e) => setForm((f) => ({ ...f, tags: e.target.value }))} />
                </div>
              </div>

              <div className="form-group">
                <label>Description (EN)</label>
                <textarea rows={2} value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} />
              </div>
              <div className="form-group">
                <label>Description (FR)</label>
                <textarea rows={2} value={form.descriptionFr} onChange={(e) => setForm((f) => ({ ...f, descriptionFr: e.target.value }))} />
              </div>

              <div className="modal-toggles">
                <label className="toggle-label">
                  <input type="checkbox" checked={form.available} onChange={(e) => setForm((f) => ({ ...f, available: e.target.checked }))} />
                  <span>Available (visible on menu)</span>
                </label>
                <label className="toggle-label">
                  <input type="checkbox" checked={form.featured} onChange={(e) => setForm((f) => ({ ...f, featured: e.target.checked }))} />
                  <span>Featured (show on homepage)</span>
                </label>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-outline" onClick={() => setModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-gold" disabled={saving}>
                  {saving ? "Saving..." : editItem ? "Update Item" : "Add Item"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminMenu;
