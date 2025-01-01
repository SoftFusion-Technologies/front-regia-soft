import React from 'react';
import '../Styles/Productos.css';

const Productos = () => {
  // Muestra las remeras over premium
  const productosPremium = [
    {
      id: 20,
      nombre: 'REMERA OVERSIZE BROOKLYN',
      precio: '$14.500,00',
      newPrecio: 'Precio con efectivo o transferencia $13.000,00',
      imagen: '/ProductSimple/Remeras OVer Brooklyn 1.webp'
    },
    {
      id: 21,
      nombre: 'REMERA OVERSIZE CORAZÓN',
      precio: '$14.500,00',
      newPrecio: 'Precio con efectivo o transferencia $13.000,00',
      imagen: '/ProductSimple/Remeras OVer Crazon 2 (1).webp'
    },
    {
      id: 22,
      nombre: 'REMERA OVERSIZE OLA',
      precio: '$14.500,00',
      newPrecio: 'Precio con efectivo o transferencia $13.000,00',
      imagen: '/ProductSimple/rooppack.webp'
    },
    {
      id: 23,
      nombre: 'REMERA OVERSIZE GRAFITI',
      precio: '$14.500,00',
      newPrecio: 'Precio con efectivo o transferencia $13.000,00',
      imagen: '/ProductSimple/roografiti.webp'
    },
    {
      id: 24,
      nombre: 'REMERA OVERSIZE BOXYFIT ESTRELLA',
      precio: '$14.500,00',
      newPrecio: 'Precio con efectivo o transferencia $13.000,00',
      imagen: '/ProductSimple/rooboxi.webp'
    },
    {
      id: 25,
      nombre: 'REMERA OVERSIZE BACK TO FUTURE',
      precio: '$14.500,00',
      newPrecio: 'Precio con efectivo o transferencia $13.000,00',
      imagen: '/ProductSimple/roobackfuture.webp'
    },
    {
      id: 26,
      nombre: 'REMERA OVERSIZE FRIDAY',
      precio: '$14.500,00',
      newPrecio: 'Precio con efectivo o transferencia $13.000,00',
      imagen: '/ProductSimple/roofriday.webp'
    },
    {
      id: 27,
      nombre: 'REMERA OVERSIZE CONQUER',
      precio: '$14.500,00',
      newPrecio: 'Precio con efectivo o transferencia $13.000,00',
      imagen: '/ProductSimple/rooconquer.webp'
    }
  ];

  const productos = [
    {
      id: 1,
      nombre: 'REMERA OVERSIZE OSO',
      precio: '$13.000,00',
      newPrecio: 'Precio con efectivo o transferencia $11.000,00',
      imagen: '/ProductSimple/Remera Oso.webp'
    },
    {
      id: 2,
      nombre: 'REMERA OVERSIZE BELLOW',
      precio: '$13.000,00',
      newPrecio: 'Precio con efectivo o transferencia $11.000,00',
      imagen: '/ProductSimple/Remeras Bellow Pack.webp'
    },

    {
      id: 3,
      nombre: 'REMERA OVERSIZE BUNNY TIME',
      precio: '$13.000,00',
      newPrecio: 'Precio con efectivo o transferencia $11.000,00',
      imagen: '/ProductSimple/tesebe.webp'
    },
    {
      id: 4,
      nombre: 'REMERA OVERSIZE PARADISE',
      precio: '$13.000,00',
      newPrecio: 'Precio con efectivo o transferencia $11.000,00',
      imagen: '/ProductSimple/paradise.webp'
    },
    {
      id: 5,
      nombre: 'REMERA OVERSIZE FELLOW',
      precio: '$13.000,00',
      newPrecio: 'Precio con efectivo o transferencia $11.000,00',
      imagen: '/ProductSimple/Remeras Fellow Blanca (1).webp'
    },
    {
      id: 6,
      nombre: 'REMERA OVERSIZE FELLOW',
      precio: '$13.000,00',
      newPrecio: 'Precio con efectivo o transferencia $11.000,00',
      imagen: '/ProductSimple/Remeras Evil dog blanca back.webp'
    },
    {
      id: 7,
      nombre: 'REMERA OVERSIZE SHADOW',
      precio: '$13.000,00',
      newPrecio: 'Precio con efectivo o transferencia $11.000,00',
      imagen: '/ProductSimple/shadow.webp'
    },
    {
      id: 8,
      nombre: 'REMERA OVERSIZE REFRESH',
      precio: '$13.000,00',
      newPrecio: 'Precio con efectivo o transferencia $11.000,00',
      imagen: '/ProductSimple/refresh.webp'
    }
  ];

  const handleWhatsAppClick = (nombre, precio) => {
    const phoneNumber = '3863531891'; // Número de WhatsApp
    const message = `Hola, estoy interesado en el producto: ${nombre}, que tiene un precio de ${precio}.`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, '_blank');
  };
  return (
    <div className="productos-container py-16 px-4 sm:px-8">
      <h1 className="text-3xl font-bold text-center sm:text-5xl mb-8 font-bignoodle">
        Nuestros Productos
      </h1>

      <h1 className="text-3xl font-bold text-left sm:text-5xl mb-8 font-bignoodle">
        OVERSIZES PREMIUM
      </h1>
      {/* Grid de productos premium, se adapta a 3 o 4 por fila */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {productosPremium.map((producto) => (
          <div
            key={producto.id}
            className="producto-card border border-gray-300 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition"
            onClick={() =>
              handleWhatsAppClick(producto.nombre, producto.precio)
            }
          >
            <img
              src={producto.imagen}
              alt={producto.nombre}
              className="w-full h-64 object-cover"
            />
            <div className="p-4 text-center">
              <h3 className="text-xl font-semibold text-black">
                {producto.nombre}
              </h3>
              <p className="text-lg text-gray-600">{producto.precio}</p>
              <p className="uppercase text-xs mt-2 mb-2">
                {producto.newPrecio}
              </p>

              <butonn
                className="cursor-pointer font-bignoodle text-2xl"
                onClick={() =>
                  handleWhatsAppClick(producto.nombre, producto.precio)
                }
              >
                COMPRAR
              </butonn>
            </div>
          </div>
        ))}
      </div>

      <h1 className="mt-10 text-3xl font-bold text-left sm:text-5xl mb-8 font-bignoodle">
        CLASICAS
      </h1>
      {/* Grid de productos, se adapta a 3 o 4 por fila */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {productos.map((producto) => (
          <div
            key={producto.id}
            className="producto-card border border-gray-300 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition"
            onClick={() =>
              handleWhatsAppClick(producto.nombre, producto.precio)
            }
          >
            <img
              src={producto.imagen}
              alt={producto.nombre}
              className="w-full h-64 object-cover"
            />
            <div className="p-4 text-center">
              <h3 className="text-xl font-semibold text-black">
                {producto.nombre}
              </h3>
              <p className="text-lg text-gray-600">{producto.precio}</p>
              <p className="uppercase text-xs mt-2 mb-2">
                {producto.newPrecio}
              </p>

              <butonn
                className="cursor-pointer font-bignoodle text-2xl"
                onClick={() =>
                  handleWhatsAppClick(producto.nombre, producto.precio)
                }
              >
                COMPRAR
              </butonn>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Productos;
