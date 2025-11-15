import React, { useMemo, useRef, useState } from 'react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform
} from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export default function PostHero({
  title = 'REGIA',
  subtitle = 'Almacén de moda — Indumentaria femenina',
  ctaLabel = 'Ver productos',
  targetId = 'featured-products',
  align = 'center', // "center" | "left" | "right"
  badges = ['Nueva colección', 'Envíos a todo el país'],
  className = '',
  secondaryCtaLabel = null,
  onSecondaryCtaClick = null,
  showScrollHint = true
}) {
  const shouldReduce = useReducedMotion();
  const rootRef = useRef(null);

  // Parallax suave
  const { scrollY } = useScroll();
  const yTitle = useTransform(scrollY, [0, 400], [0, shouldReduce ? 0 : -18]);
  const yCard = useTransform(scrollY, [0, 400], [0, shouldReduce ? 0 : -10]);
  const scaleCard = useTransform(
    scrollY,
    [0, 400],
    [1, shouldReduce ? 1 : 0.985]
  );

  // Magnetic CTA
  const [mag, setMag] = useState({ x: 0, y: 0 });
  const onMove = (e) => {
    if (shouldReduce) return;
    const b = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - (b.left + b.width / 2)) / (b.width / 2);
    const y = (e.clientY - (b.top + b.height / 2)) / (b.height / 2);
    setMag({ x: x * 6, y: y * 6 });
  };
  const onLeave = () => setMag({ x: 0, y: 0 });

  const alignMap = useMemo(
    () => ({
      center: 'items-center text-center',
      left: 'items-start text-left',
      right: 'items-end text-right'
    }),
    []
  );

  const words = useMemo(() => subtitle.split(' '), [subtitle]);

  const scrollToSection = () => {
    const section = document.getElementById(targetId);
    if (!section) return;
    const OFFSET = 96;
    const y = section.getBoundingClientRect().top + window.pageYOffset - OFFSET;
    window.scrollTo({ top: y, behavior: 'smooth' });
  };

  // Variants para stagger global (cada pieza entra secuencialmente)
  const wrapV = {
    hidden: { opacity: 0, y: 18, filter: 'blur(6px)' },
    show: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
        when: 'beforeChildren',
        staggerChildren: 0.06,
        delayChildren: 0.08
      }
    }
  };

  const cardV = {
    hidden: {
      opacity: 0,
      y: 12,
      scale: 0.99,
      filter: 'blur(8px)',
      clipPath: 'inset(0 0 20% 0 round 22px)'
    },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      clipPath: 'inset(0 0 0% 0 round 22px)',
      transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const badgeV = {
    hidden: { opacity: 0, y: 6, filter: 'blur(4px)' },
    show: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.35 }
    }
  };

  const titleV = {
    hidden: { opacity: 0, y: 8, letterSpacing: '0.02em' },
    show: {
      opacity: 1,
      y: 0,
      letterSpacing: '0.01em',
      transition: { duration: 0.5 }
    }
  };

  const keylineV = {
    hidden: { opacity: 0, scaleX: 0, transformOrigin: 'left' },
    show: { opacity: 1, scaleX: 1, transition: { duration: 0.5, delay: 0.05 } }
  };

  const wordV = {
    hidden: { opacity: 0, y: 6 },
    show: { opacity: 1, y: 0, transition: { duration: 0.35 } }
  };

  const ctasV = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45 } }
  };

  return (
    <section
      ref={rootRef}
      className={[
        'absolute inset-x-0 z-10 -mt-10 ',
        'top-[clamp(22svh,30svh,38svh)] sm:top-[clamp(26svh,34svh,42svh)] md:top-[clamp(28svh,36svh,46svh)] lg:top-[clamp(30svh,38svh,50svh)]',
        'flex justify-center px-4 sm:px-6',
        className
      ].join(' ')}
      role="region"
      aria-label="Presentación Regia"
    >
      {/* Orbes flotantes (muy suaves) */}
      {!shouldReduce && (
        <>
          <motion.span
            aria-hidden
            className="absolute -z-10 size-72 md:size-96 rounded-full blur-3xl"
            style={{
              background:
                'radial-gradient(50% 50% at 50% 50%, rgba(241,208,138,0.33) 0%, rgba(202,160,66,0.18) 40%, rgba(163,131,33,0) 70%)'
            }}
            initial={{ opacity: 0, x: -140, y: -80 }}
            animate={{ opacity: 1, x: [-140, -95, -120], y: [-80, -110, -80] }}
            transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.span
            aria-hidden
            className="absolute -z-10 right-0 size-60 md:size-80 rounded-full blur-3xl"
            style={{
              background:
                'radial-gradient(50% 50% at 50% 50%, rgba(202,160,66,0.32) 0%, rgba(163,131,33,0.16) 40%, rgba(0,0,0,0) 70%)'
            }}
            initial={{ opacity: 0, x: 140, y: 60 }}
            animate={{ opacity: 1, x: [140, 95, 120], y: [60, 90, 60] }}
            transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
          />
        </>
      )}

      {/* Wrapper con stagger y parallax */}
      <motion.div
        style={{ y: yCard, scale: scaleCard }}
        variants={wrapV}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.6 }}
        className={[
          'max-w-3xl w-full',
          'flex flex-col gap-4 md:gap-6',
          alignMap[align]
        ].join(' ')}
      >
        {/* Card/translúcida con clip-reveal */}
        <motion.div
          variants={cardV}
          className="relative rounded-[22px] border border-[#a38321]/20 bg-black/50 backdrop-blur-md px-5 md:px-8 py-6 md:py-8 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.6)]"
        >
          {/* Grain */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-[22px] opacity-[0.07] mix-blend-soft-light"
            style={{
              backgroundImage:
                'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="160" height="160"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(%23n)" opacity="0.5"/></svg>\')'
            }}
          />

          {/* Halo/borde que “enciende” */}
          {!shouldReduce && (
            <motion.span
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-[22px] border border-[#a38321]/40"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25, duration: 0.6 }}
            />
          )}

          {/* Badges (stagger por item) */}
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
                  variants={badgeV}
                  className="inline-flex items-center rounded-full border border-[#caa042]/30 bg-black/40 px-3 py-1 text-xs md:text-sm text-white/90"
                >
                  {b}
                </motion.span>
              ))}
            </div>
          )}

          {/* Título con shimmer + parallax */}
          <motion.h1
            variants={titleV}
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

          {/* Subtítulo palabra a palabra (stagger interno) */}
          <motion.p
            className="mt-2 md:mt-3 text-sm sm:text-base md:text-lg text-white/90"
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.03 } }
            }}
          >
            {words.map((w, i) => (
              <motion.span
                key={i}
                variants={wordV}
                className="inline-block mr-[0.35ch]"
              >
                {w}
              </motion.span>
            ))}
          </motion.p>

          {/* Keyline animada */}
          {!shouldReduce && (
            <motion.span
              aria-hidden
              variants={keylineV}
              className="mt-3 block h-[2px] w-24 rounded-full bg-gradient-to-r from-[#f1d08a] via-[#caa042] to-[#a38321] [background-size:200%_100%] animate-[shine_2.8s_ease_infinite]"
            />
          )}

          {/* CTAs (grupo con su propia animación) */}
          <motion.div
            variants={ctasV}
            className={[
              'mt-4 md:mt-6 gap-3 md:gap-4',
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
              style={{
                transform: shouldReduce
                  ? undefined
                  : `translate(${mag.x}px, ${mag.y}px)`
              }}
              className="relative inline-flex items-center gap-2 rounded-2xl px-6 md:px-7 py-3 text-base md:text-lg font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#a38321] focus-visible:ring-offset-black/0 bg-black text-white border border-[#a38321]/50 transition-[background-color,border-color,color,transform] duration-200 hover:bg-[#a38321] hover:text-black hover:border-[#a38321]"
              aria-label={ctaLabel}
            >
              {!shouldReduce && (
                <span
                  className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-r from-[#f1d08a]/70 via-[#caa042]/70 to-[#a38321]/70 opacity-70 blur-[10px] -z-10"
                  aria-hidden
                />
              )}
              <span className="px-0.5">{ctaLabel}</span>
            </motion.button>

            {secondaryCtaLabel && (
              <motion.button
                type="button"
                whileHover={shouldReduce ? undefined : { scale: 1.02 }}
                whileTap={shouldReduce ? undefined : { scale: 0.98 }}
                onClick={onSecondaryCtaClick ?? (() => {})}
                className="inline-flex items-center gap-2 rounded-2xl px-6 md:px-7 py-3 text-base md:text-lg font-medium border border-white/15 text-white/90 bg-white/5 hover:bg-white/10 transition"
              >
                {secondaryCtaLabel}
              </motion.button>
            )}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll hint */}
      {showScrollHint && (
        <button
          type="button"
          onClick={scrollToSection}
          className="absolute  bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 inline-flex flex-col items-center gap-1 text-white/80 hover:text-white focus:outline-none"
          aria-label="Desplazarse a productos"
        >
          {!shouldReduce ? (
            <motion.span
              initial={{ y: 0, opacity: 0.8 }}
              animate={{ y: [0, 6, 0], opacity: [0.8, 1, 0.8] }}
              transition={{
                duration: 1.4,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            >
              <ChevronDown className="w-6 h-6" />
            </motion.span>
          ) : (
            <ChevronDown className="w-6 h-6" />
          )}
          <span className="sr-only">Bajar</span>
        </button>
      )}

      {/* Keyframes shine */}
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
