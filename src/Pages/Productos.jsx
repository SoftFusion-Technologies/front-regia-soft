import React from 'react';
import '../Styles/Productos.css'; // Puedes agregar estilos específicos si lo necesitas

const Productos = () => {
  const productos = [
    {
      id: 1,
      nombre: 'REMERA OVERSIZE OSO',
      precio: '$12.000,00',
      imagen: '/ProductSimple/Remera Oso.webp'
    },
    {
      id: 2,
      nombre: 'REMERA OVERSIZE BELLOW',
      precio: '$12.000,00',
      imagen: '/ProductSimple/Remeras Bellow Pack.webp'
    },
    {
      id: 3,
      nombre: 'REMERA OVERSIZE BROOKLYN',
      precio: '$12.000,00',
      imagen: '/ProductSimple/Remeras OVer Brooklyn 1.webp'
    },
    {
      id: 4,
      nombre: 'REMERA OVERSIZE CORAZÓN',
      precio: '$12.000,00',
      imagen: '/ProductSimple/Remeras OVer Crazon 2 (1).webp'
    },
    {
      id: 5,
      nombre: 'REMERA OVERSIZE FELLOW',
      precio: '$12.000,00',
      imagen: '/ProductSimple/Remeras Evil dog blanca back.webp'
    },
    {
      id: 6,
      nombre: 'REMERA OVERSIZE FELLOW',
      precio: '$12.000,00',
      imagen: '/ProductSimple/Remeras Fellow Blanca (1).webp'
    }
  ];

  return (
    <div className="productos-container py-16 px-4 sm:px-8">
      <h1 className="text-3xl font-bold text-center sm:text-5xl mb-8 font-bignoodle">
        Nuestros Productos
      </h1>

      {/* Grid de productos, se adapta a 3 o 4 por fila */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {productos.map((producto) => (
          <div
            key={producto.id}
            className="producto-card border border-gray-300 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition"
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Productos;
