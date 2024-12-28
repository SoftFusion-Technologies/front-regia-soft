import React, { useEffect, useState } from 'react';

const Hero = () => {
  const images = [
    '/src/Images/Hero/imgHero1.webp',
    '/src/Images/Hero/imgHero1.webp',
    '/src/Images/Hero/imgHero1.webp'
  ]; // Agrega las imágenes para el slider
  const [currentImage, setCurrentImage] = useState(0);

  // Función para cambiar de imagen
  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  useEffect(() => {
    const interval = setInterval(nextImage, 5000); // Cambia cada 5 segundos
    return () => clearInterval(interval); // Limpia el intervalo cuando el componente se desmonte
  }, []);

  return (
    <section className="relative w-full h-[90vh] sm:h-[60vh] md:h-[50vh] lg:h-[70vh]">
      {/* Imagen de fondo */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center transition-all duration-1000"
        style={{ backgroundImage: `url(${images[currentImage]})` }}
      ></div>

      {/* Capa de contenido */}
      <div className="font-bignoodle absolute inset-0 flex items-center justify-center text-black z-10">
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold uppercase">Corsa Nera</h1>
          <p className="text-lg">
            La mejor tienda de ropa con estilo y elegancia
          </p>
          <button className="px-8 py-3 bg-black text-white rounded-lg border-2 border-transparent hover:bg-white hover:text-black hover:border-black transition duration-300">
            Ver productos
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
