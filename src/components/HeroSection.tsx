export default function HeroSection() {
  return (
    <section className="relative bg-primary-dark overflow-hidden min-h-[90vh] flex items-center">
      {/* Patrón decorativo */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('/images/book-pattern.svg')] bg-repeat bg-[length:300px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Contenido de texto */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
              <span className="block">Descubre tu próxima</span>
              <span className="block text-primary-light mt-3 animate-fadeIn">
                aventura literaria
              </span>
            </h1>

            <p className="mt-6 text-lg text-primary-light sm:text-xl md:mt-8 md:text-2xl max-w-lg mx-auto lg:mx-0">
              Más de 10,000 títulos disponibles con envío express o en formato
              digital al instante.
            </p>

            {/* Botones */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a
                href="/catalog"
                className="px-8 py-4 bg-primary-light text-primary-dark font-bold rounded-lg hover:bg-primary hover:text-white transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg text-lg flex items-center justify-center gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
                Explorar catálogo
              </a>

              <a
                href="/catalog?tipo=ebook"
                className="px-8 py-4 border-2 border-primary-light text-primary-light font-bold rounded-lg hover:bg-secondary-dark hover:text-white transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg text-lg flex items-center justify-center gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                eBooks disponibles
              </a>
            </div>

            {/* Elementos de confianza */}
            <div className="mt-12 flex flex-wrap justify-center lg:justify-start gap-6 items-center">
              <div className="flex items-center gap-2">
                <div className="text-primary-light">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <span className="text-white">Envíos en 24h</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-primary-light">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <span className="text-white">Pago seguro</span>
              </div>
            </div>
          </div>

          {/* Imagen del logo */}
          <div className="relative lg:flex lg:justify-end">
            <div className="relative w-full max-w-xl lg:max-w-none mx-auto">
              <img
                className="w-full h-auto max-h-[70vh] object-contain animate-float"
                src="/logo.svg"
                alt="Logo de EntreLibros"
              />
              {/* Efecto de brillo */}
              <div className="absolute inset-0 bg-primary-light/10 rounded-full blur-2xl animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
