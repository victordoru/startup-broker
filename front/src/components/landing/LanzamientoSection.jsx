import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { CheckCircle2 } from 'lucide-react';

export default function LanzamientoSection() {
  const steps = [
    {
      number: '01',
      title: 'Licencia',
      description:
        'Tramitamos y coordinamos todos los permisos y licencias necesarias para operar legalmente.',
    },
    {
      number: '02',
      title: 'Seguro',
      description:
        'Gestionamos las pólizas de seguro profesional y de responsabilidad civil adecuadas.',
    },
    {
      number: '03',
      title: 'MLS/Equivalente',
      description:
        'Te inscribimos en el MLS o en los sistemas de listados inmobiliarios de tu región.',
    },
    {
      number: '04',
      title: 'Transferencia de listados',
      description:
        'Ayudamos con la transferencia de tus propiedades actuales a tu nueva marca.',
    },
  ];

  return (
    <section
      id="lanzamiento"
      className="py-20 md:py-32 bg-background"
      aria-labelledby="lanzamiento-title"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 md:mb-16 space-y-4">
            <h2
              id="lanzamiento-title"
              className="text-3xl md:text-5xl font-bold text-foreground"
            >
              Despega sin complicaciones
            </h2>
            <Separator className="max-w-24 mx-auto" />
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Nuestro equipo de operaciones coordinará por ti la licencia, el seguro, la
              inscripción en el MLS (o su equivalente en España) y la transferencia de tus
              listados. Así puedes empezar a operar con tu nueva marca desde el primer día,
              sin preocuparte por la burocracia.
            </p>
          </div>

          {/* Timeline */}
          <div className="space-y-8 md:space-y-12 mb-12">
            {steps.map((step, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row gap-6 items-start group"
                role="article"
                aria-labelledby={`step-${index}-title`}
              >
                {/* Step number */}
                <div
                  className="flex-shrink-0 w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center border-2 border-primary/20 group-hover:border-primary transition-colors"
                  aria-hidden="true"
                >
                  <span className="text-xl font-bold text-primary">{step.number}</span>
                </div>

                {/* Step content */}
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-3">
                    <h3
                      id={`step-${index}-title`}
                      className="text-2xl font-semibold text-foreground"
                    >
                      {step.title}
                    </h3>
                    <CheckCircle2
                      className="w-5 h-5 text-primary flex-shrink-0"
                      aria-label="Completado"
                    />
                  </div>
                  <p className="text-base text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center">
            <Button
              variant="secondary"
              size="lg"
              onClick={() => {
                const element = document.getElementById('cta');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
              data-analytics-event="cta-click"
              data-analytics-location="lanzamiento"
              aria-label="Habla con operaciones"
            >
              Habla con operaciones
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}


