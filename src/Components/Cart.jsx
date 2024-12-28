import React, { useContext } from 'react';
import { CartContext } from './CartContext'; // Importa el contexto del carrito

const Cart = () => {
  const { cartItems, removeFromCart } = useContext(CartContext); // Consume el contexto

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-6">Mi Carrito</h2>
      {cartItems.length === 0 ? (
        <p className="text-center text-xl text-gray-600">
          No hay productos en el carrito.
        </p>
      ) : (
        <ul className="space-y-6">
          {cartItems.map((item) => (
            <li
              key={item.id}
              className="flex items-center justify-between p-4 border-b border-gray-300 rounded-md shadow-sm"
            >
              {/* Imagen del producto */}
              <img
                src={item.imageFront || '/path/to/default-image.jpg'} // Imagen por defecto si no existe
                alt={item.title}
                className="w-20 h-20 object-cover rounded-md"
              />
              <div className="flex flex-col flex-1 ml-4">
                {/* Título del producto */}
                <p className="text-lg font-semibold text-gray-800">
                  {item.title}
                </p>
                {/* Precio del producto */}
                <p className="text-md text-gray-600">{item.price}</p>
                {/* Cantidad */}
                <p className="text-sm text-gray-500">
                  Cantidad: {item.quantity}
                </p>
              </div>
              {/* Botón para eliminar */}
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-600 hover:text-red-800 font-semibold"
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;
