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
  <div className="flex flex-wrap gap-2 sm:gap-4 mb-4 justify-center relative">
    {/* Botón para plegar la barra */}
    <button
      className="absolute right-2 top-2 z-40 bg-secondary-light border border-primary-dark rounded-full p-1 hover:bg-primary-light transition"
      onClick={onCollapseToolbar}
      title="Plegar menú"
    >
      <svg
        className="w-6 h-6 text-gray-800 dark:text-white"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M4 8h4V4m12 4h-4V4M4 16h4v4m12-4h-4v4"
        />
      </svg>
    </button>

    {/* Botón Tema */}
    <div className="relative min-w-[120px] flex-1 sm:flex-none">
      <button
        className="w-full px-4 py-2 rounded bg-primary text-primary-light border border-primary-dark transition duration-300 hover:scale-105 hover:bg-opacity-80 text-sm sm:text-base"
        onClick={onToggleThemeDropdown}
      >
        Tema
      </button>
      {dropdownOpen && (
        <div className="absolute left-0 mt-2 w-40 bg-secondary-light rounded shadow-lg border border-primary-dark z-30">
          <button
            onClick={() => onThemeChange("light")}
            className={`block w-full px-4 py-2 hover:bg-primary-light text-sm sm:text-base ${
              theme === "light" && !customThemeApplied ? "font-bold underline" : ""
            }`}
          >
            Tema Claro
          </button>
          <button
            onClick={() => onThemeChange("dark")}
            className={`block w-full px-4 py-2 hover:bg-primary-light text-sm sm:text-base ${
              theme === "dark" && !customThemeApplied ? "font-bold underline" : ""
            }`}
          >
            Tema Oscuro
          </button>
          <button
            onClick={onOpenCustomThemeModal}
            className={`block w-full px-4 py-2 hover:bg-primary-light text-sm sm:text-base ${
              customThemeApplied ? "font-bold underline bg-primary-light text-primary" : ""
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
        onClick={onToggleFontDropdown}
      >
        Fuente
      </button>
      {fontDropdownOpen && (
        <div className="absolute left-0 mt-2 w-40 bg-secondary-light rounded shadow-lg border border-primary-dark z-30">
          <button
            onClick={() => onFontChange("serif")}
            className={`block w-full px-4 py-2 hover:bg-primary-light text-sm sm:text-base ${
              font === "serif" ? "font-bold underline" : ""
            }`}
          >
            Serif
          </button>
          <button
            onClick={() => onFontChange("sans")}
            className={`block w-full px-4 py-2 hover:bg-primary-light text-sm sm:text-base ${
              font === "sans" ? "font-bold underline" : ""
            }`}
          >
            Sans
          </button>
          <button
            onClick={() => onFontChange("monospace")}
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
        onClick={onToggleFontSizeBar}
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
            onChange={(e) => onFontSizeChange(parseFloat(e.target.value))}
            className="w-full"
          />
        </div>
      )}
    </div>

    {/* Botón Capítulos */}
    <div className="min-w-[120px] flex-1 sm:flex-none">
      <button
        className="w-full px-4 py-2 rounded bg-primary text-primary-light border border-primary-dark transition duration-300 hover:scale-105 hover:bg-opacity-80 text-sm sm:text-base"
        onClick={onOpenSidebar}
      >
        Capítulos
      </button>
    </div>
    {/* Botón Marcas */}
    <div className="min-w-[120px] flex-1 sm:flex-none">
      <button
        className="w-full px-4 py-2 rounded bg-primary text-primary-light border border-primary-dark transition duration-300 hover:scale-105 hover:bg-opacity-80 text-sm sm:text-base"
        onClick={onOpenMarksSidebar}
      >
        Marcas
      </button>
    </div>

    {/* Selector de columnas solo en escritorio */}
    <div className="relative hidden sm:block min-w-[120px] flex-1 sm:flex-none">
      <button
        className="w-full px-4 py-2 rounded bg-primary text-primary-light border border-primary-dark transition duration-300 hover:scale-105 hover:bg-opacity-80 text-sm sm:text-base"
        onClick={onToggleColumnBar}
      >
        Columnas
      </button>
      {columnBarOpen && (
        <div className="absolute left-0 mt-2 w-64 bg-secondary-light rounded shadow-lg border border-primary-dark z-30 p-4">
          <input
            type="range"
            min="1"
            max="3"
            step="1"
            value={columns}
            onChange={(e) => onColumnsChange(Number(e.target.value))}
            className="w-full"
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
