import React from 'react';
import { motion } from 'framer-motion';
import './EmptyCart.css'; // Estilo personalizado
import { useNavigate } from 'react-router-dom';

const EmptyCart = () => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  const bounceVariants = {
    animate: {
      y: [0, -10, 0],
      transition: {
        repeat: Infinity,
        repeatType: 'loop',
        duration: 1.5
      }
    }
  };

  return (
    <motion.div
      className="empty-cart-container"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        className="empty-cart-icon"
        variants={bounceVariants}
        animate="animate"
      >
        🛒
      </motion.div>
      <h2 className="empty-cart-title">Tu carrito está vacío</h2>
      <p className="empty-cart-message">
        ¡Añade productos a tu carrito para continuar con tu compra!
      </p>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="shop-now-button"
        onClick={() => navigate('/productos')} // Redirige a la página de productos
      >
        Ir a la tienda
      </motion.button>
    </motion.div>
  );
};

export default EmptyCart;
