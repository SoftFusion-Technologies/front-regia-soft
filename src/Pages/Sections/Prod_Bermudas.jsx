import React, { useEffect, useState } from 'react';
import '../../Styles/Productos.css';
import { Link } from 'react-router-dom'; // Importar Link
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import ProductNotFound from '../../Components/ProductNotFound';

const Prod_Bermudas = () => {
  // Desplazar hacia la parte superior cuando el componente se monte
  useEffect(() => {
    window.scrollTo({
      top: 0, // Desplazar hacia arriba de la página
      behavior: 'smooth' // Añadir desplazamiento suave
    });
  }, []);

  // Estado para manejar la búsqueda
  const [searchQuery, setSearchQuery] = useState('');

  const productos = [
    {
      id: 1,
      nombre: 'REMERA OVERSIZE OSO',
      precio: '$13.500,00',
      newPrecio: 'Precio con efectivo o transferencia $11.000,00',
      categoria: 'simple',
      imagen: '/ProductSimple/Remera Oso.webp'
    },
    {
      id: 2,
      nombre: 'REMERA OVERSIZE BELLOW',
      precio: '$13.500,00',
      newPrecio: 'Precio con efectivo o transferencia $11.000,00',
      categoria: 'simple',
      imagen: '/ProductSimple/Remeras Bellow Pack.webp'
    },

    {
      id: 3,
      nombre: 'REMERA OVERSIZE BUNNY TIME',
      precio: '$13.500,00',
      newPrecio: 'Precio con efectivo o transferencia $11.000,00',
      categoria: 'simple',
      imagen: '/ProductSimple/tesebe.webp'
    },
    {
      id: 4,
      nombre: 'REMERA OVERSIZE PARADISE',
      precio: '$13.500,00',
      newPrecio: 'Precio con efectivo o transferencia $11.000,00',
      categoria: 'simple',
      imagen: '/ProductSimple/paradise.webp'
    }
  ];

  const filteredProductos = productos.filter((producto) =>
    producto.nombre.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="productos-container py-16 px-4 sm:px-8">
      <h1 className="text-3xl font-bold text-center sm:text-5xl mb-8 font-bignoodle">
        BERMUDAS
      </h1>

      {/* Campo de búsqueda */}
      <div className="relative mb-8">
        {/* Input con lupa */}
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Buscar productos..."
          className="p-2 border border-gray-300 rounded-lg w-full sm:w-1/3 mx-auto pl-10"
        />
        <FontAwesomeIcon
          icon={faSearch}
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
        />
      </div>
      <div>
        {' '}
        {filteredProductos.some(
          (producto) => producto.categoria === 'simple'
        ) && (
          <h1 className="mt-10 text-3xl font-bold text-left sm:text-5xl mb-8 font-bignoodle">
            CLASICAS
          </h1>
        )}
        {/* Grid de productos, se adapta a 3 o 4 por fila */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredProductos.map((producto) => (
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

      {productos.length === 0 || filteredProductos.length === 0 ? (
        <div className="-mt-56">
          <ProductNotFound />
        </div>
      ) : null}
    </div>
  );
};

export default Prod_Bermudas;
