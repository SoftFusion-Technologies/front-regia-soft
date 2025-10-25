import React, { useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, Sparkles, ArrowRight, Heart, Clock } from 'lucide-react';
import ParticlesBackground from '../Components/ParticlesBackground';

/**
 * EmptyCartRegia — Estado vacío ultra moderno (Regia)
 *
 * Ideas clave de UX
 * - Mensaje con "halo dorado" + aurora animada (no invasivo)
 * - Ícono vectorial premium con glint + flotación sutil (respeta prefers-reduced-motion)
 * - CTA principal grande + atajos inteligentes: Destacados, Novedades, Categorías
 * - Soporte para "vistos recientemente" (thumbnails) vía prop
 * - Accesible: roles/labels claros y focus visible
 */
export default function EmptyCartRegia({
  title = 'Tu carrito está vacío',
  subtitle = 'Agregá tus favoritos y volvé cuando quieras. Guardamos tu selección.',
  primaryCtaLabel = 'Explorar colección',
  onPrimaryClick, // si no viene, navega a /productos
  quickLinks = [
    { label: 'Destacados', href: '/productos-destacados' },
    { label: 'Novedades', href: '/novedades' },
    { label: 'Vestidos', href: '/categoria/vestidos' },
    { label: 'Blusas', href: '/categoria/blusas' }
  ],
  recent = [] // [{id, title, image, href}]
}) {
  const shouldReduce = useReducedMotion();
  const navigate = useNavigate();
  const GOLD = 'from-[#f1d08a] via-[#caa042] to-[#a38321]';

  const handlePrimary = () => {
    if (typeof onPrimaryClick === 'function') return onPrimaryClick();
    navigate('/productos');
  };

  // Variantes
  const container = {
    hidden: { opacity: 0, scale: 0.98 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const floaty = shouldReduce
    ? {}
    : {
        y: [0, -8, 0],
        transition: { duration: 3.5, repeat: Infinity, ease: 'easeInOut' }
      };

  const shimmer = shouldReduce
    ? {}
    : {
        x: ['-120%', '140%'],
        transition: {
          duration: 2.8,
          repeat: Infinity,
          repeatDelay: 1.4,
          ease: [0.6, 0.05, 0.01, 0.99]
        }
      };

  const hasRecent = Array.isArray(recent) && recent.length > 0;

  return (
    <section
      aria-labelledby="emptycart-heading"
      className="relative isolate py-16 px-4 sm:px-6 lg:px-8"
    >
      {/* Backdrop */}
      <div
        aria-hidden
        className="absolute inset-0 -z-20 bg-gradient-to-b from-black/40 via-black/60 to-black/80"
      />
      <ParticlesBackground></ParticlesBackground>

      {/* Aurora / aura dorada */}
      <div
        aria-hidden
        className="absolute -z-10 inset-0 opacity-[0.15]"
        style={{
          background:
            'radial-gradient(80% 50% at 50% 0%, rgba(250,215,160,0.25), rgba(163,131,33,0.1) 45%, transparent 70%)'
        }}
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="mx-auto max-w-3xl text-center"
      >
        {/* Icono premium */}
        <div className="relative mx-auto grid place-items-center h-28 w-28 sm:h-32 sm:w-32 rounded-full bg-black/40 border border-[#a38321]/25 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)] overflow-hidden">
          {/* brillos */}
          {!shouldReduce && (
            <motion.span
              aria-hidden
              className="absolute inset-0 mix-blend-screen"
              style={{
                background:
                  'linear-gradient(70deg, transparent 45%, rgba(255,255,255,0.22) 50%, transparent 55%)'
              }}
              animate={shimmer}
            />
          )}
          <motion.span
            aria-hidden
            animate={floaty}
            className="text-4xl sm:text-5xl text-[#f1d08a]"
          >
            <ShoppingBag strokeWidth={1.6} size={56} />
          </motion.span>
        </div>

        {/* Título + subtítulo */}
        <h1
          id="emptycart-heading"
          className="mt-6 font-bignoodle text-3xl sm:text-4xl md:text-5xl tracking-tight uppercase"
        >
          <span
            className={`bg-gradient-to-b ${GOLD} bg-clip-text text-transparent`}
          >
            {title}
          </span>
        </h1>
        <p className="mt-2 text-white/70 max-w-2xl mx-auto text-sm sm:text-base">
          {subtitle}
        </p>

        {/* CTA Principal */}
        <div className="mt-6 flex items-center justify-center">
          <motion.button
            type="button"
            onClick={handlePrimary}
            whileHover={shouldReduce ? {} : { y: -2 }}
            whileTap={shouldReduce ? {} : { scale: 0.98 }}
            className={`inline-flex items-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold text-black bg-gradient-to-br ${GOLD} hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#a38321] focus:ring-offset-black`}
          >
            Explorar colección
            <ArrowRight size={16} />
          </motion.button>
        </div>

        {/* Atajos inteligentes */}
        <nav
          aria-label="Atajos"
          className="mt-5 flex flex-wrap items-center justify-center gap-2"
        >
          {quickLinks.map((q) => (
            <a
              key={q.label}
              href={q.href}
              className="rounded-full border border-white/15 px-3 py-1.5 text-xs sm:text-sm text-white/80 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/40"
            >
              {q.label}
            </a>
          ))}
        </nav>

        {/* Vistos recientemente */}
        {hasRecent && (
          <div className="mt-10">
            <div className="flex items-center justify-center gap-2 text-white/70 text-sm">
              <Clock size={16} /> Vistos recientemente
            </div>
            <ul className="mt-3 flex flex-wrap items-center justify-center gap-3">
              {recent.slice(0, 6).map((r) => (
                <li key={r.id} className="group">
                  <a href={r.href} className="block">
                    <div className="relative h-16 w-12 sm:h-20 sm:w-14 rounded-xl overflow-hidden border border-white/10 bg-black/30">
                      <img
                        src={r.image}
                        alt={r.title}
                        className="h-full w-full object-cover group-hover:scale-[1.03] transition"
                        loading="lazy"
                        decoding="async"
                      />
                      <span
                        aria-hidden
                        className="absolute inset-0 rounded-xl ring-1 ring-white/10"
                      />
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* micro-copy */}
        <p className="mt-10 text-xs text-white/50">
          Tip: podés guardar productos en favoritos{' '}
          <Heart size={12} className="inline align-[-2px]" /> para volver
          después.
        </p>
      </motion.div>
    </section>
  );
}
