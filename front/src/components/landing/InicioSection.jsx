import { Separator } from '@/components/ui/separator';
import { FileCheck, Palette, Briefcase, Sparkles, Globe, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function InicioSection() {
  const leftFeatures = [
    {
      icon: FileCheck,
      title: 'Licencias y alta',
      description:
        'Tramitamos las licencias, el alta de autónomo y todo lo necesario para operar legalmente.',
    },
    {
      icon: Palette,
      title: 'Tu marca',
      description:
        'Creamos tu naming, logo y guía visual completa para que destaques desde el primer día.',
    },
    {
      icon: Globe,
      title: 'Web y presencia',
      description:
        'Tu sitio web profesional y presencia en portales inmobiliarios, todo configurado.',
    },
  ];

  const rightFeatures = [
    {
      icon: Sparkles,
      title: 'Plantillas y materiales',
      description:
        'Kit completo de plantillas para presentaciones, captación y comunicación con clientes.',
    },
    {
      icon: Briefcase,
      title: 'Herramientas operativas',
      description:
        'CRM, contratos y sistema de publicación listos para que empieces a trabajar.',
    },
    {
      icon: Target,
      title: 'Lanzamiento',
      description:
        'Te acompañamos en los primeros pasos para que arranques con confianza y seguridad.',
    },
  ];

  const FeatureItem = ({ feature, index, isRight = false }) => {
    const Icon = feature.icon;
    return (
      <div className="relative flex gap-6 group" role="article" aria-labelledby={`feature-${isRight ? 'r' : 'l'}-${index}-title`}>
        {/* Icon */}
        <div className="flex-shrink-0">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <Icon className="w-6 h-6 text-primary" aria-hidden="true" />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 pb-8">
          <h3
            id={`feature-${isRight ? 'r' : 'l'}-${index}-title`}
            className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors"
          >
            {feature.title}
          </h3>
          <p className="text-base text-muted-foreground leading-relaxed">
            {feature.description}
          </p>
        </div>
      </div>
    );
  };

  return (
    <section
      id="inicio-operativo"
      className="py-20 md:py-32 bg-gradient-to-b from-background to-muted/30"
      aria-labelledby="inicio-title"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 md:mb-20 space-y-4">
            <h2
              id="inicio-title"
              className="text-3xl md:text-5xl font-bold text-foreground"
            >
              De cero a operando en días
            </h2>
            <Separator className="max-w-24 mx-auto" />
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Nos ocupamos de todo el setup: desde las licencias y el alta de autónomo hasta 
              tu marca, web y herramientas. Tú enfócate en vender, nosotros montamos el resto.
            </p>
          </div>

          {/* Features - Two Columns Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-12">
            {/* Left Column */}
            <div className="space-y-6">
              {leftFeatures.map((feature, index) => (
                <FeatureItem key={index} feature={feature} index={index} />
              ))}
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {rightFeatures.map((feature, index) => (
                <FeatureItem key={index} feature={feature} index={index} isRight />
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center pt-8">
            <Button
              size="lg"
              className="min-w-[200px]"
              onClick={() => {
                const element = document.getElementById('cta');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
              data-analytics-event="cta-click"
              data-analytics-location="inicio-operativo"
              aria-label="Empezar ahora"
            >
              Empezar ahora
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

