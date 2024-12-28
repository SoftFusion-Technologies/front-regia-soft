import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Footer from './Components/Footer';
import Navbar from './Components/Navbar';
import ProductDetail from './Pages/ProductDetail';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Definir la ruta para la página de inicio */}
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetail />} />{' '}
        {/* Ruta dinámica */}
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
