import React, { useContext, useEffect } from 'react';
import { CartContext } from './CartContext';

const Cart = () => {
  // Desplazar hacia la parte superior cuando el componente se monte
  useEffect(() => {
    window.scrollTo(0, 0); // Desplazar hacia arriba de la página
  }, []);
  const { cartItems, removeFromCart } = useContext(CartContext);

  // Función para generar el mensaje para WhatsApp
  const generateWhatsAppMessage = () => {
    let message =
      '¡Hola! Quiero realizar una compra. Aquí están los detalles:\n\n';

    cartItems.forEach((item) => {
      message += `Producto: ${item.title}\n`;
      message += `Cantidad: ${item.quantity}\n`;
      message += `Precio: ${item.price}\n`;
      if (item.selectedColor) {
        message += `Color: ${item.selectedColor.name}\n`;
      }
      if (item.selectedSize) {
        message += `Talle: ${item.selectedSize}\n`; // Mostrar el talle
      }
      message += '\n'; // Línea en blanco para separar productos
    });
    message += '¡Gracias!';

    // Codificar el mensaje para URL
    return encodeURIComponent(message);
  };

  // Enlace de WhatsApp con el mensaje generado
  const whatsappLink = `https://wa.me/5493863531891?text=${generateWhatsAppMessage()}`;

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
                src={item.imageFront || '/path/to/default-image.jpg'}
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
                {/* Mostrar el color seleccionado */}
                {item.selectedColor && item.selectedColor.name && (
                  <div className="flex items-center mt-2">
                    <div
                      style={{
                        backgroundColor: item.selectedColor.hex,
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%'
                      }}
                      className="mr-2"
                    ></div>
                    <p className="text-sm text-gray-600">
                      {item.selectedColor.name}
                    </p>
                  </div>
                )}

                {/* Mostrar el talle seleccionado */}
                {item.selectedSize && (
                  <p className="text-sm text-gray-600 mt-2">
                    Talle: {item.selectedSize.name}
                  </p>
                )}
              </div>
              {/* Botón para eliminar */}
              <button
                onClick={() => removeFromCart(item.id, item.selectedColor)} // Pasa el color también
                className="text-red-600 hover:text-red-800 font-semibold"
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Botón para finalizar compra */}
      <div className="text-center mt-6">
        <a
          href={whatsappLink}
          className="px-6 py-2 bg-green-500 text-white text-lg font-semibold rounded-md hover:bg-green-600"
          target="_blank"
          rel="noopener noreferrer"
        >
          Finalizar Compra
        </a>
      </div>
    </div>
  );
};

export default Cart;
