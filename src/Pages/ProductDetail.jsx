import React, { useEffect, useMemo, useState, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck,
  Truck,
  RefreshCw,
  Star,
  ChevronRight,
  CheckCircle2,
  Sparkles,
  Maximize2,
  X
} from 'lucide-react';

// Legacy data (se mantiene)
import { products } from '../Helpers/productsPremium';
import { productosURL } from '../Helpers/productosURL';
import {
  colors as defaultColors,
  sizes as defaultSizes
} from '../Helpers/helpers';
import AddToCartButton from '../Config/AddToCartButton';
import ProductNotFound from '../Components/ProductNotFound';

// Vestidos (grupos colapsados)
import {
  getGroupById as getVestido,
  loadAllImages as loadAllImagesVestidos
} from '../data/vestidos';
export { moneyAR as moneyVest } from '../utils/money';

import {
  getGroupById as getSastrero,
  loadAllImages as loadAllImagesSastrero
} from '../data/sastrero';

const GOLD_GRAD = 'from-[#f0d68a] to-[#d4af37]';

function moneyAR(n) {
  if (n == null || n === '' || isNaN(Number(n))) return 'Consultar';
  try {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS'
    }).format(Number(n));
  } catch {
    return String(n);
  }
}

// Normaliza (sin acentos, minúsculas)
const norm = (s = '') =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();

// Paleta por nombre normalizado
const PALETTE = {
  negro: '#111111',
  blanco: '#ffffff',
  fucsia: '#d81b60',
  petroleo: '#1e4b5b',
  chocolate: '#4e342e',
  oro: '#d4af37',
  plata: '#c0c0c0',
  rojo: '#c62828',
  azul: '#1565c0',
  verde: '#2e7d32'
};

// Gradientes para combos del estilo “negro con oro/plata”
const gradientForCombo = (name = '') => {
  const n = norm(name);
  if (n.includes('negro con oro'))
    return 'linear-gradient(45deg,#111 50%,#d4af37 50%)';
  if (n.includes('negro con plata'))
    return 'linear-gradient(45deg,#111 50%,#c0c0c0 50%)';
  if (n.includes('azul con chocolate') || n.includes('chocolate con azul'))
    return 'linear-gradient(45deg,#1565c0 50%,#4e342e 50%)';

  return null;
};

// Acepta strings u objetos { name, hex, bg } y asegura id/hex/bg
const normalizeColors = (arr = []) =>
  arr.map((c, i) => {
    if (typeof c === 'string') {
      const name = c.trim();
      const key = norm(name);
      return {
        id: `c${i}-${key}`,
        name,
        hex: PALETTE[key] || '#999999',
        bg: gradientForCombo(name)
      };
    }
    const name = (c.name || `Color ${i + 1}`).trim();
    const key = norm(name);
    return {
      id: c.id || `c${i}-${key}`,
      name,
      hex: c.hex || PALETTE[key] || '#999999', // 👈 prioriza hex del override
      bg: c.bg || gradientForCombo(name)
    };
  });

// Orden estándar de talles de letras
const ALPHA_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'];

// Expande descripciones tipo "Talles M al XXl" -> ['M','L','XL','XXL']
const expandAlphaSizeRange = (descriptor) => {
  if (!descriptor) return null;

  const raw = String(descriptor).toUpperCase(); // "TALLES M AL XXL"

  // Buscamos explícitamente "M AL XXL", "S AL XL", etc. (con espacios)
  const match = raw.match(
    /(XS|S|M|L|XL|XXL|XXXL)\s+AL\s+(XS|S|M|L|XL|XXL|XXXL)/
  );

  if (!match) return null;

  const from = match[1]; // ej: "M"
  const to = match[2];   // ej: "XXL"

  const startIdx = ALPHA_SIZES.indexOf(from);
  const endIdx = ALPHA_SIZES.indexOf(to);

  if (startIdx === -1 || endIdx === -1) return null;

  const [fromIdx, toIdx] =
    startIdx <= endIdx ? [startIdx, endIdx] : [endIdx, startIdx];

  return ALPHA_SIZES.slice(fromIdx, toIdx + 1); // ['M','L','XL','XXL']
};

