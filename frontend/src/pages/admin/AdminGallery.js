import { useEffect, useState } from "react";
import { Upload, Trash2, Image as ImageIcon } from "lucide-react";
import toast from "react-hot-toast";
import AdminLayout from "../../components/admin/AdminLayout";
import api from "../../utils/api";
import "./AdminMenu.css";
import "./AdminGallery.css";

const AdminGallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  const fetchImages = () => {
    api.get("/gallery").then(({ data }) => setImages(data.data)).finally(() => setLoading(false));
  };

  useEffect(() => { fetchImages(); }, []);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("image", file);
      const { data: uploadData } = await api.post("/upload/image", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      await api.post("/gallery", { image: uploadData.data });
      toast.success("Image added to gallery");
      fetchImages();
    } catch (err) {
      toast.error(err.response?.data?.message || "Upload failed");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this image?")) return;
    try {
      await api.delete(`/gallery/${id}`);
      toast.success("Image deleted");
      setImages((prev) => prev.filter((img) => img._id !== id));
    } catch {
      toast.error("Failed to delete");
    }
  };

  return (
    <AdminLayout>
      <div className="admin-gallery-page">
        <div className="admin-page-header">
          <div>
            <h1 className="admin-page-title">Gallery</h1>
            <p className="admin-page-sub">{images.length} photos on the public gallery page</p>
          </div>
          <label className="btn btn-gold gallery-upload-btn">
            {uploading ? "Uploading..." : <><Upload size={16} /> Upload Photo</>}
            <input type="file" accept="image/*" hidden onChange={handleUpload} disabled={uploading} />
          </label>
        </div>

        {loading ? (
          <div className="spinner" />
        ) : images.length === 0 ? (
          <div className="admin-card gallery-empty">
            <ImageIcon size={40} />
            <p>No photos yet. Upload your first one above.</p>
          </div>
        ) : (
          <div className="admin-gallery-grid">
            {images.map((img) => (
              <div className="gallery-thumb-card" key={img._id}>
                <img src={img.image.url} alt={img.title || "Gallery photo"} />
                <button className="gallery-thumb-del" onClick={() => handleDelete(img._id)} title="Delete">
                  <Trash2 size={15} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminGallery;
