import { useEffect, useState } from "react";
import { Copy, Check, Upload, UtensilsCrossed, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import AdminLayout from "../../components/admin/AdminLayout";
import api from "../../utils/api";
import "./AdminMenu.css";
import "./AdminProductImages.css";

const AdminProductImages = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [onlyMissing, setOnlyMissing] = useState(false);
  const [uploadingId, setUploadingId] = useState(null);
  const [copiedId, setCopiedId] = useState(null);

  const fetchItems = () => {
    api.get("/menu?available=all").then(({ data }) => setItems(data.data)).finally(() => setLoading(false));
  };

  useEffect(() => { fetchItems(); }, []);

  const handleCopy = async (item) => {
    try {
      await navigator.clipboard.writeText(item.name);
      setCopiedId(item._id);
      setTimeout(() => setCopiedId(null), 1200);
    } catch {
      toast.error("Couldn't copy — copy manually");
    }
  };

  const handleUpload = async (item, e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadingId(item._id);
    try {
      const fd = new FormData();
      fd.append("image", file);
      const { data: uploadData } = await api.post("/upload/image", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const { data: updated } = await api.put(`/menu/${item._id}`, { image: uploadData.data });
      setItems((prev) => prev.map((i) => (i._id === item._id ? updated.data : i)));
      toast.success(`Image set for "${item.name}"`);
    } catch (err) {
      toast.error(err.response?.data?.message || "Upload failed");
    } finally {
      setUploadingId(null);
      e.target.value = "";
    }
  };

  const filtered = items.filter((i) => {
    const matchSearch = i.name.toLowerCase().includes(search.toLowerCase());
    const matchMissing = !onlyMissing || !i.image?.url;
    return matchSearch && matchMissing;
  });

  const missingCount = items.filter((i) => !i.image?.url).length;

  return (
    <AdminLayout>
      <div className="admin-product-images-page">
        <div className="admin-page-header">
          <div>
            <h1 className="admin-page-title">Product Images</h1>
            <p className="admin-page-sub">
              {items.length} products · {missingCount} missing an image — copy the name, find a photo, upload it here
            </p>
          </div>
        </div>

        <div className="menu-controls-admin">
          <input
            className="admin-search"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <label className="toggle-label" style={{ whiteSpace: "nowrap" }}>
            <input type="checkbox" checked={onlyMissing} onChange={(e) => setOnlyMissing(e.target.checked)} />
            <span>Only missing images</span>
          </label>
        </div>

        {loading ? (
          <div className="spinner" />
        ) : (
          <div className="admin-card">
            <div className="pi-list">
              {filtered.length === 0 ? (
                <p className="empty-row">No products found</p>
              ) : filtered.map((item) => (
                <div className="pi-row" key={item._id}>
                  <div className="pi-thumb">
                    {item.image?.url ? <img src={item.image.url} alt={item.name} /> : <UtensilsCrossed size={18} />}
                  </div>

                  <div className="pi-name-block">
                    <strong>{item.name}</strong>
                    <span className="cat-pill">{item.category}</span>
                  </div>

                  <button
                    className={`btn btn-outline pi-copy-btn ${copiedId === item._id ? "copied" : ""}`}
                    onClick={() => handleCopy(item)}
                  >
                    {copiedId === item._id ? <><Check size={14} /> Copied</> : <><Copy size={14} /> Copy Name</>}
                  </button>

                  <label className="btn btn-gold pi-upload-btn">
                    {uploadingId === item._id ? (
                      <><Loader2 size={14} className="spin-icon" /> Uploading...</>
                    ) : (
                      <><Upload size={14} /> {item.image?.url ? "Replace" : "Upload"}</>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      hidden
                      disabled={uploadingId === item._id}
                      onChange={(e) => handleUpload(item, e)}
                    />
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminProductImages;
