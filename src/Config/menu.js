// src/config/menu.js

// export const menuItems = [
//   { id: 1, label: 'Inicio', href: '/' },
//   { id: 2, label: 'Productos', href: 'productos' },
//   { id: 3, label: 'GUÍA DE TALLES', href: 'guia-de-talles' },
//   { id: 4, label: 'Nosotros', href: 'about' },
//   { id: 5, label: 'Contacto', href: 'contacto' },
//   { id: 6, label: 'Preguntas Frecuentes', href: 'faq' }
// ];

// Nuevo Menú v2 Benjamín Orellana 22-02-2025
// src/config/menu.js
export const menuItems = [
  { id: 1, label: 'Inicio', href: '/' },
  {
    id: 2,
    label: 'Productos',
    href: 'productos',
    submenu: [
      { id: 21, label: 'Remeras Over Premium', href: 'productos/remeras-over-premium' },
      { id: 22, label: 'Remeras Over Clásicas', href: 'productos/remeras-over-clasicas' },
      { id: 23, label: 'Bermudas', href: 'productos/bermudas' }
    ]
  },
  { id: 3, label: 'GUÍA DE TALLES', href: 'guia-de-talles' },
  { id: 4, label: 'Nosotros', href: 'about' },
  { id: 5, label: 'Contacto', href: 'contacto' },
  { id: 6, label: 'Preguntas Frecuentes', href: 'faq' }
];

