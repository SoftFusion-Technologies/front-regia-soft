import React, { useMemo, useRef, useState } from 'react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform
} from 'framer-motion';
import { ChevronDown } from 'lucide-react';

/**
 * PostHero — v2 Ultra Modern
 *
 * Upgrades:
 * - Parallax on scroll (headline + card)
 * - Kinetic gradient shimmer in title (no gray anywhere)
 * - Magnetic CTA (follows cursor sutilmente)
 * - Floating accents (soft-glow orbs) con animación
 * - Grain/Noise overlay para textura premium
 * - Props flexibles + accesibilidad estricta
 */
export default function PostHero({
  title = 'REGIA',
  subtitle = 'Almacén de moda — Indumentaria femenina',
  ctaLabel = 'Ver productos',
  targetId = 'featured-products',
  align = 'center', // "center" | "left" | "right"
  badges = ['Nueva colección', 'Envíos a todo el país'],
  className = ''
}) {
  const shouldReduce = useReducedMotion();
  const rootRef = useRef(null);

  // Parallax según scroll de la página
  const { scrollY } = useScroll();
  const yTitle = useTransform(scrollY, [0, 400], [0, shouldReduce ? 0 : -18]);
  const yCard = useTransform(scrollY, [0, 400], [0, shouldReduce ? 0 : -10]);
  const scaleCard = useTransform(
    scrollY,
    [0, 400],
    [1, shouldReduce ? 1 : 0.98]
  );

  // Magnetic CTA
  const [mag, setMag] = useState({ x: 0, y: 0, a: 0 });
  const onMove = (e) => {
    const b = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - (b.left + b.width / 2)) / (b.width / 2);
    const y = (e.clientY - (b.top + b.height / 2)) / (b.height / 2);
    setMag({ x: x * 6, y: y * 6, a: 1 });
  };
  const onLeave = () => setMag({ x: 0, y: 0, a: 0 });

  const alignMap = useMemo(
    () => ({
      center: 'items-center text-center',
      left: 'items-start text-left',
      right: 'items-end text-right'
    }),
    []
  );

  const scrollToSection = () => {
    const section = document.getElementById(targetId);
    if (!section) return;
    const OFFSET = 96;
    const y = section.getBoundingClientRect().top + window.pageYOffset - OFFSET;
    window.scrollTo({ top: y, behavior: 'smooth' });
  };

  return (
    <section
      ref={rootRef}
      className={[
        'absolute inset-x-0 z-10',
        // Responsive top con svh + clamp (evita que pise lo de abajo)
        'top-[clamp(22svh,30svh,38svh)] sm:top-[clamp(26svh,34svh,42svh)] md:top-[clamp(28svh,36svh,46svh)] lg:top-[clamp(30svh,38svh,50svh)]',
        'flex justify-center px-4 sm:px-6',
        className
      ].join(' ')}
      role="region"
      aria-label="Presentación Regia"
    >
      {/* Accents flotantes */}
      {!shouldReduce && (
        <>
          <motion.span
            aria-hidden
            className="absolute -z-10 size-72 md:size-96 rounded-full blur-3xl"
            style={{
              background:
                'radial-gradient(50% 50% at 50% 50%, rgba(241,208,138,0.35) 0%, rgba(202,160,66,0.18) 40%, rgba(163,131,33,0) 70%)'
            }}
            initial={{ opacity: 0, x: -120, y: -60 }}
            animate={{ opacity: 1, x: [-120, -80, -100], y: [-60, -90, -60] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.span
            aria-hidden
            className="absolute -z-10 right-0 size-60 md:size-80 rounded-full blur-3xl"
            style={{
              background:
                'radial-gradient(50% 50% at 50% 50%, rgba(202,160,66,0.35) 0%, rgba(163,131,33,0.18) 40%, rgba(0,0,0,0) 70%)'
            }}
            initial={{ opacity: 0, x: 120, y: 40 }}
            animate={{ opacity: 1, x: [120, 80, 100], y: [40, 70, 40] }}
            transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
          />
        </>
      )}

      <motion.div
        style={{ y: yCard, scale: scaleCard }}
        initial={shouldReduce ? { opacity: 0 } : { opacity: 0, y: 18 }}
        animate={shouldReduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={[
          'max-w-3xl w-full',
          'flex flex-col gap-4 md:gap-6',
          alignMap[align]
        ].join(' ')}
      >
        {/* Card translúcida */}
        <div className="relative rounded-[22px] border border-[#a38321]/20 bg-black/55 backdrop-blur-md px-5 md:px-8 py-6 md:py-8 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.6)]">
          {/* Grain overlay */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-[22px] opacity-[0.07] mix-blend-soft-light"
            style={{
              backgroundImage:
                'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="160" height="160"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(%23n)" opacity="0.5"/></svg>\')'
            }}
          />

          {/* Badges (opcionales) */}
          {Array.isArray(badges) && badges.length > 0 && (
            <div
              className={[
                'mb-3 flex flex-wrap gap-2',
                align === 'center'
                  ? 'justify-center'
                  : align === 'right'
                  ? 'justify-end'
                  : 'justify-start'
              ].join(' ')}
            >
              {badges.map((b, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i }}
                  className="inline-flex items-center rounded-full border border-[#caa042]/30 bg-black/40 px-3 py-1 text-xs md:text-sm text-white/90"
                >
                  {b}
                </motion.span>
              ))}
            </div>
          )}

          {/* Título con shimmer */}
          <motion.h1
            style={{ y: yTitle }}
            className="font-bignoodle tracking-tight uppercase select-none"
          >
            <span className="block text-5xl sm:text-6xl md:text-7xl leading-none">
              <span
                className="bg-gradient-to-r from-[#f1d08a] via-[#caa042] to-[#a38321] bg-clip-text text-transparent drop-shadow-[0_1px_0_rgba(0,0,0,0.4)] [background-size:200%_100%] animate-[shine_3.6s_ease_infinite]"
                style={{ WebkitTextStroke: '0.5px rgba(0,0,0,0.25)' }}
              >
                {title}
              </span>
            </span>
          </motion.h1>

          {/* Subtítulo */}
          <p className="mt-2 md:mt-3 text-sm sm:text-base md:text-lg text-white/90">
            {subtitle}
          </p>

          {/* CTA */}
          <div
            className={[
              'mt-4 md:mt-6',
              align === 'center'
                ? 'justify-center'
                : align === 'right'
                ? 'justify-end'
                : 'justify-start',
              'flex'
            ].join(' ')}
          >
            <motion.button
              onMouseMove={onMove}
              onMouseLeave={onLeave}
              onClick={scrollToSection}
              whileHover={shouldReduce ? undefined : { scale: 1.02 }}
              whileTap={shouldReduce ? undefined : { scale: 0.98 }}
              style={{ transform: `translate(${mag.x}px, ${mag.y}px)` }}
              className="relative inline-flex items-center gap-2 rounded-2xl px-6 md:px-7 py-3 text-base md:text-lg font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#a38321] focus-visible:ring-offset-black/0 bg-black text-white border border-[#a38321]/50 transition-[background-color,border-color,color,transform] duration-200 hover:bg-[#a38321] hover:text-black hover:border-[#a38321]"
              aria-label={ctaLabel}
            >
              {/* Glow decorativo */}
              {!shouldReduce && (
                <span
                  className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-r from-[#f1d08a]/70 via-[#caa042]/70 to-[#a38321]/70 opacity-70 blur-[10px] -z-10"
                  aria-hidden
                />
              )}
              <span className="px-0.5">{ctaLabel}</span>
            </motion.button>
          </div>
        </div>

        {/* Indicador de scroll */}
        <motion.div
          initial={false}
          animate={
            shouldReduce ? { opacity: 0.9 } : { opacity: 0.95, y: [0, 6, 0] }
          }
          transition={
            shouldReduce
              ? { duration: 0.6 }
              : { duration: 1.6, repeat: Infinity, ease: 'easeInOut' }
          }
          className="mx-auto mt-2 md:mt-3 text-[#caa042]"
          aria-hidden
        >
          <ChevronDown className="h-6 w-6" />
        </motion.div>
      </motion.div>

      {/* Keyframes globales del shimmer (Tailwind arbitrary) */}
      <style>{`
        @keyframes shine {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </section>
  );
}
