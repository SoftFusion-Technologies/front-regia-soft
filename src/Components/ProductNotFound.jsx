import React from 'react';

const ProductNotFound = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="text-center p-8 bg-white border border-gray-300 rounded-lg shadow-lg max-w-md transform transition-all hover:scale-105 duration-300 ease-in-out">
        <div className="mb-6">
          <img
            src="/public/Hero/notfound.avif" // Imagen placeholder para ropa masculina (puedes agregar una más específica)
            alt="Producto no encontrado"
            className="w-24 h-24 mx-auto mb-4 animate-pulse"
          />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Producto no encontrado
        </h2>
        <p className="text-gray-600 mb-4">
          Lo sentimos, no hemos podido encontrar el producto que buscas.
        </p>
        <p className="text-lg text-gray-700 mb-4">
          ¿No lo encuentras? ¡No te preocupes! Escríbenos y buscaremos lo que
          necesitas.
        </p>
        <a
          href="https://wa.me/5493863531891"
          className="inline-block px-6 py-2 text-white bg-blue-600 rounded-full text-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Contáctanos por WhatsApp
        </a>
      </div>
    </div>
  );
};

export default ProductNotFound;
