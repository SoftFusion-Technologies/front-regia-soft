import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { products as catalogProducts } from '../Helpers/productsPremium.js';
import ParticlesBackground from '../Components/ParticlesBackground.jsx';

/**
 * FeaturedProductsAurora — Variante ultra moderna sin bg-black/50
 *
 * - Cards con borde/halo dorado (gradiente) usando "p-[1px]" y fondo transparente
 * - Glow sutil solo al hover (sin superposiciones negras)
 * - Crossfade front/back limpio
 * - Stagger enter con Framer Motion
 * - Soporta override de productos via prop
 */
export default function FeaturedProductsAurora({
  products: overrideProducts,
  title = 'Destacados',
  onQuickView
}) {
  const list = useMemo(() => {
    if (Array.isArray(overrideProducts) && overrideProducts.length)
      return overrideProducts;
    return Array.isArray(catalogProducts) ? catalogProducts : [];
  }, [overrideProducts]);

  return (
    <section
      id="featured-products"
      className="py-14 sm:py-16 px-4 sm:px-6 lg:px-8"
    >
      {/* Título */}
      <div className="max-w-7xl mx-auto mb-8 md:mb-10">
        <h2 className="text-center font-bignoodle tracking-tight uppercase text-3xl sm:text-4xl md:text-5xl">
          <span className="bg-gradient-to-b from-[#f1d08a] via-[#caa042] to-[#a38321] bg-clip-text text-transparent">
            {title}
          </span>
        </h2>
      </div>
      <ParticlesBackground></ParticlesBackground>

      {/* Grid */}
      <motion.ul
        className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6 md:gap-7"
        initial="hidden"
        animate="show"
        variants={{
          hidden: { opacity: 1 },
          show: { opacity: 1, transition: { staggerChildren: 0.08 } }
        }}
      >
        {list.map((p) => (
          <motion.li
            key={p.id}
            variants={{
              hidden: { opacity: 0, y: 12 },
              show: { opacity: 1, y: 0 }
            }}
            className="group relative"
          >
            <Link
              to={`/product/${p.id}/${encodeURIComponent(
                p.title || 'producto'
              )}`}
              className="block focus:outline-none"
            >
              {/* Wrapper con borde/gradiente dorado sin fondo negro */}
              <div className="relative rounded-2xl p-[1px] bg-[linear-gradient(135deg,rgba(241,208,138,0.7)_0%,rgba(202,160,66,0.7)_45%,rgba(163,131,33,0.7)_100%)] transition-transform duration-300 group-hover:-translate-y-1">
                {/* Capa interior transparente (sin bg-black/50) */}
                <div className="relative rounded-2xl overflow-hidden bg-transparent">
                  {/* Glow sutil en hover (solo halo) */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-[12px] bg-[radial-gradient(60%_60%_at_50%_10%,rgba(241,208,138,0.25),rgba(163,131,33,0.1)_60%,transparent_80%)]"
                  />

                  {/* Media */}
                  <div className="relative w-full aspect-[4/5]">
                    {/* Frente */}
                    <img
                      src={p.imageFront}
                      alt={p.title}
                      className="absolute inset-0 h-full w-full object-contain transition-opacity duration-200 ease-out group-hover:opacity-0"
                      loading="lazy"
                      decoding="async"
                    />
                    {/* Espalda */}
                    {p.imageBack && (
                      <img
                        src={p.imageBack}
                        alt={`${p.title} espalda`}
                        className="absolute inset-0 h-full w-full object-contain opacity-0 transition-opacity duration-200 ease-out group-hover:opacity-100"
                        loading="lazy"
                        decoding="async"
                      />
                    )}

                    {/* Borde interior sutil para definición del contorno */}
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-[#a38321]/25"
                    />

                    {/* Badge (opcional) */}
                    {p.badge && (
                      <span className="absolute left-2.5 top-2.5 rounded-full border border-[#caa042]/40 bg-black/60 px-2.5 py-1 text-[11px] font-medium text-white">
                        {p.badge}
                      </span>
                    )}
                  </div>

                  {/* Info */}
                  <div className="p-3.5 sm:p-4 text-center">
                    <h3 className="font-bignoodle text-xl leading-tight">
                      {p.title}
                    </h3>
                    <div className="mt-1.5 text-sm text-white/70 min-h-[1.25rem]">
                      {p.priceDetails || ''}
                    </div>
                    <div className="mt-2.5">
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
            </Link>

            {/* Focus a nivel tarjeta */}
            <span className="pointer-events-none absolute inset-0 rounded-2xl ring-2 ring-transparent group-focus-within:ring-[#a38321]" />
          </motion.li>
        ))}
      </motion.ul>
    </section>
  );
}
