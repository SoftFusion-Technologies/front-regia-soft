import React, { useState, useContext } from 'react';
import { CartContext } from '../Components/CartContext'; // Importa el contexto del carrito

const AddToCartButton = ({ product }) => {
  const { addToCart } = useContext(CartContext); // Función para agregar al carrito
  const [quantity, setQuantity] = useState(1); // Estado para la cantidad

  const handleQuantityChange = (e) => {
    const value = Math.max(1, parseInt(e.target.value)); // Evitar valores negativos o cero
    setQuantity(value);
  };

  const handleAddToCart = () => {
    // Llamamos a la función del contexto para agregar el producto con la cantidad seleccionada
    addToCart(product, quantity);
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
    </div>
  );
};

export default AddToCartButton;
