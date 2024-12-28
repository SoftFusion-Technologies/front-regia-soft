import React, { createContext, useState, useEffect } from 'react';

// Crear el contexto
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Obtener el carrito del localStorage o inicializarlo como un arreglo vacío
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cartItems');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Función para agregar un producto al carrito
  const addToCart = (productToAdd) => {
    // Verificar si el producto ya está en el carrito
    const existingProduct = cartItems.find(
      (item) =>
        item.id === productToAdd.id &&
        item.selectedColor === productToAdd.selectedColor &&
        item.selectedSize === productToAdd.selectedSize // Agregar comparación por talle
    );

    if (existingProduct) {
      // Si el producto ya está, aumentar la cantidad
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === existingProduct.id &&
          item.selectedColor === existingProduct.selectedColor &&
          item.selectedSize === existingProduct.selectedSize
            ? { ...item, quantity: item.quantity + productToAdd.quantity }
            : item
        )
      );
    } else {
      // Si no está, agregarlo al carrito
      setCartItems((prevItems) => [...prevItems, productToAdd]);
    }
  };

  // Función para eliminar un producto del carrito
  const removeFromCart = (productId, selectedColor) => {
    setCartItems((prevItems) =>
      prevItems.filter(
        (item) => item.id !== productId || item.selectedColor !== selectedColor
      )
    );
  };

  // Guardar el carrito en el localStorage cada vez que cambie
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
