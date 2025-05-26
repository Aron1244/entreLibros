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

    rendition.display(String(location));

    rendition.on("relocated", (location: { start: { cfi: any } }) => {
      setLocation(location?.start?.cfi || "0");
    });

    // Obtener TOC y mostrar en consola
    book.loaded.navigation.then((nav) => {
      console.log("TOC completo:", nav.toc);
      setToc(nav.toc);
    });

    applyTheme(rendition, theme);

    return () => {
      rendition.destroy();
      book.destroy();
    };
  }, [url]);

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

  return (
    <div className="pt-20 bg-primary-dark">
      {/* Barra superior */}
      <div className="flex gap-4 mb-4 justify-center relative">
        {/* Botón Tema */}
        <button
          className="px-4 py-2 rounded bg-primary text-primary-light border border-primary-dark"
          onClick={() => setDropdownOpen((open) => !open)}
        >
          Tema
        </button>

        {/* Botón Capítulos */}
        <button
          className="px-4 py-2 rounded bg-primary text-primary-light border border-primary-dark"
          onClick={() => setSidebarOpen(true)}
        >
          Capítulos
        </button>

        {/* Dropdown tema */}
        {dropdownOpen && (
          <div className="absolute z-10 mt-12 w-40 bg-secondary-light rounded shadow-lg border border-primary-dark">
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

        {/* Zonas invisibles para navegación */}
        <div
          className="absolute left-0 top-0 h-full w-1/6 z-10"
          onClick={goPrev}
        />
        <div
          className="absolute right-0 top-0 h-full w-1/6 z-10"
          onClick={goNext}
        />

        {/* Lector EPUB */}
        <div ref={viewerRef} className="w-full h-full" />
      </div>
    </div>
  );
};

const applyTheme = (rendition: Rendition, theme: ITheme) => {
  if (!rendition) return;

  rendition.themes.register("light", {
    body: { color: "#000", background: "#fff" },
  });

  rendition.themes.register("dark", {
    body: { color: "#fff", background: "#000" },
  });

  rendition.themes.select(theme);
};
