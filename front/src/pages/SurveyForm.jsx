import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { ChevronLeft, ChevronRight, Lock } from 'lucide-react';
import { api } from '@/services/api';

const TOTAL_PAGES = 5;

export default function SurveyForm() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    // Sección 1: Perfil
    rolActual: '',
    rolActualOtro: '',
    tipoOrganizacion: '',
    tipoOrganizacionOtro: '',
    ciudad: '',

    // Sección 2: Cómo te va hoy
    satisfaccionComision: '',
    pagaCuotas: null,
    montoCuotas: '',
    frustraciones: [],
    frustracionesOtro: '',

    // Sección 3: Marca propia
    pensadoMarcaPropia: '',
    frenos: [],
    frenosOtro: '',
    disposicionPago: '',
    modeloPago: '',
    interesaSolucion: '',

    // Sección 4: Cierre
    quiereAviso: false,
    nombre: '',
    email: '',
    telefono: '',
    comentariosAdicionales: '',
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user updates field
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleCheckboxChange = (field, value, checked) => {
    setFormData((prev) => {
      const currentValues = prev[field] || [];
      if (checked) {
        return { ...prev, [field]: [...currentValues, value] };
      } else {
        return { ...prev, [field]: currentValues.filter((v) => v !== value) };
      }
    });
  };

  const validatePage = (page) => {
    const newErrors = {};

    switch (page) {
      case 1:
        if (!formData.rolActual) newErrors.rolActual = 'Selecciona tu rol';
        if (formData.rolActual === 'otro' && !formData.rolActualOtro.trim()) {
          newErrors.rolActualOtro = 'Especifica tu rol';
        }
        if (!formData.tipoOrganizacion) newErrors.tipoOrganizacion = 'Selecciona el tipo de organización';
        if (formData.tipoOrganizacion === 'otro' && !formData.tipoOrganizacionOtro.trim()) {
          newErrors.tipoOrganizacionOtro = 'Especifica el tipo de organización';
        }
        break;

      case 2:
        if (!formData.satisfaccionComision) newErrors.satisfaccionComision = 'Selecciona una opción';
        if (formData.pagaCuotas === null) newErrors.pagaCuotas = 'Selecciona una opción';
        // montoCuotas is now optional when pagaCuotas is true
        break;

      case 3:
        if (!formData.pensadoMarcaPropia) newErrors.pensadoMarcaPropia = 'Selecciona una opción';
        if ((formData.pensadoMarcaPropia === 'si' || formData.pensadoMarcaPropia === 'planteando') && 
            formData.frenos.length === 0) {
          newErrors.frenos = 'Selecciona al menos una opción';
        }
        break;

      case 4:
        if (!formData.disposicionPago) newErrors.disposicionPago = 'Selecciona una opción';
        if (!formData.modeloPago) newErrors.modeloPago = 'Selecciona una opción';
        if (!formData.interesaSolucion) newErrors.interesaSolucion = 'Selecciona una opción';
        break;

      case 5:
        if (formData.quiereAviso) {
          if (!formData.nombre.trim()) newErrors.nombre = 'El nombre es obligatorio';
          if (!formData.email.trim()) {
            newErrors.email = 'El email es obligatorio';
          } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Email inválido';
          }
          if (!formData.telefono.trim()) newErrors.telefono = 'El teléfono es obligatorio';
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validatePage(currentPage)) {
      setCurrentPage((prev) => Math.min(prev + 1, TOTAL_PAGES));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      toast.error('Por favor, completa todos los campos requeridos');
    }
  };

  const handleBack = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async () => {
    if (!validatePage(currentPage)) {
      toast.error('Por favor, completa todos los campos requeridos');
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare data for submission
      const submissionData = {
        rolActual: formData.rolActual,
        rolActualOtro: formData.rolActual === 'otro' ? formData.rolActualOtro : '',
        tipoOrganizacion: formData.tipoOrganizacion,
        tipoOrganizacionOtro: formData.tipoOrganizacion === 'otro' ? formData.tipoOrganizacionOtro : '',
        ciudad: formData.ciudad,
        satisfaccionComision: parseInt(formData.satisfaccionComision),
        pagaCuotas: formData.pagaCuotas,
        montoCuotas: formData.montoCuotas || '',
        frustraciones: formData.frustraciones,
        frustracionesOtro: formData.frustraciones.includes('otro') ? formData.frustracionesOtro : '',
        pensadoMarcaPropia: formData.pensadoMarcaPropia,
        frenos: (formData.pensadoMarcaPropia === 'si' || formData.pensadoMarcaPropia === 'planteando') ? formData.frenos : [],
        frenosOtro: formData.frenos.includes('otro') ? formData.frenosOtro : '',
        disposicionPago: formData.disposicionPago,
        modeloPago: formData.modeloPago,
        interesaSolucion: formData.interesaSolucion,
        quiereAviso: formData.quiereAviso,
        nombre: formData.quiereAviso ? formData.nombre : '',
        email: formData.quiereAviso ? formData.email : '',
        telefono: formData.quiereAviso ? formData.telefono : '',
        comentariosAdicionales: formData.comentariosAdicionales,
      };

      await api.submitSurvey(submissionData);
      
      toast.success('¡Gracias por completar la encuesta!');
      
      // Redirect to homepage after a brief delay
      setTimeout(() => {
        navigate('/');
      }, 1500);
    } catch (error) {
      console.error('Error submitting survey:', error);
      toast.error('Error al enviar la encuesta. Por favor, intenta de nuevo.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Progress indicator */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-muted-foreground">
              Página {currentPage} de {TOTAL_PAGES}
            </span>
            <span className="text-sm text-muted-foreground">
              {Math.round((currentPage / TOTAL_PAGES) * 100)}% completado
            </span>
          </div>
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${(currentPage / TOTAL_PAGES) * 100}%` }}
            />
          </div>
        </div>

        <Card className="p-6 md:p-8 shadow-lg">
          {/* Page 1: Intro + Perfil */}
          {currentPage === 1 && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold text-foreground">
                  Encuesta para Agentes Inmobiliarios
                </h1>
                <p className="text-base text-muted-foreground">
                Queremos conocer cómo es tu día a día en inmobiliaria y qué tan satisfecho/a estás con tu modelo de trabajo actual.                </p>
                <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg border border-border">
                  <Lock className="size-5 text-primary shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Privacidad garantizada</p>
                    <p className="text-sm text-muted-foreground">
                      Para mantener tu privacidad, no pedimos tus datos personales. Solo si deseas que te contactemos.
                    </p>
                  </div>
                </div>
              </div>

              <Separator className="my-6" />

              <div className="space-y-6">
                <h2 className="text-xl font-semibold">Sección 1 · Perfil</h2>

                {/* Q1: Rol actual */}
                <div className="space-y-3">
                  <Label htmlFor="rolActual" className="text-base">
                    1. Tu rol actual <span className="text-destructive">*</span>
                  </Label>
                  <RadioGroup
                    value={formData.rolActual}
                    onValueChange={(value) => handleChange('rolActual', value)}
                    className="space-y-2"
                  >
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="agente" id="rol-agente" />
                      <Label htmlFor="rol-agente" className="font-normal cursor-pointer">
                        Agente/comercial inmobiliario
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="responsable_equipo" id="rol-responsable" />
                      <Label htmlFor="rol-responsable" className="font-normal cursor-pointer">
                        Responsable de equipo
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="direccion" id="rol-direccion" />
                      <Label htmlFor="rol-direccion" className="font-normal cursor-pointer">
                        Dirección de oficina/empresa
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="otro" id="rol-otro" />
                      <Label htmlFor="rol-otro" className="font-normal cursor-pointer">
                        Otro
                      </Label>
                    </div>
                  </RadioGroup>
                  {formData.rolActual === 'otro' && (
                    <Input
                      placeholder="Especifica tu rol"
                      value={formData.rolActualOtro}
                      onChange={(e) => handleChange('rolActualOtro', e.target.value)}
                      aria-invalid={!!errors.rolActualOtro}
                    />
                  )}
                  {errors.rolActual && (
                    <p className="text-sm text-destructive">{errors.rolActual}</p>
                  )}
                  {errors.rolActualOtro && (
                    <p className="text-sm text-destructive">{errors.rolActualOtro}</p>
                  )}
                </div>

                {/* Q2: Tipo de organización */}
                <div className="space-y-3">
                  <Label htmlFor="tipoOrganizacion" className="text-base">
                    2. Tipo de organización en la que trabajas <span className="text-destructive">*</span>
                  </Label>
                  <RadioGroup
                    value={formData.tipoOrganizacion}
                    onValueChange={(value) => handleChange('tipoOrganizacion', value)}
                    className="space-y-2"
                  >
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="agencia_tradicional" id="org-tradicional" />
                      <Label htmlFor="org-tradicional" className="font-normal cursor-pointer">
                        Agencia inmobiliaria tradicional
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="franquicia" id="org-franquicia" />
                      <Label htmlFor="org-franquicia" className="font-normal cursor-pointer">
                        Franquicia (RE/MAX, KW, C21, etc.)
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="autonomo" id="org-autonomo" />
                      <Label htmlFor="org-autonomo" className="font-normal cursor-pointer">
                        Autónomo / Marca propia
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="promotora" id="org-promotora" />
                      <Label htmlFor="org-promotora" className="font-normal cursor-pointer">
                        Promotora / B2B servicios inmobiliarios
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="otro" id="org-otro" />
                      <Label htmlFor="org-otro" className="font-normal cursor-pointer">
                        Otro
                      </Label>
                    </div>
                  </RadioGroup>
                  {formData.tipoOrganizacion === 'otro' && (
                    <Input
                      placeholder="Especifica el tipo de organización"
                      value={formData.tipoOrganizacionOtro}
                      onChange={(e) => handleChange('tipoOrganizacionOtro', e.target.value)}
                      aria-invalid={!!errors.tipoOrganizacionOtro}
                    />
                  )}
                  {errors.tipoOrganizacion && (
                    <p className="text-sm text-destructive">{errors.tipoOrganizacion}</p>
                  )}
                  {errors.tipoOrganizacionOtro && (
                    <p className="text-sm text-destructive">{errors.tipoOrganizacionOtro}</p>
                  )}
                </div>

                {/* Q3: Ciudad (opcional) */}
                <div className="space-y-3">
                  <Label htmlFor="ciudad" className="text-base">
                    3. Ciudad / zona donde operas <span className="text-muted-foreground text-sm">(opcional)</span>
                  </Label>
                  <Input
                    id="ciudad"
                    placeholder="Ej: Madrid"
                    value={formData.ciudad}
                    onChange={(e) => handleChange('ciudad', e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Page 2: Cómo te va hoy */}
          {currentPage === 2 && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <h2 className="text-2xl font-bold">Sección 2 · Cómo te va hoy</h2>

              {/* Q4: Satisfacción con comisión */}
              <div className="space-y-3">
                <Label className="text-base">
                  4. ¿Estás satisfecho con la comisión que te quedas hoy por operación? <span className="text-destructive">*</span>
                </Label>
                <RadioGroup
                  value={formData.satisfaccionComision}
                  onValueChange={(value) => handleChange('satisfaccionComision', value)}
                  className="space-y-2"
                >
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="1" id="satisfaccion-1" />
                    <Label htmlFor="satisfaccion-1" className="font-normal cursor-pointer">
                      1 - Nada satisfecho
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="2" id="satisfaccion-2" />
                    <Label htmlFor="satisfaccion-2" className="font-normal cursor-pointer">
                      2 - Poco satisfecho
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="3" id="satisfaccion-3" />
                    <Label htmlFor="satisfaccion-3" className="font-normal cursor-pointer">
                      3 - Neutral
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="4" id="satisfaccion-4" />
                    <Label htmlFor="satisfaccion-4" className="font-normal cursor-pointer">
                      4 - Satisfecho
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="5" id="satisfaccion-5" />
                    <Label htmlFor="satisfaccion-5" className="font-normal cursor-pointer">
                      5 - Muy satisfecho
                    </Label>
                  </div>
                </RadioGroup>
                {errors.satisfaccionComision && (
                  <p className="text-sm text-destructive">{errors.satisfaccionComision}</p>
                )}
              </div>

              {/* Q5: Pagas cuotas */}
              <div className="space-y-3">
                <Label className="text-base">
                  5. ¿Pagas cuotas fijas mensuales o royalties por operar? <span className="text-destructive">*</span>
                </Label>
                <RadioGroup
                  value={formData.pagaCuotas === true ? 'si' : formData.pagaCuotas === false ? 'no' : ''}
                  onValueChange={(value) => handleChange('pagaCuotas', value === 'si')}
                  className="space-y-2"
                >
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="si" id="cuotas-si" />
                    <Label htmlFor="cuotas-si" className="font-normal cursor-pointer">
                      Sí
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="no" id="cuotas-no" />
                    <Label htmlFor="cuotas-no" className="font-normal cursor-pointer">
                      No
                    </Label>
                  </div>
                </RadioGroup>
                {errors.pagaCuotas && (
                  <p className="text-sm text-destructive">{errors.pagaCuotas}</p>
                )}
              </div>

              {/* Q5b: Monto cuotas (conditional) */}
              {formData.pagaCuotas && (
                <div className="space-y-3">
                  <Label htmlFor="montoCuotas" className="text-base">
                    ¿Cuánto aproximadamente al mes? <span className="text-muted-foreground text-sm">(opcional)</span>
                  </Label>
                  <Input
                    id="montoCuotas"
                    placeholder="Ej: 500€"
                    value={formData.montoCuotas}
                    onChange={(e) => handleChange('montoCuotas', e.target.value)}
                  />
                </div>
              )}

              {/* Q6: Frustraciones */}
              <div className="space-y-3">
                <Label className="text-base">
                  6. ¿Qué te frustra más de tu modelo actual? <span className="text-muted-foreground text-sm">(puedes seleccionar varias)</span>
                </Label>
                <div className="space-y-2">
                  {[
                    { value: 'comisiones_bajas', label: 'Comisiones bajas para mí' },
                    { value: 'sin_marca', label: 'No tener marca propia / depender de la marca de la empresa' },
                    { value: 'papeleo', label: 'Papeleo y procesos legales/administrativos' },
                    { value: 'tecnologia', label: 'Tecnología insuficiente (CRM, contratos, firma, publicación en portales)' },
                    { value: 'apoyo', label: 'Falta de apoyo/acompañamiento' },
                    { value: 'leads', label: 'Dificultad para generar leads' },
                    { value: 'otro', label: 'Otro' },
                  ].map((option) => (
                    <div key={option.value} className="flex items-start space-x-3">
                      <Checkbox
                        id={`frustracion-${option.value}`}
                        checked={formData.frustraciones.includes(option.value)}
                        onCheckedChange={(checked) =>
                          handleCheckboxChange('frustraciones', option.value, checked)
                        }
                      />
                      <Label
                        htmlFor={`frustracion-${option.value}`}
                        className="font-normal cursor-pointer leading-tight"
                      >
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </div>
                {formData.frustraciones.includes('otro') && (
                  <Input
                    placeholder="Especifica"
                    value={formData.frustracionesOtro}
                    onChange={(e) => handleChange('frustracionesOtro', e.target.value)}
                    className="mt-2"
                  />
                )}
              </div>
            </div>
          )}

          {/* Page 3: Marca propia parte 1 */}
          {currentPage === 3 && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <h2 className="text-2xl font-bold">Sección 3 · Marca propia (100% de tus comisiones)</h2>

              {/* Q7: Pensado en marca propia */}
              <div className="space-y-3">
                <Label className="text-base">
                  7. ¿Alguna vez has pensado en operar con tu propia marca y quedarte el 100% de tus comisiones? <span className="text-destructive">*</span>
                </Label>
                <RadioGroup
                  value={formData.pensadoMarcaPropia}
                  onValueChange={(value) => handleChange('pensadoMarcaPropia', value)}
                  className="space-y-2"
                >
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="si" id="marca-si" />
                    <Label htmlFor="marca-si" className="font-normal cursor-pointer">
                      Sí
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="planteando" id="marca-planteando" />
                    <Label htmlFor="marca-planteando" className="font-normal cursor-pointer">
                      Me lo estoy planteando
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="no" id="marca-no" />
                    <Label htmlFor="marca-no" className="font-normal cursor-pointer">
                      No
                    </Label>
                  </div>
                </RadioGroup>
                {errors.pensadoMarcaPropia && (
                  <p className="text-sm text-destructive">{errors.pensadoMarcaPropia}</p>
                )}
              </div>

              {/* Q8: Frenos (conditional) */}
              {(formData.pensadoMarcaPropia === 'si' || formData.pensadoMarcaPropia === 'planteando') && (
                <div className="space-y-3">
                  <Label className="text-base">
                    8. ¿Qué te frena? <span className="text-destructive">*</span> <span className="text-muted-foreground text-sm">(puedes seleccionar varias)</span>
                  </Label>
                  <div className="space-y-2">
                    {[
                      { value: 'legal', label: 'Constitución legal / licencias / seguros' },
                      { value: 'costes', label: 'Costes iniciales' },
                      { value: 'imagen', label: 'Imagen de marca (nombre, logo, web)' },
                      { value: 'tecnologia', label: 'Tecnología operativa (CRM, contratos, firma, publicación)' },
                      { value: 'cumplimiento', label: 'Cumplimiento legal / revisiones documentales' },
                      { value: 'admin', label: 'Administración/contabilidad' },
                      { value: 'leads', label: 'Dificultad para captar leads de forma constante' },
                      { value: 'otro', label: 'Otro' },
                    ].map((option) => (
                      <div key={option.value} className="flex items-start space-x-3">
                        <Checkbox
                          id={`freno-${option.value}`}
                          checked={formData.frenos.includes(option.value)}
                          onCheckedChange={(checked) =>
                            handleCheckboxChange('frenos', option.value, checked)
                          }
                        />
                        <Label
                          htmlFor={`freno-${option.value}`}
                          className="font-normal cursor-pointer leading-tight"
                        >
                          {option.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                  {formData.frenos.includes('otro') && (
                    <Input
                      placeholder="Especifica"
                      value={formData.frenosOtro}
                      onChange={(e) => handleChange('frenosOtro', e.target.value)}
                      className="mt-2"
                    />
                  )}
                  {errors.frenos && (
                    <p className="text-sm text-destructive">{errors.frenos}</p>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Page 4: Marca propia parte 2 */}
          {currentPage === 4 && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <h2 className="text-2xl font-bold">Sección 3 · Marca propia (continuación)</h2>

              {/* Q9: Disposición a pagar */}
              <div className="space-y-3">
                <Label className="text-base">
                  9. Imagina que un equipo se ocupa de todo (legal, marca, tecnología, administración). ¿Qué parte de tu comisión estarías dispuesto a pagar por ese servicio? <span className="text-destructive">*</span>
                </Label>
                <RadioGroup
                  value={formData.disposicionPago}
                  onValueChange={(value) => handleChange('disposicionPago', value)}
                  className="space-y-2"
                >
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="5" id="pago-5" />
                    <Label htmlFor="pago-5" className="font-normal cursor-pointer">5%</Label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="10" id="pago-10" />
                    <Label htmlFor="pago-10" className="font-normal cursor-pointer">10%</Label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="15" id="pago-15" />
                    <Label htmlFor="pago-15" className="font-normal cursor-pointer">15%</Label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="20" id="pago-20" />
                    <Label htmlFor="pago-20" className="font-normal cursor-pointer">20%</Label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="25" id="pago-25" />
                    <Label htmlFor="pago-25" className="font-normal cursor-pointer">25%</Label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="cuota_fija" id="pago-cuota" />
                    <Label htmlFor="pago-cuota" className="font-normal cursor-pointer">
                      Preferiría cuota fija (sin % por operación)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="nada" id="pago-nada" />
                    <Label htmlFor="pago-nada" className="font-normal cursor-pointer">No pagaría nada</Label>
                  </div>
                </RadioGroup>
                {errors.disposicionPago && (
                  <p className="text-sm text-destructive">{errors.disposicionPago}</p>
                )}
              </div>

              {/* Q10: Modelo de pago */}
              <div className="space-y-3">
                <Label className="text-base">
                  10. ¿Qué modelo de pago te encajaría mejor? <span className="text-destructive">*</span>
                </Label>
                <RadioGroup
                  value={formData.modeloPago}
                  onValueChange={(value) => handleChange('modeloPago', value)}
                  className="space-y-2"
                >
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="porcentaje" id="modelo-porcentaje" />
                    <Label htmlFor="modelo-porcentaje" className="font-normal cursor-pointer">
                      Solo % por operación
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="porcentaje_cap" id="modelo-cap" />
                    <Label htmlFor="modelo-cap" className="font-normal cursor-pointer">
                      % por operación con "tope anual (cap)" a partir del cual te quedas el 100%
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="cuota_fija" id="modelo-cuota" />
                    <Label htmlFor="modelo-cuota" className="font-normal cursor-pointer">
                      Cuota fija mensual (sin % por operación)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="pago_unico" id="modelo-unico" />
                    <Label htmlFor="modelo-unico" className="font-normal cursor-pointer">
                      Pago único de puesta en marcha (branding/onboarding) + % reducido
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="no_se" id="modelo-no-se" />
                    <Label htmlFor="modelo-no-se" className="font-normal cursor-pointer">
                      No lo sé / Depende
                    </Label>
                  </div>
                </RadioGroup>
                {errors.modeloPago && (
                  <p className="text-sm text-destructive">{errors.modeloPago}</p>
                )}
              </div>

              {/* Q11: ¿Te interesaría probar esta solución? */}
              <div className="space-y-3">
                <Label className="text-base">
                  11. ¿Te plantearías probar una opción así? <span className="text-destructive">*</span>
                </Label>
                <RadioGroup
                  value={formData.interesaSolucion}
                  onValueChange={(value) => handleChange('interesaSolucion', value)}
                  className="space-y-2"
                >
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="si" id="interesa-si" />
                    <Label htmlFor="interesa-si" className="font-normal cursor-pointer">
                      Sí
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="no" id="interesa-no" />
                    <Label htmlFor="interesa-no" className="font-normal cursor-pointer">
                      No
                    </Label>
                  </div>
                </RadioGroup>
                {errors.interesaSolucion && (
                  <p className="text-sm text-destructive">{errors.interesaSolucion}</p>
                )}
              </div>
            </div>
          )}

          {/* Page 5: Cierre */}
          {currentPage === 5 && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <h2 className="text-2xl font-bold">Sección 4 · Cierre</h2>

              {/* Q12: Quiere aviso */}
              <div className="space-y-3">
                <Label className="text-base">
                  12. ¿Quieres que te avisemos si abrimos un piloto en tu zona? <span className="text-destructive">*</span>
                </Label>
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="quiere-aviso"
                    checked={formData.quiereAviso}
                    onCheckedChange={(checked) => handleChange('quiereAviso', checked)}
                  />
                  <Label htmlFor="quiere-aviso" className="font-normal cursor-pointer">
                    Sí, quiero que me contacten
                  </Label>
                </div>
              </div>

              {/* Conditional: Datos de contacto */}
              {formData.quiereAviso && (
                <div className="space-y-4 pl-7">
                  <div className="space-y-2">
                    <Label htmlFor="nombre">
                      Nombre <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="nombre"
                      placeholder="Tu nombre completo"
                      value={formData.nombre}
                      onChange={(e) => handleChange('nombre', e.target.value)}
                      aria-invalid={!!errors.nombre}
                    />
                    {errors.nombre && (
                      <p className="text-sm text-destructive">{errors.nombre}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">
                      Email <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="tu@email.com"
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      aria-invalid={!!errors.email}
                    />
                    {errors.email && (
                      <p className="text-sm text-destructive">{errors.email}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="telefono">
                      Teléfono <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="telefono"
                      type="tel"
                      placeholder="+34 600 000 000"
                      value={formData.telefono}
                      onChange={(e) => handleChange('telefono', e.target.value)}
                      aria-invalid={!!errors.telefono}
                    />
                    {errors.telefono && (
                      <p className="text-sm text-destructive">{errors.telefono}</p>
                    )}
                  </div>
                </div>
              )}

              {/* Q13: Comentarios adicionales */}
              <div className="space-y-3">
                <Label htmlFor="comentarios" className="text-base">
                  13. ¿Quieres comentar algo más? <span className="text-muted-foreground text-sm">(opcional)</span>
                </Label>
                <p className="text-sm text-muted-foreground">
                  Por ejemplo: alguna carencia que tengas actualmente, algo que te gustaría tener en tu operativa, o cualquier otro comentario que consideres relevante.
                </p>
                <Textarea
                  id="comentarios"
                  placeholder="Ej: Me falta apoyo en marketing digital, necesito mejor CRM, etc."
                  value={formData.comentariosAdicionales}
                  onChange={(e) => handleChange('comentariosAdicionales', e.target.value)}
                  rows={4}
                />
              </div>
            </div>
          )}

          {/* Navigation buttons */}
          <div className="flex justify-between items-center mt-8 pt-6 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={handleBack}
              disabled={currentPage === 1}
              className="gap-2"
            >
              <ChevronLeft className="size-4" />
              Atrás
            </Button>

            {currentPage < TOTAL_PAGES ? (
              <Button type="button" onClick={handleNext} className="gap-2">
                Continuar
                <ChevronRight className="size-4" />
              </Button>
            ) : (
              <Button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="gap-2"
              >
                {isSubmitting ? 'Enviando...' : 'Enviar encuesta'}
              </Button>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}

