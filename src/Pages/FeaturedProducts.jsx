import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
  useCallback
} from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ChevronRight, ChevronLeft, X, Sparkles } from 'lucide-react';
// Fallback al catálogo local si no se pasan productos por props
import { products as catalogProducts } from '../Helpers/productsPremium.js';

/**
 * FeaturedProductsAurora v2 — Regia
 *
 * Objetivo UX: menos invasivo al primer scroll, más elegante y escaneable.
 *
 * Cambios clave:
 * - "Teaser Row" horizontal con snap (3–4 cards) + CTA "Ver colección" que expande a grilla.
 * - Modo Expandido con filtros/chips (categoría, novedad, promo) y paginación por lotes (intersección / Ver más).
 * - Card premium Regia: halo dorado, glint sweep sutil, crossfade frente/espalda, focus visible.
 * - Imagenes optimizadas (decoding async, sizes). Respetamos prefers-reduced-motion.
 * - Empty state elegante + skeletons suaves.
 * - API simple: products (array) + onQuickView(product) opcional.
 */

export default function FeaturedProductsAuroraV2({
  products: overrideProducts,
  title = 'Destacados',
  categories = [], // ej.: ['Vestidos', 'Blusas', 'Jeans']
  defaultExpanded = false,
  onQuickView
}) {
  const shouldReduce = useReducedMotion();

  const all = useMemo(() => {
    const base =
      Array.isArray(overrideProducts) && overrideProducts.length
        ? overrideProducts
        : Array.isArray(catalogProducts)
        ? catalogProducts
        : [];
    // Normalización mínima de campos
    return base.map((p, i) => ({
      id: p.id ?? i,
      title: p.title ?? 'Producto',
      price: p.price ?? '',
      priceOld: p.priceOld ?? '',
      priceDetails: p.priceDetails ?? '',
      imageFront: p.imageFront ?? p.image ?? '',
      imageBack: p.imageBack ?? '',
      badge: p.badge ?? '',
      category: p.category ?? 'Colección'
    }));
  }, [overrideProducts]);

  // Filtros & estado expandido
  const [expanded, setExpanded] = useState(!!defaultExpanded);
  const [chip, setChip] = useState('Todos');
  const [onlyPromo, setOnlyPromo] = useState(false);
  const [onlyNew, setOnlyNew] = useState(false);

  const pool = useMemo(() => {
    let arr = [...all];
    if (chip && chip !== 'Todos')
      arr = arr.filter(
        (p) => (p.category || '').toLowerCase() === chip.toLowerCase()
      );
    if (onlyPromo) arr = arr.filter((p) => !!p.priceOld);
    if (onlyNew)
      arr = arr.filter((p) => /(nuevo|new|nueva)/i.test(p.badge || ''));
    return arr;
  }, [all, chip, onlyPromo, onlyNew]);

  // Paginación perezosa en modo expandido
  const [visible, setVisible] = useState(8);
  useEffect(() => {
    setVisible(8);
  }, [chip, onlyPromo, onlyNew]);
  const showMore = useCallback(
    () => setVisible((v) => Math.min(v + 8, pool.length)),
    [pool.length]
  );

  return (
    <section
      id="featured-products"
      className="relative py-14 sm:py-16 px-4 sm:px-6 lg:px-8"
    >
      {/* Encabezado */}
      <Header
        title={title}
        expanded={expanded}
        setExpanded={setExpanded}
        total={pool.length}
      />

      {/* Modo teaser: menos invasivo */}
      <AnimatePresence mode="wait">
        {!expanded ? (
          <motion.div
            key="teaser"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <TeaserRow products={pool.slice(0, 10)} onQuickView={onQuickView} />
            <div className="mt-8 flex justify-center">
              <button
                type="button"
                onClick={() => setExpanded(true)}
                className="inline-flex items-center gap-2 rounded-xl border border-[#a38321]/40 px-4 py-2.5 text-sm text-white/90 hover:bg-[#a38321] hover:text-black transition-colors"
                aria-label="Ver colección completa"
              >
                Ver colección
                <ChevronRight size={18} />
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="grid"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <FiltersBar
              categories={['Todos', ...categories]}
              chip={chip}
              setChip={setChip}
              onlyPromo={onlyPromo}
              setOnlyPromo={setOnlyPromo}
              onlyNew={onlyNew}
              setOnlyNew={setOnlyNew}
              onCollapse={() => setExpanded(false)}
            />

            {/* Grid */}
            <motion.ul
              className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6 md:gap-7 mt-6"
              initial="hidden"
              animate="show"
              variants={{
                hidden: { opacity: 1 },
                show: { opacity: 1, transition: { staggerChildren: 0.06 } }
              }}
            >
              {pool.slice(0, visible).map((p) => (
                <motion.li
                  key={p.id}
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    show: { opacity: 1, y: 0 }
                  }}
                >
                  <ProductCardRegia p={p} onQuickView={onQuickView} />
                </motion.li>
              ))}
            </motion.ul>

            {/* Ver más */}
            {visible < pool.length && (
              <div className="mt-8 flex justify-center">
                <button
                  type="button"
                  onClick={showMore}
                  className="inline-flex items-center gap-2 rounded-xl border border-[#a38321]/40 px-4 py-2.5 text-sm text-white/90 hover:bg-[#a38321] hover:text-black transition-colors"
                >
                  Ver más
                  <ChevronRight size={18} />
                </button>
              </div>
            )}

            {/* Empty state */}
            {pool.length === 0 && <EmptyState />}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ============================ Subcomponentes ============================ */

function Header({ title, expanded, setExpanded, total }) {
  return (
    <div className="max-w-7xl mx-auto mb-8 md:mb-10 flex items-end justify-between gap-4">
      <h2 className="flex-1 text-center md:text-left font-bignoodle tracking-tight uppercase text-3xl sm:text-4xl md:text-5xl">
        <span className="bg-gradient-to-b from-[#f1d08a] via-[#caa042] to-[#a38321] bg-clip-text text-transparent">
          {title}
        </span>
      </h2>
      {expanded && (
        <button
          type="button"
          onClick={() => setExpanded(false)}
          className="hidden md:inline-flex items-center gap-2 rounded-xl border border-white/15 px-3.5 py-2 text-sm text-white/80 hover:bg-white/10"
          aria-label="Contraer"
        >
          <ChevronLeft size={18} /> Contraer
        </button>
      )}
    </div>
  );
}

function TeaserRow({ products, onQuickView }) {
  if (!products || products.length === 0)
    return (
      <div className="max-w-7xl mx-auto">
        <SkeletonRow />
      </div>
    );
  return (
    <div className="max-w-7xl mx-auto relative">
      <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent px-1 py-1">
        {products.map((p) => (
          <div
            key={p.id}
            className="snap-start min-w-[72%] xs:min-w-[56%] sm:min-w-[44%] md:min-w-[32%] lg:min-w-[24%]"
          >
            <ProductCardRegia p={p} onQuickView={onQuickView} compact />
          </div>
        ))}
      </div>
    </div>
  );
}

function FiltersBar({
  categories,
  chip,
  setChip,
  onlyPromo,
  setOnlyPromo,
  onlyNew,
  setOnlyNew,
  onCollapse
}) {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Chips de categoría */}
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setChip(c)}
              className={
                'rounded-full px-3 py-1.5 text-xs md:text-sm border transition ' +
                (chip === c
                  ? 'border-[#a38321] text-black bg-[#a38321]'
                  : 'border-white/15 text-white/80 hover:border-white/30')
              }
            >
              {c}
            </button>
          ))}
        </div>

        {/* Toggles */}
        <div className="flex items-center gap-2">
          <Toggle checked={onlyNew} onChange={setOnlyNew}>
            Nuevo
          </Toggle>
          <Toggle checked={onlyPromo} onChange={setOnlyPromo}>
            Promo
          </Toggle>
          <button
            type="button"
            onClick={onCollapse}
            className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-3 py-1.5 text-sm text-white/80 hover:bg-white/10"
            aria-label="Contraer"
          >
            <ChevronLeft size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

