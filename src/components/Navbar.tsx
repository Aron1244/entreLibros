import { useState, useEffect } from "react";
import { SearchButton } from "./SearchButton";

interface NavLinkProps {
  href: string;
  label: string;
  scrolled: boolean;
}

interface MobileNavLinkProps {
  href: string;
  label: string;
  onClick: () => void;
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setScrolled(currentScrollY > 50);

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setCollapsed(true); // Scroll hacia abajo
      } else if (currentScrollY < lastScrollY) {
        setCollapsed(false); // Scroll hacia arriba
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const showNavbar = () => {
    setCollapsed(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Botón flotante cuando el navbar está colapsado */}
      {collapsed && (
        <button
          onClick={showNavbar}
          aria-label="Mostrar menú"
          className="fixed bottom-6 right-6 z-[9999] bg-primary text-white px-4 py-2 rounded-full shadow-lg hover:bg-primary-dark transition-all duration-300"
        >
          <svg
            className="w-6 h-6 text-white transition-transform duration-300"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 15l7-7 7 7"
            />
          </svg>
        </button>
      )}

      <nav
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrolled ? "bg-primary shadow-md py-2" : "bg-transparent py-4"
        } ${collapsed ? "-translate-y-full" : "translate-y-0"}`}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <a href="/" className="flex items-center">
              <span
                className={`text-2xl font-serif font-bold ${
                  scrolled ? "text-white" : "text-primary-light"
                }`}
              >
                Entre Libros
              </span>
            </a>

            <div className="hidden md:flex items-center flex-1 justify-end text-primary-light gap-4">
              <NavLink href="/" label="Inicio" scrolled={scrolled} />
              <NavLink href="/catalog" label="Catálogo" scrolled={scrolled} />
              <NavLink href="/news" label="Novedades" scrolled={scrolled} />
              <NavLink href="/contact" label="Contacto" scrolled={scrolled} />
              <div className="flex-1 max-w-xl min-w-0 mr-4">
                <SearchButton />
              </div>
              <a href="/cart" aria-label="Carro de compras" className="ml-2">
                {/* Ícono de carrito */}
                <svg
                  className="w-8 h-8 text-primary-light rounded-3xl border border-primary-light p-1 transition-colors duration-200 hover:bg-white hover:text-primary-light hover:border-primary"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 4a1 1 0 0 1 1-1h1.5a1 1 0 0 1 .979.796L7.939 6H19a1 1 0 0 1 .979 1.204l-1.25 6a1 1 0 0 1-.979.796H9.605l.208 1H17a3 3 0 1 1-2.83 2h-2.34a3 3 0 1 1-4.009-1.76L5.686 5H5a1 1 0 0 1-1-1Z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a
                href="/profile"
                aria-label="Perfil"
                className="ml-2 flex items-center gap-1"
              >
                {/* Ícono de perfil */}
                <svg
                  className="w-7 h-7 text-primary-light hover:text-primary-light rounded-3xl border border-primary-light transition-colors duration-200 hover:bg-white hover:text-primary hover:border-primary"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 20a7.966 7.966 0 0 1-5.002-1.756v-.683c0-1.794 1.492-3.25 3.333-3.25h3.334c1.84 0 3.333 1.456 3.333 3.25v.683A7.966 7.966 0 0 1 12 20ZM2 12C2 6.477 6.477 2 12 2s10 4.477 10 10c0 5.5-4.44 9.963-9.932 10h-.138C6.438 21.962 2 17.5 2 12Zm10-5c-1.84 0-3.333 1.455-3.333 3.25S10.159 13.5 12 13.5c1.84 0 3.333-1.455 3.333-3.25S13.841 7 12 7Z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-xs">Perfil</span>
              </a>
            </div>

            <button
              className="md:hidden focus:outline-none"
              onClick={toggleMenu}
              aria-label="Toggle Menu"
            >
              <svg
                className={`w-6 h-6 ${
                  scrolled ? "text-book-primary" : "text-book-dark"
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          <div
            className={`
              md:hidden 
              overflow-hidden 
              transition-all 
              duration-300 
              ease-in-out
              ${isOpen ? "max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0"}
            `}
          >
            <div className="flex flex-col space-y-3 py-4 bg-primary-light rounded-lg shadow-lg px-4 animate-fade-in">
              <SearchButton />
              <MobileNavLink
                href="/"
                label="Inicio"
                onClick={() => setIsOpen(false)}
              />
              <MobileNavLink
                href="/catalog"
                label="Catálogo"
                onClick={() => setIsOpen(false)}
              />
              <MobileNavLink
                href="/news"
                label="Novedades"
                onClick={() => setIsOpen(false)}
              />
              <MobileNavLink
                href="/contact"
                label="Contacto"
                onClick={() => setIsOpen(false)}
              />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

const NavLink: React.FC<NavLinkProps> = ({ href, label, scrolled }) => (
  <a
    href={href}
    className={`
      relative 
      font-medium 
      hover:text-book-accent 
      transition-colors 
      duration-200
      ${scrolled ? "text-book-dark" : "text-book-light"}
      after:absolute 
      after:bottom-[-4px] 
      after:left-0 
      after:h-[2px] 
      after:w-0 
      after:bg-book-accent 
      after:transition-all 
      hover:after:w-full
    `}
  >
    {label}
  </a>
);

const MobileNavLink: React.FC<MobileNavLinkProps> = ({
  href,
  label,
  onClick,
}) => (
  <a
    href={href}
    className="text-book-dark font-medium py-2 hover:text-book-accent transition-colors duration-200"
    onClick={onClick}
  >
    {label}
  </a>
);

export default Navbar;
