import { useState } from "react";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const initialCart: CartItem[] = [
  {
    id: 1,
    name: "Cien años de soledad",
    price: 25000,
    quantity: 2,
    image: "https://images-na.ssl-images-amazon.com/images/I/81r6yD8PgLL.jpg",
  },
  {
    id: 2,
    name: "1984 - George Orwell",
    price: 18000,
    quantity: 1,
    image: "https://images-na.ssl-images-amazon.com/images/I/71kxa1-0mfL.jpg",
  },
];

export default function Cart() {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCart);

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity < 1) return;
    setCartItems((items) =>
      items.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const removeItem = (id: number) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const subtotal = (item: CartItem): number => item.price * item.quantity;

  const totalPrice = cartItems.reduce((acc, item) => acc + subtotal(item), 0);

  return (
    <div className="min-h-screen bg-primary-dark py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Tu carrito de compras
          </h1>
          <p className="text-primary-light text-lg">
            {cartItems.length === 0 
              ? "No tienes productos en tu carrito" 
              : `${cartItems.length} producto${cartItems.length !== 1 ? 's' : ''} en tu carrito`
            }
          </p>
        </div>

        {cartItems.length === 0 ? (
          // Estado vacío mejorado
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <div className="max-w-md mx-auto">
              {/* Ícono de carrito vacío */}
              <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                <svg 
                  className="w-12 h-12 text-gray-400" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" 
                  />
                </svg>
              </div>
              
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Tu carrito está vacío
              </h2>
              
              <p className="text-gray-600 mb-8 leading-relaxed">
                Parece que aún no has agregado ningún libro a tu carrito. 
                Explora nuestro catálogo y encuentra tu próxima lectura favorita.
              </p>
              
              <div className="space-y-4">
                <a 
                  href="/catalog" 
                  className="inline-flex items-center px-8 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  Explorar catálogo
                </a>
                
                <div className="text-sm text-gray-500">
                  ¿Ya tienes una cuenta? 
                  <a href="/profile" className="text-primary hover:text-primary-dark ml-1 font-medium">
                    Inicia sesión
                  </a>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Carrito con productos
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Lista de productos */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Productos ({cartItems.length})
                  </h2>
                </div>
                
                <div className="divide-y divide-gray-200">
                  {cartItems.map((item) => (
                    <div key={item.id} className="p-4 sm:p-6 hover:bg-gray-50 transition-colors duration-200">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
                        {/* Imagen y Info del producto */}
                        <div className="flex flex-1 items-center gap-4">
                          <div className="flex-shrink-0">
                            <div className="w-20 h-24 rounded-lg overflow-hidden border border-gray-200 shadow-sm">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-cover"
                                loading="lazy"
                              />
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-lg font-semibold text-gray-900 truncate">
                              {item.name}
                            </h3>
                            <p className="text-gray-600 mt-1">
                              ${item.price.toLocaleString('es-CL')}
                            </p>
                          </div>
                        </div>

                        {/* Controles y Subtotal */}
                        <div className="flex items-center justify-between mt-4 sm:mt-0 sm:justify-end sm:gap-6">
                          {/* Controles de cantidad */}
                          <div className="flex items-center border border-gray-300 rounded-lg">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                              disabled={item.quantity <= 1}
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                              </svg>
                            </button>
                            <span className="px-4 py-2 text-center min-w-[50px] font-medium">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                              </svg>
                            </button>
                          </div>

                          {/* Subtotal y Eliminar */}
                          <div className="flex items-center gap-2 sm:gap-4">
                             <div className="text-right min-w-[80px] sm:min-w-[100px]">
                                <p className="text-lg font-semibold text-gray-900">
                                  ${subtotal(item).toLocaleString('es-CL')}
                                </p>
                              </div>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                              aria-label={`Eliminar ${item.name} del carrito`}
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Resumen del pedido */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  Resumen del pedido
                </h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal ({cartItems.length} productos)</span>
                    <span>${totalPrice.toLocaleString('es-CL')}</span>
                  </div>
                  
                  <div className="flex justify-between text-gray-600">
                    <span>Envío</span>
                    <span className="text-green-600 font-medium">Gratis</span>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between text-lg font-semibold text-gray-900">
                      <span>Total</span>
                      <span>${totalPrice.toLocaleString('es-CL')}</span>
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={() => alert("Proceder al pago")}
                  className="w-full bg-primary text-white font-semibold py-4 px-6 rounded-lg hover:bg-primary-dark transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  aria-label="Proceder al pago"
                >
                  Proceder al pago
                </button>
                
                <div className="mt-4 text-center">
                  <a 
                    href="/catalog" 
                    className="text-primary hover:text-primary-dark font-medium text-sm"
                  >
                    Continuar comprando
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
