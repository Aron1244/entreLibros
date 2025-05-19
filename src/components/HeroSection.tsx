export default function HeroSection() {
  return (
    <div className="relative bg-primary-dark overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 bg-primary-dark sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
                <span className="block">Encuentra tu próxima</span>
                <span className="block text-primary-light">
                  aventura literaria
                </span>
              </h1>
              <p className="mt-3 text-base text-white sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Más de 10,000 títulos disponibles con despacho a domicilio o en
                formato digital.
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start gap-4">
                <div className="rounded-md shadow">
                  <a
                    href="/libros"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-primary-dark bg-primary-light hover:bg-primary hover:text-white md:py-4 md:text-lg md:px-10 transition-colors"
                  >
                    Explorar catálogo
                  </a>
                </div>
                <div className="mt-3 sm:mt-0">
                  <a
                    href="/epub"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary/80 hover:bg-primary md:py-4 md:text-lg md:px-10 transition-colors"
                  >
                    eBooks disponibles
                  </a>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 flex items-center justify-center">
        <img
          className="h-64 w-64 object-contain sm:h-80 md:h-96 lg:w-full lg:h-auto lg:max-h-[80vh]"
          src="/logo.svg"
          alt="Logo de EntreLibros"
        />
      </div>
    </div>
  );
}
