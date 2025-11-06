import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Star } from 'lucide-react';

export default function HistoriasSection() {
  const testimonials = [
    {
      name: 'María González',
      role: 'Fundadora de González Properties',
      image: '/placeholder-maria.jpg',
      initials: 'MG',
      quote:
        'Desde que lancé mi propia agencia con el apoyo de Broker XYZ, mi volumen de ventas se ha triplicado. Ya no entrego el 50% de mis comisiones a una franquicia, y tengo total control sobre mi marca.',
      results: '3x volumen de ventas en 12 meses',
      rating: 5,
    },
    {
      name: 'Carlos Fernández',
      role: 'Director de Fernández & Asociados',
      image: '/placeholder-carlos.jpg',
      initials: 'CF',
      quote:
        'El proceso fue mucho más sencillo de lo que imaginaba. El equipo de operaciones gestionó toda la burocracia y pude empezar a operar con mi nueva marca en menos de 30 días.',
      results: '€2M+ en transacciones en el primer año',
      rating: 5,
    },
    {
      name: 'Laura Martínez',
      role: 'CEO de Martínez Homes',
      image: '/placeholder-laura.jpg',
      initials: 'LM',
      quote:
        'No solo conservo más comisiones, también he podido construir un equipo propio de 8 agentes. La plataforma de marketing y el sitio web que me proporcionaron han sido clave para atraer tanto clientes como talento.',
      results: 'Equipo de 8 agentes en 18 meses',
      rating: 5,
    },
    {
      name: 'Javier López',
      role: 'Propietario de López Real Estate',
      image: '/placeholder-javier.jpg',
      initials: 'JL',
      quote:
        'Tener mi propia marca me ha dado credibilidad en el mercado local. Los clientes me ven como un empresario serio, no solo como un agente más. El ROI ha superado todas mis expectativas.',
      results: '+150% en ingresos netos',
      rating: 5,
    },
    {
      name: 'Ana Ruiz',
      role: 'Fundadora de Ruiz Properties Group',
      image: '/placeholder-ana.jpg',
      initials: 'AR',
      quote:
        'El acompañamiento fue excepcional. Mi gestor de lanzamiento me ayudó con cada detalle, desde el logo hasta la primera campaña de Facebook Ads. Ahora puedo concentrarme 100% en vender.',
      results: '€3.5M+ en ventas anuales',
      rating: 5,
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
              Historias de éxito
            </h2>
            <Separator className="max-w-24 mx-auto" />
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Conoce a otros agentes que, gracias a nuestro modelo, han tomado el control de
              su negocio y han multiplicado su volumen de ventas. Inspírate con sus casos
              reales y descubre cómo una plataforma de apoyo puede transformar tu carrera.
            </p>
          </div>

          {/* Carousel */}
          <div className="relative px-12">
            <Carousel
              opts={{
                align: 'start',
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent>
                {testimonials.map((testimonial, index) => (
                  <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                    <Card
                      className="h-full"
                      role="article"
                      aria-labelledby={`testimonial-${index}-name`}
                    >
                      <CardContent className="p-6 flex flex-col h-full">
                        {/* Rating */}
                        <div className="flex gap-1 mb-4" aria-label={`${testimonial.rating} de 5 estrellas`}>
                          {Array.from({ length: testimonial.rating }).map((_, i) => (
                            <Star
                              key={i}
                              className="w-4 h-4 fill-primary text-primary"
                              aria-hidden="true"
                            />
                          ))}
                        </div>

                        {/* Quote */}
                        <blockquote className="text-sm text-muted-foreground mb-6 flex-1 leading-relaxed">
                          "{testimonial.quote}"
                        </blockquote>

                        {/* Results badge */}
                        <div className="mb-4 p-3 bg-primary/5 rounded-lg border border-primary/10">
                          <p className="text-xs font-semibold text-primary text-center">
                            {testimonial.results}
                          </p>
                        </div>

                        {/* Author */}
                        <div className="flex items-center gap-3">
                          <Avatar className="w-12 h-12">
                            <AvatarImage
                              src={testimonial.image}
                              alt={`Foto de ${testimonial.name}`}
                            />
                            <AvatarFallback className="bg-primary/10 text-primary">
                              {testimonial.initials}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p
                              id={`testimonial-${index}-name`}
                              className="font-semibold text-foreground text-sm"
                            >
                              {testimonial.name}
                            </p>
                            <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-0" />
              <CarouselNext className="right-0" />
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  );
}


