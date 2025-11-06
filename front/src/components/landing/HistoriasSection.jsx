import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Target, TrendingUp, Users, Zap } from 'lucide-react';

export default function HistoriasSection() {
  const benefits = [
    {
      icon: Target,
      title: 'Construye tu propia marca',
      description:
        'Desarrolla una identidad única que refleje tu estilo profesional y te diferencie en el mercado.',
    },
    {
      icon: TrendingUp,
      title: 'Conserva más comisiones',
      description:
        'Mantén un mayor porcentaje de tus ingresos al eliminar las comisiones de franquicias tradicionales.',
    },
    {
      icon: Users,
      title: 'Construye tu equipo',
      description:
        'Escala tu negocio reclutando agentes bajo tu propia marca y crea una organización que crezca contigo.',
    },
    {
      icon: Zap,
      title: 'Enfócate en vender',
      description:
        'Déjanos manejar el back-office, la burocracia y el cumplimiento legal mientras tú te concentras en cerrar ventas.',
    },
  ];

  return (
    <section
      id="historias"
      className="py-20 md:py-32 bg-muted/30"
      aria-labelledby="historias-title"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 md:mb-16 space-y-4">
            <h2
              id="historias-title"
              className="text-3xl md:text-5xl font-bold text-foreground"
            >
              Tu futuro como empresario inmobiliario
            </h2>
            <Separator className="max-w-24 mx-auto" />
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Estamos construyendo una nueva forma de hacer negocios inmobiliarios. Únete a los primeros
              agentes que tomarán el control de su carrera y construirán su propia marca. Sé parte de
              esta transformación desde el inicio.
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <Card
                  key={index}
                  className="h-full hover:shadow-lg transition-shadow"
                  role="article"
                  aria-labelledby={`benefit-${index}-title`}
                >
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div
                        className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center"
                        aria-hidden="true"
                      >
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <div className="space-y-2">
                        <CardTitle id={`benefit-${index}-title`} className="text-xl">
                          {benefit.title}
                        </CardTitle>
                        <p className="text-base text-muted-foreground leading-relaxed">
                          {benefit.description}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              );
            })}
          </div>

          {/* Call to action */}
          <div className="mt-12 text-center">
            <Card className="max-w-2xl mx-auto bg-primary/5 border-primary/20">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold text-foreground mb-4">
                  Sé parte de los primeros
                </h3>
                <p className="text-base text-muted-foreground leading-relaxed mb-6">
                  Estamos en fase de lanzamiento y buscamos agentes visionarios que quieran
                  ser pioneros en esta nueva forma de hacer negocios inmobiliarios. Si eres
                  ambicioso, independiente y quieres construir algo propio, esta es tu oportunidad.
                </p>
                <p className="text-sm font-medium text-primary">
                  Únete ahora y forma parte de la primera generación de agentes independientes.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}


