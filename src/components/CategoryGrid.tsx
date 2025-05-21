export default function CategoryGrid() {
  const categories = [
    {
      name: "Literatura",
      count: 1250,
      image:
        "https://i0.wp.com/librosarcanos.es/wp-content/uploads/2023/11/que-es-la-literatura-en-el-arte.jpg",
    },
    {
      name: "Ciencia Ficción",
      count: 780,
      image:
        "https://i0.wp.com/xn--oo-yjab.cl/wp-content/uploads/2020/06/paisaje-Ciencia-Ficci%C3%B3n-CGI-Ia.jpg?resize=700%2C412&ssl=1",
    },
    {
      name: "Autoayuda",
      count: 650,
      image:
        "https://www.psicologiamenssana.com/wp-content/uploads/2022/10/Diferencias-entre-acudir-a-terapia-psicol%C3%B3gica-o-recurrir-a-la-autoayuda-660x360.jpg",
    },
    {
      name: "Infantil",
      count: 920,
      image:
        "https://img.freepik.com/vector-premium/educacion-infantil_29937-3057.jpg",
    },
    {
      name: "Negocios",
      count: 430,
      image:
        "https://gananci.org/wp-content/uploads/2016/07/Plan-de-negocios.jpg",
    },
    {
      name: "eBooks",
      count: 3500,
      image:
        "https://framerusercontent.com/images/lXoOL29cza7cTLnHejEOYeiQ9s.jpg",
    },
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
              className="w-full h-52 object-cover filter contrast-50 transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/80 to-transparent flex items-end p-6">
              <div className="w-full">
                <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-primary-light transition-colors">
                  {category.name}
                </h3>
                <p className="text-primary-light/90 font-bold text-white">
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
