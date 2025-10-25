import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Footer from './Components/Footer';
import Navbar from './Components/Navbar';
import ProductDetail from './Pages/ProductDetail';
import CartProvider from './Components/CartContext'; // Importamos el proveedor del carrito
import Cart from './Components/Cart'; // Importamos el proveedor del carrito
import Mapa from './Components/Mapa';
import NotFound from './Pages/NotFound'; // Importar la página 404
import About from './Pages/About';
import Productos from './Pages/Productos';
import Contact from './Pages/Contact';
import SizeGuide from './Pages/SizeGuide';
import FAQ from './Pages/FAQ';
import FloatingCart from './Components/FloatingCart';
import Prod_RemerasOCla from './Pages/Sections/Prod_RemerasOCla';
const App = () => {
  return (
    <CartProvider>
      {' '}
      <Router>
        <Navbar />
        <Routes>
          {/* Definir la ruta para la página de inicio */}
          <Route path="/" element={<Home />} />
          <Route path="/product/:id/:name" element={<ProductDetail />} />{' '}
          <Route path="/cart" element={<Cart />} />
          <Route path="/about" element={<About />} />
          {/* <Route path="/productos" element={<Productos />} /> */}
          <Route path="/contacto" element={<Contact />} />
          <Route path="/guia-de-talles" element={<SizeGuide />} />
          <Route
            path="/productos/remeras-over-premium"
            element={<Productos />}
          />
          <Route
            path="/productos/remeras-over-clasicas"
            element={<Prod_RemerasOCla />}
          />
          <Route path="/faq" element={<FAQ />} />
          {/* Ruta para la página no encontrada */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Mapa />
        <FloatingCart />
        <Footer />
      </Router>
    </CartProvider>
  );
};

export default App;
