import { useEffect } from 'react';
import '../Styles/Footer.css';
import { FaFacebook, FaInstagram, FaTwitter, FaArrowUp } from 'react-icons/fa';
import PropTypes from 'prop-types';

const WhatsAppLink = ({ number }) => (
  <a
    href={`https://wa.me/${number.replace(/\D/g, '')}`}
    target="_blank"
    rel="noopener noreferrer"
    className="items-center"
  >
    ¡Chatea con nosotros!
  </a>
);

WhatsAppLink.propTypes = {
  number: PropTypes.string.isRequired
};

const Footer = () => {
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('appear');
          // Dejar de observar una vez que se ha añadido la clase
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Seleccionar los elementos a observar
    const footerLeft = document.querySelector('.footer-left');
    const socials = document.querySelector('.socials');
    const footerRightItems = document.querySelectorAll('.footer-right li');

    // Observar los elementos
    observer.observe(footerLeft);
    observer.observe(socials);
    footerRightItems.forEach((item) => observer.observe(item));

    // Limpieza del observer al desmontar el componente
    return () => {
      observer.disconnect();
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="footer">
      <div className="footer-left">
        <h2 className="titulo">Corsa Nera</h2>
        <p id="description-id" className="description">
          ¡Encuentra tu estilo con nuestra colección exclusiva de ropa!
          Ofrecemos prendas de alta calidad y diseño único para todos.
        </p>
        <div className="socials">
          <li>
            <a
              href="https://www.instagram.com/corsaneraurban"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook />
            </a>
          </li>
          <li>
            <a
              href="https://www.instagram.com/corsaneraurban"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram />
            </a>
          </li>
          <li>
            <a
              href="https://www.instagram.com/corsaneraurban"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter />
            </a>
          </li>
        </div>
      </div>

      <ul className="footer-right">
        <li>
          <h2>Enlaces Rápidos</h2>
          <ul className="box">
            <li>
              <a href="/tienda" target="_blank" rel="noopener noreferrer">
                Tienda
              </a>
            </li>
            <li>
              <a href="/novedades" target="_blank" rel="noopener noreferrer">
                Novedades
              </a>
            </li>
            <li>
              <a
                href="/productos-destacados"
                target="_blank"
                rel="noopener noreferrer"
              >
                Productos Destacados
              </a>
            </li>
            <li>
              <a href="/contacto" target="_blank" rel="noopener noreferrer">
                Contacto
              </a>
            </li>
          </ul>
        </li>

        <li>
          <h2>Contáctanos</h2>
          <ul className="box">
            <li>
              <WhatsAppLink number="+5493863531891" />
            </li>
            <li>
              <a
                href="https://www.google.com/maps"
                target="_blank"
                rel="noopener noreferrer"
              >
                Ver Ubicación
              </a>
            </li>
            <li>
              <a href="/soporte" target="_blank" rel="noopener noreferrer">
                Soporte y Ayuda
              </a>
            </li>
          </ul>
        </li>
      </ul>

      <div className="footer-bottom">
        <span>Este sitio web fue creado por SoftFusion</span>
        <br />
        <span>
          <a
            href="https://softfusion.com.ar/"
            target="_blank"
            rel="noopener noreferrer"
          >
            © 2025 SoftFusion. Todos los derechos reservados.
          </a>
        </span>
        <span>Terminos · Política de privacidad</span>
        <br />
      </div>

      <button
        className="fixed bottom-10 right-10 bg-black text-white p-2 rounded-full shadow-md hover:shadow-lg transition duration-300"
        onClick={scrollToTop}
      >
        <FaArrowUp className="text-xl" />
      </button>
    </footer>
  );
};

export default Footer;
