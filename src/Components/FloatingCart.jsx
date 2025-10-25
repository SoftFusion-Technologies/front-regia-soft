import React, { useState, useContext } from 'react';
import { CartContext } from './CartContext';

const FloatingCart = () => {
  const { isFloatingCartOpen, setIsFloatingCartOpen, cartItems } =
    useContext(CartContext);

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
        message += `Talle: ${item.selectedSize.name}\n`; // Mostrar el talle
      }
      message += '\n'; // Línea en blanco para separar productos
    });
    message += '¡Gracias!';

    // Codificar el mensaje para URL
    return encodeURIComponent(message);
  };

  // Enlace de WhatsApp con el mensaje generado
  const whatsappLink = `https://wa.me/549+54 9 3812 472636?text=${generateWhatsAppMessage()}`;

  return isFloatingCartOpen ? (
    <>
      {/* Botón flotante para abrir/cerrar el carrito */}
      {/* <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-5 right-5 bg-blue-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-600"
      >
        {isOpen ? 'Cerrar' : 'Carrito'}
      </button> */}

      {/* Carrito flotante */}
      <div className="fixed top-0 right-0 w-80 h-full bg-white shadow-lg border-l border-gray-300 overflow-y-auto z-50">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold">Mi Carrito</h2>
          <button
            onClick={() => setIsFloatingCartOpen(false)}
            className="text-red-500 font-semibold"
          >
            X
          </button>
        </div>
        {cartItems.length === 0 ? (
          <div className="p-4 text-center">El carrito está vacío.</div>
        ) : (
          <ul className="p-4 space-y-4">
            {cartItems.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between p-2 border-b"
              >
                <img
                  src={item.imageFront || '/path/to/default-image.jpg'}
                  alt={item.title}
                  className="w-12 h-12 object-cover rounded"
                />
                <div className="flex-1 ml-4">
                  <p className="text-sm font-medium">{item.title}</p>
                  <p className="text-xs text-gray-500">
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
                <p className="text-sm font-semibold">{item.price}</p>
              </li>
            ))}
          </ul>
        )}
        {/* Botón para finalizar compra */}
        {cartItems.length !== 0 && (
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
        )}

        <div className="text-center mt-6">
          <button
            onClick={() => (window.location.href = '/productos')}
            className="px-6 py-2 bg-blue-500 text-white text-lg font-semibold rounded-md hover:bg-blue-600"
          >
            Seguir Comprando
          </button>
        </div>
      </div>
    </>
  ) : null;
};

export default FloatingCart;