const normalizeSizes = (arr = []) => {
  if (!Array.isArray(arr) || arr.length === 0) return [];

  // Caso especial: viene una sola descripción tipo "Talles S al XL"
  if (arr.length === 1 && typeof arr[0] === 'string') {
    const expanded = expandAlphaSizeRange(arr[0]);
    if (expanded && expanded.length) {
      return expanded.map((s, i) => ({
        id: `sz-${s}-${i}`,
        name: s
      }));
    }
  }

  // Caso normal: ya vienen talles 1x1 ['S','M','L'] o ['1','2','3']
  return arr.map((s, i) => ({
    id: `sz-${s ?? i}`,
    name: String(s)
  }));
};

export default function ProductDetail() {
  const { catalog, id } = useParams();

  // Estado principal
  const [product, setProduct] = useState(null);
  const [images, setImages] = useState([]); // urls galería
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  // Variantes (dinámicas si vienen de vestidos; si no, defaults)
  const [colorOptions, setColorOptions] = useState(defaultColors);
  const [sizeOptions, setSizeOptions] = useState(defaultSizes);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);

  // Scroll top al cambiar id
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  // Carga de datos: 1) por catálogo (vestidos / sastrero)  2) legacy
  useEffect(() => {
    let cancelled = false;

    async function load() {
      // ---- DATA SOURCES POR CATÁLOGO ----
      const sources = {
        vestidos: {
          get: getVestido,
          load: loadAllImagesVestidos,
          label: 'Vestidos'
        },
        sastrero: {
          get: getSastrero,
          load: loadAllImagesSastrero,
          label: 'Sastrero'
        }
      };

      const src = sources[catalog];

      if (src) {
        const g = src.get?.(Number(id)) || null;
        if (g) {
          const p = {
            id: g.id,
            title: g.name,
            price: g.price ?? null,
            priceDetails: '',
            subtitle: '',
            category: src.label,
            imageFront: null,
            imageBack: null,
            imagePack: null,
            description:
              'Producto de nuestra colección. Consultá disponibilidad por color y talle.'
          };

          // variantes dinámicas desde overrides
          const dynamicColors =
            Array.isArray(g.colors) && g.colors.length
              ? normalizeColors(g.colors)
              : defaultColors;

          const dynamicSizes =
            Array.isArray(g.sizes) && g.sizes.length
              ? normalizeSizes(g.sizes)
              : defaultSizes;

          const urls = await src.load(g);
          if (cancelled) return;

          setProduct(p);
          setImages(urls);
          setCurrentIndex(0);
          setColorOptions(dynamicColors);
          setSizeOptions(dynamicSizes);
          setSelectedSize(dynamicSizes[0] || null);
          setSelectedColor(dynamicColors[0] || null);
          return;
        }
      }

      // ---- LEGACY (como lo tenías) ----
      const merged = [
        ...products,
        ...productosURL.filter((p2) => !products.some((p1) => p1.id === p2.id))
      ];
      const found = merged.find((p) => p.id === Number(id)) || null;

      if (!found) {
        if (!cancelled) {
          setProduct(null);
          setImages([]);
        }
        return;
      }

      const gallery = Array.from(
        new Set(
          [found.imageFront, found.imageBack, found.imagePack].filter(Boolean)
        )
      );

      if (!cancelled) {
        setProduct(found);
        setImages(gallery);
        setCurrentIndex(0);
        setColorOptions(defaultColors);
        setSizeOptions(defaultSizes);
        setSelectedColor(null);
        setSelectedSize(null);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [catalog, id]);

  // Pre-carga siguiente imagen (suaviza cambio)
  useEffect(() => {
    const next = images[currentIndex + 1];
    if (!next) return;
    const img = new Image();
    img.src = next;
  }, [images, currentIndex]);

  // Navegación teclado
  const onKeyDown = useCallback(
    (e) => {
      if (!images.length) return;
      if (e.key === 'ArrowRight') {
        setCurrentIndex((i) => Math.min(i + 1, images.length - 1));
      } else if (e.key === 'ArrowLeft') {
        setCurrentIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === 'Escape') {
        setLightbox(false);
      }
    },
    [images.length]
  );

  useEffect(() => {
    window.addEventListener('keydown', onKeyDown, { passive: true });
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onKeyDown]);

  if (!product) {
    return (
      <div className="min-h-[60vh] grid place-items-center bg-black text-white">
        <div className="max-w-5xl w-full p-6">
          <ProductNotFound />
        </div>
      </div>
    );
  }

  const title = product.title || 'Producto';
  const priceText =
    typeof product.price === 'number'
      ? moneyAR(product.price)
      : product.category === 'Vestidos'
      ? moneyVest?.(product.price) ?? 'Consultar'
      : moneyAR(product.price);

  const mainImage =
    images[currentIndex] ||
    product.imageFront ||
    product.imageBack ||
    product.imagePack ||
    null;

  return (
    <section className="bg-[#0a0a0a] text-white">
      {/* Strip dorado superior */}
      <div className="h-[3px] bg-gradient-to-r from-[#d4af37] via-[#f0d68a] to-[#d4af37]" />

      {/* Contenedor */}
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
            {product.category && (
              <>
                <li className="hidden xs:block">{product.category}</li>
                <li className="hidden xs:block opacity-60">/</li>
              </>
            )}
            <li className="font-medium text-white">{title}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {/* Galería */}
          <div>
            <div className="relative group rounded-2xl overflow-hidden ring-2 ring-[#d4af37] bg-black/40">
              <AnimatePresence mode="wait">
                {mainImage ? (
                  <motion.img
                    key={mainImage}
                    src={mainImage}
                    alt={title}
                    className="absolute inset-0 w-full h-full object-cover  "
                    style={{ aspectRatio: '4 / 5' }}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0.2, scale: 1.02 }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                    draggable={false}
                    decoding="async"
                  />
                ) : (
                  <div
                    key="skeleton"
                    className="absolute inset-0 bg-white/5 animate-pulse"
                    style={{ aspectRatio: '4 / 5' }}
                  />
                )}
              </AnimatePresence>

              {/* Gradiente y botón lightbox */}
              <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-white/5" />
              </div>

              {mainImage && (
                <button
                  type="button"
                  onClick={() => setLightbox(true)}
                  className="absolute bottom-3 right-3 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-black/60 backdrop-blur px-3 py-2 text-sm hover:bg-black/75 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f0d68a]"
                  aria-label="Ver imagen a pantalla completa"
                >
                  <Maximize2 className="w-4 h-4 text-white/90" />
                  <span className="text-white/90">Ampliar</span>
                </button>
              )}

              {/* Mantener altura estable */}
              <div className="invisible" style={{ aspectRatio: '4 / 5' }} />
            </div>

            {/* Thumbnails */}
            <div className="mt-4 grid grid-cols-4 gap-3">
              {(images.length ? images : [null, null, null, null])
                .slice(0, 10)
                .map((url, idx) => {
                  const active = idx === currentIndex;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => url && setCurrentIndex(idx)}
                      className={`relative aspect-square rounded-xl overflow-hidden ring-1 transition
                                focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f0d68a]
                                ${
                                  active
                                    ? 'ring-2 ring-[#d4af37]'
                                    : 'ring-white/10'
                                }
                                ${url ? 'cursor-pointer' : 'opacity-80'}`}
                      aria-label={url ? `Ver imagen ${idx + 1}` : 'Marca'}
                    >
                      {url ? (
                        <img
                          src={url}
                          alt={`Vista ${idx + 1}`}
                          className="w-full h-full object-cover"
                          loading="lazy"
                          decoding="async"
                          draggable={false}
                        />
                      ) : (
                        <div className="w-full h-full grid place-items-center bg-black/60">
                          <Sparkles className="w-6 h-6 text-[#f0d68a]" />
                        </div>
                      )}
                    </button>
                  );
                })}
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
            <div className="rounded-2xl ring-1 ring-white/10 bg-gradient-to-b from-black/60 to-black/30 p-5 md:p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
                    {title}
                  </h1>
                  {product.subtitle && (
                    <p className="text-white/70 mt-1 text-sm">
                      {product.subtitle}
                    </p>
                  )}
                </div>
                <div className="text-right">
                  <div
                    className={`text-[28px] leading-none font-semibold bg-clip-text text-transparent bg-gradient-to-r ${GOLD_GRAD}`}
                  >
                    {priceText}
                  </div>
                  {product.priceDetails && (
                    <p className="text-xs text-white/70 mt-1">
                      {product.priceDetails}
                    </p>
                  )}
                </div>
              </div>

              {/* Rating demo */}
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

              {/* Talles (dinámicos si vienen de vestidos) */}
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
                  {sizeOptions.map((size) => {
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

              {/* Colores (dinámicos si vienen de vestidos) */}
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
                  {(colorOptions || []).map((c) => {
                    const active = selectedColor?.id === c.id;
                    return (
                      <button
                        key={c.id}
                        type="button"
                        role="radio"
                        aria-checked={active}
                        onClick={() => setSelectedColor(c)}
                        className={[
                          // tamaño y forma
                          'h-10 w-10 rounded-full p-[2px]',
                          // borde: blanco si está activo, gris si no
                          active
                            ? 'border-2 border-white'
                            : 'border border-gray-500/60',
                          // focus visible
                          'focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f0d68a]',
                          // micro animación
                          active ? 'scale-110' : 'hover:scale-105',
                          'transition'
                        ].join(' ')}
                        aria-label={c.name}
                        title={c.name}
                      >
                        <span
                          className="block h-full w-full rounded-full"
                          style={
                            c.bg
                              ? { background: c.bg }
                              : { backgroundColor: c.hex }
                          }
                        />
                      </button>
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
                  {(
                    product.description ||
                    'Producto de la nueva colección. Consultá disponibilidad.'
                  )
                    .split('\n')
                    .map((line, i) => (
                      <p key={i}>{line.trim()}</p>
                    ))}
                </div>
              </details>
              <div className="h-px bg-white/10 mx-5" />
              <div className="p-5 md:p-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div className="rounded-xl bg-black/40 ring-1 ring-white/10 p-4">
                  <p className="font-medium mb-1">Composición</p>
                  <p className="text-white/80">
                    Textiles seleccionados y terminación premium.
                  </p>
                </div>
                <div className="rounded-xl bg-black/40 ring-1 ring-white/10 p-4">
                  <p className="font-medium mb-1">Cuidados</p>
                  <p className="text-white/80">
                    Lavar con agua fría. No cloro. Secado a la sombra.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sticky CTA mobile */}
        <div className="lg:hidden fixed inset-x-0 bottom-0 z-40 p-3 pointer-events-none">
          <div className="pointer-events-auto mx-auto max-w-6xl">
            <div className="rounded-2xl ring-1 ring-white/10 bg-black/70 backdrop-blur p-3">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm text-white/70 leading-tight">{title}</p>
                  <p
                    className={`text-base font-semibold bg-clip-text text-transparent bg-gradient-to-r ${GOLD_GRAD}`}
                  >
                    {priceText}
                  </p>
                </div>
                <AddToCartButton
                  product={product}
                  selectedColor={selectedColor}
                  selectedSize={selectedSize}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Strip dorado inferior */}
      <div className="h-[2px] bg-gradient-to-r from-[#d4af37] via-[#f0d68a] to-[#d4af37]" />

      {/* Lightbox fullscreen */}
      <AnimatePresence>
        {lightbox && mainImage && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              onClick={() => setLightbox(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f0d68a]"
              aria-label="Cerrar"
            >
              <X className="w-6 h-6 text-white" />
            </button>
            <div className="h-full w-full grid place-items-center p-4">
              <img
                src={mainImage}
                alt={title}
                className="max-h-[90vh] max-w-[95vw] object-contain"
                draggable={false}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
