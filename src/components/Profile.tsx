import { useState } from "react";

interface Book {
  id: string;
  title: string;
  author: string;
  cover: string;
  progress: number;
}

interface ReadingStats {
  totalBooks: number;
  booksRead: number;
  pagesRead: number;
  readingStreak: number;
  favoriteGenre: string;
}

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [isEditing, setIsEditing] = useState(false);

  // Datos de ejemplo
  const user = {
    name: "Test User",
    email: "test.user@email.com",
    avatar: "https://uploads.coppermind.net/thumb/Windrunner_and_Heavenly_Ones_by_Georgi_Madzharov.jpg/483px-Windrunner_and_Heavenly_Ones_by_Georgi_Madzharov.jpg",
    joinDate: "Enero 2024",
    bio: "Amante de la literatura clásica y la poesía. Siempre en busca de nuevas historias que me transporten a otros mundos.",
    location: "Santiago, Chile"
  };

  const stats: ReadingStats = {
    totalBooks: 24,
    booksRead: 18,
    pagesRead: 5420,
    readingStreak: 7,
    favoriteGenre: "Ficción Literaria"
  };

  const favoriteBooks: Book[] = [
    {
      id: "1",
      title: "Cien años de soledad",
      author: "Gabriel García Márquez",
      cover: "/api/placeholder/80/120",
      progress: 100
    },
    {
      id: "2",
      title: "El Aleph",
      author: "Jorge Luis Borges",
      cover: "/api/placeholder/80/120",
      progress: 85
    },
    {
      id: "3",
      title: "Pedro Páramo",
      author: "Juan Rulfo",
      cover: "/api/placeholder/80/120",
      progress: 60
    }
  ];

  const currentlyReading: Book[] = [
    {
      id: "4",
      title: "Los detectives salvajes",
      author: "Roberto Bolaño",
      cover: "/api/placeholder/80/120",
      progress: 45
    }
  ];

  const tabs = [
    { id: "overview", label: "Resumen", icon: "📊" },
    { id: "books", label: "Mis Libros", icon: "📚" },
    { id: "stats", label: "Estadísticas", icon: "📈" },
    { id: "settings", label: "Configuración", icon: "⚙️" }
  ];

  return (
    <div className="min-h-screen bg-primary-dark pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header del perfil */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-primary to-secondary h-32 relative">
            <div className="absolute -bottom-16 left-8">
              <div className="relative">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-32 h-32 rounded-full border-4 border-white shadow-lg bg-secondary-light"
                />
                <button className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full shadow-lg hover:bg-primary-dark transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          
          <div className="pt-20 pb-6 px-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-primary-dark mb-2">{user.name}</h1>
                <p className="text-secondary text-lg mb-2">{user.location}</p>
                <p className="text-gray-600 mb-4">Miembro desde {user.joinDate}</p>
                <p className="text-gray-700 max-w-2xl">{user.bio}</p>
              </div>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="mt-4 md:mt-0 bg-primary text-white px-6 py-3 rounded-xl hover:bg-primary-dark transition-colors font-semibold"
              >
                {isEditing ? "Guardar" : "Editar Perfil"}
              </button>
            </div>
          </div>
        </div>

        {/* Tabs de navegación */}
        <div className="bg-white rounded-xl shadow-lg mb-8">
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 font-semibold transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? "text-primary border-b-2 border-primary bg-primary-light/10"
                    : "text-gray-600 hover:text-primary hover:bg-gray-50"
                }`}
              >
                <span>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Contenido de las tabs */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          {activeTab === "overview" && (
            <div className="animate-fade-in space-y-8">
              {/* Estadísticas rápidas */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center p-6 bg-gradient-to-br from-primary-light to-secondary-light rounded-xl">
                  <div className="text-3xl font-bold text-primary-dark">{stats.totalBooks}</div>
                  <div className="text-sm text-gray-600">Libros en biblioteca</div>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-secondary to-secondary-light rounded-xl">
                  <div className="text-3xl font-bold text-primary-dark">{stats.booksRead}</div>
                  <div className="text-sm text-gray-600">Libros leídos</div>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-accent to-accent-light rounded-xl">
                  <div className="text-3xl font-bold text-primary-dark">{stats.pagesRead}</div>
                  <div className="text-sm text-gray-600">Páginas leídas</div>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-primary to-primary-light rounded-xl">
                  <div className="text-3xl font-bold text-white">{stats.readingStreak}</div>
                  <div className="text-sm text-white/80">Días seguidos</div>
                </div>
              </div>

              {/* Libros actualmente leyendo */}
              <div>
                <h3 className="text-xl font-bold text-primary-dark mb-4">Actualmente leyendo</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {currentlyReading.map((book) => (
                    <div key={book.id} className="bg-gray-50 rounded-xl p-4 hover:shadow-md transition-shadow">
                      <div className="flex gap-4">
                        <img src={book.cover} alt={book.title} className="w-16 h-24 object-cover rounded-lg shadow-md" />
                        <div className="flex-1">
                          <h4 className="font-semibold text-primary-dark mb-1">{book.title}</h4>
                          <p className="text-sm text-gray-600 mb-3">{book.author}</p>
                          <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                            <div 
                              className="bg-primary h-2 rounded-full transition-all duration-300"
                              style={{ width: `${book.progress}%` }}
                            ></div>
                          </div>
                          <p className="text-xs text-gray-500">{book.progress}% completado</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "books" && (
            <div className="animate-fade-in space-y-8">
              <div>
                <h3 className="text-xl font-bold text-primary-dark mb-4">Mis libros favoritos</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {favoriteBooks.map((book) => (
                    <div key={book.id} className="bg-gray-50 rounded-xl p-4 hover:shadow-md transition-shadow">
                      <div className="flex gap-4">
                        <img src={book.cover} alt={book.title} className="w-16 h-24 object-cover rounded-lg shadow-md" />
                        <div className="flex-1">
                          <h4 className="font-semibold text-primary-dark mb-1">{book.title}</h4>
                          <p className="text-sm text-gray-600 mb-3">{book.author}</p>
                          <div className="flex items-center gap-2">
                            <div className="flex text-yellow-400">
                              {[...Array(5)].map((_, i) => (
                                <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ))}
                            </div>
                            <span className="text-sm text-gray-500">Completado</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "stats" && (
            <div className="animate-fade-in space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-gradient-to-br from-primary-light to-secondary-light rounded-xl p-6">
                  <h3 className="text-xl font-bold text-primary-dark mb-4">Género favorito</h3>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary-dark mb-2">{stats.favoriteGenre}</div>
                    <p className="text-gray-600">Basado en tu historial de lectura</p>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-secondary to-secondary-light rounded-xl p-6">
                  <h3 className="text-xl font-bold text-primary-dark mb-4">Progreso anual</h3>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary-dark mb-2">{Math.round((stats.booksRead / stats.totalBooks) * 100)}%</div>
                    <p className="text-gray-600">Objetivo de lectura cumplido</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-primary-dark mb-4">Actividad de lectura</h3>
                <div className="grid grid-cols-7 gap-2">
                  {[...Array(30)].map((_, i) => (
                    <div
                      key={i}
                      className={`h-8 rounded ${
                        Math.random() > 0.3 
                          ? 'bg-primary' 
                          : 'bg-gray-200'
                      }`}
                      title={`Día ${i + 1}`}
                    ></div>
                  ))}
                </div>
                <p className="text-sm text-gray-600 mt-2">Últimos 30 días</p>
              </div>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="animate-fade-in space-y-6">
              <div>
                <h3 className="text-xl font-bold text-primary-dark mb-4">Configuración de la cuenta</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nombre</label>
                    <input
                      type="text"
                      defaultValue={user.name}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      defaultValue={user.email}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Biografía</label>
                    <textarea
                      defaultValue={user.bio}
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Ubicación</label>
                    <input
                      type="text"
                      defaultValue={user.location}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-200">
                <h3 className="text-xl font-bold text-primary-dark mb-4">Preferencias de lectura</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Notificaciones de nuevos libros</span>
                    <button className="w-12 h-6 bg-primary rounded-full relative">
                      <div className="w-4 h-4 bg-white rounded-full absolute top-1 right-1 transition-transform"></div>
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Recordatorios de lectura</span>
                    <button className="w-12 h-6 bg-gray-300 rounded-full relative">
                      <div className="w-4 h-4 bg-white rounded-full absolute top-1 left-1 transition-transform"></div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile; 