import { useReveal } from "../hooks/useReveal";

export default function Contact() {
  useReveal([]);

  return (
    <div className="metron">
      <section className="m-section" style={{ paddingTop: '120px' }}>
        <div className="m-container">
          <h2 className="m-section-title m-reveal">
            Get In <em>Touch</em>
          </h2>
          <div className="m-title-rule" />
          
          <div className="m-contact-content m-reveal">
            <div className="m-contact-info">
              <h3>Contact Details</h3>
              
              <div className="m-contact-detail">
                <strong>Main Office</strong>
                <p>
                  C-88 Building, Tower A, 102<br />
                  Baghdad St, Behind City Seasons Hotel<br />
                  Al Danah, Zone 1, Abu Dhabi, UAE
                </p>
              </div>

              <div className="m-contact-detail">
                <strong>Direct Contact</strong>
                <p>General: <a href="tel:+97126727888">+971 2 672 7888</a></p>
                <p>Support: <a href="tel:+971529064207">+971 52 906 4207</a></p>
              </div>

              <div className="m-contact-detail">
                <strong>Email Addresses</strong>
                <p><a href="mailto:info@metron.ae">info@metron.ae</a></p>
                <p><a href="mailto:stavros@metron.ae">stavros@metron.ae</a></p>
              </div>

              <div style={{ marginTop: '40px' }}>
                <a href="https://wa.me/971529064207" target="_blank" rel="noreferrer" className="m-btn m-btn-primary">
                  WhatsApp Us Now
                </a>
              </div>
            </div>

            <div className="m-contact-map" style={{ flex: 1.5, minHeight: '450px', background: '#f5f5f5', borderRadius: '4px', overflow: 'hidden', position: 'relative' }}>
              <iframe 
                src="https://maps.google.com/maps?q=24.490283,54.371578&z=17&output=embed" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
              <a 
                href="https://www.google.com/maps/place/24%C2%B029'25.0%22N+54%C2%B022'17.7%22E/@24.490283,54.371578,17z"
                target="_blank"
                rel="noreferrer"
                style={{ position: 'absolute', inset: 0, zIndex: 10, cursor: 'pointer' }}
                title="View on Google Maps"
              ></a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
