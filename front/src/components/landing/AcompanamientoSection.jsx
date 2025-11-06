import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { CheckCircle2 } from 'lucide-react';

export default function AcompanamientoSection() {
  const milestones = [
    'Elección de nombre y logotipo',
    'Configuración de sistemas',
    'Tramitación de licencias',
    'Capacitación en herramientas',
    'Lanzamiento de sitio web',
    'Primera campaña de marketing',
  ];

  return (
    <section
      id="onboarding"
      className="py-20 md:py-32 bg-background"
      aria-labelledby="onboarding-title"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 md:mb-16 space-y-4">
            <h2
              id="onboarding-title"
              className="text-3xl md:text-5xl font-bold text-foreground"
            >
              Acompañamiento de principio a fin
            </h2>
            <Separator className="max-w-24 mx-auto" />
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Tendrás un gestor de lanzamiento dedicado que te guiará en cada paso, desde
              elegir tu logotipo hasta poner en marcha nuestros sistemas. Su misión es que
              te sientas acompañado y seguro mientras das el salto a la independencia.
            </p>
          </div>

          {/* Card with manager and checklist */}
          <Card className="max-w-3xl mx-auto">
            <CardHeader className="text-center border-b">
              <div className="flex flex-col items-center gap-4 mb-4">
                <Avatar className="w-20 h-20">
                  <AvatarImage src="/placeholder-manager.jpg" alt="Gestor de lanzamiento" />
                  <AvatarFallback className="text-2xl bg-primary/10 text-primary">
                    GL
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-2xl mb-2">Tu gestor dedicado</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Experto en lanzamiento de agencias inmobiliarias
                  </p>
                </div>
              </div>
            </CardHeader>

            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold text-foreground mb-6 text-center">
                Hitos del proceso de lanzamiento
              </h3>
              <ul className="space-y-4" role="list">
                {milestones.map((milestone, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 group"
                    role="listitem"
                  >
                    <CheckCircle2
                      className="w-5 h-5 text-primary flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform"
                      aria-label="Completado"
                    />
                    <span className="text-base text-foreground">{milestone}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 p-4 bg-muted/50 rounded-lg text-center">
                <p className="text-sm text-muted-foreground">
                  Tu gestor estará disponible por teléfono, email y videollamada durante
                  todo el proceso de lanzamiento.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}


