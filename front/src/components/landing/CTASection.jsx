import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';

export default function CTASection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    hasPortfolio: '',
    consent: false,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es obligatorio';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El email es obligatorio';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'El teléfono es obligatorio';
    }

    if (!formData.location.trim()) {
      newErrors.location = 'La ciudad/provincia es obligatoria';
    }

    if (!formData.hasPortfolio) {
      newErrors.hasPortfolio = 'Por favor selecciona una opción';
    }

    if (!formData.consent) {
      newErrors.consent = 'Debes aceptar el consentimiento RGPD';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('Por favor, corrige los errores en el formulario');
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      // Analytics event
      if (window.dataLayer) {
        window.dataLayer.push({
          event: 'form_submit',
          form_name: 'contact_form',
          ...formData,
        });
      }

      toast.success('¡Gracias! Nos pondremos en contacto contigo pronto.');
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        location: '',
        hasPortfolio: '',
        consent: false,
      });
      setErrors({});
      setIsSubmitting(false);
    }, 1500);
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  return (
    <section
      id="cta"
      className="py-20 md:py-32 bg-background"
      aria-labelledby="cta-title"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 space-y-4">
            <h2
              id="cta-title"
              className="text-3xl md:text-5xl font-bold text-foreground"
            >
              Listo para ser dueño de tu negocio
            </h2>
            <Separator className="max-w-24 mx-auto" />
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Si quieres conservar la mayor parte de tus comisiones, tener tu propia marca y
              olvidarte de la parte legal y administrativa, estamos listos para ayudarte.
              Empieza hoy mismo.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Button
              size="lg"
              className="min-w-[220px]"
              onClick={() => {
                document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
              }}
              data-analytics-event="cta-click"
              data-analytics-location="cta-primary"
            >
              Empezar la conversación
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="min-w-[220px]"
              onClick={() => {
                document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
              }}
              data-analytics-event="cta-click"
              data-analytics-location="cta-secondary"
            >
              Solicitar información
            </Button>
          </div>

          {/* Form */}
          <div
            id="contact-form"
            className="bg-card border border-border rounded-xl p-6 md:p-8 shadow-sm scroll-mt-20"
          >
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name">
                  Nombre completo <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                  placeholder="Ej: Juan Pérez"
                />
                {errors.name && (
                  <p id="name-error" className="text-sm text-destructive">
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">
                  Email <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  placeholder="tu@email.com"
                />
                {errors.email && (
                  <p id="email-error" className="text-sm text-destructive">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Phone and Location */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="phone">
                    Teléfono <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    aria-invalid={!!errors.phone}
                    aria-describedby={errors.phone ? 'phone-error' : undefined}
                    placeholder="+34 600 000 000"
                  />
                  {errors.phone && (
                    <p id="phone-error" className="text-sm text-destructive">
                      {errors.phone}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">
                    Ciudad/Provincia <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="location"
                    type="text"
                    value={formData.location}
                    onChange={(e) => handleChange('location', e.target.value)}
                    aria-invalid={!!errors.location}
                    aria-describedby={errors.location ? 'location-error' : undefined}
                    placeholder="Ej: Madrid"
                  />
                  {errors.location && (
                    <p id="location-error" className="text-sm text-destructive">
                      {errors.location}
                    </p>
                  )}
                </div>
              </div>

              {/* Has Portfolio */}
              <div className="space-y-2">
                <Label htmlFor="hasPortfolio">
                  ¿Tienes cartera de clientes o listados activos?{' '}
                  <span className="text-destructive">*</span>
                </Label>
                <select
                  id="hasPortfolio"
                  value={formData.hasPortfolio}
                  onChange={(e) => handleChange('hasPortfolio', e.target.value)}
                  aria-invalid={!!errors.hasPortfolio}
                  aria-describedby={errors.hasPortfolio ? 'portfolio-error' : undefined}
                  className="file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
                >
                  <option value="">Selecciona una opción</option>
                  <option value="si">Sí, tengo cartera y listados</option>
                  <option value="cartera">Sí, solo cartera de clientes</option>
                  <option value="no">No, estoy empezando</option>
                </select>
                {errors.hasPortfolio && (
                  <p id="portfolio-error" className="text-sm text-destructive">
                    {errors.hasPortfolio}
                  </p>
                )}
              </div>

              {/* Consent */}
              <div className="space-y-2">
                <div className="flex items-start gap-3">
                  <Checkbox
                    id="consent"
                    checked={formData.consent}
                    onCheckedChange={(checked) => handleChange('consent', checked)}
                    aria-invalid={!!errors.consent}
                    aria-describedby={errors.consent ? 'consent-error' : undefined}
                  />
                  <Label htmlFor="consent" className="text-sm font-normal leading-relaxed">
                    Acepto el tratamiento de mis datos conforme a la{' '}
                    <a
                      href="/privacidad"
                      className="text-primary hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Política de Privacidad
                    </a>{' '}
                    y consiento recibir comunicaciones comerciales sobre los servicios de
                    Broker XYZ. <span className="text-destructive">*</span>
                  </Label>
                </div>
                {errors.consent && (
                  <p id="consent-error" className="text-sm text-destructive ml-7">
                    {errors.consent}
                  </p>
                )}
              </div>

              {/* Submit */}
              <Button
                type="submit"
                size="lg"
                className="w-full"
                disabled={isSubmitting}
                data-analytics-event="form-submit"
              >
                {isSubmitting ? 'Enviando...' : 'Enviar solicitud'}
              </Button>
            </form>

            {/* Legal notice */}
            <div className="mt-6 pt-6 border-t border-border">
              <p className="text-xs text-muted-foreground text-center leading-relaxed">
                De acuerdo con el RGPD, tus datos serán tratados por Broker XYZ con la
                finalidad de gestionar tu solicitud. Puedes ejercer tus derechos de acceso,
                rectificación y supresión en{' '}
                <a
                  href="mailto:privacidad@brokerxyz.com"
                  className="text-primary hover:underline"
                >
                  privacidad@brokerxyz.com
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


