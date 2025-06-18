// Agrega estas importaciones si no las tienes ya
import { useEffect, useRef, useState } from "react";
import ePub, { Book, Rendition } from "epubjs";
import EpubToolbar from "./readerUi/EpubToolbar";
import ChapterSidebar from "./readerUi/ChapterSidebar";
import MarksSidebar from "./readerUi/MarksSidebar";
import CustomThemeModal from "./readerUi/CustomThemeModal";
import EpubSkeleton from "./readerUi/EpubSkeleton";

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
  // Leer el tema guardado en localStorage (si existe)
  let storedTheme: ITheme | null = null;
  if (typeof window !== "undefined") {
    storedTheme = (localStorage.getItem("epubTheme") as ITheme) || null;
  }

  const viewerRef = useRef<HTMLDivElement>(null);
  const renditionRef = useRef<Rendition | null>(null);
  const bookRef = useRef<Book | null>(null);

  const [location, setLocation] = useState<string | number>(0);
  // Usar el tema guardado o el initialTheme
  const [theme, setTheme] = useState<ITheme>(storedTheme || initialTheme);
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
  const [marks, setMarks] = useState<{ cfi: string; name: string }[]>([]);
  const [marksSidebarOpen, setMarksSidebarOpen] = useState(false);
  const [newMarkName, setNewMarkName] = useState("");
  const [columns, setColumns] = useState(1);
  const [columnBarOpen, setColumnBarOpen] = useState(false);
  const [toolbarVisible, setToolbarVisible] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [loading, setLoading] = useState(true);

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
        body: { color: "#2E2E2E", background: "#FAF9F6" },
        "*": { color: "#2E2E2E !important", background: "#FAF9F6 !important" },
      });
    } catch (e) {}
    try {
      rendition.themes.register("dark", {
        body: { color: "#E5E5E5", background: "#1E1E1E" },
        "*": { color: "#E5E5E5 !important", background: "#1E1E1E !important" },
      });
    } catch (e) {}

    rendition.display(String(location)).then(() => setLoading(false));

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

  // Aplica columnas solo en escritorio y siempre que se renderice una página
  useEffect(() => {
    let isMounted = true;
    const applyColumns = () => {
      if (!isMounted || !renditionRef.current || !bookRef.current) return;
      if (window.matchMedia("(min-width: 640px)").matches) {
        renditionRef.current.themes.override(
          "body",
          `column-count: ${columns} !important; -webkit-column-count: ${columns} !important; column-gap: ${
            columns > 1 ? "2em" : "0"
          } !important;`
        );
      } else {
        renditionRef.current.themes.override("body", "");
      }
    };
    applyColumns();
    window.addEventListener("resize", applyColumns);
    // Aplica override en cada renderizado de página
    const rendition = renditionRef.current;
    if (rendition) {
      rendition.on("rendered", applyColumns);
    }
    return () => {
      isMounted = false;
      window.removeEventListener("resize", applyColumns);
      if (rendition) rendition.off("rendered", applyColumns);
    };
  }, [columns, location]);

  const goTo = (href: string) => {
    if (!renditionRef.current || !bookRef.current) return;

    // Encuentra la sección del spine cuyo href termina con el href recibido
    const spine = bookRef.current.spine;

    let section: any = null;
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
      .display(section?.href)
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

  // Guardar marcas en localStorage por libro
  useEffect(() => {
    if (!url) return;
    const saved = localStorage.getItem(`marks_${url}`);
    if (saved) setMarks(JSON.parse(saved));
  }, [url]);
  useEffect(() => {
    if (!url) return;
    localStorage.setItem(`marks_${url}`, JSON.stringify(marks));
  }, [marks, url]);

  const addMark = () => {
    if (!location || !renditionRef.current) return;
    if (!newMarkName.trim()) return;
    setMarks((prev) => [
      ...prev,
      { cfi: String(location), name: newMarkName.trim() },
    ]);
    setNewMarkName("");
  };
  const goToMark = (cfi: string) => {
    renditionRef.current?.display(cfi);
    setMarksSidebarOpen(false);
  };
  const deleteMark = (idx: number) => {
    setMarks((prev) => prev.filter((_, i) => i !== idx));
  };

  // Debounce y control de tap para navegación táctil
  const navDebounceRef = useRef(false);
  const touchStartX = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent, side: "left" | "right") => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent, side: "left" | "right") => {
    if (navDebounceRef.current) return;
    const startX = touchStartX.current;
    const endX = e.changedTouches[0].clientX;
    // Solo si el tap fue casi en el mismo lugar (no swipe)
    if (startX !== null && Math.abs(endX - startX) < 20) {
      navDebounceRef.current = true;
      if (side === "left") goPrev();
      else goNext();
      setTimeout(() => {
        navDebounceRef.current = false;
      }, 350);
    }
    touchStartX.current = null;
  };

  return (
    <div className="pt-20 bg-primary-dark">
      <div className="relative w-full">
        {/* Botón flotante para mostrar el menú drawer */}
        {/* <button
          className="fixed top-24 right-6 z-50 bg-primary text-primary-light p-3 rounded-full shadow-lg hover:scale-110 transition-transform opacity-60 hover:opacity-100 transition"
          onClick={() => setDrawerOpen(true)}
          title="Abrir menú"
        >
          <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/></svg>
        </button> */}
      </div>
      <div className="relative w-full h-screen border rounded shadow overflow-hidden flex">
        {/* Botón flotante para mostrar el menú drawer (ahora dentro del visor) */}
        {!drawerOpen && (
          <button
            className="absolute top-6 right-6 z-50 bg-primary text-primary-light p-3 rounded-full shadow-lg hover:scale-110 opacity-60 hover:opacity-100 transition"
            onClick={() => setDrawerOpen(true)}
            title="Abrir menú"
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/></svg>
          </button>
        )}
        {/* Drawer lateral derecho dentro del visor */}
        <div className={`absolute top-0 right-0 h-full w-72 max-w-full z-40 bg-secondary-light shadow-2xl transform transition-transform duration-300 ${drawerOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <EpubToolbar
            theme={theme}
            onThemeChange={(t) => {
              setTheme(t);
              setCustomThemeApplied(false);
              setDropdownOpen(false);
            }}
            customThemeApplied={customThemeApplied}
            onOpenCustomThemeModal={() => {
              setCustomThemeModalOpen(true);
              setDropdownOpen(false);
            }}
            font={font}
            onFontChange={(f) => {
              setFont(f);
              setFontDropdownOpen(false);
            }}
            fontSize={fontSize}
            onFontSizeChange={setFontSize}
            columns={columns}
            onColumnsChange={setColumns}
            onOpenSidebar={toggleSidebar}
            onOpenMarksSidebar={() => setMarksSidebarOpen((v) => !v)}
            dropdownOpen={dropdownOpen}
            onToggleThemeDropdown={toggleThemeDropdown}
            fontDropdownOpen={fontDropdownOpen}
            onToggleFontDropdown={toggleFontDropdown}
            fontSizeBarOpen={fontSizeBarOpen}
            onToggleFontSizeBar={toggleFontSizeBar}
            columnBarOpen={columnBarOpen}
            onToggleColumnBar={() => setColumnBarOpen((v) => !v)}
            onCollapseToolbar={() => setDrawerOpen(false)}
          />
        </div>
        {/* Sidebar de capítulos */}
        <ChapterSidebar
          toc={toc}
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          onGoTo={goTo}
        />
        {/* Sidebar de marcas personalizadas */}
        <MarksSidebar
          open={marksSidebarOpen}
          marks={marks}
          newMarkName={newMarkName}
          onClose={() => setMarksSidebarOpen(false)}
          onAddMark={addMark}
          onGoToMark={goToMark}
          onDeleteMark={deleteMark}
          onNewMarkNameChange={setNewMarkName}
        />
        {/* Overlay blur para ambos sidebars */}
        {(sidebarOpen || marksSidebarOpen) && (
          <div
            className="fixed inset-0 z-20 backdrop-blur-sm bg-black/10 transition duration-300 sm:absolute"
            onClick={() => {
              setSidebarOpen(false);
              setMarksSidebarOpen(false);
            }}
          />
        )}
        {/* Zonas invisibles para navegación: 20% en móvil, 1/6 en escritorio, centro libre */}
        <div
          className="absolute left-0 top-0 h-full w-1/5 sm:w-1/6 z-20"
          style={{ pointerEvents: "auto" }}
          onClick={sidebarOpen || marksSidebarOpen ? undefined : goPrev}
          onTouchStart={(e) => handleTouchStart(e, "left")}
          onTouchEnd={
            sidebarOpen || marksSidebarOpen
              ? undefined
              : (e) => handleTouchEnd(e, "left")
          }
        />
        <div
          className="absolute right-0 top-0 h-full w-1/5 sm:w-1/6 z-20"
          style={{ pointerEvents: "auto" }}
          onClick={sidebarOpen || marksSidebarOpen ? undefined : goNext}
          onTouchStart={(e) => handleTouchStart(e, "right")}
          onTouchEnd={
            sidebarOpen || marksSidebarOpen
              ? undefined
              : (e) => handleTouchEnd(e, "right")
          }
        />
        {/* Zona central sin eventos para evitar conflictos */}
        <div className="absolute left-1/5 sm:left-1/6 top-0 h-full w-3/5 sm:w-2/3 z-10 pointer-events-none" />
        {/* Lector EPUB */}
        <div ref={viewerRef} className="w-full h-full relative z-0">
          {loading && (
            <div className="absolute inset-0 w-full h-full">
              <EpubSkeleton />
            </div>
          )}
        </div>
      </div>

      <CustomThemeModal
        open={customThemeModalOpen}
        onClose={() => setCustomThemeModalOpen(false)}
        customBgColor={customBgColor}
        customTextColor={customTextColor}
        onBgColorChange={setCustomBgColor}
        onTextColorChange={setCustomTextColor}
        onApply={() => {
          setCustomThemeApplied(true);
          setCustomThemeModalOpen(false);
        }}
      />
    </div>
  );
};

const applyTheme = (rendition: Rendition, theme: ITheme) => {
  if (!rendition) return;
  // SOLO selecciona el tema, no registres aquí
  rendition.themes.select(theme);
};
