export default function Navbar() {
  return (
    <nav className="bg-primary-dark text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo y links izquierda */}
          <div className="flex items-center">
            <a href="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-primary-light">
                EntreLibros
              </span>
            </a>
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              <a
                href="/libros"
                className="text-primary-light hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Catálogo
              </a>
              <a
                href="/ebooks"
                className="text-primary-light hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                eBooks
              </a>
              <a
                href="/contacto"
                className="text-primary-light hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Contacto
              </a>
            </div>
          </div>

          {/* Iconos derecha */}
          <div className="flex items-center">
            <a
              href="/buscar"
              className="p-2 rounded-full text-primary-light hover:text-white hover:bg-primary transition-colors"
              aria-label="Buscar"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </a>
            <a
              href="/carrito"
              className="ml-2 p-2 rounded-full text-primary-light hover:text-white hover:bg-primary transition-colors"
              aria-label="Carrito"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </a>
            <a
              href="/cuenta"
              className="ml-2 p-2 rounded-full text-primary-light hover:text-white hover:bg-primary transition-colors"
              aria-label="Mi cuenta"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Menú móvil (opcional) */}
      <div className="md:hidden">
        <div className="pt-2 pb-3 space-y-1">
          <a
            href="/libros"
            className="block text-primary-light hover:text-white hover:bg-primary px-3 py-2 rounded-md text-base font-medium transition-colors"
          >
            Catálogo
          </a>
          <a
            href="/ebooks"
            className="block text-primary-light hover:text-white hover:bg-primary px-3 py-2 rounded-md text-base font-medium transition-colors"
          >
            eBooks
          </a>
          <a
            href="/contacto"
            className="block text-primary-light hover:text-white hover:bg-primary px-3 py-2 rounded-md text-base font-medium transition-colors"
          >
            Contacto
          </a>
        </div>
      </div>
    </nav>
  );
}
