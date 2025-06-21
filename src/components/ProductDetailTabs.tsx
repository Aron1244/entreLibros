import { useState } from "react";

type Tab = "detalles" | "reseñas" | "envio";

interface ProductDetailTabsProps {
  libro: {
    editorial: string;
    isbn: string;
    paginas: number;
    idioma: string;
    fechaPublicacion: string;
    formato: string;
    dimensiones: string;
    peso: string;
    categoria: string;
    tipo: string;
  };
}

export default function ProductDetailTabs({ libro }: ProductDetailTabsProps) {
  const [activeTab, setActiveTab] = useState<Tab>("detalles");

  const tabs = [
    { id: "detalles" as Tab, label: "Detalles del producto" },
    { id: "reseñas" as Tab, label: "Reseñas" },
    { id: "envio" as Tab, label: "Envío y devoluciones" },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "detalles":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-primary-light">Editorial:</span>
                <span className="font-medium text-gray-900">{libro.editorial}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-primary-light">ISBN:</span>
                <span className="font-medium text-gray-900">{libro.isbn}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-primary-light">Páginas:</span>
                <span className="font-medium text-gray-900">{libro.paginas}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-primary-light">Idioma:</span>
                <span className="font-medium text-gray-900">{libro.idioma}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-primary-light">Fecha de publicación:</span>
                <span className="font-medium text-gray-900">{libro.fechaPublicacion}</span>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-primary-light">Formato:</span>
                <span className="font-medium text-gray-900">{libro.formato}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-primary-light">Dimensiones:</span>
                <span className="font-medium text-gray-900">{libro.dimensiones}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-primary-light">Peso:</span>
                <span className="font-medium text-gray-900">{libro.peso}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-primary-light">Categoría:</span>
                <span className="font-medium text-gray-900">{libro.categoria}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-primary-light">Tipo:</span>
                <span className="font-medium text-gray-900 capitalize">{libro.tipo}</span>
              </div>
            </div>
          </div>
        );

      case "reseñas":
        return (
          <div className="space-y-6">
            <div className="text-center py-8">
              <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No hay reseñas aún</h3>
              <p className="text-primary-light">Sé el primero en dejar una reseña para este libro.</p>
              <button className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark">
                Escribir reseña
              </button>
            </div>
          </div>
        );

      case "envio":
        return (
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="text-lg font-medium text-blue-900 mb-4">Información de envío</h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <p className="text-blue-800 font-medium">Envío gratuito</p>
                    <p className="text-blue-700 text-sm">En pedidos superiores a $25.000</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <p className="text-blue-800 font-medium">Entrega rápida</p>
                    <p className="text-blue-700 text-sm">1-3 días hábiles en Santiago, 3-7 días en regiones</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <p className="text-blue-800 font-medium">Devoluciones</p>
                    <p className="text-blue-700 text-sm">30 días para cambios y devoluciones</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Política de devoluciones</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-gray-400 mr-2">•</span>
                  <span>Los productos deben estar en su estado original y sin usar</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-400 mr-2">•</span>
                  <span>El cliente debe cubrir los gastos de envío de la devolución</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-400 mr-2">•</span>
                  <span>Los eBooks no son elegibles para devoluciones</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-400 mr-2">•</span>
                  <span>El reembolso se procesará dentro de 5-7 días hábiles</span>
                </li>
              </ul>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="border-t border-gray-200">
      <div className="px-8 py-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`border-b-2 font-medium py-2 px-1 transition-colors duration-200 ${
                  activeTab === tab.id
                    ? "border-primary text-primary"
                    : "border-transparent text-primary-light hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="py-6">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
} 