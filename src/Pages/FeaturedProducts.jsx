import React from 'react';

const FeaturedProducts = () => {
  // Datos de ejemplo para los productos
  const products = [
    {
      imageFront: '/src/Images/ProductsDestacados/ImgCraneFrente.webp',
      imageBack: '/src/Images/ProductsDestacados/ImgCraneBack.webp',
      title: 'REMERA OVERSIZE CRANE',
      price: '$14.500',
      priceDetails: 'Precio con efectivo o transferencia: $12.000'
    },
    {
      imageFront: '/src/Images/ProductsDestacados/Remeras OVer Brooklyn 2.webp',
      imageBack: '/src/Images/ProductsDestacados/Remeras OVer Brooklyn.webp',
      title: 'REMERA OVERSIZE BROOKLYN',
      price: '$14.500',
      priceDetails: 'Precio con efectivo o transferencia: $12.000'
    },
    {
      imageFront: '/images/Products/product3.webp',
      imageBack: '/images/Products/product3Back.webp',
      title: 'Producto 3',
      price: '$59.99'
    },
    {
      imageFront: '/images/Products/product4.webp',
      imageBack: '/images/Products/product4Back.webp',
      title: 'Producto 4',
      price: '$69.99'
    },
    {
      imageFront: '/images/Products/product5.webp',
      imageBack: '/images/Products/product5Back.webp',
      title: 'Producto 5',
      price: '$29.99'
    },
    {
      imageFront: '/images/Products/product6.webp',
      imageBack: '/images/Products/product6Back.webp',
      title: 'Producto 6',
      price: '$89.99'
    }
  ];

  return (
    <section className="py-16 px-4 sm:px-8">
      {/* Título de la sección */}
      <h2 className="font-messina text-3xl font-bold text-center mb-8">
        Destacados
      </h2>

      {/* Grid de productos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mx-auto max-w-screen-lg">
        {products.map((product, index) => (
          <div
            key={index}
            className="border border-gray-300 rounded-lg shadow-md overflow-hidden group"
          >
            {/* Contenedor de las imágenes con efecto hover */}
            <div className="relative w-full h-64">
              {/* Imagen frontal */}
              <img
                src={product.imageFront}
                alt={product.title}
                className="w-full h-full object-contain opacity-100 group-hover:opacity-0 absolute top-0 left-0 transition-opacity duration-1000 ease-in-out"
              />
              {/* Imagen de espalda */}
              <img
                src={product.imageBack}
                alt={`${product.title} espalda`}
                className="w-full h-full object-contain opacity-0 group-hover:opacity-100 absolute top-0 left-0 transition-opacity duration-1000 ease-in-out"
              />
            </div>
            <div className="p-4">
              <h3 className="text-xl font-semibold font-bignoodle text-center">
                {product.title}
              </h3>
              <p className="text-lg text-gray-600 mt-2 text-center">
                {product.price}
              </p>
              {/* Mostrar el precio con efectivo o transferencia */}
              <p className="text-sm text-gray-500 mt-2 text-center">
                {product.priceDetails}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;
