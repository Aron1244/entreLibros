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
  const [customThemeModalOpen, setCustomThemeModalOpen] = useState(false);
  const [customBgColor, setCustomBgColor] = useState("#222222");
  const [customTextColor, setCustomTextColor] = useState("#ffffff");
  const [customThemeApplied, setCustomThemeApplied] = useState(false);

  // Mantener referencia de los colores previos para evitar registrar el mismo tema repetidamente
  const prevCustomColors = useRef({ bg: customBgColor, text: customTextColor });

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

  // --- Patch document.createElement to set sandbox on iframe for epub.js ---
  if (typeof window !== "undefined" && window.document) {
    const origCreateElement = document.createElement;
    document.createElement = function (tagName: string, ...args: any[]) {
      const el = origCreateElement.call(this, tagName, ...args);
      if (tagName === "iframe") {
        el.setAttribute("sandbox", "allow-scripts allow-same-origin");
      }
      return el;
    };
  }

  useEffect(() => {
    const book = ePub(url);
    bookRef.current = book;

    const rendition = book.renderTo(viewerRef.current!, {
      width: "100%",
      height: "100%",
    });

    renditionRef.current = rendition;

    // REGISTRA LOS TEMAS SOLO UNA VEZ POR INSTANCIA
    // Se registra sin acceder a propiedades privadas
    try {
      rendition.themes.register("light", {
        body: { color: "#000", background: "#fff" },
        "*": { color: "#000 !important", background: "#fff !important" },
      });
    } catch (e) {}
    try {
      rendition.themes.register("dark", {
        body: { color: "#fff", background: "#000" },
        "*": { color: "#fff !important", background: "#000 !important" },
      });
    } catch (e) {}

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

    let section: { href: string } | null = null;
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

  useEffect(() => {
    if (renditionRef.current && customThemeApplied) {
      // Registra y selecciona el tema personalizado
      renditionRef.current.themes.register("custom", {
        body: { color: customTextColor, background: customBgColor },
        "*": {
          color: `${customTextColor} !important`,
          background: `${customBgColor} !important`,
        },
      });
      renditionRef.current.themes.select("custom");
      renditionRef.current.display(String(location));
    }
  }, [customThemeApplied, customBgColor, customTextColor, location]);

  useEffect(() => {
    if (!renditionRef.current) return;
    const rendition = renditionRef.current;

    // Solo registrar si los colores cambiaron
    if (
      customThemeApplied &&
      (prevCustomColors.current.bg !== customBgColor ||
        prevCustomColors.current.text !== customTextColor)
    ) {
      try {
        rendition.themes.register("custom", {
          body: { color: customTextColor, background: customBgColor },
          "*": {
            color: `${customTextColor} !important`,
            background: `${customBgColor} !important`,
          },
        });
      } catch (e) {}
      prevCustomColors.current = { bg: customBgColor, text: customTextColor };
    }
    // Selecciona SIEMPRE el tema custom si está activo
    if (customThemeApplied) {
      rendition.themes.select("custom");
    }
  }, [customThemeApplied, customBgColor, customTextColor, location]);

  useEffect(() => {
    if (!renditionRef.current) return;
    const rendition = renditionRef.current;
    // Handler para re-aplicar el tema personalizado en cada render
    const handleRendered = () => {
      if (customThemeApplied) {
        try {
          rendition.themes.register("custom", {
            body: { color: customTextColor, background: customBgColor },
            "*": {
              color: `${customTextColor} !important`,
              background: `${customBgColor} !important`,
            },
          });
        } catch (e) {}
        rendition.themes.select("custom");
      }
    };
    rendition.on("rendered", handleRendered);
    return () => {
      rendition.off("rendered", handleRendered);
    };
  }, [customThemeApplied, customBgColor, customTextColor]);

  // Evitar que el efecto de tema normal sobrescriba el personalizado
  useEffect(() => {
    if (customThemeApplied) return;
    if (renditionRef.current) {
      applyTheme(renditionRef.current, theme);
    }
  }, [theme, customThemeApplied]);

  // --- Fix sandboxed iframe for epub.js ---
  useEffect(() => {
    if (!viewerRef.current) return;
    // Espera a que el iframe esté en el DOM
    const timer = setTimeout(() => {
      const iframes = viewerRef.current?.getElementsByTagName("iframe");
      if (iframes && iframes.length > 0) {
        for (let iframe of iframes) {
          // Quita el atributo sandbox o agrega allow-scripts
          iframe.removeAttribute("sandbox");
          // Si quieres mantener sandbox pero permitir scripts y origen:
          iframe.setAttribute("sandbox", "allow-scripts allow-same-origin");
        }
      }
    }, 200);
    return () => clearTimeout(timer);
  }, [location]);

  return (
    <div className="pt-20 bg-primary-dark">
      {/* Barra superior */}
      <div className="flex flex-wrap gap-2 sm:gap-4 mb-4 justify-center relative">
        {/* Botón Tema */}
        <div className="relative min-w-[120px] flex-1 sm:flex-none">
          <button
            className="w-full px-4 py-2 rounded bg-primary text-primary-light border border-primary-dark transition duration-300 hover:scale-105 hover:bg-opacity-80 text-sm sm:text-base"
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
                  setCustomThemeApplied(false);
                }}
                className={`block w-full px-4 py-2 hover:bg-primary-light text-sm sm:text-base ${
                  theme === "light" && !customThemeApplied
                    ? "font-bold underline"
                    : ""
                }`}
              >
                Tema Claro
              </button>
              <button
                onClick={() => {
                  setTheme("dark");
                  setDropdownOpen(false);
                  setCustomThemeApplied(false);
                }}
                className={`block w-full px-4 py-2 hover:bg-primary-light text-sm sm:text-base ${
                  theme === "dark" && !customThemeApplied
                    ? "font-bold underline"
                    : ""
                }`}
              >
                Tema Oscuro
              </button>
              <button
                onClick={() => {
                  setCustomThemeModalOpen(true);
                  setDropdownOpen(false);
                }}
                className={`block w-full px-4 py-2 hover:bg-primary-light text-sm sm:text-base ${
                  customThemeApplied
                    ? "font-bold underline bg-primary-light text-primary"
                    : ""
                }`}
              >
                Personalizado
              </button>
            </div>
          )}
        </div>

        {/* Botón Fuente */}
        <div className="relative min-w-[120px] flex-1 sm:flex-none">
          <button
            className="w-full px-4 py-2 rounded bg-primary text-primary-light border border-primary-dark transition duration-300 hover:scale-105 hover:bg-opacity-80 text-sm sm:text-base"
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
                className={`block w-full px-4 py-2 hover:bg-primary-light text-sm sm:text-base ${
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
                className={`block w-full px-4 py-2 hover:bg-primary-light text-sm sm:text-base ${
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
                className={`block w-full px-4 py-2 hover:bg-primary-light text-sm sm:text-base ${
                  font === "monospace" ? "font-bold underline" : ""
                }`}
              >
                Monospace
              </button>
            </div>
          )}
        </div>

        {/* Botón Tamaño */}
        <div className="relative min-w-[120px] flex-1 sm:flex-none">
          <button
            className="w-full px-4 py-2 rounded bg-primary text-primary-light border border-primary-dark transition duration-300 hover:scale-105 hover:bg-opacity-80 text-sm sm:text-base"
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
        <div className="min-w-[120px] flex-1 sm:flex-none">
          <button
            className="w-full px-4 py-2 rounded bg-primary text-primary-light border border-primary-dark transition duration-300 hover:scale-105 hover:bg-opacity-80 text-sm sm:text-base"
            onClick={toggleSidebar}
          >
            Capítulos
          </button>
        </div>
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
          className={`absolute left-0 top-0 h-full w-1/6 z-20${
            sidebarOpen ? " pointer-events-none" : ""
          }`}
          onClick={sidebarOpen ? undefined : goPrev}
        />
        <div
          className={`absolute right-0 top-0 h-full w-1/6 z-20${
            sidebarOpen ? " pointer-events-none" : ""
          }`}
          onClick={sidebarOpen ? undefined : goNext}
        />

        {/* Lector EPUB */}
        <div ref={viewerRef} className="w-full h-full relative z-0" />
      </div>

      {/* Modal de tema personalizado */}
      {customThemeModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/10"
          onClick={() => setCustomThemeModalOpen(false)}
        >
          <div
            className="bg-white rounded-lg shadow-lg p-8 min-w-[320px] relative"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-bold mb-4">Tema Personalizado</h2>
            <div className="mb-4">
              <label className="block mb-1 font-semibold">Color de fondo</label>
              <input
                type="color"
                value={customBgColor}
                onChange={(e) => setCustomBgColor(e.target.value)}
                className="w-12 h-12 border-2 border-gray-300 rounded-full cursor-pointer"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 font-semibold">Color de texto</label>
              <input
                type="color"
                value={customTextColor}
                onChange={(e) => setCustomTextColor(e.target.value)}
                className="w-12 h-12 border-2 border-gray-300 rounded-full cursor-pointer"
              />
            </div>
            <div className="flex gap-4 justify-end mt-6">
              <button
                className="px-4 py-2 rounded bg-gray-300 text-gray-800 hover:bg-gray-400"
                onClick={() => setCustomThemeModalOpen(false)}
              >
                Cancelar
              </button>
              <button
                className="px-4 py-2 rounded bg-primary text-primary-light hover:bg-primary-dark"
                onClick={() => {
                  setCustomThemeApplied(true);
                  setCustomThemeModalOpen(false);
                }}
              >
                Aplicar
              </button>
            </div>
            <button
              className="absolute top-2 right-3 text-2xl text-gray-500 hover:text-gray-800"
              onClick={() => setCustomThemeModalOpen(false)}
              title="Cerrar"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const applyTheme = (rendition: Rendition, theme: ITheme) => {
  if (!rendition) return;
  // SOLO selecciona el tema, no registres aquí
  rendition.themes.select(theme);
};
