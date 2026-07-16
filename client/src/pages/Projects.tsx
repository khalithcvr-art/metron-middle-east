import { useState } from "react";
import { PROJECTS, FILTERS, CATEGORY_LABEL, Project, Category } from "../lib/data";
import { useReveal } from "../hooks/useReveal";
import Gallery from "../components/Gallery";

export default function Projects() {
  const [filter, setFilter] = useState<"all" | Category>("all");
  const [gallery, setGallery] = useState<Project | null>(null);
  const [imgIndex, setImgIndex] = useState(0);

  useReveal([filter]);

  const openGallery = (p: Project) => {
    setGallery(p);
    setImgIndex(0);
  };

  const visibleProjects =
    filter === "all" ? PROJECTS : PROJECTS.filter((p) => p.category === filter);

  return (
    <div className="metron">
      <section className="m-section" style={{ paddingTop: '120px' }}>
        <div className="m-container">
          <h2 className="m-section-title m-reveal">
            Project <em>Portfolio</em>
          </h2>
          <div className="m-title-rule" />
          <p className="m-section-sub m-reveal">
            A showcase of our most prestigious hospitality, commercial, 
            and residential projects across the Middle East and Europe.
          </p>

          <div className="m-project-filters m-reveal">
            {FILTERS.map((f) => (
              <button
                key={f.key}
                className={`m-filter-btn ${filter === f.key ? "active" : ""}`}
                onClick={() => setFilter(f.key)}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="m-projects-masonry" key={filter}>
            {visibleProjects.map((p) => (
              <div className="m-project-card m-reveal" key={p.id}>
                <div className="m-project-image" onClick={() => openGallery(p)}>
                  <img src={p.cover} alt={p.title} loading="lazy" />
                  {p.gallery.length > 1 && (
                    <span className="m-photo-count">{p.gallery.length} photos</span>
                  )}
                  <div className="m-project-overlay">
                    <span className="m-overlay-label">View Gallery</span>
                  </div>
                </div>
                <div className="m-project-info">
                  <p style={{ color: 'var(--m-gold)', fontWeight: 600, letterSpacing: '0.1em', fontSize: '0.7rem' }}>
                    {CATEGORY_LABEL[p.category]}
                  </p>
                  <h3 style={{ margin: '8px 0' }}>{p.title}</h3>
                  <p style={{ color: 'var(--m-ink-soft)', marginBottom: '4px' }}>{p.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Gallery 
        gallery={gallery} 
        imgIndex={imgIndex} 
        setGallery={setGallery} 
        setImgIndex={setImgIndex} 
      />
    </div>
  );
}
