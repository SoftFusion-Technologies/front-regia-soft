import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        404 - Página no encontrada
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        La página que estás buscando no existe.
      </p>
      <Link
        to="/"
        className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
      >
        Volver a la página de inicio
      </Link>
    </div>
  );
};

export default NotFound;
