import { useEffect, useState } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import HowItWorks from "./components/HowItWorks";
import Services from "./components/Services";
import ServicesShowcase from "./components/ServicesShowcase";
import Testimonials from "./components/Testimonials";
import WhyUs from "./components/WhyUs";
import FAQ from "./components/FAQ";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import MouseFollowCursor from "./components/MouseFollowCursor";
import ChannelPartners from "./components/ChannelPartners";
import FloatingWhatsApp from "./components/FloatingWhatsApp";
import MobileCTABar from "./components/MobileCTABar";
import CostCalculator from "./components/CostCalculator";
import TrustBar from "./components/TrustBar";
import ScrollToTop from "./components/ScrollToTop";
import ZonePage from "./pages/ZonePage";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import ArabicHome from "./pages/ArabicHome";
import ServicesPage from "./pages/ServicesPage";

function HomePage() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Support deep links like /#calculator arriving from subpages
    const hash = window.location.hash.slice(1);
    if (hash) {
      setTimeout(() => document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' }), 120);
    }
  }, []);

  return (
    <div className="bg-brand-navy min-h-screen">
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} />
      <Navbar onServicesClick={() => navigate('/services')} />

      <Hero />
      <TrustBar />
      <Services />
      <ServicesShowcase />
      <HowItWorks />
      <ChannelPartners />
      <CostCalculator />
      <WhyUs />
      <Testimonials />
      <FAQ />
      <Contact />
      <Footer />
    </div>
  );
}

export default function App() {
  const location = useLocation();
  return (
    <>
      <MouseFollowCursor />
      <FloatingWhatsApp />
      <MobileCTABar />
      <ScrollToTop />
      {/* Keyed wrapper re-mounts on route change → soft fade-in transition */}
      <div key={location.pathname} className="page-enter">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/ar" element={<ArabicHome />} />
          <Route path="/:slug" element={<ZonePage />} />
        </Routes>
      </div>
    </>
  );
}
