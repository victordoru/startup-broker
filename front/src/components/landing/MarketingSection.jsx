import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Separator } from '@/components/ui/separator';
import { Globe, Target, Megaphone, Building2 } from 'lucide-react';

export default function MarketingSection() {
  const services = [
    {
      icon: Globe,
      title: 'Sitio web',
      description: 'Sitio web profesional totalmente responsive y optimizado para conversión.',
    },
    {
      icon: Target,
      title: 'Campañas digitales',
      description: 'Estrategias de publicidad online en redes sociales y buscadores.',
    },
    {
      icon: Megaphone,
      title: 'Contenido de marca',
      description: 'Creación de contenido atractivo para redes sociales y blog.',
    },
    {
      icon: Building2,
      title: 'Portales inmobiliarios',
      description: 'Presencia destacada en los principales portales del sector.',
    },
  ];

  return (
    <section
      id="marketing"
      className="py-20 md:py-32 bg-muted/30"
      aria-labelledby="marketing-title"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 md:mb-16 space-y-4">
            <h2
              id="marketing-title"
              className="text-3xl md:text-5xl font-bold text-foreground"
            >
              Haz que tu nombre llegue más lejos
            </h2>
            <Separator className="max-w-24 mx-auto" />
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Potencia el perfil de tu empresa con material de marketing impactante y un
              sitio web totalmente responsive. Te ayudamos a atraer a clientes compradores y
              vendedores con campañas digitales, contenido de marca y presencia en los
              portales inmobiliarios más relevantes.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Card
                  key={index}
                  className="hover:shadow-lg transition-shadow"
                  role="article"
                  aria-labelledby={`service-${index}-title`}
                >
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div
                        className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center"
                        aria-hidden="true"
                      >
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <div className="space-y-2">
                        <CardTitle id={`service-${index}-title`} className="text-lg">
                          {service.title}
                        </CardTitle>
                        <CardDescription>{service.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              );
            })}
          </div>

          {/* Showcase */}
          <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-foreground mb-4 text-center">
              Vista previa de sitio web responsive
            </h3>
            <AspectRatio ratio={16 / 9}>
              <div
                className="w-full h-full bg-gradient-to-br from-primary/10 via-background to-secondary/10 rounded-lg flex items-center justify-center border border-border"
                role="img"
                aria-label="Mockup de sitio web responsive"
              >
                <div className="text-center space-y-2">
                  <Globe className="w-16 h-16 mx-auto text-primary/50" aria-hidden="true" />
                  <p className="text-sm text-muted-foreground">
                    Mockup de sitio web profesional
                  </p>
                </div>
              </div>
            </AspectRatio>
          </div>
        </div>
      </div>
    </section>
  );
}


