import { useMemo, useState } from "react";
import { PROJECTS, FILTERS, CATEGORY_LABEL, GALLERY_IMAGES, Project, Category } from "../lib/data";
import { useReveal } from "../hooks/useReveal";
import Gallery from "../components/Gallery";

/* The landmark projects to highlight on the landing view, in display order. */
const FEATURED_IDS = [
  "qasr", // Qasr Al Watan
  "etihad-arena", // Etihad Arena
  "broadway", // 8th Broadway London
  "ritz-bahrain", // Ritz Carlton Bahrain
  "wade", // Wade Adams Dubai
  "burj", // Burj Vista
  "royal-blue", // The Royal Blue Resort
];

/* Reusable project card used by both the highlights and the full portfolio. */
function ProjectCard({
  p,
  onOpen,
  eyebrow,
  overlayLabel,
  subtitle,
}: {
  p: Project;
  onOpen: () => void;
  eyebrow: string;
  overlayLabel?: string;
  subtitle?: string;
}) {
  return (
    <div className="m-project-card m-reveal">
      <div className="m-project-image" onClick={onOpen}>
        <img src={p.cover} alt={p.title} loading="lazy" />
        {p.gallery.length > 1 && (
          <span className="m-photo-count">{p.gallery.length} photos</span>
        )}
        <div className="m-project-overlay">
          <span className="m-overlay-label">{overlayLabel ?? "View Gallery"}</span>
        </div>
      </div>
      <div className="m-project-info">
        <p
          style={{
            color: "var(--m-gold)",
            fontWeight: 600,
            letterSpacing: "0.1em",
            fontSize: "0.7rem",
          }}
        >
          {eyebrow}
        </p>
        <h3 style={{ margin: "8px 0" }}>{p.title}</h3>
        <p style={{ color: "var(--m-ink-soft)", marginBottom: "4px" }}>
          {subtitle ?? p.location}
        </p>
      </div>
    </div>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState<"all" | Category>("all");
  const [gallery, setGallery] = useState<Project | null>(null);
  const [imgIndex, setImgIndex] = useState(0);
  const [showAll, setShowAll] = useState(false);

  useReveal([filter, showAll]);

  const openGallery = (p: Project) => {
    setGallery(p);
    setImgIndex(0);
  };

  /* The seven landmark projects, resolved in the requested order. */
  const featuredProjects = FEATURED_IDS
    .map((id) => PROJECTS.find((p) => p.id === id))
    .filter((p): p is Project => Boolean(p));

  /* A synthetic "gallery" card holding the full photo reel from the company
     project album, shuffled for variety. Computed once per mount so the
     modal stays stable while it is open. */
  const galleryProject = useMemo<Project>(() => {
    const pool = [...GALLERY_IMAGES];
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    return {
      id: "projects-gallery",
      title: "Our Projects Gallery",
      category: "venues",
      location: "Middle East & Europe",
      cover: pool[0],
      gallery: pool,
    };
  }, []);

  const visibleProjects =
    filter === "all" ? PROJECTS : PROJECTS.filter((p) => p.category === filter);

  return (
    <div className="metron">
      <section className="m-section" style={{ paddingTop: "120px" }}>
        <div className="m-container">
          {!showAll ? (
            /* ---------------- Highlights view ---------------- */
            <>
              <h2 className="m-section-title m-reveal">
                Some of Our <em>Major Projects</em>
              </h2>
              <div className="m-title-rule" />
              <p className="m-section-sub m-reveal">
                A selection of our landmark hospitality, commercial, and
                residential work across the Middle East and Europe.
              </p>

              <div className="m-projects-masonry">
                {featuredProjects.map((p) => (
                  <ProjectCard
                    key={p.id}
                    p={p}
                    eyebrow={CATEGORY_LABEL[p.category]}
                    onOpen={() => openGallery(p)}
                  />
                ))}

                {/* Projects gallery card — random project images */}
                <ProjectCard
                  p={galleryProject}
                  eyebrow="Gallery"
                  overlayLabel="Browse Gallery"
                  subtitle="A visual highlight reel"
                  onOpen={() => openGallery(galleryProject)}
                />
              </div>

              <div style={{ textAlign: "center", marginTop: "48px" }}>
                <button
                  className="m-btn m-btn-primary"
                  onClick={() => setShowAll(true)}
                >
                  All Projects
                </button>
              </div>
            </>
          ) : (
            /* ---------------- Full portfolio view ---------------- */
            <>
              <h2 className="m-section-title m-reveal">
                Project <em>Portfolio</em>
              </h2>
              <div className="m-title-rule" />
              <p className="m-section-sub m-reveal">
                A showcase of our most prestigious hospitality, commercial,
                and residential projects across the Middle East and Europe.
              </p>

              <div className="m-project-filters m-reveal">
                <button
                  className="m-filter-btn"
                  onClick={() => {
                    setShowAll(false);
                    setFilter("all");
                  }}
                >
                  ← Highlights
                </button>
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
                  <ProjectCard
                    key={p.id}
                    p={p}
                    eyebrow={CATEGORY_LABEL[p.category]}
                    onOpen={() => openGallery(p)}
                  />
                ))}
              </div>
            </>
          )}
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
