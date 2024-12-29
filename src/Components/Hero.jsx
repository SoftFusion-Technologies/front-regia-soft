import React, { useEffect, useState } from 'react';
import PostHero from './PostHero';

const Hero = () => {
  // Desplazar hacia la parte superior cuando el componente se monte
  useEffect(() => {
    window.scrollTo(0, 0); // Desplazar hacia arriba de la página
  }, []);

  const images = [
    '/Hero/imgHero1.webp',
    '/Hero/Home_2_x.webp',
    '/Hero/imgHero1.webp'
  ]; // Agrega las imágenes para el slider
  const [currentImage, setCurrentImage] = useState(0);

  // Función para cambiar de imagen
  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  useEffect(() => {
    const interval = setInterval(nextImage, 2000); // Cambia cada 5 segundos
    return () => clearInterval(interval); // Limpia el intervalo cuando el componente se desmonte
  }, []);

  return (
    <>
      <section className="relative w-full h-[90vh] sm:h-[60vh] md:h-[50vh] lg:h-[70vh] -mt-52 sm:-mt-80 md:mt-0">
        {/* Imagen de fondo */}
        <div
          className="absolute inset-0 w-full h-full bg-center transition-all duration-1000 z-0"
          style={{
            backgroundImage: `url(${images[currentImage]})`,
            backgroundSize: 'contain', // Asegura que la imagen se vea completa
            backgroundRepeat: 'no-repeat', // Evita que la imagen se repita
            backgroundPosition: 'center' // Centra la imagen dentro del contenedor
          }}
        ></div>
      </section>

      {/* Componente PostHero debajo de la imagen */}
      <PostHero />
    </>
  );
};

export default Hero;
