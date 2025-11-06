function Home() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center py-8 px-4">
      <div className="max-w-2xl w-full space-y-6">
        {/* Card principal con variables CSS personalizadas */}
        <div className="bg-card border border-border rounded-lg shadow-lg p-8">
          <h1 className="text-4xl font-bold text-foreground mb-4 text-center">
            ✅ Tailwind CSS está funcionando!
          </h1>
          <p className="text-muted-foreground mb-6 text-center">
            Si ves este diseño con colores y estilos, Tailwind está configurado correctamente.
          </p>
          
          {/* Botones de prueba */}
          <div className="flex gap-4 justify-center mb-6">
            <button className="bg-primary text-primary-foreground px-6 py-2 rounded-md hover:opacity-90 transition">
              Botón Primary
            </button>
            <button className="bg-secondary text-secondary-foreground px-6 py-2 rounded-md hover:opacity-90 transition">
              Botón Secondary
            </button>
          </div>

          {/* Grid de colores */}
          <div className="grid grid-cols-3 gap-4 mt-8">
            <div className="bg-primary text-primary-foreground p-4 rounded text-center text-sm">
              Primary
            </div>
            <div className="bg-secondary text-secondary-foreground p-4 rounded text-center text-sm">
              Secondary
            </div>
            <div className="bg-accent text-accent-foreground p-4 rounded text-center text-sm">
              Accent
            </div>
            <div className="bg-muted text-muted-foreground p-4 rounded text-center text-sm">
              Muted
            </div>
            <div className="bg-destructive text-destructive-foreground p-4 rounded text-center text-sm">
              Destructive
            </div>
            <div className="bg-card border border-border p-4 rounded text-center text-sm">
              Card
            </div>
          </div>

          {/* Información adicional */}
          <div className="mt-8 p-4 bg-muted rounded-md">
            <p className="text-sm text-muted-foreground text-center">
              Edit <code className="bg-background px-2 py-1 rounded text-xs border border-border">src/pages/Home.jsx</code> and save to test HMR
            </p>
          </div>
        </div>

        {/* Indicador de modo oscuro */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            💡 Prueba agregar la clase <code className="bg-muted px-2 py-1 rounded text-xs">dark</code> al elemento raíz para ver el modo oscuro
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;
