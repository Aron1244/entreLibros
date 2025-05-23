interface FilterBarProps {
  categorias: string[];
  tipos: string[];
  editoriales: string[];
  filtroCategoria: string;
  filtroTipo: string;
  filtroEditorial: string;
  onCategoriaChange: (categoria: string) => void;
  onTipoChange: (tipo: string) => void;
  onEditorialChange: (editorial: string) => void;
  totalLibros: number;
  librosFiltrados: number;
}

export default function FilterBar({
  categorias,
  tipos,
  editoriales,
  filtroCategoria,
  filtroTipo,
  filtroEditorial,
  onCategoriaChange,
  onTipoChange,
  onEditorialChange,
  totalLibros,
  librosFiltrados,
}: FilterBarProps) {
  return (
    <div className="w-full bg-primary rounded-xl shadow-sm p-5 mb-8">
      <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
        <div className="flex flex-col gap-1">
          <h2 className="text-lg font-semibold text-primary-light">Filtrar por</h2>
          <p className="text-sm text-white">
            Mostrando {librosFiltrados} de {totalLibros} libros
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <div className="relative">
            <label
              htmlFor="categoria"
              className="block text-xs font-medium text-white mb-1"
            >
              Categoría
            </label>
            <select
              id="categoria"
              value={filtroCategoria}
              onChange={(e) => onCategoriaChange(e.target.value)}
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm border transition-colors duration-200 appearance-none"
            >
              {categorias.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === "todos" ? "Todas las categorías" : cat}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 pt-5 text-gray-700">
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>

          <div className="relative">
            <label
              htmlFor="tipo"
              className="block text-xs font-medium text-white mb-1"
            >
              Tipo
            </label>
            <select
              id="tipo"
              value={filtroTipo}
              onChange={(e) => onTipoChange(e.target.value)}
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm border transition-colors duration-200 appearance-none"
            >
              {tipos.map((tipo) => (
                <option key={tipo} value={tipo}>
                  {tipo === "todos"
                    ? "Todos los formatos"
                    : tipo === "fisico"
                    ? "Libro físico"
                    : "eBook"}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 pt-5 text-gray-700">
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>

          <div className="relative">
            <label
              htmlFor="editorial"
              className="block text-xs font-medium text-white mb-1"
            >
              Editorial
            </label>
            <select
              id="editorial"
              value={filtroEditorial}
              onChange={(e) => onEditorialChange(e.target.value)}
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm border transition-colors duration-200 appearance-none"
            >
              {editoriales.map((editorial) => (
                <option key={editorial} value={editorial}>
                  {editorial === "todos" ? "Todas las editoriales" : editorial}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 pt-5 text-gray-700">
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>

          {(filtroCategoria !== "todos" || filtroTipo !== "todos" || filtroEditorial !== "todos") && (
            <button
              onClick={() => {
                onCategoriaChange("todos");
                onTipoChange("todos");
                onEditorialChange("todos");
              }}
              className="inline-flex items-center text-sm font-medium text-primary hover:text-primary-dark mt-auto py-2"
            >
              <svg
                className="w-4 h-4 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              Limpiar filtros
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
