import { useEffect, useRef, useState } from "react";

const Reveal = ({ children, as: Tag = "div", variant = "", delay = 0, className = "", style = {}, ...rest }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const variantClass = variant ? `reveal-${variant}` : "";

  return (
    <Tag
      ref={ref}
      className={`reveal ${variantClass} ${visible ? "in-view" : ""} ${className}`.trim()}
      style={{ "--reveal-delay": `${delay}ms`, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  );
};

export default Reveal;
