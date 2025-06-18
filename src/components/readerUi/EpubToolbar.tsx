import React from "react";

type ITheme = "light" | "dark";
type FontType = "serif" | "sans" | "monospace";

interface EpubToolbarProps {
  theme: ITheme;
  onThemeChange: (theme: ITheme) => void;
  customThemeApplied: boolean;
  onOpenCustomThemeModal: () => void;
  font: FontType;
  onFontChange: (font: FontType) => void;
  fontSize: number;
  onFontSizeChange: (size: number) => void;
  columns: number;
  onColumnsChange: (columns: number) => void;
  onOpenSidebar: () => void;
  onOpenMarksSidebar: () => void;
  dropdownOpen: boolean;
  onToggleThemeDropdown: () => void;
  fontDropdownOpen: boolean;
  onToggleFontDropdown: () => void;
  fontSizeBarOpen: boolean;
  onToggleFontSizeBar: () => void;
  columnBarOpen: boolean;
  onToggleColumnBar: () => void;
  // NUEVO: para plegar la barra
  onCollapseToolbar: () => void;
}

const EpubToolbar: React.FC<EpubToolbarProps> = ({
  theme,
  onThemeChange,
  customThemeApplied,
  onOpenCustomThemeModal,
  font,
  onFontChange,
  fontSize,
  onFontSizeChange,
  columns,
  onColumnsChange,
  onOpenSidebar,
  onOpenMarksSidebar,
  dropdownOpen,
  onToggleThemeDropdown,
  fontDropdownOpen,
  onToggleFontDropdown,
  fontSizeBarOpen,
  onToggleFontSizeBar,
  columnBarOpen,
  onToggleColumnBar,
  onCollapseToolbar,
}) => (
  <div className="flex flex-col gap-4 p-6">
    {/* Botón para cerrar el menú */}
    <button
      className="self-end mb-2 bg-primary text-primary-light rounded-full p-2 shadow-lg hover:bg-primary-dark hover:scale-110 transition"
      onClick={onCollapseToolbar}
      title="Cerrar menú"
    >
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
    {/* Botón Tema */}
    <div className="relative">
      <button
        className="w-full py-3 rounded-xl bg-primary text-primary-light shadow-md hover:bg-primary-dark hover:scale-105 transition text-base font-semibold"
        onClick={onToggleThemeDropdown}
      >
        Tema
      </button>
      {dropdownOpen && (
        <div className="absolute right-0 mt-2 w-44 bg-secondary-light rounded-xl shadow-lg z-30 flex flex-col">
          <button
            onClick={() => onThemeChange("light")}
            className={`py-2 px-4 text-left hover:bg-primary-light hover:text-primary rounded-xl transition ${
              theme === "light" && !customThemeApplied ? "font-bold underline" : ""
            }`}
          >
            Tema Claro
          </button>
          <button
            onClick={() => onThemeChange("dark")}
            className={`py-2 px-4 text-left hover:bg-primary-light hover:text-primary rounded-xl transition ${
              theme === "dark" && !customThemeApplied ? "font-bold underline" : ""
            }`}
          >
            Tema Oscuro
          </button>
          <button
            onClick={onOpenCustomThemeModal}
            className={`py-2 px-4 text-left hover:bg-primary-light hover:text-primary rounded-xl transition ${
              customThemeApplied ? "font-bold underline bg-primary-light text-primary" : ""
            }`}
          >
            Personalizado
          </button>
        </div>
      )}
    </div>
    {/* Botón Fuente */}
    <div className="relative">
      <button
        className="w-full py-3 rounded-xl bg-primary text-primary-light shadow-md hover:bg-primary-dark hover:scale-105 transition text-base font-semibold"
        onClick={onToggleFontDropdown}
      >
        Fuente
      </button>
      {fontDropdownOpen && (
        <div className="absolute right-0 mt-2 w-44 bg-secondary-light rounded-xl shadow-lg z-30 flex flex-col">
          <button
            onClick={() => onFontChange("serif")}
            className={`py-2 px-4 text-left hover:bg-primary-light hover:text-primary rounded-xl transition ${
              font === "serif" ? "font-bold underline" : ""
            }`}
          >
            Serif
          </button>
          <button
            onClick={() => onFontChange("sans")}
            className={`py-2 px-4 text-left hover:bg-primary-light hover:text-primary rounded-xl transition ${
              font === "sans" ? "font-bold underline" : ""
            }`}
          >
            Sans
          </button>
          <button
            onClick={() => onFontChange("monospace")}
            className={`py-2 px-4 text-left hover:bg-primary-light hover:text-primary rounded-xl transition ${
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
        className="w-full py-3 rounded-xl bg-primary text-primary-light shadow-md hover:bg-primary-dark hover:scale-105 transition text-base font-semibold"
        onClick={onToggleFontSizeBar}
      >
        Tamaño
      </button>
      {fontSizeBarOpen && (
        <div className="absolute right-0 mt-2 w-60 bg-secondary-light rounded-xl shadow-lg z-30 p-4">
          <input
            type="range"
            min="0.5"
            max="1.5"
            step="0.1"
            value={fontSize}
            onChange={(e) => onFontSizeChange(parseFloat(e.target.value))}
            className="w-full accent-primary"
          />
        </div>
      )}
    </div>
    {/* Botón Capítulos */}
    <button
      className="w-full py-3 rounded-xl bg-primary text-primary-light shadow-md hover:bg-primary-dark hover:scale-105 transition text-base font-semibold"
      onClick={onOpenSidebar}
    >
      Capítulos
    </button>
    {/* Botón Marcas */}
    <button
      className="w-full py-3 rounded-xl bg-primary text-primary-light shadow-md hover:bg-primary-dark hover:scale-105 transition text-base font-semibold"
      onClick={onOpenMarksSidebar}
    >
      Marcas
    </button>
    {/* Selector de columnas solo en escritorio */}
    <div className="relative hidden sm:block">
      <button
        className="w-full py-3 rounded-xl bg-primary text-primary-light shadow-md hover:bg-primary-dark hover:scale-105 transition text-base font-semibold"
        onClick={onToggleColumnBar}
      >
        Columnas
      </button>
      {columnBarOpen && (
        <div className="absolute right-0 mt-2 w-60 bg-secondary-light rounded-xl shadow-lg z-30 p-4">
          <input
            type="range"
            min="1"
            max="3"
            step="1"
            value={columns}
            onChange={(e) => onColumnsChange(Number(e.target.value))}
            className="w-full accent-primary"
          />
          <div className="text-center mt-2 text-sm">
            {columns} columna{columns > 1 ? "s" : ""}
          </div>
        </div>
      )}
    </div>
  </div>
);

export default EpubToolbar;
