// Agrega estas importaciones si no las tienes ya
import { useEffect, useRef, useState } from "react";
import ePub, { Book, Rendition } from "epubjs";

type ITheme = "light" | "dark";

interface EpubViewerProps {
  url: string;
  initialTheme?: ITheme;
}

interface TocItem {
  href: string;
  label: string;
  subitems?: TocItem[];
}

export const EpubViewer = ({ url, initialTheme = "dark" }: EpubViewerProps) => {
  const viewerRef = useRef<HTMLDivElement>(null);
  const renditionRef = useRef<Rendition | null>(null);
  const bookRef = useRef<Book | null>(null);

  const [location, setLocation] = useState<string | number>(0);
  const [theme, setTheme] = useState<ITheme>(initialTheme);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [toc, setToc] = useState<TocItem[]>([]);
  const [font, setFont] = useState<"serif" | "sans" | "monospace">("serif");
  const [fontDropdownOpen, setFontDropdownOpen] = useState(false);
  const [fontSize, setFontSize] = useState(1); // Tamaño inicial
  const [fontSizeBarOpen, setFontSizeBarOpen] = useState(false);

  useEffect(() => {
    if (renditionRef.current) {
      applyTheme(renditionRef.current, theme);
    }
  }, [theme]);

  const goNext = () => {
    renditionRef.current?.next();
  };

  const goPrev = () => {
    renditionRef.current?.prev();
  };

  useEffect(() => {
    const book = ePub(url);
    bookRef.current = book;

    const rendition = book.renderTo(viewerRef.current!, {
      width: "100%",
      height: "100%",
    });

    renditionRef.current = rendition;

    // REGISTRA LOS TEMAS SOLO UNA VEZ POR INSTANCIA
    if (!rendition.themes._themes["light"]) {
      rendition.themes.register("light", {
        body: { color: "#000", background: "#fff" },
        "*": { color: "#000 !important", background: "#fff !important" },
      });
    }
    if (!rendition.themes._themes["dark"]) {
      rendition.themes.register("dark", {
        body: { color: "#fff", background: "#000" },
        "*": { color: "#fff !important", background: "#000 !important" },
      });
    }

    rendition.display(String(location));

    rendition.on("relocated", (location: { start: { cfi: any } }) => {
      setLocation(location?.start?.cfi || "0");
    });

    book.loaded.navigation.then((nav) => {
      setToc(nav.toc);
    });

    // Selecciona el tema inicial
    rendition.themes.select(theme);

    return () => {
      rendition.destroy();
      book.destroy();
    };
  }, [url]);

  useEffect(() => {
    if (renditionRef.current) {
      renditionRef.current.themes.select(theme);
      // Fuerza un re-render manteniendo la ubicación actual
      renditionRef.current.display(String(location));
    }
  }, [theme, location]);

  useEffect(() => {
    if (renditionRef.current) {
      // Aplica la fuente seleccionada
      renditionRef.current.themes.font(font);
    }
  }, [font]);

  useEffect(() => {
    if (renditionRef.current) {
      renditionRef.current.themes.fontSize(`${fontSize * 100}%`);
    }
  }, [fontSize]);

  const goTo = (href: string) => {
    if (!renditionRef.current || !bookRef.current) return;

    // Encuentra la sección del spine cuyo href termina con el href recibido
    const spine = bookRef.current.spine;

    let section = null;
    spine.each((item: { href: string }) => {
      if (item.href.endsWith(href)) {
        section = item;
        return false; // rompe el each
      }
      return true; // continúa el each
    });

    if (!section) {
      console.error("No se encontró sección en el spine para href:", href);
      return;
    }

    renditionRef.current
      .display(section.href)
      .then(() => setSidebarOpen(false))
      .catch((err) => {
        console.error("Error navegando a sección:", href, err);
      });
  };

  const toggleThemeDropdown = () => {
    setDropdownOpen((open) => !open);
    if (!dropdownOpen) {
      setFontDropdownOpen(false);
      setFontSizeBarOpen(false);
      setSidebarOpen(false);
    }
  };

  const toggleFontDropdown = () => {
    setFontDropdownOpen((open) => !open);
    if (!fontDropdownOpen) {
      setDropdownOpen(false);
      setFontSizeBarOpen(false);
      setSidebarOpen(false);
    }
  };

  const toggleFontSizeBar = () => {
    setFontSizeBarOpen((open) => !open);
    if (!fontSizeBarOpen) {
      setDropdownOpen(false);
      setFontDropdownOpen(false);
      setSidebarOpen(false);
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen((open) => !open);
    if (!sidebarOpen) {
      setDropdownOpen(false);
      setFontDropdownOpen(false);
      setFontSizeBarOpen(false);
    }
  };

  return (
    <div className="pt-20 bg-primary-dark">
      {/* Barra superior */}
      <div className="flex gap-4 mb-4 justify-center relative">
        {/* Botón Tema */}
        <div className="relative">
          <button
            className="px-4 py-2 rounded bg-primary text-primary-light border border-primary-dark transition duration-300 hover:scale-105 hover:bg-opacity-80"
            onClick={toggleThemeDropdown}
          >
            Tema
          </button>
          {dropdownOpen && (
            <div className="absolute left-0 mt-2 w-40 bg-secondary-light rounded shadow-lg border border-primary-dark z-30">
              <button
                onClick={() => {
                  setTheme("light");
                  setDropdownOpen(false);
                }}
                className={`block w-full px-4 py-2 hover:bg-primary-light ${
                  theme === "light" ? "font-bold underline" : ""
                }`}
              >
                Tema Claro
              </button>
              <button
                onClick={() => {
                  setTheme("dark");
                  setDropdownOpen(false);
                }}
                className={`block w-full px-4 py-2 hover:bg-primary-light ${
                  theme === "dark" ? "font-bold underline" : ""
                }`}
              >
                Tema Oscuro
              </button>
            </div>
          )}
        </div>

        {/* Botón Fuente */}
        <div className="relative">
          <button
            className="px-4 py-2 rounded bg-primary text-primary-light border border-primary-dark transition duration-300 hover:scale-105 hover:bg-opacity-80"
            onClick={toggleFontDropdown}
          >
            Fuente
          </button>
          {fontDropdownOpen && (
            <div className="absolute left-0 mt-2 w-40 bg-secondary-light rounded shadow-lg border border-primary-dark z-30">
              <button
                onClick={() => {
                  setFont("serif");
                  setFontDropdownOpen(false);
                }}
                className={`block w-full px-4 py-2 hover:bg-primary-light ${
                  font === "serif" ? "font-bold underline" : ""
                }`}
              >
                Serif
              </button>
              <button
                onClick={() => {
                  setFont("sans");
                  setFontDropdownOpen(false);
                }}
                className={`block w-full px-4 py-2 hover:bg-primary-light ${
                  font === "sans" ? "font-bold underline" : ""
                }`}
              >
                Sans
              </button>
              <button
                onClick={() => {
                  setFont("monospace");
                  setFontDropdownOpen(false);
                }}
                className={`block w-full px-4 py-2 hover:bg-primary-light ${
                  font === "monospace" ? "font-bold underline" : ""
                }`}
              >
                Monospace
              </button>
            </div>
          )}
        </div>

        {/* Botón Tamaño */}
        <div className="relative">
          <button
            className="px-4 py-2 rounded bg-primary text-primary-light border border-primary-dark transition duration-300 hover:scale-105 hover:bg-opacity-80"
            onClick={toggleFontSizeBar}
          >
            Tamaño
          </button>
          {fontSizeBarOpen && (
            <div className="absolute left-0 mt-2 w-64 bg-secondary-light rounded shadow-lg border border-primary-dark z-30 p-4">
              <input
                type="range"
                min="0.5"
                max="1.5"
                step="0.1"
                value={fontSize}
                onChange={(e) => setFontSize(parseFloat(e.target.value))}
                className="w-full"
              />
            </div>
          )}
        </div>

        {/* Botón Capítulos */}
        <button
          className="px-4 py-2 rounded bg-primary text-primary-light border border-primary-dark transition duration-300 hover:scale-105 hover:bg-opacity-80"
          onClick={toggleSidebar}
        >
          Capítulos
        </button>
      </div>

      {/* Contenedor principal con panel lateral */}
      <div className="relative w-full h-screen border rounded shadow overflow-hidden flex">
        {/* Sidebar de capítulos */}
        {sidebarOpen && (
          <div className="absolute left-0 top-0 z-20 h-full w-64 bg-white text-black shadow-xl overflow-y-auto">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="font-bold text-lg">Capítulos</h2>
              <button onClick={() => setSidebarOpen(false)} className="text-xl">
                ×
              </button>
            </div>
            <ul>
              {toc.map((item, idx) => (
                <li
                  key={idx}
                  className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                  onClick={() => goTo(item.href)}
                  title={item.href} // Muestra href al pasar el mouse
                >
                  {item.label}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Overlay blur */}
        {sidebarOpen && (
          <div
            className="absolute inset-0 z-10 backdrop-blur-sm bg-black/10 transition duration-300"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Zonas invisibles para navegación */}
        <div
          className="absolute left-0 top-0 h-full w-1/6 z-20" // <--- z-20
          onClick={goPrev}
        />
        <div
          className="absolute right-0 top-0 h-full w-1/6 z-20" // <--- z-20
          onClick={goNext}
        />

        {/* Lector EPUB */}
        <div ref={viewerRef} className="w-full h-full relative z-0" />
      </div>
    </div>
  );
};

const applyTheme = (rendition: Rendition, theme: ITheme) => {
  if (!rendition) return;
  // SOLO selecciona el tema, no registres aquí
  rendition.themes.select(theme);
};
