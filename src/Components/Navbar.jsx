import React, { useState, useContext } from 'react';
import { menuItems } from '../Config/menu';
import LogoCN from '../Images/LogoCorsaNera.png';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { CartContext } from '../Components/CartContext';
import '../Styles/animacionlinks.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  
  const toggleSubMenu = () => setIsSubMenuOpen(!isSubMenuOpen); // Función para abrir/cerrar el submenú

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const { cartItems } = useContext(CartContext);
  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  let timeoutId; // Para manejar el retraso

  const handleMouseEnter = () => {
    clearTimeout(timeoutId);
    setIsSubMenuOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutId = setTimeout(() => setIsSubMenuOpen(false), 300); // 300ms de retraso
  };

  return (
    <nav className="bg-white shadow-md relative z-10">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <Link to="/">
            <img src={LogoCN} alt="Corsa Nera Logo" className="h-14 w-auto" />
          </Link>
          <Link to="/" className="link">
            <span className="font-bignoodle text-2xl font-bold text-black tracking-wide uppercase">
              Corsa Nera
            </span>
          </Link>
        </div>

        {/* Menú Desktop */}
        <div className="hidden md:flex space-x-8">
          {menuItems.map((item) =>
            item.submenu ? (
              <div
                key={item.id}
                className="relative group"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <span className="link font-bignoodle text-lg font-medium text-black hover:text-gray-500 transition cursor-pointer">
                  {item.label}
                </span>

                {/* Submenú */}
                {isSubMenuOpen && (
                  <div className="font-bignoodle text-lg  absolute left-0 mt-2 w-48 bg-white shadow-md border rounded-md">
                    {item.submenu.map((subItem) => (
                      <Link
                        key={subItem.id}
                        to={subItem.href}
                        className="block px-4 py-2 text-black hover:bg-gray-200 transition"
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={item.id}
                to={item.href}
                className="link font-bignoodle text-lg font-medium text-black hover:text-gray-500 transition"
              >
                {item.label}
              </Link>
            )
          )}
        </div>

        {/* Carrito */}
        <div className="relative">
          <Link to="/cart" className="flex items-center">
            <FaShoppingCart size={30} className="text-black" />
            {totalQuantity > 0 && (
              <span className="absolute top-0 right-0 bg-pink-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
                {totalQuantity}
              </span>
            )}
          </Link>
        </div>

        {/* Botón Hamburguesa */}
        <button
          className="block md:hidden text-black focus:outline-none"
          onClick={toggleMenu}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={
                isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'
              }
            />
          </svg>
        </button>
      </div>

      {/* Menú Mobile */}
      {isMenuOpen && (
        <div className="md:hidden bg-white">
          {menuItems.map((item) => (
            <div key={item.id}>
              {item.submenu ? (
                <>
                  <button
                    className="w-full text-left px-4 py-2 font-bignoodle text-lg font-medium text-black hover:bg-gray-100 transition"
                    onClick={toggleSubMenu}
                  >
                    {item.label}
                  </button>
                  {isSubMenuOpen && (
                    <div className="submenu-mobile">
                      {item.submenu.map((subItem, index) => (
                        <Link
                          key={index}
                          to={subItem.href}
                          className="submenu-item font-bignoodle text-lg "
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  to={item.href}
                  className="font-bignoodle block px-4 py-2 text-black hover:bg-gray-100 transition"
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
