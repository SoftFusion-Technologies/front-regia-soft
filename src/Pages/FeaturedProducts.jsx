import React from 'react';

const FeaturedProducts = () => {
  // Datos de ejemplo para los productos
  const products = [
    {
      imageFront: '/src/Images/ProductsDestacados/ImgCraneFrente.webp',
      imageBack: '/src/Images/ProductsDestacados/ImgCraneBack.webp',
      title: 'REMERA OVERSIZE CRANE',
      price: '$14.500,00',
      priceDetails: 'Precio con efectivo o transferencia: $12.000'
    },
    {
      imageFront: '/src/Images/ProductsDestacados/Remeras OVer Brooklyn 2.webp',
      imageBack: '/src/Images/ProductsDestacados/Remeras OVer Brooklyn.webp',
      title: 'REMERA OVERSIZE BROOKLYN',
      price: '$14.500,00',
      priceDetails: 'Precio con efectivo o transferencia: $12.000'
    },
    {
      imageFront: '/src/Images/ProductsDestacados/Remera over lisa 1.webp',
      imageBack: '/src/Images/ProductsDestacados/Remera over lisa 2.webp',
      title: 'REMERA OVERSIZE LISA',
      price: '$12.000,000',
      priceDetails: 'Llevando 3 o más C/U: $10.000,000'
    },
    {
      imageFront: '/src/Images/ProductsDestacados/Remeras OVer Positive.webp',
      imageBack:
        '/src/Images/ProductsDestacados/Remeras OVer Positive Back.webp',
      title: 'REMERA OVERSIZE POSITIVE',
      price: '$14.500,00',
      priceDetails: 'Precio con efectivo o transferencia: $12.000'
    },
    {
      imageFront:
        '/src/Images/ProductsDestacados/Remeras OVer Crazon back.webp',
      imageBack: '/src/Images/ProductsDestacados/Remeras OVer Crazon 2.webp',
      title: 'REMERA OVERSIZE CORAZÓN',
      price: '$14.500,00',
      priceDetails: 'Precio con efectivo o transferencia: $12.000'
    },
    {
      imageFront:
        '/src/Images/ProductsDestacados/Remeras Fellow Blanca Frente.webp',
      imageBack: '/src/Images/ProductsDestacados/Remeras Fellow Blanca.webp',
      title: 'REMERA OVERSIZE FELLOW',
      price: '$14.500,00',
      priceDetails: 'Precio con efectivo o transferencia: $12.000'
    }
  ];

  return (
    <section id="featured-products" className="py-16 px-4 sm:px-8">
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
