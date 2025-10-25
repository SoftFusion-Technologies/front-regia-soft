import React, { useEffect, useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck,
  Truck,
  RefreshCw,
  Star,
  ChevronRight,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

// Tu data existente
import { products } from '../Helpers/productsPremium';
import { productosURL } from '../Helpers/productosURL';
import { colors, sizes } from '../Helpers/helpers';
import AddToCartButton from '../Config/AddToCartButton';
import ProductNotFound from '../Components/ProductNotFound';

/**
 * ProductDetail — Deluxe Gold/Black Edition
 *
 * Objetivos UX:
 * - Look & feel premium (negro + dorado) con micro-interacciones fluidas
 * - Galería con hover-zoom, thumbnails activos y teclado accesible
 * - Selectores de talle/color como radios accesibles
 * - Panel de compra sticky en desktop, CTA visible en mobile
 * - Breadcrumb compacto con separación clara
 * - Badges de confianza (envío, cambios, garantía)
 */
export default function ProductDetail() {
  // Scroll-to-top al montar
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [currentImage, setCurrentImage] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);

  // Cargar producto (merge de arrays, sin duplicar ids)
  useEffect(() => {
    const merged = [
      ...products,
      ...productosURL.filter((p2) => !products.some((p1) => p1.id === p2.id))
    ];
    const found = merged.find((p) => p.id === Number(id));
    setProduct(found || null);
    if (found)
      setCurrentImage(found.imageFront || found.imagePack || found.imageBack);
  }, [id]);

  const gallery = useMemo(() => {
    if (!product) return [];
    const candidates = [
      product.imageFront,
      product.imageBack,
      product.imagePack
    ].filter(Boolean);
    const dedup = Array.from(new Set(candidates));
    while (dedup.length < 4) dedup.push(null); // tiles vacíos de marca
    return dedup.slice(0, 4);
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-[60vh] grid place-items-center bg-black text-white">
        <div className="max-w-5xl w-full p-6">
          <ProductNotFound />
        </div>
      </div>
    );
  }

  return (
    <section className="bg-[#0a0a0a] text-white">
      {/* Hero strip dorado sutil */}
      <div className="h-[3px] bg-gradient-to-r from-[#d4af37] via-[#f0d68a] to-[#d4af37]" />

      {/* Contenedor principal */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex flex-wrap items-center gap-1 text-sm text-white/70">
            <li>
              <Link
                to="/"
                className="hover:text-[#f0d68a] inline-flex items-center gap-1"
              >
                Inicio <ChevronRight className="w-4 h-4 opacity-60" />
              </Link>
            </li>
            <li className="hidden xs:block">Hombre</li>
            <li className="hidden xs:block opacity-60">/</li>
            <li className="hidden xs:block">Remeras</li>
            <li className="hidden xs:block opacity-60">/</li>
            <li className="font-medium text-white">{product.title}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {/* Galería */}
          <div>
            <div className="relative group rounded-2xl overflow-hidden ring-1 ring-white/10 bg-black/40">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentImage || 'brand-tile'}
                  src={
                    currentImage ||
                    product.imageFront ||
                    product.imageBack ||
                    product.imagePack
                  }
                  alt={product.title}
                  className="w-full h-auto select-none will-change-transform"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0.2, scale: 1.02 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                />
              </AnimatePresence>

              {/* Hover zoom */}
              <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-white/5" />
              </div>
            </div>

            {/* Thumbnails */}
            <div className="mt-4 grid grid-cols-4 gap-3">
              {gallery.map((url, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => url && setCurrentImage(url)}
                  className={`relative aspect-square rounded-xl overflow-hidden ring-1 ring-white/10 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f0d68a] ${
                    currentImage === url ? 'ring-2 ring-[#d4af37]' : ''
                  } ${url ? 'cursor-pointer' : 'opacity-80'}`}
                  aria-label={url ? `Ver imagen ${idx + 1}` : 'Marca'}
                >
                  {url ? (
                    <img
                      src={url}
                      alt="Vista"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full grid place-items-center bg-black/60">
                      <Sparkles className="w-6 h-6 text-[#f0d68a]" />
                    </div>
                  )}
                </button>
              ))}
            </div>

            {/* Badges confianza */}
            <ul className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
              <li className="flex items-center gap-2 rounded-xl bg-white/5 ring-1 ring-white/10 p-3">
                <Truck className="w-5 h-5 text-[#f0d68a]" />
                <span>Envíos a todo el país</span>
              </li>
              <li className="flex items-center gap-2 rounded-xl bg-white/5 ring-1 ring-white/10 p-3">
                <RefreshCw className="w-5 h-5 text-[#f0d68a]" />
                <span>Cambios fáciles 30 días</span>
              </li>
              <li className="flex items-center gap-2 rounded-xl bg-white/5 ring-1 ring-white/10 p-3">
                <ShieldCheck className="w-5 h-5 text-[#f0d68a]" />
                <span>Garantía de calidad</span>
              </li>
            </ul>
          </div>

          {/* Panel de compra */}
          <div className="lg:sticky lg:top-24">
            {/* Header */}
            <div className="rounded-2xl ring-1 ring-white/10 bg-gradient-to-b from-black/60 to-black/30 p-5 md:p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
                    {product.title}
                  </h1>
                  {product.subtitle && (
                    <p className="text-white/70 mt-1 text-sm">
                      {product.subtitle}
                    </p>
                  )}
                </div>
                <div className="text-right">
                  <div className="text-[28px] leading-none font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#f0d68a] to-[#d4af37]">
                    {product.price}
                  </div>
                  {product.priceDetails && (
                    <p className="text-xs text-white/70 mt-1">
                      {product.priceDetails}
                    </p>
                  )}
                </div>
              </div>

              {/* Rating demo opcional */}
              <div className="mt-3 flex items-center gap-1 text-xs text-white/80">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < 5 ? 'fill-[#f0d68a] text-[#f0d68a]' : 'text-white/30'
                    }`}
                  />
                ))}
                <span className="ml-1">(124)</span>
              </div>

              {/* Talles */}
              <div className="mt-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-medium tracking-wide uppercase text-white/80">
                    Talles
                  </h2>
                  {selectedSize && (
                    <span className="text-xs text-[#f0d68a] inline-flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> {selectedSize.name}
                    </span>
                  )}
                </div>
                <div
                  role="radiogroup"
                  className="mt-3 grid grid-cols-4 sm:grid-cols-6 gap-2"
                >
                  {sizes.map((size) => {
                    const active = selectedSize?.id === size.id;
                    return (
                      <button
                        key={size.id}
                        type="button"
                        role="radio"
                        aria-checked={active}
                        onClick={() => setSelectedSize(size)}
                        className={`h-10 rounded-xl border text-sm font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f0d68a] ${
                          active
                            ? 'border-[#d4af37] bg-[#1a1a1a] text-white'
                            : 'border-white/10 bg-white/5 text-white/80 hover:bg-white/10'
                        }`}
                      >
                        {size.name}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Colores */}
              <div className="mt-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-medium tracking-wide uppercase text-white/80">
                    Colores
                  </h2>
                  {selectedColor && (
                    <span className="text-xs text-[#f0d68a] inline-flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> {selectedColor.name}
                    </span>
                  )}
                </div>
                <div role="radiogroup" className="mt-3 flex flex-wrap gap-2">
                  {colors.map((c) => {
                    const active = selectedColor?.id === c.id;
                    return (
                      <button
                        key={c.id}
                        type="button"
                        role="radio"
                        aria-checked={active}
                        onClick={() => setSelectedColor(c)}
                        className={`w-9 h-9 rounded-full ring-1 ring-white/10 transition-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f0d68a] ${
                          active
                            ? 'scale-110 ring-2 ring-[#d4af37]'
                            : 'hover:scale-105'
                        }`}
                        style={{ backgroundColor: c.hex }}
                        aria-label={c.name}
                        title={c.name}
                      />
                    );
                  })}
                </div>
              </div>

              {/* CTA */}
              <div className="mt-6">
                <AddToCartButton
                  product={product}
                  selectedColor={selectedColor}
                  selectedSize={selectedSize}
                />
                <p className="text-[11px] text-white/60 mt-2">
                  Al continuar aceptás nuestros Términos y la Política de
                  Cambios.
                </p>
              </div>
            </div>

            {/* Descripción / detalles */}
            <div className="mt-6 rounded-2xl ring-1 ring-white/10 bg-white/5">
              <details open className="p-5 md:p-6">
                <summary className="cursor-pointer list-none flex items-center justify-between">
                  <h3 className="text-base font-medium">Descripción</h3>
                </summary>
                <div className="mt-3 text-sm leading-relaxed text-white/85 space-y-3">
                  {(product.description || '').split('\n').map((line, i) => (
                    <p key={i}>{line.trim()}</p>
                  ))}
                </div>
              </details>
              <div className="h-px bg-white/10 mx-5" />
              <div className="p-5 md:p-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div className="rounded-xl bg-black/40 ring-1 ring-white/10 p-4">
                  <p className="font-medium mb-1">Composición</p>
                  <p className="text-white/80">
                    Algodón premium + costuras reforzadas.
                  </p>
                </div>
                <div className="rounded-xl bg-black/40 ring-1 ring-white/10 p-4">
                  <p className="font-medium mb-1">Cuidados</p>
                  <p className="text-white/80">
                    Lavar del revés con agua fría. No usar cloro.
                  </p>
                </div>
              </div>
            </div>

            {/* Sello de marca */}
            {/* <div className="mt-6 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#f0d68a] to-[#d4af37]" />
              <p className="text-sm text-white/70">
                Edición <span className="text-[#f0d68a] font-medium">Gold</span>{' '}
                — diseño cuidado al detalle.
              </p>
            </div> */}
          </div>
        </div>
      </div>

      {/* Footer strip dorado */}
      <div className="h-[2px] bg-gradient-to-r from-[#d4af37] via-[#f0d68a] to-[#d4af37]" />
    </section>
  );
}
