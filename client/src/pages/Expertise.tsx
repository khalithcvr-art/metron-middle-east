import { PRODUCTS } from "../lib/data";
import { useReveal } from "../hooks/useReveal";

export default function Expertise() {
  useReveal([]);

  return (
    <div className="metron">
      <section className="m-section" style={{ paddingTop: '120px' }}>
        <div className="m-container">
          <h2 className="m-section-title m-reveal">
            Our <em>Expertise</em>
          </h2>
          <div className="m-title-rule" />
          <p className="m-section-sub m-reveal">
            Metron Middle East specializes in sourcing and supplying high-end 
            architectural solutions across four core categories.
          </p>
          
          <div className="m-expertise-detailed">
            {PRODUCTS.map((p, idx) => (
              <div 
                className={`m-expertise-row m-reveal ${idx % 2 === 1 ? 'reverse' : ''}`} 
                key={p.title}
                style={{ display: 'flex', alignItems: 'center', gap: '64px', marginBottom: '100px' }}
              >
                <div className="m-expertise-image" style={{ flex: 1, height: '400px', overflow: 'hidden', borderRadius: '4px' }}>
                  <img src={p.img} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div className="m-expertise-text" style={{ flex: 1 }}>
                  <span style={{ fontSize: '0.8rem', letterSpacing: '0.2em', color: 'var(--m-gold)', fontWeight: 600 }}>0{idx + 1}</span>
                  <h3 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-display)', margin: '16px 0' }}>{p.title}</h3>
                  <p style={{ fontSize: '1.1rem', color: 'var(--m-ink-soft)', lineHeight: 1.8 }}>{p.desc}</p>
                  <p style={{ marginTop: '24px', color: 'var(--m-ink-soft)' }}>
                    We partner with the world's most prestigious manufacturers to bring 
                    bespoke {p.title.toLowerCase()} solutions to the Middle East. Our 
                    team ensures that every product meets the highest standards of quality 
                    and design expected by our luxury clients.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
