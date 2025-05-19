export default function BookCarousel() {
  const books = [
    {
      id: 1,
      title: "Cien años de soledad",
      author: "Gabriel García Márquez",
      price: 14900,
      cover: "https://www.espacioforestal.cl/cdn/shop/files/cienanosdesoledaddebolsillotd.png?v=1742224894",
    },
    {
      id: 2,
      title: "1984",
      author: "George Orwell",
      price: 12900,
      cover: "https://anylang.net/sites/default/files/covers/1984.jpg",
    },
    {
      id: 3,
      title: "El principito",
      author: "Antoine de Saint-Exupéry",
      price: 9900,
      cover: "https://contrapunto.cl/cdn/shop/files/27522.jpg?v=1725308995",
    },
  ];

  return (
    <div className="relative bg-primary-light p-6">
      <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-6 scrollbar-hide">
        {books.map((book) => (
          <div key={book.id} className="flex-shrink-0 w-64 snap-start">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all h-full flex flex-col">
              <img
                className="w-full h-48 object-cover"
                src={book.cover}
                alt={book.title}
              />
              <div className="p-4 flex-grow">
                <h3 className="font-semibold text-lg mb-1 text-primary-dark line-clamp-2">
                  {book.title}
                </h3>
                <p className="text-primary-dark/80 text-sm mb-2">
                  {book.author}
                </p>
              </div>
              <div className="p-4 bg-primary/10">
                <p className="font-bold text-primary-dark">
                  ${book.price.toLocaleString()}
                </p>
                <button className="mt-3 w-full bg-primary hover:bg-primary-dark text-white py-2 rounded transition-colors font-medium">
                  Añadir al carrito
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
