import { useReveal } from "../hooks/useReveal";

export default function About() {
  useReveal([]);

  return (
    <div className="metron">
      {/* ---------------- Hero ---------------- */}
      <section className="m-section" style={{ paddingTop: '120px', background: 'var(--m-cream)' }}>
        <div className="m-container">
          <div style={{ maxWidth: '800px' }}>
            <h2 className="m-section-title m-reveal" style={{ textAlign: 'left' }}>
              Our <em>Heritage</em>
            </h2>
            <div className="m-title-rule" style={{ margin: '24px 0' }} />
            <p className="m-section-sub m-reveal" style={{ textAlign: 'left', margin: 0, fontSize: '1.4rem' }}>
              Established in 2008, Metron Middle East has grown from a specialized 
              trading house into a leading provider of architectural solutions for 
              the region's most iconic developments.
            </p>
          </div>
        </div>
      </section>

      {/* ---------------- Mission/Vision ---------------- */}
      <section className="m-section">
        <div className="m-container">
          <div className="m-contact-content">
            <div className="m-reveal" style={{ flex: 1 }}>
              <h3 style={{ fontSize: '2rem', marginBottom: '24px', fontFamily: 'var(--font-display)' }}>Our Mission</h3>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--m-ink-soft)' }}>
                To bridge the gap between global manufacturing excellence and Middle Eastern 
                architectural ambition. We source, supply, and consult on premium interior 
                and exterior solutions that elevate the human experience in hospitality, 
                commercial, and residential spaces.
              </p>
            </div>
            <div className="m-reveal" style={{ flex: 1, paddingLeft: '40px', borderLeft: '1px solid var(--m-line)' }}>
              <h3 style={{ fontSize: '2rem', marginBottom: '24px', fontFamily: 'var(--font-display)' }}>Our Vision</h3>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--m-ink-soft)' }}>
                To be the first-choice partner for developers and architects in the GCC and 
                Europe, recognized for our uncompromising commitment to quality, 
                sustainability, and project excellence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- Why Metron ---------------- */}
      <section className="m-section" style={{ background: '#fcfcfc' }}>
        <div className="m-container">
          <h2 className="m-section-title m-reveal">Why <em>Partner</em> With Us?</h2>
          <div className="m-title-rule" />
          
          <div className="m-products-grid" style={{ marginTop: '60px' }}>
            <div className="m-reveal" style={{ textAlign: 'center', padding: '20px' }}>
              <div style={{ color: 'var(--m-gold)', fontSize: '2.5rem', marginBottom: '16px' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '48px', height: '48px', margin: '0 auto' }}>
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </div>
              <h4>Proven Excellence</h4>
              <p>15+ years of delivering on large-scale government and private sector projects.</p>
            </div>
            <div className="m-reveal" style={{ textAlign: 'center', padding: '20px' }}>
              <div style={{ color: 'var(--m-gold)', fontSize: '2.5rem', marginBottom: '16px' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '48px', height: '48px', margin: '0 auto' }}>
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="2" y1="12" x2="22" y2="12"></line>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                </svg>
              </div>
              <h4>Global Sourcing</h4>
              <p>Exclusive partnerships with top manufacturers from Europe and around the world.</p>
            </div>
            <div className="m-reveal" style={{ textAlign: 'center', padding: '20px' }}>
              <div style={{ color: 'var(--m-gold)', fontSize: '2.5rem', marginBottom: '16px' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '48px', height: '48px', margin: '0 auto' }}>
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <h4>Expert Team</h4>
              <p>Bespoke consulting from professionals who understand luxury requirements.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
