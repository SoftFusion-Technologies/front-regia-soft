import React, { createContext, useState } from 'react';

// Crear el contexto
export const CartContext = createContext();

// Proveedor del contexto
const CartProvider = ({ children }) => {
  // Estado para almacenar los artículos en el carrito
  const [cartItems, setCartItems] = useState([]);

  // Función para agregar un producto al carrito con la cantidad
  const addToCart = (product, quantity) => {
    setCartItems((prevItems) => {
      // Verificar si el producto ya está en el carrito
      const itemIndex = prevItems.findIndex((item) => item.id === product.id);
      if (itemIndex >= 0) {
        // Si el producto ya existe, actualizamos la cantidad
        const updatedItems = [...prevItems];
        updatedItems[itemIndex].quantity += quantity; // Sumar la cantidad
        return updatedItems;
      } else {
        // Si el producto no existe, lo agregamos con la cantidad seleccionada
        return [...prevItems, { ...product, quantity }];
      }
    });
  };

  // Función para eliminar un producto del carrito
  const removeFromCart = (productId) => {
    setCartItems(cartItems.filter((item) => item.id !== productId));
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
