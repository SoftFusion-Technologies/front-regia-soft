import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { products } from '../Helpers/productsPremium'; // Importar los productos
import { productosURL } from '../Helpers/productosURL'; // Importar los productos simples
import { colors, sizes } from '../Helpers/helpers';
import { CartContext } from '../Components/CartContext'; // Importa el contexto del carrito
import AddToCartButton from '../Config/AddToCartButton';

const ProductDetail = () => {
  // Desplazar hacia la parte superior cuando el componente se monte
  useEffect(() => {
    window.scrollTo(0, 0); // Desplazar hacia arriba de la página
  }, []);

  const { id } = useParams(); // Obtener el id del producto desde la URL
  const [product, setProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null); // Nuevo estado para el color seleccionado
  const [selectedSize, setSelectedSize] = useState(null); // Nuevo estado para el color seleccionado
  const [sizeError, setSizeError] = useState(false);
  const [colorError, setColorError] = useState(false);

  const [currentImage, setCurrentImage] = useState(null);
  useEffect(() => {
    // Combina los productos de ambos arrays (eliminando duplicados)
    const allProducts = [
      ...products,
      ...productosURL.filter(
        (productSimple) =>
          !products.some(
            (productFeatured) => productFeatured.id === productSimple.id
          )
      )
    ];

    // Buscar el producto en el array combinado
    const foundProduct = allProducts.find((p) => p.id === parseInt(id));
    setProduct(foundProduct);

    // Si se encuentra el producto, establecer la imagen inicial
    if (foundProduct) {
      setCurrentImage(foundProduct.imageFront);
    }
  }, [id]);

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
    setSizeError(false); // Reset error when a size is selected
  };

  const handleColorSelect = (color) => {
    setSelectedColor(color);
    setColorError(false); // Reset error when a color is selected
  };

  if (!product) {
    return (
      <p className="text-center text-gray-600 text-lg mt-8">
        Producto no encontrado
      </p>
    );
  }

  return (
    <section className="product-detail py-16 px-4 sm:px-8 bg-gray-50">
      <div className="container mx-auto flex flex-col md:flex-row items-start">
        {/* Contenedor de miniaturas e imagen principal */}
        <div className="product-image flex flex-col md:flex-row-reverse flex-1 items-center">
          {/* Imagen principal */}
          <div className="w-3/4 md:w-full mb-4 md:mb-0">
            <img
              src={currentImage}
              alt={product.title}
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>

          {/* Miniaturas */}
          <div className="thumbnails flex flex-row md:flex-col md:mr-4 space-x-4 md:space-x-0 md:space-y-4">
            <img
              src={product.imageFront}
              alt="Front"
              className={`w-20 h-20 object-cover cursor-pointer border-2 rounded-md ${
                currentImage === product.imageFront
                  ? 'border-blue-500'
                  : 'border-gray-300'
              }`}
              onClick={() => setCurrentImage(product.imageFront)}
            />

            <img
              src={product.imageBack}
              alt="Back"
              className={`w-20 h-20 object-cover cursor-pointer border-2 rounded-md ${
                currentImage === product.imageBack
                  ? 'border-blue-500'
                  : 'border-gray-300'
              }`}
              onClick={() => setCurrentImage(product.imageBack)}
            />

            <img
              src={product.imagePack}
              alt="Back"
              className={`w-20 h-20 object-cover cursor-pointer border-2 rounded-md ${
                currentImage === product.imagePack
                  ? 'border-blue-500'
                  : 'border-gray-300'
              }`}
              onClick={() => setCurrentImage(product.imagePack)}
            />
          </div>
        </div>

        {/* Información del producto */}
        <div className="product-info flex-1 mt-8 md:mt-0 md:ml-8">
          {/* Breadcrumb personalizado */}
          <nav className="text-sm text-gray-500 mb-4">
            <ul className="flex space-x-2">
              <li className="hover:text-pink-500 cursor-pointer">
                <a href="/">INICIO</a>
              </li>
              <li>·</li>
              <li className="hover:text-pink-500 cursor-pointer">HOMBRE</li>
              <li>·</li>
              <li className="hover:text-pink-500 cursor-pointer">REMERAS</li>
              <li>·</li>
              <li className="hover:text-pink-500 cursor-pointer">OVERSIZE</li>
              <li>·</li>
              <li className="text-gray-800 font-bold">
                {product.title.toUpperCase()}
              </li>
            </ul>
          </nav>
          {/* Título del producto */}
          <h2 className="text-3xl font-extrabold mb-4 text-gray-800 font-bignoodle">
            {product.title}
          </h2>
          {/* Precio */}
          <p className="text-2xl text-pink-600 font-semibold mb-4">
            {product.price}
          </p>
          {/* Detalles del precio */}
          <p className="text-md text-gray-600 leading-relaxed">
            {product.priceDetails}
          </p>

          <div className="mt-2">
            <AddToCartButton
              product={product}
              selectedColor={selectedColor}
              selectedSize={selectedSize}
            />
          </div>

          <h2 className="mt-5 text-2xl font-extrabold mb-4 text-gray-800 font-bignoodle">
            Talles
          </h2>

          <div className="flex flex-wrap justify-center gap-4">
            {sizes.map((size) => (
              <div
                key={size.id}
                onClick={() => handleSizeSelect(size)}
                className={`cursor-pointer w-16 h-16 flex items-center justify-center rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:ring-2 hover:ring-gray-400
              ${selectedSize?.id === size.id ? 'border-4 border-black' : ''}`}
              >
                <span
                  className={`text-xl font-semibold ${
                    selectedSize?.id === size.id
                      ? 'text-black'
                      : 'text-gray-600'
                  }`}
                >
                  {size.name}
                </span>
              </div>
            ))}
          </div>

          {sizeError && (
            <p className="text-red-500 font-bignoodle text-5xl">
              ¡Por favor, selecciona un talle!
            </p>
          )}

          <h2 className="mt-5 text-2xl font-extrabold mb-4 text-gray-800 font-bignoodle">
            Colores
          </h2>

          <div className="flex flex-wrap justify-center gap-4">
            {colors.map((color) => (
              <div
                key={color.id}
                onClick={() => handleColorSelect(color)}
                className={`cursor-pointer w-12 h-12 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:ring-2 hover:ring-gray-400
            ${selectedColor?.id === color.id ? 'border-4 border-black' : ''}`} // Si el color está seleccionado, agrega un borde
                style={{
                  backgroundColor: color.hex,
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Sombra sutil
                  transform:
                    selectedColor?.id === color.id ? 'scale(1.1)' : 'scale(1)' // Aumenta el tamaño del color seleccionado
                }}
                onMouseEnter={(e) => (e.target.style.transform = 'scale(1.05)')}
                onMouseLeave={(e) =>
                  (e.target.style.transform =
                    selectedColor?.id === color.id ? 'scale(1.1)' : 'scale(1)')
                }
              />
            ))}
          </div>
          {colorError && (
            <p className="text-red-500 font-bignoodle text-5xl">
              ¡Por favor, selecciona un talle!
            </p>
          )}
          <h2 className="mt-5 text-2xl font-extrabold mb-4 text-gray-800 font-bignoodle">
            Descripción
          </h2>
          {/* Descripción del producto */}
          <div className="description text-gray-700 space-y-4">
            {product.description.split('\n').map((line, index) => (
              <p key={index} className="leading-relaxed">
                {line.trim()}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;
