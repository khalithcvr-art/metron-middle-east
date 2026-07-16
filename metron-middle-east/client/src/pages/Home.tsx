import { useState } from "react";
import { Link } from "wouter";
import { PRODUCTS, PROJECTS, Project } from "../lib/data";
import { useReveal } from "../hooks/useReveal";
import Gallery from "../components/Gallery";

function LeadForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  if (submitted) {
    return (
      <div className="m-success-box">
        <h3>Thank You!</h3>
        <p>Your enquiry has been received. Our team will contact you shortly.</p>
        <button className="m-btn m-btn-primary" style={{ marginTop: '24px' }} onClick={() => setSubmitted(false)}>
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form className="m-lead-form" onSubmit={handleSubmit}>
      <div className="m-form-row">
        <div className="m-form-group">
          <label htmlFor="name">Full Name</label>
          <input type="text" id="name" className="m-form-control" placeholder="John Doe" required />
        </div>
        <div className="m-form-group">
          <label htmlFor="email">Email Address</label>
          <input type="email" id="email" className="m-form-control" placeholder="john@company.com" required />
        </div>
      </div>
      
      <div className="m-form-row">
        <div className="m-form-group">
          <label htmlFor="company">Company</label>
          <input type="text" id="company" className="m-form-control" placeholder="Your Company Name" />
        </div>
        <div className="m-form-group">
          <label htmlFor="project">Project Type</label>
          <select id="project" className="m-form-control" required>
            <option value="">Select Project Type</option>
            <option value="hospitality">Hospitality</option>
            <option value="commercial">Commercial</option>
            <option value="residential">Residential</option>
            <option value="venues">Venues / Public Spaces</option>
          </select>
        </div>
      </div>

      <div className="m-form-group">
        <label htmlFor="message">Project Details</label>
        <textarea id="message" className="m-form-control" placeholder="Tell us about your project requirements..." required></textarea>
      </div>

      <div style={{ textAlign: 'center', marginTop: '32px' }}>
        <button type="submit" className="m-btn m-btn-primary" disabled={loading} style={{ minWidth: '200px' }}>
          {loading ? "Sending..." : "Submit Enquiry"}
        </button>
      </div>
    </form>
  );
}

export default function Home() {
  const [gallery, setGallery] = useState<Project | null>(null);
  const [imgIndex, setImgIndex] = useState(0);

  useReveal([]);

  const openGallery = (p: Project) => {
    setGallery(p);
    setImgIndex(0);
  };

  const featuredProjects = PROJECTS.slice(0, 6);

  return (
    <>
      {/* ---------------- Hero ---------------- */}
      <section className="m-hero">
        <div className="m-container">
          <div className="m-hero-content">
            <div className="m-hero-eyebrow">Metron Middle East</div>
            <h1 className="m-hero-title">
              Excellence in <br />
              <em>Trading</em> Solutions
            </h1>
            <p className="m-hero-subtitle">
              Delivering premium products and exceptional services across the
              Middle East and Europe.
            </p>
            <div className="m-hero-buttons">
              <Link href="/expertise" className="m-btn m-btn-primary">
                Explore Expertise
              </Link>
              <Link href="/projects" className="m-btn m-btn-secondary">
                View Projects
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- Partners / Clients ---------------- */}
      <section className="m-section" style={{ padding: '40px 0', borderBottom: '1px solid var(--m-line)' }}>
        <div className="m-container">
          <div className="m-partners-slider">
            <span className="m-partners-label m-reveal">Trusted By Landmark Developments Across GCC</span>
            <div className="m-partners-grid m-reveal">
              {/* Using stylized text for partner names to represent their logos in a high-end way */}
              <div className="m-partner">ETIHAD</div>
              <div className="m-partner">EMAAR</div>
              <div className="m-partner">ALDAR</div>
              <div className="m-partner">HILTON</div>
              <div className="m-partner">RITZ CARLTON</div>
              <div className="m-partner">MUBADALA</div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- Products Summary ---------------- */}
      <section className="m-section m-products">
        <div className="m-container">
          <h2 className="m-section-title m-reveal">
            Our <em>Expertise</em>
          </h2>
          <div className="m-title-rule" />
          <div className="m-products-grid">
            {PRODUCTS.map((p) => (
              <div className="m-product-card m-reveal" key={p.title}>
                <div className="m-product-image-container">
                  <img src={p.img} alt={p.title} loading="lazy" />
                </div>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
              </div>
            ))}
          </div>
          <div className="m-products-cta">
            <Link href="/expertise" className="m-btn m-btn-primary">
              Learn More About Our Services
            </Link>
          </div>
        </div>
      </section>



      {/* ---------------- Lead Form Section ---------------- */}
      <section className="m-section m-contact">
        <div className="m-container">
          <h2 className="m-section-title m-reveal">
            Work With <em>Us</em>
          </h2>
          <div className="m-title-rule" />
          
          <div className="m-reveal" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <p style={{ fontSize: '1.2rem', color: 'var(--m-ink-soft)', marginBottom: '40px' }}>
              Partner with Metron for your next landmark development. Fill out the form below 
              and our project consultants will get back to you within 24 hours.
            </p>
          </div>

          <div className="m-reveal">
            <LeadForm />
          </div>
        </div>
      </section>

      <Gallery 
        gallery={gallery} 
        imgIndex={imgIndex} 
        setGallery={setGallery} 
        setImgIndex={setImgIndex} 
      />
    </>
  );
}
