import { useState } from "react";

import { SearchButton } from "./SearchButton.tsx";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-primary-dark backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo y menú principal */}
          <div className="flex items-center">
            {/* Logo */}
            <a
              href="/"
              className="flex items-center space-x-2 group"
              aria-label="Inicio"
            >
              <span className="text-2xl font-bold text-primary-light group-hover:text-white transition-colors duration-300">
                EntreLibros
              </span>
            </a>

            {/* Menú desktop */}
            <div className="hidden lg:flex lg:space-x-1 ml-12">
              <NavLink href="/libros" icon="book">
                Catálogo
              </NavLink>
              <NavLink href="/ebooks" icon="ebook">
                eBooks
              </NavLink>
              <NavLink href="/novedades" icon="new">
                Novedades
              </NavLink>
              <NavLink href="/contacto" icon="contact">
                Contacto
              </NavLink>
            </div>
          </div>

          {/* Iconos de acción */}
          <div className="flex items-center space-x-4">
            <SearchButton />
            <CartButton />
            <AccountButton />

            {/* Botón móvil */}
            <button
              className="lg:hidden p-2 rounded-md text-primary-light hover:text-white hover:bg-primary/30 transition-all"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Menú"
            >
              {isMenuOpen ? (
                <XIcon className="h-6 w-6" />
              ) : (
                <MenuIcon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Menú móvil */}
      <div
        className={`lg:hidden ${
          isMenuOpen ? "block" : "hidden"
        } transition-all duration-300`}
      >
        <div className="px-2 pt-2 pb-4 space-y-2 bg-primary-dark">
          <MobileNavLink href="/books" icon="book">
            Catálogo
          </MobileNavLink>
          <MobileNavLink href="/ebooks" icon="ebook">
            eBooks
          </MobileNavLink>
          <MobileNavLink href="/news" icon="new">
            Novedades
          </MobileNavLink>
          <MobileNavLink href="/contact" icon="contact">
            Contacto
          </MobileNavLink>
          <MobileNavLink href="/account" icon="account">
            Mi cuenta
          </MobileNavLink>
        </div>
      </div>
    </nav>
  );
}

// Componente de enlace para desktop
type NavLinkIcon = "book" | "ebook" | "new" | "contact";

interface NavLinkProps {
  href: string;
  icon: NavLinkIcon;
  children: React.ReactNode;
}

function NavLink({ href, icon, children }: NavLinkProps) {
  const icons = {
    book: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
      />
    ),
    ebook: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
      />
    ),
    new: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
      />
    ),
    contact: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    ),
  };

  return (
    <a
      href={href}
      className="flex items-center px-4 py-2 text-primary-light hover:text-white hover:bg-primary/20 rounded-lg transition-all duration-300 group"
    >
      <svg
        className="h-5 w-5 mr-2 group-hover:text-white transition-colors"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        {icons[icon]}
      </svg>
      <span className="font-medium">{children}</span>
    </a>
  );
}

// Componente de enlace para móvil
interface MobileNavLinkProps {
  href: string;
  icon?: string;
  children: React.ReactNode;
}

function MobileNavLink({ href, icon, children }: MobileNavLinkProps) {
  return (
    <a
      href={href}
      className="flex items-center px-3 py-3 text-lg text-primary-light hover:text-white hover:bg-primary/30 rounded-md transition-colors"
    >
      {children}
    </a>
  );
}

// Componente de botón de carrito
function CartButton() {
  return (
    <button className="p-2 rounded-full text-primary-light hover:text-white hover:bg-primary/20 transition-all relative">
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
      <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
        3
      </span>
    </button>
  );
}

// Componente de botón de cuenta
function AccountButton() {
  return (
    <button className="hidden md:flex items-center space-x-1 p-2 rounded-full text-primary-light hover:text-white hover:bg-primary/20 transition-all">
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
      <span className="text-sm font-medium hidden lg:inline">Mi cuenta</span>
    </button>
  );
}

// Íconos para el menú móvil
function MenuIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 6h16M4 12h16M4 18h16"
      />
    </svg>
  );
}

function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
}
