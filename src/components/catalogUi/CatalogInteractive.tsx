import { useEffect, useState } from "react";
import BookCard from "./BookCard";
import FilterBar from "./FilterBar";
import SkeletonCard from "./SkeletonCard";
import EmptyState from "./EmptyState";
import Toast from "./Toast";
import Pagination from "./Pagination";

type Libro = {
  id: number;
  titulo: string;
  descripcion: string;
  categoria: string;
  tipo: "fisico" | "ebook";
  precio: number;
  imagen: string;
  editorial: string;
};

type ToastInfo = {
  visible: boolean;
  message: string;
  type: "success" | "error";
};

export default function CatalogoInteractivo() {
  const [libros, setLibros] = useState<Libro[]>([]);
  const [filtroCategoria, setFiltroCategoria] = useState("todos");
  const [filtroTipo, setFiltroTipo] = useState("todos");
  const [filtroEditorial, setFiltroEditorial] = useState("todos");
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<ToastInfo>({
    visible: false,
    message: "",
    type: "success",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8; // Puedes ajustar el tamaño de página

  // Mock expanded dataset for better visual demo
  useEffect(() => {
    // Simula un fetch
    setTimeout(() => {
      const data: Libro[] = [
        {
          id: 1,
          titulo: "Cien años de soledad",
          descripcion:
            "Una obra maestra de Gabriel García Márquez que narra la historia de la familia Buendía a lo largo de siete generaciones en el pueblo ficticio de Macondo.",
          categoria: "Novela",
          tipo: "fisico",
          precio: 14990,
          imagen:
            "https://www.espacioforestal.cl/cdn/shop/files/cienanosdesoledaddebolsillotd.png?v=1742224894",
          editorial: "Sudamericana",
        },
        {
          id: 2,
          titulo: "El poder del ahora",
          descripcion:
            "Una guía espiritual escrita por Eckhart Tolle que enseña la importancia de vivir en el presente y liberarse del pensamiento excesivo.",
          categoria: "Autoayuda",
          tipo: "ebook",
          precio: 7990,
          imagen:
            "https://contrapunto.cl/cdn/shop/files/9789877250992.png?v=1734626851",
          editorial: "Grijalbo",
        },
        {
          id: 3,
          titulo: "El Principito",
          descripcion:
            "Un clásico de la literatura universal escrito por Antoine de Saint-Exupéry. Una historia poética que aborda temas como la amistad, el amor y el sentido de la vida.",
          categoria: "Ficción",
          tipo: "fisico",
          precio: 9990,
          imagen:
            "https://contrapunto.cl/cdn/shop/files/27522.jpg?v=1725308995",
          editorial: "Salamandra",
        },
        {
          id: 4,
          titulo: "Harry Potter y la piedra filosofal",
          descripcion:
            "El primer libro de la serie de J.K. Rowling que introduce el mundo mágico de Hogwarts y sigue las aventuras del joven mago Harry Potter.",
          categoria: "Fantasía",
          tipo: "fisico",
          precio: 12990,
          imagen:
            "https://www.penguinlibros.com/cl/3903314/harry-potter-y-la-piedra-filosofal-harry-potter-1.jpg",
          editorial: "Salamandra",
        },
        {
          id: 5,
          titulo: "Inteligencia Emocional",
          descripcion:
            "Un libro de Daniel Goleman que explora la importancia de las emociones en nuestro desarrollo personal y profesional.",
          categoria: "Psicología",
          tipo: "ebook",
          precio: 8990,
          imagen:
            "https://contrapunto.cl/cdn/shop/files/11501.jpg?v=1725989597",
          editorial: "Kairós",
        },
        {
          id: 6,
          titulo: "1984",
          descripcion:
            "La novela distópica de George Orwell que presenta un futuro totalitario donde el gobierno controla todos los aspectos de la vida de las personas.",
          categoria: "Ficción",
          tipo: "ebook",
          precio: 6990,
          imagen:
            "https://anylang.net/sites/default/files/covers/1984.jpg",
          editorial: "Debolsillo",
        },
        {
          id: 7,
          titulo: "The sunlit man",
          descripcion: "A gripping thriller by the renowned author, exploring themes of power and betrayal in a dystopian future.",
          categoria: "Thriller",
          tipo: "ebook",
          precio: 10990,
          imagen: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1696146860i/60531420.jpg",
          editorial: "Tor",
        }
      ];
      setLibros(data);
      setLoading(false);
    }, 1500);
  }, []);

  // Get unique categories
  const categorias = [
    "todos",
    ...Array.from(new Set(libros.map((l) => l.categoria))),
  ];
  const tipos = ["todos", "fisico", "ebook"];
  const editoriales = [
    "todos",
    ...Array.from(new Set(libros.map((l) => l.editorial).filter(Boolean))),
  ];

  // Filter books based on selected filters
  const librosFiltrados = libros.filter((libro) => {
    const categoriaOK =
      filtroCategoria === "todos" || libro.categoria === filtroCategoria;
    const tipoOK = filtroTipo === "todos" || libro.tipo === filtroTipo;
    const editorialOK = filtroEditorial === "todos" || libro.editorial === filtroEditorial;
    return categoriaOK && tipoOK && editorialOK;
  });

  // Calcular paginación
  const totalPages = Math.ceil(librosFiltrados.length / pageSize) || 1;
  const librosPaginados = librosFiltrados.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // Resetear página al cambiar filtros
  useEffect(() => {
    setCurrentPage(1);
  }, [filtroCategoria, filtroTipo, filtroEditorial]);

  // Handle add to cart
  const handleAddToCart = (libro: Libro) => {
    console.log(`Añadido al carrito: ${libro.titulo}`);
    // Show success toast
    setToast({
      visible: true,
      message: `${libro.titulo} añadido al carrito`,
      type: "success",
    });
    // Here you would integrate real cart logic
  };

  // Handle navigation to detail page
  const handleIrADetalle = (id: number) => {
    console.log(`Navegando a detalles del libro ID: ${id}`);
    // In a real app, you would use router navigation
    // For now, we'll just log the action
    window.location.href = `/libros/${id}`;
  };

  // Reset filters
  const resetFilters = () => {
    setFiltroCategoria("todos");
    setFiltroTipo("todos");
    setFiltroEditorial("todos");
  };

  // Close toast
  const closeToast = () => {
    setToast({ ...toast, visible: false });
  };

  return (
    <div className="min-h-screen bg-primary-dark px-4 py-12">
      <div className="max-w-7xl mx-auto mt-10">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-primary mb-3">
            Nuestra Biblioteca
          </h1>
          <p className="text-lg text-primary-light max-w-2xl mx-auto">
            Explora nuestra colección de libros físicos y digitales. Encuentra
            tu próxima aventura literaria.
          </p>
        </div>

        {/* Filters */}
        <FilterBar
          categorias={categorias}
          tipos={tipos}
          editoriales={editoriales}
          filtroCategoria={filtroCategoria}
          filtroTipo={filtroTipo}
          filtroEditorial={filtroEditorial}
          onCategoriaChange={setFiltroCategoria}
          onTipoChange={setFiltroTipo}
          onEditorialChange={setFiltroEditorial}
          totalLibros={libros.length}
          librosFiltrados={librosFiltrados.length}
        />

        {/* Book Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(6)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : librosFiltrados.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {librosPaginados.map((libro) => (
                <BookCard
                  key={libro.id}
                  libro={libro}
                  onAddToCart={handleAddToCart}
                  onViewDetails={handleIrADetalle}
                />
              ))}
            </div>
            {/* Mostrar paginador siempre que haya libros filtrados */}
            {librosFiltrados.length > 0 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            )}
          </>
        ) : (
          <EmptyState
            message="No se encontraron libros que coincidan con los filtros seleccionados."
            onReset={resetFilters}
          />
        )}
      </div>

      {/* Toast notification */}
      {toast.visible && (
        <Toast message={toast.message} type={toast.type} onClose={closeToast} />
      )}
    </div>
  );
}
