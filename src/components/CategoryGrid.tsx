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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 sm:px-0">
      {categories.map((category, index) => (
        <div
          key={index}
          className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300"
        >
          <a
            href={`/categoria/${category.name.toLowerCase().replace(" ", "-")}`}
            className="block"
          >
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-52 object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/80 to-transparent flex items-end p-6">
              <div className="w-full">
                <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-primary-light transition-colors">
                  {category.name}
                </h3>
                <p className="text-primary-light/90 font-medium">
                  {category.count.toLocaleString()} títulos disponibles
                </p>
                <div className="mt-4 transform translate-y-3 group-hover:translate-y-0 transition-transform duration-300">
                  <span className="inline-block px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors">
                    Explorar categoría
                  </span>
                </div>
              </div>
            </div>
          </a>
        </div>
      ))}
    </div>
  );
}
