// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Footer from './Components/Footer';
import Navbar from './Components/Navbar';
import ProductDetail from './Pages/ProductDetail';
import CartProvider from './Components/CartContext';
import Cart from './Components/Cart';
import Mapa from './Components/Mapa';
import NotFound from './Pages/NotFound';
import About from './Pages/About';
import Contact from './Pages/Contact';
import SizeGuide from './Pages/SizeGuide';
import FAQ from './Pages/FAQ';
import FloatingCart from './Components/FloatingCart';
import Prod_RemerasOCla from './Pages/Sections/Prod_RemerasOCla';
import ScrollToTop from './Components/ScrollToTop';

// 👇 Asegurate que las rutas de import coincidan con dónde están los archivos
import FeaturedProductsVestidos from './Pages/FeaturedProducts';
import FeaturedProductsSastrero from './Pages/FeaturedProductsSastrero';

const App = () => {
  return (
    <CartProvider>
      <Router>
        <Navbar />
        <ScrollToTop top={0} behavior="smooth" />
        <Routes>
          <Route path="/" element={<Home />} />

          {/* 🔹 Detalle con catalog namespaced */}
          <Route
            path="/product/:catalog/:id/:slug"
            element={<ProductDetail />}
          />

          <Route path="/cart" element={<Cart />} />
          <Route path="/about" element={<About />} />
          <Route path="/contacto" element={<Contact />} />
          <Route path="/guia-de-talles" element={<SizeGuide />} />

          {/* 🔹 Listados por categoría */}
          <Route
            path="/productos/vestidos"
            element={<FeaturedProductsVestidos />}
          />
          <Route
            path="/productos/sastreros"
            element={<FeaturedProductsSastrero />}
          />

          {/* Otros */}
          <Route
            path="/productos/remeras-over-clasicas"
            element={<Prod_RemerasOCla />}
          />
          <Route path="/faq" element={<FAQ />} />

          {/* 404 */}
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
