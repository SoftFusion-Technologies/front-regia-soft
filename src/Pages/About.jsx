import React from 'react';
import '../Styles/About.css';
import { useNavigate } from 'react-router-dom';

const About = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/contacto', { state: { scrollTo: 'mapas' } });
  };

  return (
    <div className="about-container">
      <h1 className="pt-4 text-3xl text-center font-bold sm:text-5xl font-bignoodle">
        QUIÉNES SOMOS
      </h1>
      <section className="about-content">
        <h2>Sobre Corsa Nera</h2>
        <p>
          Bienvenidos a <strong>Corsa Nera</strong>, una tienda de ropa
          exclusiva dedicada a ofrecer moda de alta calidad para hombres que buscan destacarse con estilo y elegancia. En Corsa Nera,
          cada prenda es seleccionada con atención al detalle para garantizar
          una experiencia de compra única y satisfactoria. Ya sea que busques
          ropa casual, de oficina o para una ocasión especial, tenemos la
          selección perfecta que refleja las últimas tendencias y la
          atemporalidad del buen vestir.
        </p>
        <h2>Nuestra Misión</h2>
        <p>
          En <strong>Corsa Nera</strong>, nuestra misión es ser el destino
          predilecto para quienes buscan prendas de calidad superior y diseños
          sofisticados. Nos comprometemos a ofrecer a nuestros clientes una
          experiencia de compra excepcional, brindando un servicio personalizado
          y asesoramiento experto para ayudarles a encontrar su estilo único.
          Creemos en la moda como una forma de expresión personal, por lo que
          nos aseguramos de que cada cliente salga de nuestra tienda sintiéndose
          confiado y cómodo con su elección.
        </p>
        <h2>Nuestra Visión</h2>
        <p>
          Aspiramos a consolidarnos como la tienda de moda más influyente de la
          región, reconocida por la calidad y exclusividad de nuestros
          productos. Queremos seguir creciendo junto con nuestros clientes,
          adaptándonos a las nuevas tendencias sin perder la esencia de
          elegancia y distinción que nos caracteriza. En{' '}
          <strong>Corsa Nera</strong>, buscamos no solo vestir a nuestros
          clientes, sino también inspirarlos a través de la moda, ayudándoles a
          resaltar lo mejor de sí mismos.
        </p>
      </section>
    </div>
  );
};

export default About;
