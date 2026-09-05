import { useEffect, useState } from "react";
import { X, Sparkles } from "lucide-react";
import api from "../../utils/api";
import "./SpecialOfferBanner.css";

const SpecialOfferBanner = () => {
  const [offer, setOffer] = useState(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    api.get("/settings").then(({ data }) => {
      if (data.data?.specialOfferEnabled && data.data?.specialOffer) {
        setOffer(data.data.specialOffer);
      }
    }).catch(() => {});
  }, []);

  if (!offer || dismissed) return null;

  return (
    <div className="offer-banner">
      <div className="offer-banner-inner">
        <Sparkles size={16} />
        <span>{offer}</span>
      </div>
      <button className="offer-banner-close" onClick={() => setDismissed(true)} aria-label="Dismiss">
        <X size={16} />
      </button>
    </div>
  );
};

export default SpecialOfferBanner;
