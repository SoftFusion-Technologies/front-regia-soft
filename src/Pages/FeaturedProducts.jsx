import React from 'react';
import { Link } from 'react-router-dom'; // Importar Link
import SinStock from '../Config/SinStock'; // Asegúrate de importar el componente
import { products } from '../Helpers/productsPremium.js'; // Importar los productos

const FeaturedProducts = () => {
  // Datos de ejemplo para los productos

  return (
    <section id="featured-products" className="py-16 px-4 sm:px-8">
      {/* Título de la sección */}
      <h2 className="font-messina text-3xl font-bold text-center mb-8">
        Destacados
      </h2>

      {/* Grid de productos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mx-auto max-w-screen-lg">
        {products.map((product) => (
          <Link
            key={product.id} // Usamos el id del producto como key
            to={`/product/${product.id}/${encodeURIComponent(product.title)}`} // Ruta dinámica con id y nombre del producto
            className="border border-gray-300 rounded-lg shadow-md overflow-hidden group"
          >
            <div className="relative w-full h-64">
              <img
                src={product.imageFront}
                alt={product.title}
                className="w-full h-full object-contain opacity-100 group-hover:opacity-0 absolute top-0 left-0 transition-opacity duration-1000 ease-in-out"
              />
              <img
                src={product.imageBack}
                alt={`${product.title} espalda`}
                className="w-full h-full object-contain opacity-0 group-hover:opacity-100 absolute top-0 left-0 transition-opacity duration-1000 ease-in-out"
              />
              {/* Si el producto tiene id 2, mostramos el componente SinStock */}
              {/* {product.id === 5 && <SinStock />} */}
            </div>
            <div className="p-4">
              <h3 className="text-xl font-semibold font-bignoodle text-center">
                {product.title}
              </h3>
              <p className="text-lg text-gray-600 mt-2 text-center">
                {product.price}
              </p>
              <p className="text-sm text-gray-500 mt-2 text-center">
                {product.priceDetails}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;
