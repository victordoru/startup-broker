import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function Hero() {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-labelledby="hero-headline"
    >
      {/* Interactive background placeholder */}
      <div
        data-bg="interactive-unicorn-studio"
        className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/10"
        aria-hidden="true"
      >
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Trust badge */}
          <div className="flex justify-center" data-analytics="hero-trust-badge">
            <Badge variant="secondary" className="text-sm px-4 py-2">
              +500 profesionales impulsados
            </Badge>
          </div>

          {/* Headline */}
          <h1
            id="hero-headline"
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight"
          >
            Sé dueño de tu propia inmobiliaria
          </h1>

          {/* Subheadline */}
          <div className="max-w-3xl mx-auto space-y-4">
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Crea tu propio negocio y construye tu propio equipo con nuestro apoyo.
            </p>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              Nos ocupamos del back-office y del cumplimiento legal; tú te concentras en
              vender y en hacer crecer tu marca.
            </p>
          </div>

          {/* CTAs */}
          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
            data-analytics="hero-ctas"
          >
            <Button
              size="lg"
              className="min-w-[200px]"
              onClick={() => scrollToSection('cta')}
              data-analytics-event="cta-click"
              data-analytics-location="hero-primary"
              aria-label="Empieza ahora - Ir al formulario de contacto"
            >
              Empieza ahora
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="min-w-[200px]"
              onClick={() => scrollToSection('cta')}
              data-analytics-event="cta-click"
              data-analytics-location="hero-secondary"
              aria-label="Únete a Broker XYZ - Más información"
            >
              Únete a Broker XYZ
            </Button>
          </div>

          {/* Scroll indicator */}
          <div className="pt-12 animate-bounce" aria-hidden="true">
            <svg
              className="w-6 h-6 mx-auto text-muted-foreground"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}


