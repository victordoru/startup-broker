import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { CheckCircle2, AlertCircle } from 'lucide-react';

export default function AcompanamientoSection() {
  const encajaList = [
    'Tienes cartera activa y quieres tu propia marca',
    'Quieres quedarte más de cada operación',
    'No quieres montar estructura legal/administrativa',
    'Buscas procesos, contratos y tecnología estandarizados',
  ];

  const noEncajaList = [
    'Prefieres trabajar bajo la marca de tu oficina',
    'No gestionas todavía captación/cliente final',
    'No te interesa cambiar tu modelo actual',
  ];

  return (
    <section
      id="para-quien"
      className="py-20 md:py-32 bg-muted/30"
      aria-labelledby="para-quien-title"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 md:mb-16 space-y-4">
            <h2
              id="para-quien-title"
              className="text-3xl md:text-5xl font-bold text-foreground"
            >
              ¿Es para ti?
            </h2>
            <Separator className="max-w-24 mx-auto" />
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Este modelo está pensado para agentes con cartera que buscan independencia 
              profesional sin perder respaldo operativo y legal.
            </p>
          </div>

          {/* Two Columns */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Encaja si */}
            <Card className="border-2 border-primary/20 bg-primary/5">
              <CardContent className="pt-8 pb-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6 text-primary" aria-hidden="true" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">Encaja si…</h3>
                </div>
                <ul className="space-y-4" role="list">
                  {encajaList.map((item, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 group"
                      role="listitem"
                    >
                      <CheckCircle2
                        className="w-5 h-5 text-primary flex-shrink-0 mt-0.5"
                        aria-label="Sí"
                      />
                      <span className="text-base text-foreground leading-relaxed">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Right Column - Aún no es para ti si */}
            <Card className="border-2 border-muted-foreground/20 bg-muted">
              <CardContent className="pt-8 pb-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-muted-foreground/10 flex items-center justify-center">
                    <AlertCircle className="w-6 h-6 text-muted-foreground" aria-hidden="true" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">Aún no es para ti si…</h3>
                </div>
                <ul className="space-y-4" role="list">
                  {noEncajaList.map((item, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 group"
                      role="listitem"
                    >
                      <AlertCircle
                        className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5"
                        aria-label="Precaución"
                      />
                      <span className="text-base text-foreground leading-relaxed">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Bottom note */}
          <div className="text-center mt-12">
            <p className="text-base text-muted-foreground max-w-2xl mx-auto">
              ¿Tienes dudas sobre si este modelo se adapta a ti? Hablemos y encontremos 
              la mejor opción para tu situación.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}


