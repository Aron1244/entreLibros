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
  <div className="flex flex-col h-full bg-primary-dark border-l border-gray-700">
    {/* Header del menú */}
    <div className="flex items-center justify-between p-4 border-b border-gray-700 bg-primary-dark">
      <h3 className="text-lg font-bold text-white">Configuración</h3>
      <button
        className="p-2 rounded-full bg-gray-700 text-primary-light hover:bg-gray-600 hover:scale-110 transition-all duration-200"
        onClick={onCollapseToolbar}
        title="Cerrar menú (M)"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    {/* Contenido del menú */}
    <div className="flex-1 p-4 space-y-4">
      {/* Sección: Apariencia */}
      <div className="space-y-3">
        <h4 className="text-sm font-semibold text-primary-light uppercase tracking-wide">Apariencia</h4>
        
        {/* Tema */}
        <div className="relative">
          <button
            className="w-full flex items-center justify-between p-3 rounded-xl bg-secondary-dark border border-gray-700 shadow-sm hover:shadow-md hover:border-primary hover:bg-primary-dark transition-all duration-200 group"
            onClick={onToggleThemeDropdown}
          >
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-gradient-to-br from-yellow-400 to-orange-500 text-white">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <span className="font-medium text-white group-hover:text-primary-light">Tema</span>
            </div>
            <svg className={`w-4 h-4 text-primary-light transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-gray-800 rounded-xl shadow-xl border border-gray-700 z-30 overflow-hidden">
              <button
                onClick={() => onThemeChange("light")}
                className={`w-full flex items-center space-x-3 p-3 hover:bg-gray-700 transition-colors ${
                  theme === "light" && !customThemeApplied ? "bg-blue-900/20 border-r-2 border-blue-500" : ""
                }`}
              >
                <div className="w-4 h-4 rounded-full bg-yellow-400"></div>
                <span className={`${theme === "light" && !customThemeApplied ? "font-semibold text-blue-400" : "text-white"}`}>
                  Tema Claro
                </span>
              </button>
              <button
                onClick={() => onThemeChange("dark")}
                className={`w-full flex items-center space-x-3 p-3 hover:bg-gray-700 transition-colors ${
                  theme === "dark" && !customThemeApplied ? "bg-blue-900/20 border-r-2 border-blue-500" : ""
                }`}
              >
                <div className="w-4 h-4 rounded-full bg-gray-800"></div>
                <span className={`${theme === "dark" && !customThemeApplied ? "font-semibold text-blue-400" : "text-white"}`}>
                  Tema Oscuro
                </span>
              </button>
              <button
                onClick={onOpenCustomThemeModal}
                className={`w-full flex items-center space-x-3 p-3 hover:bg-gray-700 transition-colors ${
                  customThemeApplied ? "bg-blue-900/20 border-r-2 border-blue-500" : ""
                }`}
              >
                <div className="w-4 h-4 rounded-full bg-gradient-to-r from-purple-400 to-pink-400"></div>
                <span className={`${customThemeApplied ? "font-semibold text-blue-400" : "text-white"}`}>
                  Personalizado
                </span>
              </button>
            </div>
          )}
        </div>

        {/* Fuente */}
        <div className="relative">
          <button
            className="w-full flex items-center justify-between p-3 rounded-xl bg-secondary-dark border border-gray-700 shadow-sm hover:shadow-md hover:border-primary hover:bg-primary-dark transition-all duration-200 group"
            onClick={onToggleFontDropdown}
          >
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-gradient-to-br from-green-400 to-blue-500 text-white">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="font-medium text-white group-hover:text-primary-light">Fuente</span>
            </div>
            <svg className={`w-4 h-4 text-primary-light transition-transform duration-200 ${fontDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {fontDropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-gray-800 rounded-xl shadow-xl border border-gray-700 z-30 overflow-hidden">
              <button
                onClick={() => onFontChange("serif")}
                className={`w-full flex items-center space-x-3 p-3 hover:bg-gray-700 transition-colors ${
                  font === "serif" ? "bg-blue-900/20 border-r-2 border-blue-500" : ""
                }`}
              >
                <span className={`text-lg ${font === "serif" ? "font-semibold text-blue-400" : "text-white"}`} style={{fontFamily: 'serif'}}>Aa</span>
                <span className={`${font === "serif" ? "font-semibold text-blue-400" : "text-white"}`}>Serif</span>
              </button>
              <button
                onClick={() => onFontChange("sans")}
                className={`w-full flex items-center space-x-3 p-3 hover:bg-gray-700 transition-colors ${
                  font === "sans" ? "bg-blue-900/20 border-r-2 border-blue-500" : ""
                }`}
              >
                <span className={`text-lg ${font === "sans" ? "font-semibold text-blue-400" : "text-white"}`} style={{fontFamily: 'sans-serif'}}>Aa</span>
                <span className={`${font === "sans" ? "font-semibold text-blue-400" : "text-white"}`}>Sans</span>
              </button>
              <button
                onClick={() => onFontChange("monospace")}
                className={`w-full flex items-center space-x-3 p-3 hover:bg-gray-700 transition-colors ${
                  font === "monospace" ? "bg-blue-900/20 border-r-2 border-blue-500" : ""
                }`}
              >
                <span className={`text-lg ${font === "monospace" ? "font-semibold text-blue-400" : "text-white"}`} style={{fontFamily: 'monospace'}}>Aa</span>
                <span className={`${font === "monospace" ? "font-semibold text-blue-400" : "text-white"}`}>Monospace</span>
              </button>
            </div>
          )}
        </div>

        {/* Tamaño de fuente */}
        <div className="relative">
          <button
            className="w-full flex items-center justify-between p-3 rounded-xl bg-secondary-dark border border-gray-700 shadow-sm hover:shadow-md hover:border-primary hover:bg-primary-dark transition-all duration-200 group"
            onClick={onToggleFontSizeBar}
          >
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-gradient-to-br from-purple-400 to-pink-500 text-white">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </div>
              <span className="font-medium text-white group-hover:text-primary-light">Tamaño</span>
            </div>
            <span className="text-sm text-primary-light group-hover:text-white">{Math.round(fontSize * 100)}%</span>
          </button>
          {fontSizeBarOpen && (
            <div className="absolute right-0 mt-2 w-72 bg-gray-800 rounded-xl shadow-xl border border-gray-700 z-30 p-4">
              <div className="space-y-3">
                <div className="flex justify-between text-sm text-primary-light">
                  <span>50%</span>
                  <span>150%</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="1.5"
                  step="0.1"
                  value={fontSize}
                  onChange={(e) => onFontSizeChange(parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="text-center text-sm font-medium text-white">
                  {Math.round(fontSize * 100)}%
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Sección: Navegación */}
      <div className="space-y-3">
        <h4 className="text-sm font-semibold text-primary-light uppercase tracking-wide">Navegación</h4>
        
        {/* Capítulos */}
        <button
          className="w-full flex items-center space-x-3 p-3 rounded-xl bg-secondary-dark border border-gray-700 shadow-sm hover:shadow-md hover:border-primary hover:bg-primary-dark transition-all duration-200 group"
          onClick={onOpenSidebar}
        >
          <div className="p-2 rounded-lg bg-gradient-to-br from-indigo-400 to-purple-500 text-white">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
          </div>
          <span className="font-medium text-white group-hover:text-primary-light">Capítulos</span>
        </button>

        {/* Marcas */}
        <button
          className="w-full flex items-center space-x-3 p-3 rounded-xl bg-secondary-dark border border-gray-700 shadow-sm hover:shadow-md hover:border-primary hover:bg-primary-dark transition-all duration-200 group"
          onClick={onOpenMarksSidebar}
        >
          <div className="p-2 rounded-lg bg-gradient-to-br from-red-400 to-pink-500 text-white">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
          </div>
          <span className="font-medium text-white group-hover:text-primary-light">Marcas</span>
        </button>
      </div>

      {/* Atajos de teclado */}
      <div className="pt-4 border-t border-gray-700">
        <h4 className="text-sm font-semibold text-primary-light uppercase tracking-wide mb-3">Atajos</h4>
        <div className="space-y-2 text-xs text-primary-light">
          <div className="flex justify-between">
            <span>Abrir/Cerrar menú</span>
            <kbd className="px-2 py-1 bg-secondary-dark rounded text-white">M</kbd>
          </div>
          <div className="flex justify-between">
            <span>Siguiente página</span>
            <kbd className="px-2 py-1 bg-secondary-dark rounded text-white">→</kbd>
          </div>
          <div className="flex justify-between">
            <span>Página anterior</span>
            <kbd className="px-2 py-1 bg-secondary-dark rounded text-white">←</kbd>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default EpubToolbar;
