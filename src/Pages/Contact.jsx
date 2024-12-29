import React from 'react';
import ContactForm from '../Components/ContactForm';
import ImgHero from '/Hero/imgHero1.webp';
const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="text-center py-3 px-5">
        <nav className="text-sm">
          <a href="/" className="text-pink-600 hover:underline">
            Inicio
          </a>
          <span className="mx-2">/</span>
          <span className="text-gray-600 text-cent">Contacto</span>
        </nav>
      </div>

      {/* Main Content */}
      <div className="container mx-auto py-10 px-5">
        <h1 className="text-5xl font-extrabold text-gray-800 mb-6 text-center font-bignoodle">
          Contacto
        </h1>{' '}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">
              Información de Contacto
            </h2>
            <div className="flex flex-col lg:flex-row items-start lg:items-center">
              {/* Texto de información */}
              <ul className="text-gray-700 mb-4 lg:mb-0 lg:mr-6">
                <li className="mb-2">
                  <span className="font-medium">Teléfono:</span> +54 9 3863
                  531891
                </li>
                <li className="mb-2">
                  <span className="font-medium">WhatsApp:</span> 3863531891
                </li>
                <li className="mb-2">
                  <span className="font-medium">Correo Electrónico:</span>{' '}
                  <a
                    href="mailto:corsaneraurban@gmail.com"
                    className="text-blue-600 hover:underline"
                  >
                    corsaneraurban@gmail.com
                  </a>
                </li>
              </ul>
            </div>

            {/* Imagen solo para pantallas grandes */}
            <div className="hidden lg:block">
              <img
                src={ImgHero} // Reemplaza con tu URL de imagen
                alt="Imagen decorativa"
                className="rounded-lg shadow-md"
              />
            </div>

            {/* Imagen solo para pantallas grandes */}
            {/* Promociones solo para pantallas grandes */}
            <div className="hidden lg:block mb-2 rounded-lg shadow-md p-4">
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Promociones
              </h3>
              <ul className="text-gray-700">
                <li className="mb-2">
                  <span className="font-medium">Descuento:</span> 15% OFF en
                  primeras compras.
                </li>
                <li className="mb-2">
                  <span className="font-medium">Oferta:</span> Llevando 3 o más,
                  te queda $10.000 C/U
                </li>
                <li className="mb-2">
                  <span className="font-medium">Cupón:</span> Usa el código{' '}
                  <strong>PROMO2024</strong>.
                </li>
                <p>Para usar el código, envíanos un mensaje por WhatsApp.</p>
              </ul>
            </div>

            {/* Imagen solo para pantallas grandes */}
            <div className="hidden lg:block">
              <img
                src={ImgHero} // Reemplaza con tu URL de imagen
                alt="Imagen decorativa"
                className="rounded-lg shadow-md"
              />
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Envíanos un mensaje</h2>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
