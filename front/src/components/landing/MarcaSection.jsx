import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Palette, Eye, FileText } from 'lucide-react';

export default function MarcaSection() {
  const features = [
    {
      icon: Palette,
      title: 'Naming & Logo',
      description:
        'Desarrollamos el nombre y logotipo que mejor represente tu visión y valores profesionales.',
    },
    {
      icon: Eye,
      title: 'Guía visual',
      description:
        'Creamos una guía de estilo completa con colores, tipografías y elementos gráficos únicos.',
    },
    {
      icon: FileText,
      title: 'Kit de plantillas',
      description:
        'Te entregamos plantillas listas para usar en presentaciones, tarjetas y materiales de marketing.',
    },
  ];

  return (
    <section
      id="marca"
      className="py-20 md:py-32 bg-muted/30"
      aria-labelledby="marca-title"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 md:mb-16 space-y-4">
            <h2
              id="marca-title"
              className="text-3xl md:text-5xl font-bold text-foreground"
            >
              Crea una marca que destaque
            </h2>
            <Separator className="max-w-24 mx-auto" />
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Trabajaremos contigo para que tu marca refleje tu estilo y tu
              propuesta de valor, diferenciándote de la competencia. Nos ocupamos del
              diseño, la identidad y todos los elementos visuales que necesitas para dejar
              huella y construir una marca inmobiliaria única y profesional.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={index}
                  className="hover:shadow-lg transition-shadow"
                  role="article"
                  aria-labelledby={`feature-${index}-title`}
                >
                  <CardHeader className="text-center space-y-4">
                    <div
                      className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center"
                      aria-hidden="true"
                    >
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle id={`feature-${index}-title`} className="text-xl">
                      {feature.title}
                    </CardTitle>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}


