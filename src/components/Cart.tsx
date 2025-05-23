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
    <div className="min-h-screen max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-primary mt-10 text-center">
        Tu carrito de compras
      </h1>

      {cartItems.length === 0 ? (
        <div className="overflow-x-auto rounded-2xl shadow flex justify-center overflow-hidden">
          <table
            className="min-w-full max-w-4xl divide-y divide-gray-200"
            style={{ tableLayout: "fixed" }}
          >
            <thead className="bg-primary-light text-primary-dark">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold w-[45%]">
                  Producto
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold w-[15%]">
                  Cantidad
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold w-[15%]">
                  Precio
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold w-[15%]">
                  Subtotal
                </th>
                <th className="px-6 py-3 text-center text-sm font-semibold w-[10%]">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td
                  colSpan={5}
                  className="py-20 text-gray-600 text-lg text-center px-6"
                >
                  Tu carrito está vacío.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto rounded-2xl shadow flex justify-center overflow-hidden">
            <table className="min-w-full max-w-4xl divide-y divide-gray-200">
              <thead className="bg-primary-light text-primary-dark">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold">
                    Producto
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">
                    Cantidad
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">
                    Precio
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">
                    Subtotal
                  </th>
                  <th className="px-6 py-3 text-center text-sm font-semibold">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {cartItems.map((item) => (
                  <tr key={item.id}>
                    <td className="px-6 py-4 flex items-center gap-4 max-w-[300px]">
                      <div
                        className="rounded overflow-hidden border border-gray-200 shadow-sm flex items-center justify-center"
                        style={{ width: "64px", height: "80px" }}
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="object-contain max-w-full max-h-full"
                          loading="lazy"
                        />
                      </div>
                      <span className="font-medium text-gray-900 truncate max-w-[150px]">
                        {item.name}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <input
                        type="number"
                        min={1}
                        value={item.quantity}
                        onChange={(e) =>
                          updateQuantity(item.id, Number(e.target.value))
                        }
                        className="w-16 border border-gray-300 rounded px-2 py-1 text-center"
                      />
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      ${item.price.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 font-semibold">
                      ${subtotal(item).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        className="text-red-600 hover:text-red-800 font-bold"
                        aria-label={`Eliminar ${item.name} del carrito`}
                        onClick={() => removeItem(item.id)}
                      >
                        ✕
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 flex justify-end items-center gap-6">
            <span className="text-xl font-semibold text-primary-dark">
              Total: ${totalPrice.toLocaleString()}
            </span>
            <button
              className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-secondary-dark transition"
              aria-label="Proceder al pago"
              onClick={() => alert("Proceder al pago")}
            >
              Pagar ahora
            </button>
          </div>
        </>
      )}
    </div>
  );
}
