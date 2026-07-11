import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on navigation
  useEffect(() => {
    setMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="metron">
      {/* ---------------- Header ---------------- */}
      <header className={`m-header ${scrolled ? "scrolled" : ""}`}>
        <div className="m-container">
          <div className="m-header-content">
            <Link href="/">
              <img src="/images/logo.webp" alt="Metron" className="m-logo-image" style={{ cursor: 'pointer' }} />
            </Link>
            <nav className={`m-nav ${menuOpen ? "open" : ""}`}>
              <Link href="/" className={`m-nav-link ${location === "/" ? "active" : ""}`}>Home</Link>
              <Link href="/about" className={`m-nav-link ${location === "/about" ? "active" : ""}`}>About Us</Link>
              <Link href="/expertise" className={`m-nav-link ${location === "/expertise" ? "active" : ""}`}>Expertise</Link>
              <Link href="/projects" className={`m-nav-link ${location === "/projects" ? "active" : ""}`}>Projects</Link>
              <Link href="/contact" className={`m-nav-link ${location === "/contact" ? "active" : ""}`}>Contact Us</Link>
            </nav>
            <button
              className="m-menu-toggle"
              aria-label="Toggle menu"
              onClick={() => setMenuOpen((o) => !o)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      <main style={{ paddingTop: '76px' }}>
        {children}
      </main>

      {/* ---------------- Floating WhatsApp ---------------- */}
      <a
        href="https://wa.me/971529064207"
        className="m-whatsapp-float"
        target="_blank"
        rel="noreferrer"
        aria-label="Contact us on WhatsApp"
      >
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.18-2.587-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217s.231.006.332.013c.101.007.237-.038.37.284.133.321.455 1.111.494 1.192.039.08.065.173.013.277s-.078.121-.156.214c-.078.092-.17.205-.242.277-.081.082-.167.172-.071.337.096.165.425.7.912 1.134.628.56 1.156.734 1.321.815.165.081.263.067.36-.043.097-.11.417-.484.527-.648.11-.165.22-.138.371-.081s.951.448 1.114.53c.163.081.27.121.309.188.039.066.039.383-.105.788z" />
        </svg>
      </a>

      {/* ---------------- Footer ---------------- */}
      <footer className="m-footer">
        <div className="m-container">
          <div className="m-footer-grid">
            <div className="m-footer-col m-footer-brand">
              <Link href="/">
                <img src="/images/logo.webp" alt="Metron" className="m-footer-logo" />
              </Link>
              <p className="m-footer-desc">
                Metron Middle East General Trading Company is a leading provider of premium 
                products and services, specializing in furniture, lighting, floor coverings, 
                and decorative solutions for prestigious landmarks.
              </p>
              <div className="m-footer-social">
                <a href="#" className="m-social-link m-instagram" aria-label="Instagram">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                </a>
                <a href="#" className="m-social-link m-facebook" aria-label="Facebook">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                </a>
                <a href="#" className="m-social-link m-linkedin" aria-label="LinkedIn">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                </a>
              </div>
            </div>

            <div className="m-footer-col">
              <h5>Quick Links</h5>
              <ul className="m-footer-links">
                <li><Link href="/">Home</Link></li>
                <li><Link href="/about">About Us</Link></li>
                <li><Link href="/expertise">Expertise</Link></li>
                <li><Link href="/projects">Projects</Link></li>
                <li><Link href="/contact">Contact Us</Link></li>
              </ul>
            </div>

            <div className="m-footer-col">
              <h5>Expertise</h5>
              <ul className="m-footer-links">
                <li><Link href="/expertise">Furniture</Link></li>
                <li><Link href="/expertise">Lighting</Link></li>
                <li><Link href="/expertise">Floor Coverings</Link></li>
                <li><Link href="/expertise">Decoratives</Link></li>
              </ul>
            </div>

            <div className="m-footer-col">
              <h5>Contact</h5>
              <ul className="m-footer-contact-list">
                <li>
                  <strong>Abu Dhabi</strong>
                  <span>Baghdad St, Zone 1, UAE</span>
                </li>
                <li>
                  <strong>Email</strong>
                  <span><a href="mailto:info@metron.ae">info@metron.ae</a></span>
                </li>
                <li>
                  <strong>Phone</strong>
                  <span><a href="tel:+97126727888">+971 2 672 7888</a></span>
                </li>
              </ul>
            </div>
          </div>

          <div className="m-footer-bottom">
            <p className="m-copyright">
              &copy; {new Date().getFullYear()} Metron Middle East General Trading Company. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
