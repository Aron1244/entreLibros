export default function CategoryGrid() {
  const categories = [
    { name: "Literatura", count: 1250, image: "/images/cat-literatura.jpg" },
    { name: "Ciencia Ficción", count: 780, image: "/images/cat-scifi.jpg" },
    { name: "Autoayuda", count: 650, image: "/images/cat-autoayuda.jpg" },
    { name: "Infantil", count: 920, image: "/images/cat-infantil.jpg" },
    { name: "Negocios", count: 430, image: "/images/cat-negocios.jpg" },
    { name: "eBooks", count: 3500, image: "/images/cat-ebooks.jpg" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {categories.map((category, index) => (
        <a
          key={index}
          href={`/categoria/${category.name.toLowerCase().replace(" ", "-")}`}
          className="group relative block overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
        >
          <img
            src={category.image}
            alt={category.name}
            className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="text-center p-4">
              <h3 className="text-2xl font-bold text-white">{category.name}</h3>
              <p className="text-white">{category.count} títulos</p>
              <button className="mt-2 px-4 py-2 bg-white text-indigo-700 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Explorar
              </button>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}
