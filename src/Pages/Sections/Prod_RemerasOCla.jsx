// =============================================
// File: src/pages/Prod_RemerasOCla.jsx
// =============================================
import React from 'react';
import ProductGrid from '../../Components/ProductGrid';
import { catalogoClasicas, WHATSAPP } from '../../Helpers/catalogoClasicas';

function currency(n) {
  try {
    return n?.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' });
  } catch {
    return '$' + (n ?? 0);
  }
}

export default function Prod_RemerasOCla() {
  const onBuyClick = (item) => {
    const msg = `Hola, estoy interesado en: ${item.nombre} — Precio: ${currency(
      item.precio
    )}.`;
    const url = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  };

  const itemLink = (item) =>
    `/product/${item.id}/${encodeURIComponent(item.nombre)}`;

  return (
    <ProductGrid
      title="Remeras Oversize Clásicas"
      subtitle="Básicos infalibles con el sello Regia"
      items={catalogoClasicas}
      onBuyClick={onBuyClick}
      itemLink={itemLink}
    />
  );
}
