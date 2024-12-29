import React from 'react';
import { Link } from 'react-router-dom'; // Importar Link
import SinStock from '../Config/SinStock'; // Asegúrate de importar el componente

export const sizes = [
  { id: 1, name: 'XS' }, // Extra pequeño
  { id: 2, name: 'S' }, // Pequeño
  { id: 3, name: 'M' }, // Mediano
  { id: 4, name: 'L' }, // Grande
  { id: 5, name: 'XL' }, // Extra grande
  { id: 6, name: 'XXL' }, // Doble extra grande
  { id: 7, name: 'XXXL' } // Triple extra grande
];

// Colores que vamos a mostrar
export const colors = [
  { id: 1, name: 'Rojo', hex: '#FF0000' },
  { id: 2, name: 'Verde', hex: '#00FF00' },
  { id: 3, name: 'Azul', hex: '#0000FF' },
  { id: 4, name: 'Amarillo', hex: '#FFFF00' },
  { id: 5, name: 'Naranja', hex: '#FFA500' },
  { id: 6, name: 'Blanco', hex: '#FFFFFF' }, // Blanco,
  { id: 7, name: 'Negro', hex: '#000000' } // Negro
];

export const products = [
  {
    id: 1, // Agregar un id único
    imageFront: '/ProductsDestacados/ImgCraneFrente.webp',
    imageBack: '/ProductsDestacados/ImgCraneBack.webp',
    title: 'REMERA OVERSIZE CRANE',
    price: '$14.500,00',
    priceDetails: 'Precio con efectivo o transferencia: $13.000,00',
    description: `
      La Remera OVERSIZE CRANE, la prenda ideal para quienes buscan comodidad y estilo. 
      Esta remera oversize de manga corta está fabricada con:
      
      - Material de tela: Jersey peinado 24.1, una tela suave y agradable al tacto que te mantendrá cómodo durante todo el día.
      - Cuidado sencillo: Lavar con agua fría para preservar la calidad y durabilidad de la prenda.
      
      Las medidas están disponibles en la última foto para ayudarte a elegir la talla perfecta.

      Nota: Las fotos han sido tomadas a luz natural con cámaras no profesionales, por lo que el color puede variar levemente.
    `,
    color: null // Guardamos el color elegido
  },
  {
    id: 2, // Agregar un id único
    imageFront: '/ProductsDestacados/Remeras OVer Brooklyn 2.webp',
    imageBack: '/ProductsDestacados/Remeras OVer Brooklyn.webp',
    title: 'REMERA OVERSIZE BROOKLYN',
    price: '$14.500,00',
    priceDetails: 'Precio con efectivo o transferencia: $13.000,00',
    description: `
      La Remera "Brooklyn", la prenda ideal para quienes buscan comodidad y estilo. Esta remera oversize de manga corta.

      Material de tela: Fabricada en jersey peinado 24.1, una tela suave y agradable al tacto que te mantendrá cómodo durante todo el día.
      Cuidado sencillo: Se recomienda lavar con agua fría para preservar la calidad y durabilidad de la prenda.
      Las medidas están disponibles en la última foto para ayudarte a elegir la talla perfecta.

      Nota: Las fotos han sido tomadas a luz natural con cámaras no profesionales, por lo que el color puede variar levemente.`,
    color: null // Guardamos el color elegido
  },
  {
    id: 3, // Agregar un id único
    imageFront: '/ProductsDestacados/Remera over lisa 1.webp',
    imageBack: '/ProductsDestacados/Remera over lisa 2.webp',
    title: 'REMERA OVERSIZE LISA',
    price: '$13.000,00,000',
    priceDetails: 'Llevando 3 o más C/U: $10.000,000',
    description: `
     REMERA OVERSIZE LISA
Descubre la Remera lisa. Esta remera oversize de manga corta.

Material de tela: Fabricada en jersey peinado 24.1, una tela suave y agradable al tacto que te mantendrá cómodo durante todo el día.
Cuidado sencillo: Se recomienda lavar con agua fría para preservar la calidad y durabilidad de la prenda.
Las medidas están disponibles en la última foto para ayudarte a elegir la talla perfecta.

Nota: Las fotos han sido tomadas a luz natural con cámaras no profesionales, por lo que el color puede variar levemente.`,
    color: null // Guardamos el color elegido
  },
  {
    id: 4, // Agregar un id único
    imageFront: '/ProductsDestacados/Remeras OVer Positive.webp',
    imageBack: '/ProductsDestacados/Remeras OVer Positive Back.webp',
    title: 'REMERA OVERSIZE POSITIVE',
    price: '$14.500,00',
    priceDetails: 'Precio con efectivo o transferencia: $13.000,00',
    description: `
    REMERA OVERSIZE POSITIVE
La Remera "Positive", la prenda ideal para quienes buscan comodidad y estilo. Esta remera oversize de manga corta.

Material de tela: Fabricada en jersey peinado 24.1, una tela suave y agradable al tacto que te mantendrá cómodo durante todo el día.
Cuidado sencillo: Se recomienda lavar con agua fría para preservar la calidad y durabilidad de la prenda.
Las medidas están disponibles en la última foto para ayudarte a elegir la talla perfecta.

Nota: Las fotos han sido tomadas a luz natural con cámaras no profesionales, por lo que el color puede variar levemente.`,
    color: null // Guardamos el color elegido
  },
  {
    id: 5, // Agregar un id único
    imageFront: '/ProductsDestacados/Remeras OVer Crazon back.webp',
    imageBack: '/ProductsDestacados/Remeras OVer Crazon 2.webp',
    title: 'REMERA OVERSIZE CORAZÓN',
    price: '$14.500,00',
    priceDetails: 'Precio con efectivo o transferencia: $13.000,00',
    description: `
    REMERA OVERSIZE CORAZÓN
La Remera "Corazón", la prenda ideal para quienes buscan comodidad y estilo. Esta remera oversize de manga corta.

Material de tela: Fabricada en jersey peinado 24.1, una tela suave y agradable al tacto que te mantendrá cómodo durante todo el día.
Cuidado sencillo: Se recomienda lavar con agua fría para preservar la calidad y durabilidad de la prenda.
Las medidas están disponibles en la última foto para ayudarte a elegir la talla perfecta.

Nota: Las fotos han sido tomadas a luz natural con cámaras no profesionales, por lo que el color puede variar levemente.`,
    color: null // Guardamos el color elegido
  },
  {
    id: 6, // Agregar un id único
    imageFront: '/ProductsDestacados/Remeras Fellow Blanca Frente.webp',
    imageBack: '/ProductsDestacados/Remeras Fellow Blanca.webp',
    title: 'REMERA OVERSIZE FELLOW',
    price: '$14.500,00',
    priceDetails: 'Precio con efectivo o transferencia: $13.000,00',
    description: `
   REMERA CLASICA FELLOW
La Remera "Fellow". Esta remera corte clásico de manga corta.

Material de tela: Fabricada en jersey peinado 24.1, una tela suave y agradable al tacto que te mantendrá cómodo durante todo el día.
Cuidado sencillo: Se recomienda lavar con agua fría para preservar la calidad y durabilidad de la prenda.
Las medidas están disponibles en la última fotos.

Se recomienda pedir un talle mas grande. (Si normalmente usas talle 3, pedi un talle 4)

Nota: Las fotos han sido tomadas a luz natural con cámaras no profesionales, por lo que el color puede variar levemente.`,
    color: null // Guardamos el color elegido
  }
];

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
            to={`/product/${product.id}`} // Ruta dinámica con el id del producto
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
              {product.id === 5 && <SinStock />}
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
