import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-background/80 backdrop-blur-lg border-b border-border shadow-sm'
          : 'bg-transparent'
      }`}
      role="navigation"
      aria-label="Navegación principal"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <button
              onClick={() => scrollToSection('inicio')}
              className="text-xl font-bold text-foreground hover:text-primary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md px-2 py-1"
              aria-label="Volver al inicio"
            >
              Broker XYZ
            </button>
          </div>

          {/* Navegación central - Desktop */}
          <div className="hidden md:flex items-center space-x-1">
            {[
              { id: 'inicio', label: 'Inicio' },
              { id: 'historias', label: 'Para ti' },
              { id: 'inicio-operativo', label: 'Cómo funciona' },
              { id: 'marketing', label: 'Marketing' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-label={`Ir a la sección ${item.label}`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* CTAs */}
          <div className="hidden md:flex items-center space-x-2">
             <Button
              variant="outline"
              size="sm"
              onClick={() => scrollToSection('cta')}
              aria-label="Iniciar sesión"
            >
              Solicitar información

            </Button> 
            {/* <Button
              size="sm"
              onClick={() => scrollToSection('cta')}
              aria-label="Únete a Broker XYZ"
            >
              Solicitar información
            </Button> */}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => scrollToSection('cta')}
              aria-label="Únete ahora"
            >
              <span className="text-xs font-semibold">Únete</span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}


