import React from 'react';
import { FaShippingFast, FaCreditCard, FaWhatsapp } from 'react-icons/fa'; // Importando los iconos
import '../Styles/InfoSection.css'; // Asegúrate de crear un archivo de estilos

const InfoSection = () => {
  return (
    <section className="info-section py-16 px-4 sm:px-8">
      <div className="info-section-container">
        {/* Sección Envíos */}
        <div className="info-item text-center">
          <div className="icon-container d-inline-block icon-60px mb-3">
            <FaShippingFast className="icon" />
          </div>
          <h3 className="info-title mb-2">Envíos</h3>
          <p className="info-description mb-2">A todo el país.</p>
        </div>

        {/* Sección Pagos */}
        <div className="info-item text-center">
          <div className="icon-container d-inline-block icon-60px mb-3">
            <FaCreditCard className="icon" />
          </div>
          <h3 className="info-title mb-2">Pagos</h3>
          <p className="info-description mb-2">
            Con transferencia o en efectivo.
          </p>
        </div>

        {/* Sección Consultas */}
        <div className="info-item text-center">
          <div className="icon-container d-inline-block icon-60px mb-3">
            <FaWhatsapp className="icon" />
          </div>
          <h3 className="info-title mb-2">Consultas</h3>
          <p className="info-description mb-2">
            Si tienes alguna duda, contáctanos al WhatsApp.
          </p>
        </div>
      </div>
    </section>
  );
};

export default InfoSection;
