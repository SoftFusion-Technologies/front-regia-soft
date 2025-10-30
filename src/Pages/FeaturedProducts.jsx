import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Heart, Eye } from 'lucide-react';
import { products as catalogProducts } from '../Helpers/productsPremium.js';
import FeaturedGallery from './FeaturedGallery.jsx';

/**
 * NUEVO: pasa tus 4 imágenes a la prop `banners`.
 * Ej: banners={[
 *   '/banners/regia1.webp','/banners/regia2.webp',
 *   '/banners/regia3.webp','/banners/regia4.webp'
 * ]}
 */

export default function FeaturedProducts({
  products: overrideProducts,
  title = 'Destacados',
  initialBatch = 8,
  batchSize = 8,
  onQuickView,
  banners = [] // << ADICIONADO: 4 imágenes para rotar
}) {
  const shouldReduce = useReducedMotion();

  const files = [
    '/ProductsDestacados/Img_Dest1.jpg',
    '/ProductsDestacados/Img_Dest2.jpg',
    '/ProductsDestacados/Img_Dest3.jpg',
    '/ProductsDestacados/Img_Dest4.jpg',
    '/ProductsDestacados/Img_Dest5.jpg',
    '/ProductsDestacados/Img_Dest6.jpg',
    '/ProductsDestacados/Img_Dest7.jpg',
    '/ProductsDestacados/Img_Dest8.jpg'
  ];
  const all = useMemo(() => {
    const base =
      Array.isArray(overrideProducts) && overrideProducts.length
        ? overrideProducts
        : Array.isArray(catalogProducts)
        ? catalogProducts
        : [];
    return base.map((p, i) => ({
      id: p.id ?? i,
      title: p.title ?? 'Producto',
      price: p.price ?? '',
      priceOld: p.priceOld ?? '',
      priceDetails: p.priceDetails ?? '',
      imageFront: p.imageFront ?? p.image ?? '',
      imageBack: p.imageBack ?? '',
      imagePack: p.imagePack ?? '',
      badge: p.badge ?? '',
      category: p.category ?? 'Colección',
      // opcional: p.hero (array extra para spotlight) si querés
      hero: Array.isArray(p.hero) ? p.hero : null
    }));
  }, [overrideProducts]);

  if (!all.length) return <Empty />;

  const [visible, setVisible] = useState(initialBatch);
  const spotlight = all[0];
  const rest = all.slice(1);

  const GOLD = 'from-[#f1d08a] via-[#caa042] to-[#a38321]';

  return (
    <section className="relative py-14 sm:py-16 px-4 sm:px-6 lg:px-8">
      {/* Heading */}
      {/* <div className="max-w-7xl mx-auto mb-8 md:mb-10">
        <h2 className="text-center md:text-left font-bignoodle tracking-tight uppercase text-3xl sm:text-4xl md:text-5xl">
          <span
            className={`bg-gradient-to-b ${GOLD} bg-clip-text text-transparent`}
          >
            {title}
          </span>
        </h2>
      </div> */}

      {/* Spotlight unchanged en mobile; refinado en desktop */}
      {/* <div className="max-w-7xl mx-auto">
        <FeaturedGallery files={files} />
      </div> */}

      <div className="max-w-7xl mx-auto mb-8 md:mb-10" id="featured-products">
        <h2 className="text-center md:text-left font-bignoodle tracking-tight uppercase text-3xl sm:text-4xl md:text-5xl">
          <span
            className={`bg-gradient-to-b ${GOLD} bg-clip-text text-transparent`}
          >
            PRODUCTOS BY REGIA
          </span>
        </h2>
      </div>
      {/* Grid Luxe (sin cambios visuales en mobile) */}
      {/* Full-bleed, sin overflow lateral y pegado a los bordes */}
        <div className="sm:ml-2 relative mx-[calc(50%-50vw)] w-[95vw] max-w-[95vw]">
          <motion.ul
            className="
        mt-6
        grid grid-cols-2        /* ⬅️ mínimo 2 en mobile */
        md:grid-cols-4          /* ⬅️ 4 en desktop/pc */
        gap-2 sm:gap-3 md:gap-4 lg:gap-6
      "
            initial="hidden"
            animate="show"
            variants={{
              hidden: { opacity: 1 },
              show: { opacity: 1, transition: { staggerChildren: 0.06 } }
            }}
          >
            {rest.slice(0, visible).map((p) => (
              <motion.li
                key={p.id}
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  show: { opacity: 1, y: 0 }
                }}
                className="h-full"
              >
                <LuxeCard p={p} onQuickView={onQuickView} />
              </motion.li>
            ))}
          </motion.ul>
        </div>

      {/* Cargar más */}
      {visible < rest.length && (
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() =>
              setVisible((v) => Math.min(v + batchSize, rest.length))
            }
            className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-black/70 px-4 py-2.5 text-sm text-white/90 hover:bg-black focus:outline-none focus:ring-2 focus:ring-[#a38321] focus:ring-offset-2 focus:ring-offset-black"
          >
            Cargar más <ArrowRight size={16} />
          </button>
        </div>
      )}
    </section>
  );
}

