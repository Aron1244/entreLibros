export default function Testimonials() {
  const testimonials = [
    {
      quote:
        "EntreLibros tiene la mejor selección de libros que he visto. Mi pedido llegó en perfecto estado y antes de lo esperado.",
      author: "María González",
      role: "Lectora ávida",
    },
    {
      quote:
        "La compra de eBooks es súper sencilla y la calidad es excelente. Ahora compro todos mis libros aquí.",
      author: "Carlos Mendoza",
      role: "Fanático de la ciencia ficción",
    },
    {
      quote:
        "El servicio al cliente es excepcional. Me ayudaron con una devolución sin problemas. 100% recomendado.",
      author: "Ana Torres",
      role: "Profesora universitaria",
    },
  ];

  return (
    <div className="grid md:grid-cols-3 gap-8">
      {testimonials.map((testimonial, index) => (
        <div key={index} className="bg-white p-6 rounded-lg shadow-md">
          <div className="mb-4">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="text-yellow-400">
                ★
              </span>
            ))}
          </div>
          <p className="text-gray-600 italic mb-4">"{testimonial.quote}"</p>
          <div>
            <p className="font-semibold text-gray-900">{testimonial.author}</p>
            <p className="text-sm text-gray-500">{testimonial.role}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
