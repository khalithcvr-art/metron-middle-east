import { useEffect, useRef, useState } from "react";
import { Project } from "../lib/data";

interface GalleryProps {
  gallery: Project | null;
  imgIndex: number;
  setGallery: (p: Project | null) => void;
  setImgIndex: (i: number | ((prev: number) => number)) => void;
}

const Chevron = ({ flip }: { flip?: boolean }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 28, height: 28, transform: flip ? "rotate(180deg)" : undefined }}>
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

export default function Gallery({ gallery, imgIndex, setGallery, setImgIndex }: GalleryProps) {
  const [dir, setDir] = useState<"next" | "prev" | "">("");
  const [zoom, setZoom] = useState(false);
  const [origin, setOrigin] = useState("50% 50%");
  const touchX = useRef<number | null>(null);

  const items = (gallery?.gallery ?? []).map((g) => (typeof g === "string" ? { src: g, caption: undefined } : g));
  const count = items.length;

  const go = (delta: 1 | -1) => {
    setDir(delta === 1 ? "next" : "prev");
    setZoom(false);
    setImgIndex((i) => Math.min(Math.max((i as number) + delta, 0), count - 1));
  };

  const jumpTo = (idx: number) => {
    setDir(idx > imgIndex ? "next" : "prev");
    setZoom(false);
    setImgIndex(idx);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!gallery) return;
      if (e.key === "Escape") setGallery(null);
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = gallery ? "hidden" : "";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  });

  // Preload neighbours so slide transitions never flash on slow connections
  useEffect(() => {
    [imgIndex - 1, imgIndex + 1].forEach((i) => {
      const src = items[i]?.src;
      if (src) new Image().src = src;
    });
  }, [gallery, imgIndex]);

  // Keep the active thumbnail in view once the filmstrip overflows
  useEffect(() => {
    document.querySelector(".m-filmstrip-item.active")?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [imgIndex]);

  if (!gallery) return null;

  const onTouchStart = (e: React.TouchEvent) => {
    touchX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    touchX.current = null;
    if (Math.abs(dx) < 50 || zoom) return;
    if (dx < 0 && imgIndex < count - 1) go(1);
    if (dx > 0 && imgIndex > 0) go(-1);
  };

  const onImgClick = (e: React.MouseEvent<HTMLImageElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    setOrigin(`${((e.clientX - r.left) / r.width) * 100}% ${((e.clientY - r.top) / r.height) * 100}%`);
    setZoom(!zoom);
  };

  const onImgMove = (e: React.MouseEvent<HTMLImageElement>) => {
    if (!zoom) return;
    const r = e.currentTarget.getBoundingClientRect();
    setOrigin(`${((e.clientX - r.left) / r.width) * 100}% ${((e.clientY - r.top) / r.height) * 100}%`);
  };

  const current = items[imgIndex];

  return (
    <div className="m-modal" onClick={() => setGallery(null)}>
      <button className="m-modal-close" onClick={() => setGallery(null)} aria-label="Close">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{width: '24px', height: '24px'}}>
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>

      <div className="m-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="m-gallery-stage">
          <img
            key={imgIndex}
            src={current.src}
            alt={current.caption ?? gallery.title}
            className={`m-gallery-image ${dir ? `dir-${dir}` : ""} ${zoom ? "zoomed" : ""}`}
            style={zoom ? { transformOrigin: origin } : undefined}
            onClick={onImgClick}
            onMouseMove={onImgMove}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          />
          {count > 1 && (
            <>
              <button className="m-gallery-nav prev" disabled={imgIndex === 0} onClick={() => go(-1)} aria-label="Previous photo">
                <Chevron />
              </button>
              <button className="m-gallery-nav next" disabled={imgIndex === count - 1} onClick={() => go(1)} aria-label="Next photo">
                <Chevron flip />
              </button>
            </>
          )}
        </div>

        {count > 1 && (
          <>
            <div className="m-gallery-progress">
              <div className="m-gallery-progress-fill" style={{ width: `${((imgIndex + 1) / count) * 100}%` }} />
            </div>
            <div className="m-gallery-filmstrip">
              {items.map((img, idx) => (
                <div
                  key={idx}
                  className={`m-filmstrip-item ${idx === imgIndex ? 'active' : ''}`}
                  onClick={() => jumpTo(idx)}
                >
                  <img src={img.src} alt={`${gallery.title} thumb ${idx + 1}`} />
                </div>
              ))}
            </div>
          </>
        )}

        <div className="m-image-caption">
          <span style={{color: 'var(--m-gold)', fontWeight: 600}}>{gallery.title}</span>
          {current.caption && <span> &nbsp;—&nbsp; {current.caption}</span>}
          {count > 1 &&
            <span style={{opacity: 0.6}}> &nbsp;/&nbsp; Photo {imgIndex + 1} of {count}</span>
          }
        </div>
      </div>
    </div>
  );
}
