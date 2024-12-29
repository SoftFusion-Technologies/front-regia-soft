import React from 'react';
import '../Styles/Config/SinStock.css'; // Estilos específicos para el componente

const SinStock = () => {
  return (
    <div className="sin-stock-overlay">
      <div className="cross"></div>
      <p className="sin-stock-text mt-20">SIN STOCK</p>
    </div>
  );
};

export default SinStock;
