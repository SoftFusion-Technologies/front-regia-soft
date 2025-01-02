import React, { createContext, useState, useEffect } from 'react';

// Crear el contexto
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Obtener el carrito del localStorage o inicializarlo como un arreglo vacío
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cartItems');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [isFloatingCartOpen, setIsFloatingCartOpen] = useState(false); // Estado para el carrito flotante

  // Función para agregar un producto al carrito
  const addToCart = (productToAdd) => {
    // Validación básica
    if (
      !productToAdd.id ||
      !productToAdd.selectedColor ||
      !productToAdd.selectedSize ||
      !productToAdd.quantity
    ) {
      console.error('El producto no tiene las propiedades necesarias.');
      return;
    }

    // Verificar si el producto ya está en el carrito
    const existingProduct = cartItems.find(
      (item) =>
        item.id === productToAdd.id &&
        item.selectedColor === productToAdd.selectedColor &&
        item.selectedSize === productToAdd.selectedSize
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
      console.log('Cantidad incrementada para el producto existente.');
    } else {
      // Si no está, agregarlo al carrito
      setCartItems((prevItems) => [...prevItems, productToAdd]);
      console.log('Producto agregado al carrito.');
    }

    // Mostrar el carrito flotante
    setIsFloatingCartOpen(true);
  };

  // Función para eliminar un producto del carrito
  // const removeFromCart = (productId, selectedColor) => {
  //   setCartItems((prevItems) =>
  //     prevItems.filter(
  //       (item) => item.id !== productId || item.selectedColor !== selectedColor
  //     )
  //   );
  // };

  // Función para eliminar un producto del carrito
  // Función para eliminar o disminuir la cantidad de un producto
  const removeFromCart = (productId, selectedColor, selectedSize) => {
    setCartItems(
      (prevItems) =>
        prevItems
          .map((item) =>
            item.id === productId &&
            item.selectedColor === selectedColor &&
            item.selectedSize === selectedSize
              ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 0 }
              : item
          )
          .filter((item) => item.quantity > 0) // Elimina productos con cantidad 0
    );
  };

  // Guardar el carrito en el localStorage cada vez que cambie
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        isFloatingCartOpen,
        setIsFloatingCartOpen
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
