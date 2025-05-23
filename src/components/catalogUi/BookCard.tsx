import React from "react";

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

interface BookCardProps {
  libro: Libro;
  onAddToCart: (libro: Libro) => void;
  onViewDetails: (id: number) => void;
}

export default function BookCard({
  libro,
  onAddToCart,
  onViewDetails,
}: BookCardProps) {
  return (
    <div className="group relative bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col h-full transform hover:-translate-y-1">
      {/* Book Type Badge */}
      <div
        className={`absolute top-4 right-4 z-10 px-3 py-1 rounded-full text-xs font-medium ${
          libro.tipo === "ebook"
            ? "bg-secondary-light text-secondary-dark"
            : "bg-accent-light text-accent-dark"
        }`}
      >
        {libro.tipo === "ebook" ? "eBook" : "Físico"}
      </div>

      {/* Image Container */}
      <div
        onClick={() => onViewDetails(libro.id)}
        className="relative overflow-hidden cursor-pointer"
      >
        <div className="aspect-[3/4] w-full">
          {/* Usar Astro <Image> para optimización si se usa en .astro, si no, dejar img */}
          <img
            src={libro.imagen}
            alt={libro.titulo}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 brightness-75"
            onError={(e) => {
              // Fallback image if the original fails to load
              (e.target as HTMLImageElement).src =
                "https://images.pexels.com/photos/1766604/pexels-photo-1766604.jpeg?auto=compress&cs=tinysrgb&w=800";
            }}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
          <span className="text-white font-semibold p-4 text-lg">
            Ver detalles
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col gap-2 flex-grow">
        <div className="flex justify-between items-start mb-1">
          <span className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded">
            {libro.categoria}
          </span>
          <span className="inline-block px-2 py-1 bg-gray-200 text-gray-700 text-xs font-medium rounded ml-2">
            {libro.editorial}
          </span>
        </div>

        <h3 className="text-lg font-bold text-gray-800 line-clamp-2">
          {libro.titulo}
        </h3>

        <p className="text-gray-600 text-sm line-clamp-3 flex-grow">
          {libro.descripcion}
        </p>

        <div className="mt-auto pt-3 flex justify-between items-center">
          <span className="text-primary-dark font-bold text-lg">
            ${libro.precio.toLocaleString("es-CL")}
          </span>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(libro);
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary hover:bg-primary-dark text-white font-medium px-3 py-2 text-sm transition-colors duration-200"
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
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            Añadir
          </button>
        </div>
      </div>
    </div>
  );
}
