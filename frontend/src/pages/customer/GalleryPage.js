import { useEffect, useState } from "react";
import { Image as ImageIcon, X } from "lucide-react";
import Reveal from "../../components/common/Reveal";
import api from "../../utils/api";
import "./GalleryPage.css";

const GalleryPage = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState(null);

  useEffect(() => {
    api.get("/gallery").then(({ data }) => setImages(data.data)).finally(() => setLoading(false));
  }, []);

  return (
    <div className="gallery-page">
      <div className="gallery-hero">
        <div className="container">
          <p className="section-eyebrow">A Taste of Barg</p>
          <h1 className="gallery-hero-title">Gallery</h1>
          <div className="divider" style={{ margin: "12px auto 0" }} />
        </div>
      </div>

      <div className="container gallery-body">
        {loading ? (
          <div className="spinner" />
        ) : images.length === 0 ? (
          <div className="gallery-empty-state">
            <ImageIcon size={40} />
            <p>Photos coming soon.</p>
          </div>
        ) : (
          <div className="gallery-grid">
            {images.map((img, i) => (
              <Reveal
                as="button"
                key={img._id}
                className="gallery-tile"
                variant="scale"
                delay={(i % 6) * 70}
                onClick={() => setActive(img)}
              >
                <img src={img.image.url} alt={img.title || "Barg Sushi Bar & Grill"} loading="lazy" />
              </Reveal>
            ))}
          </div>
        )}
      </div>

      {active && (
        <div className="gallery-lightbox" onClick={() => setActive(null)}>
          <button className="gallery-lightbox-close" onClick={() => setActive(null)}>
            <X size={22} />
          </button>
          <img src={active.image.url} alt={active.title || "Barg Sushi Bar & Grill"} onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </div>
  );
};

export default GalleryPage;
