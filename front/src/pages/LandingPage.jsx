import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Toaster } from '@/components/ui/sonner';
import Navbar from '@/components/landing/Navbar';
import Hero from '@/components/landing/Hero';
import MarcaSection from '@/components/landing/MarcaSection';
import LanzamientoSection from '@/components/landing/LanzamientoSection';
import MarketingSection from '@/components/landing/MarketingSection';
import AcompanamientoSection from '@/components/landing/AcompanamientoSection';
import HistoriasSection from '@/components/landing/HistoriasSection';
import CTASection from '@/components/landing/CTASection';
import Footer from '@/components/landing/Footer';

export default function LandingPage() {
  useEffect(() => {
    // Scroll depth tracking (analytics placeholder)
    const handleScroll = () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      );

      // Track milestones
      if (scrollPercent >= 25 && !window._scrollTracked25) {
        window._scrollTracked25 = true;
        if (window.dataLayer) {
          window.dataLayer.push({ event: 'scroll_depth', depth: 25 });
        }
      }
      if (scrollPercent >= 50 && !window._scrollTracked50) {
        window._scrollTracked50 = true;
        if (window.dataLayer) {
          window.dataLayer.push({ event: 'scroll_depth', depth: 50 });
        }
      }
      if (scrollPercent >= 75 && !window._scrollTracked75) {
        window._scrollTracked75 = true;
        if (window.dataLayer) {
          window.dataLayer.push({ event: 'scroll_depth', depth: 75 });
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <Helmet>
        {/* Primary Meta Tags */}
        <title>Broker XYZ - Sé dueño de tu propia inmobiliaria</title>
        <meta
          name="title"
          content="Broker XYZ - Sé dueño de tu propia inmobiliaria"
        />
        <meta
          name="description"
          content="Plataforma para agentes inmobiliarios que quieren crear su propio negocio. Conserva tus comisiones, construye tu marca y olvídate del back-office. Más de 500 profesionales impulsados."
        />
        <meta
          name="keywords"
          content="inmobiliaria propia, agente independiente, plataforma agentes inmobiliarios, conservar comisiones, marca inmobiliaria, negocio inmobiliario"
        />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://brokerxyz.com/" />
        <meta
          property="og:title"
          content="Broker XYZ - Sé dueño de tu propia inmobiliaria"
        />
        <meta
          property="og:description"
          content="Crea tu propio negocio inmobiliario con nuestro apoyo. Nos ocupamos del back-office y del cumplimiento legal; tú te concentras en vender."
        />
        <meta property="og:image" content="https://brokerxyz.com/og-image.jpg" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://brokerxyz.com/" />
        <meta
          property="twitter:title"
          content="Broker XYZ - Sé dueño de tu propia inmobiliaria"
        />
        <meta
          property="twitter:description"
          content="Crea tu propio negocio inmobiliario con nuestro apoyo. Nos ocupamos del back-office y del cumplimiento legal; tú te concentras en vender."
        />
        <meta property="twitter:image" content="https://brokerxyz.com/og-image.jpg" />

        {/* Favicon */}
        <link rel="icon" type="image/svg+xml" href="/vite.svg" />

        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Broker XYZ",
            "description": "Plataforma de apoyo para agentes inmobiliarios que quieren ser dueños de su propio negocio",
            "url": "https://brokerxyz.com",
            "logo": "https://brokerxyz.com/logo.png",
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+34-900-000-000",
              "contactType": "customer service",
              "email": "info@brokerxyz.com",
              "areaServed": "ES",
              "availableLanguage": ["Spanish"]
            },
            "sameAs": [
              "https://facebook.com/brokerxyz",
              "https://twitter.com/brokerxyz",
              "https://linkedin.com/company/brokerxyz",
              "https://instagram.com/brokerxyz"
            ]
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Broker XYZ",
            "url": "https://brokerxyz.com",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://brokerxyz.com/buscar?q={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <main>
          <Hero />
          <MarcaSection />
          <LanzamientoSection />
          <MarketingSection />
          <AcompanamientoSection />
          <HistoriasSection />
          <CTASection />
        </main>
        <Footer />
        <Toaster position="top-right" />
      </div>
    </>
  );
}