function LuxeCard({ p, onQuickView }) {
  const shouldReduce = useReducedMotion();
  const GOLD_GRAD =
    'linear-gradient(135deg, rgba(213, 156, 33, 0.75) 0%, rgba(227, 160, 16, 0.62) 48%, rgba(181, 138, 7, 0.62) 100%)';

  return (
    <div className="group relative focus-within:outline-none"
    >
      <a
        href={`/product/${p.id}/${encodeURIComponent(p.title || 'producto')}`}
        className="block focus:outline-none"
      >
        {/* Marco dorado más presente + sombra cálida */}
        <motion.div
          initial={false}
          whileHover={
            shouldReduce ? {} : { y: -5, rotateX: 0.35, rotateY: -0.35 }
          }
          transition={{
            type: 'spring',
            stiffness: 260,
            damping: 22,
            mass: 0.7
          }}
          className="relative rounded-2xl p-[1px]"
          style={{
            background: GOLD_GRAD,
            boxShadow:
              '0 28px 70px -30px rgba(241,208,138,0.18), 0 18px 40px -28px rgba(0,0,0,0.65)'
          }}
        >
          {/* Cuerpo con fondo “no tan negro”: glass + baño dorado sutil */}
          <div className="relative rounded-2xl overflow-hidden bg-[#0e0c08]/70 backdrop-blur-sm">
            {/* Baño dorado muy suave al fondo */}
            <span
              aria-hidden
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'radial-gradient(120% 80% at 50% 0%, rgba(241,208,138,0.14), rgba(202,160,66,0.10) 35%, rgba(0,0,0,0) 60%)'
              }}
            />

            {/* Media */}
            <div className="relative aspect-[4/5]">
              {/* Vignette dorado que separa media del contenedor */}
              <span
                aria-hidden
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    'radial-gradient(80% 60% at 50% 35%, rgba(241,208,138,0.10), rgba(0,0,0,0) 55%)'
                }}
              />
              <img
                src={p.imageFront}
                alt={p.title}
                className="absolute inset-0 h-full w-full object-contain transition-transform duration-400 ease-out group-hover:scale-[1.045]"
                loading="lazy"
                decoding="async"
                sizes="(min-width:1280px) 20vw, (min-width:768px) 30vw, 92vw"
              />
              {p.imageBack && (
                <img
                  src={p.imageBack}
                  alt={`${p.title} espalda`}
                  className="absolute inset-0 h-full w-full object-contain opacity-0 transition-opacity duration-200 ease-out group-hover:opacity-100"
                  loading="lazy"
                  decoding="async"
                />
              )}

              {/* Glint sweep continuo (un toque más visible) */}
              {!shouldReduce && (
                <motion.span
                  aria-hidden
                  className="absolute inset-y-0 -left-[20%] w-[140%] pointer-events-none mix-blend-screen"
                  style={{
                    background:
                      'linear-gradient(75deg, rgba(255,255,255,0) 45%, rgba(255,255,255,0.16) 50%, rgba(255,255,255,0) 55%)'
                  }}
                  animate={{ x: ['-120%', '140%'] }}
                  transition={{
                    duration: 3.1,
                    repeat: Infinity,
                    repeatDelay: 2.2,
                    ease: [0.6, 0.05, 0.01, 0.99]
                  }}
                />
              )}

              {/* Borde interior dorado tenue */}
              <span
                aria-hidden
                className="absolute inset-0 rounded-2xl ring-1 ring-[#a38321]/30"
              />

              {/* Badge más dorada */}
              {p.badge && (
                <span className="absolute left-2.5 top-2.5 rounded-full border border-[#caa042]/55 bg-[#a38321]/20 backdrop-blur-[1px] px-2.5 py-1 text-[11px] font-medium text-[#f8e7bb]">
                  {p.badge}
                </span>
              )}

              {/* Favorito con borde dorado y hover dorado lleno */}
              <button
                type="button"
                aria-label="Agregar a favoritos"
                className="absolute right-2.5 top-2.5 grid place-items-center h-8 w-8 rounded-full border border-[#a38321]/40 bg-black/35 text-[#f1d08a]/90 hover:bg-[#a38321] hover:text-black transition-colors backdrop-blur-sm"
              >
                <Heart size={16} />
              </button>
            </div>

            {/* Info con acentos oro */}
            <div className="p-3.5 sm:p-4 text-center relative">
              <h3 className="font-bignoodle text-xl leading-tight text-white">
                {p.title}
              </h3>
              <div className="mt-1.5 text-sm text-white/75 min-h-[1.25rem]">
                {p.priceDetails || ''}
              </div>
              <div className="mt-2.5">
                <span className="inline-flex items-baseline gap-1">
                  <span className="text-lg font-semibold bg-gradient-to-b from-[#f1d08a] via-[#caa042] to-[#a38321] bg-clip-text text-transparent">
                    {p.price}
                  </span>
                  {p.priceOld && (
                    <span className="text-sm text-white/55 line-through">
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
                  className="mt-3 inline-flex items-center justify-center gap-2 rounded-xl border border-[#a38321]/40 px-3 py-2 text-sm text-[#f6e6b9] hover:bg-[#a38321] hover:text-black focus:outline-none focus:ring-2 focus:ring-[#a38321]/60"
                >
                  <Eye size={14} /> Vista rápida
                </button>
              )}
            </div>
          </div>
        </motion.div>

        {/* Focus visible dorado al tab */}
        <span className="pointer-events-none absolute inset-0 rounded-2xl ring-2 ring-transparent group-focus-within:ring-[#a38321]" />
      </a>
    </div>
  );
}

function Empty() {
  return (
    <section className="py-12 px-4">
      <div className="max-w-5xl mx-auto rounded-2xl border border-white/10 p-10 text-center text-white/70">
        No hay productos para mostrar.
      </div>
    </section>
  );
}
