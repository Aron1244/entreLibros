export default function Newsletter() {
  return (
    <div className="bg-primary-dark/90 py-16 px-4 rounded-lg max-w-4xl mx-auto">
      <div className="text-center">
        <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
          <span className="block">Suscríbete a nuestro boletín</span>
          <span className="block text-primary-light mt-2">
            Y recibe ofertas exclusivas
          </span>
        </h2>
        <p className="mt-4 max-w-md mx-auto text-lg text-white sm:text-xl md:mt-5 md:max-w-2xl">
          Obtén un 10% de descuento en tu primera compra y mantente al día con
          los últimos lanzamientos.
        </p>
        <div className="mt-8 sm:mx-auto sm:max-w-lg sm:flex gap-3">
          <div className="flex-1">
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Ingresa tu email"
              className="block w-full px-5 py-3 text-base rounded-lg placeholder-primary-light/70 shadow-sm focus:ring-2 focus:ring-primary-light focus:outline-none bg-primary-dark border border-primary-light/30 text-white"
            />
          </div>
          <div className="mt-3 sm:mt-0">
            <button
              type="submit"
              className="block w-full px-6 py-3 bg-primary hover:bg-secondary-dark text-white font-medium rounded-lg hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary-light focus:ring-offset-2 focus:ring-offset-primary-dark transition-all duration-200"
            >
              Suscribirse
            </button>
          </div>
        </div>
        <p className="mt-4 text-sm text-primary-light/80">
          Respetamos tu privacidad. Nunca compartiremos tu email.
        </p>
      </div>
    </div>
  );
}
