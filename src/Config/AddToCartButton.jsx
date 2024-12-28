import React, { useState, useContext } from 'react';
import { CartContext } from '../Components/CartContext'; // Importa el contexto del carrito
import { useNavigate } from 'react-router-dom'; // Para redirigir al carrito

const AddToCartButton = ({ product, selectedColor }) => {
  const { addToCart } = useContext(CartContext); // Función para agregar al carrito
  const [quantity, setQuantity] = useState(1); // Estado para la cantidad
  const [showModal, setShowModal] = useState(false); // Estado para mostrar el modal
  const navigate = useNavigate(); // Para navegar al carrito

  const handleQuantityChange = (e) => {
    const value = Math.max(1, parseInt(e.target.value)); // Evitar valores negativos o cero
    setQuantity(value);
  };

  const handleAddToCart = () => {
    const productToAdd = {
      ...product,
      selectedColor: selectedColor || null, // Si no se seleccionó color, lo dejamos como null
      quantity: quantity // Agregar la cantidad al producto
    };
    addToCart(productToAdd); // Agregar el producto al carrito

    setShowModal(true);

    // Ocultar el mensaje después de 2 segundos
    setTimeout(() => setShowModal(false), 2000);
  };

  const handleViewCart = () => {
    navigate('/cart'); // Redirigir al carrito
  };

  const handleCloseModal = () => {
    setShowModal(false); // Cerrar el modal
  };
  return (
    <div className="flex items-center space-x-4">
      {/* Campo de cantidad */}
      <div className="flex items-center border border-gray-300 rounded-md">
        <button
          className="px-2 py-1 text-lg font-semibold text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-l-md"
          onClick={() => setQuantity(quantity - 1 > 0 ? quantity - 1 : 1)}
        >
          -
        </button>
        <input
          type="number"
          value={quantity}
          min="1"
          onChange={handleQuantityChange}
          className="w-12 text-center text-lg font-semibold border-0 focus:ring-2 focus:ring-blue-500"
        />
        <button
          className="px-2 py-1 text-lg font-semibold text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-r-md"
          onClick={() => setQuantity(quantity + 1)}
        >
          +
        </button>
      </div>

      {/* Botón de agregar al carrito */}
      <button
        onClick={handleAddToCart}
        className="px-6 py-2 bg-pink-600 text-white font-semibold rounded-md hover:bg-pink-700 transition duration-200"
      >
        Agregar al carrito
      </button>

      {/* Modal de confirmación */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <div className="text-lg font-semibold text-gray-800">
              ¡Producto agregado al carrito!
            </div>
            <div className="mt-4 flex justify-between">
              <button
                onClick={handleViewCart}
                className="px-4 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700"
              >
                Ver carrito
              </button>
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddToCartButton;
