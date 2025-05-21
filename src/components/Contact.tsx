import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    // Aquí podrías hacer la llamada a tu API o backend para enviar el formulario
    // Por ejemplo, usando fetch a un endpoint

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500)); // Simula petición async
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-primary-dark">
      <div className="max-w-xl w-full p-8 bg-white rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-primary text-center">
          Contáctanos
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block mb-2 font-semibold text-gray-700"
            >
              Nombre
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Tu nombre"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block mb-2 font-semibold text-gray-700"
            >
              Correo electrónico
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="ejemplo@correo.com"
            />
          </div>
          <div>
            <label
              htmlFor="message"
              className="block mb-2 font-semibold text-gray-700"
            >
              Mensaje
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={5}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Escribe tu mensaje aquí..."
            />
          </div>
          <button
            type="submit"
            disabled={status === "sending"}
            className="w-full py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition disabled:opacity-60"
          >
            {status === "sending" ? "Enviando..." : "Enviar"}
          </button>

          {status === "success" && (
            <p className="mt-4 text-green-600 font-semibold text-center">
              ¡Mensaje enviado con éxito!
            </p>
          )}
          {status === "error" && (
            <p className="mt-4 text-red-600 font-semibold text-center">
              Ocurrió un error al enviar el mensaje. Intenta nuevamente.
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