function Toggle({ checked, onChange, children }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-8 w-14 items-center rounded-full border px-1 transition ${
        checked
          ? 'bg-[#a38321] border-[#a38321]'
          : 'bg-transparent border-white/20'
      }`}
      role="switch"
      aria-checked={checked}
    >
      <span
        className={`inline-block h-6 w-6 transform rounded-full bg-white transition ${
          checked ? 'translate-x-6' : 'translate-x-0'
        }`}
      />
      <span className="absolute left-1/2 -translate-x-1/2 text-xs font-medium text-white/80 select-none">
        {children}
      </span>
    </button>
  );
}

function EmptyState() {
  return (
    <div className="max-w-7xl mx-auto mt-8">
      <div className="rounded-2xl border border-white/10 p-10 text-center text-white/70">
        <Sparkles className="mx-auto mb-3" />
        <p>
          No encontramos productos con esos filtros. Probá ajustar la búsqueda.
        </p>
      </div>
    </div>
  );
}

function SkeletonRow() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="rounded-2xl p-[1px] bg-gradient-to-br from-white/5 to-white/0"
        >
          <div className="rounded-2xl overflow-hidden border border-white/10">
            <div className="aspect-[4/5] animate-pulse bg-white/5" />
            <div className="p-4 space-y-2">
              <div className="h-4 w-2/3 bg-white/10 rounded" />
              <div className="h-3 w-1/2 bg-white/10 rounded" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function ProductCardRegia({ p, onQuickView, compact = false }) {
  const shouldReduce = useReducedMotion();
  return (
    <div className="group relative">
      <a
        href={`/product/${p.id}/${encodeURIComponent(p.title || 'producto')}`}
        className="block focus:outline-none"
      >
        <div className="relative rounded-2xl p-[1px] bg-[linear-gradient(135deg,rgba(241,208,138,0.7)_0%,rgba(202,160,66,0.7)_45%,rgba(163,131,33,0.7)_100%)] transition-transform duration-300 group-hover:-translate-y-1">
          <div className="relative rounded-2xl overflow-hidden bg-transparent">
            {/* Glow sutil */}
            <span
              aria-hidden
              className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-[12px] bg-[radial-gradient(60%_60%_at_50%_10%,rgba(241,208,138,0.25),rgba(163,131,33,0.1)_60%,transparent_80%)]"
            />

            {/* Media */}
            <div
              className={`relative w-full ${
                compact ? 'aspect-[4/5]' : 'aspect-[4/5]'
              } bg-black/20`}
            >
              <img
                src={p.imageFront}
                alt={p.title}
                className="absolute inset-0 h-full w-full object-contain transition-opacity duration-200 ease-out group-hover:opacity-0"
                loading="lazy"
                decoding="async"
                sizes="(min-width: 1024px) 22vw, (min-width: 768px) 30vw, 70vw"
              />
              {p.imageBack && (
                <img
                  src={p.imageBack}
                  alt={`${p.title} espalda`}
                  className="absolute inset-0 h-full w-full object-contain opacity-0 transition-opacity duration-200 ease-out group-hover:opacity-100"
                  loading="lazy"
                  decoding="async"
                  sizes="(min-width: 1024px) 22vw, (min-width: 768px) 30vw, 70vw"
                />
              )}

              {/* Borde interior */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-[#a38321]/25"
              />

              {/* Badge */}
              {p.badge && (
                <span className="absolute left-2.5 top-2.5 rounded-full border border-[#caa042]/40 bg-black/60 px-2.5 py-1 text-[11px] font-medium text-white">
                  {p.badge}
                </span>
              )}

              {/* Glint sweep */}
              {!shouldReduce && (
                <motion.div
                  aria-hidden
                  className="absolute inset-0 pointer-events-none mix-blend-screen"
                  initial={{ x: '-120%' }}
                  animate={{ x: ['-120%', '140%'] }}
                  transition={{
                    duration: 3.2,
                    delay: 0.35,
                    repeat: Infinity,
                    repeatDelay: 2.4,
                    ease: [0.6, 0.05, 0.01, 0.99]
                  }}
                  style={{
                    background:
                      'linear-gradient(75deg, rgba(255,255,255,0) 45%, rgba(255,255,255,0.22) 50%, rgba(255,255,255,0) 55%)'
                  }}
                />
              )}
            </div>

            {/* Info */}
            <div
              className={`p-3.5 sm:p-4 ${
                compact ? 'text-left' : 'text-center'
              }`}
            >
              <h3 className="font-bignoodle text-xl leading-tight">
                {p.title}
              </h3>
              <div className="mt-1.5 text-sm text-white/70 min-h-[1.25rem]">
                {p.priceDetails || ''}
              </div>
              <div className={`mt-2.5 ${compact ? '' : ''}`}>
                <span className="inline-flex items-baseline gap-1">
                  <span className="text-lg font-semibold text-white">
                    {p.price}
                  </span>
                  {p.priceOld && (
                    <span className="text-sm text-white/50 line-through">
                      {p.priceOld}
                    </span>
                  )}
                </span>
              </div>

              {typeof onQuickView === 'function' && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    onQuickView(p);
                  }}
                  className="mt-3 inline-flex items-center justify-center rounded-xl border border-[#a38321]/30 px-3 py-2 text-sm text-white/90 hover:bg-[#a38321] hover:text-black transition-colors"
                >
                  Vista rápida
                </button>
              )}
            </div>
          </div>
        </div>
      </a>
      {/* Focus a nivel tarjeta */}
      <span className="pointer-events-none absolute inset-0 rounded-2xl ring-2 ring-transparent group-focus-within:ring-[#a38321]" />
    </div>
  );
}
