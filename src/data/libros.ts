export interface Libro {
  id: number;
  titulo: string;
  descripcion: string;
  categoria: string;
  tipo: "fisico" | "ebook";
  precio: number;
  imagen: string;
  editorial: string;
  autor: string;
  isbn: string;
  paginas: number;
  idioma: string;
  fechaPublicacion: string;
  formato: string;
  dimensiones: string;
  peso: string;
  stock: number;
  rating: number;
  reviews: number;
  generos: string[];
  tags: string[];
}

export function getMockLibros(): Libro[] {
  return [
    {
      id: 1,
      titulo: "Cien años de soledad",
      descripcion: "Una obra maestra de Gabriel García Márquez que narra la historia de la familia Buendía a lo largo de siete generaciones en el pueblo ficticio de Macondo. Esta novela es considerada una de las obras más importantes de la literatura hispanoamericana y universal del siglo XX.",
      categoria: "Novela",
      tipo: "fisico",
      precio: 14990,
      imagen: "https://www.espacioforestal.cl/cdn/shop/files/cienanosdesoledaddebolsillotd.png?v=1742224894",
      editorial: "Sudamericana",
      autor: "Gabriel García Márquez",
      isbn: "978-950-07-0001-2",
      paginas: 432,
      idioma: "Español",
      fechaPublicacion: "1967",
      formato: "Tapa blanda",
      dimensiones: "13 x 20 cm",
      peso: "350g",
      stock: 15,
      rating: 4.8,
      reviews: 1247,
      generos: ["Realismo mágico", "Literatura latinoamericana", "Ficción"],
      tags: ["Clásico", "Premio Nobel", "Macondo"]
    },
    {
      id: 2,
      titulo: "El poder del ahora",
      descripcion: "Una guía espiritual escrita por Eckhart Tolle que enseña la importancia de vivir en el presente y liberarse del pensamiento excesivo. Este libro transformador ha ayudado a millones de personas a encontrar paz interior y vivir una vida más plena.",
      categoria: "Autoayuda",
      tipo: "ebook",
      precio: 7990,
      imagen: "https://contrapunto.cl/cdn/shop/files/9789877250992.png?v=1734626851",
      editorial: "Grijalbo",
      autor: "Eckhart Tolle",
      isbn: "978-987-725-099-2",
      paginas: 256,
      idioma: "Español",
      fechaPublicacion: "1997",
      formato: "eBook",
      dimensiones: "Digital",
      peso: "2.5 MB",
      stock: 999,
      rating: 4.6,
      reviews: 892,
      generos: ["Espiritualidad", "Desarrollo personal", "Filosofía"],
      tags: ["Mindfulness", "Consciencia", "Transformación"]
    },
    {
      id: 3,
      titulo: "El Principito",
      descripcion: "Un clásico de la literatura universal escrito por Antoine de Saint-Exupéry. Una historia poética que aborda temas como la amistad, el amor y el sentido de la vida a través de las aventuras de un pequeño príncipe que viaja por diferentes planetas.",
      categoria: "Ficción",
      tipo: "fisico",
      precio: 9990,
      imagen: "https://contrapunto.cl/cdn/shop/files/27522.jpg?v=1725308995",
      editorial: "Salamandra",
      autor: "Antoine de Saint-Exupéry",
      isbn: "978-84-16120-27-5",
      paginas: 112,
      idioma: "Español",
      fechaPublicacion: "1943",
      formato: "Tapa dura",
      dimensiones: "15 x 21 cm",
      peso: "280g",
      stock: 8,
      rating: 4.9,
      reviews: 2156,
      generos: ["Literatura infantil", "Filosofía", "Aventura"],
      tags: ["Clásico", "Poético", "Universal"]
    }
  ];
} 