import { getMockLibros } from "../data/libros";

export default function BookCarousel() {
  const books = getMockLibros();

  return (
    <div className="relative bg-primary-light">
      <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 p-6 scrollbar-hide group">
        {books.map((book) => (
          <div key={book.id} className="flex-shrink-0 w-64 snap-start transition-all duration-300 group-hover:scale-95 group-hover:opacity-60 hover:scale-105 hover:opacity-100 hover:z-10">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all h-full flex flex-col">
              <img
                className="w-full h-48 object-cover"
                src={book.imagen}
                alt={book.titulo}
                onError={(e) => {
                  e.currentTarget.src = 'https://images.pexels.com/photos/1766604/pexels-photo-1766604.jpeg?auto=compress&cs=tinysrgb&w=800';
                }}
              />
              <div className="p-4 flex-grow">
                <h3 className="font-semibold text-lg mb-1 text-primary-dark line-clamp-2">
                  {book.titulo}
                </h3>
                <p className="text-primary-dark/80 text-sm mb-2">
                  {book.autor}
                </p>
                <div className="flex items-center mb-2">
                  <div className="flex items-center">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg 
                        key={i}
                        className={`w-4 h-4 ${i < Math.floor(book.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-xs text-gray-500 ml-1">({book.reviews})</span>
                </div>
              </div>
              <div className="p-4 bg-primary/10">
                <p className="font-bold text-primary-dark">
                  ${book.precio.toLocaleString("es-CL")}
                </p>
                <a 
                  href={`/libros/${book.id}`}
                  className="mt-3 w-full bg-primary hover:bg-primary-dark text-white py-2 rounded transition-colors font-medium block text-center"
                >
                  Ver detalles
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
