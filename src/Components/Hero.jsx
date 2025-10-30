import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import PostHero from './PostHero';
import ParticlesBackground from './ParticlesBackground';

/**
 * Hero — IG Strip (v2)
 *
 * Mejoras clave:
 * - Mantiene el cálculo responsivo por resize y clamp (svh)
 * - Animación en cascada más cinematográfica (easing y timings ajustados)
 * - "Glish / brillitos": capa de destellos + glint-sweep especular por tarjeta
 * - Micro-parallax sutil al mover el mouse (sin romper accesibilidad)
 * - Borde dorado con halo suave y bloom discreto
 * - Respeta prefers-reduced-motion
 * - Optimiza imágenes (decoding, fetchPriority, sizes)
 */
export default function Hero({
  igImages = [],
  mobileVideoSrc,
  mobileVideoPoster
}) {
  const shouldReduce = useReducedMotion();
  const images = useMemo(() => (igImages || []).slice(0, 5), [igImages]);

  // Medición del ancho del contenedor para calcular el ancho de cada slot
  const stripRef = useRef(null);
  const [slotW, setSlotW] = useState(0);
  const [gap, setGap] = useState(12);

  // Micro-parallax
  const [cursor, setCursor] = useState({ x: 0, y: 0 });

  // Offset inicial desde el margen izquierdo (para que entren desde afuera del slot 1)
  const startOffset = React.useMemo(() => Math.min(64, slotW * 0.25), [slotW]);

  useEffect(() => {
    const calc = () => {
      const el = stripRef.current;
      if (!el) return;
      const cols = 5;
      const w = el.clientWidth;
      const g = window.matchMedia('(min-width: 1024px)').matches
        ? 18
        : window.matchMedia('(min-width: 768px)').matches
        ? 14
        : 8; // lg/md/sm
      setGap(g);
      const totalGap = g * (cols - 1);
      const per = Math.max(0, Math.floor((w - totalGap) / cols));
      setSlotW(per);
    };
    calc();
    window.addEventListener('resize', calc);
    return () => window.removeEventListener('resize', calc);
  }, []);

  // Manejo de posición del mouse para micro-parallax (opt-in sutil)
  useEffect(() => {
    const onMove = (e) => {
      const rect = stripRef.current?.getBoundingClientRect?.();
      if (!rect) return;
      const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 .. 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setCursor({ x, y });
    };
    const el = stripRef.current;
    if (!el) return;
    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', () => setCursor({ x: 0, y: 0 }));
    return () => {
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', () => setCursor({ x: 0, y: 0 }));
    };
  }, []);

  // Duraciones y delays de la cascada
  const baseDur = 1.15; // ligeramente más lento para elegancia
  const baseDelay = 0.24; // cascada espaciada

  return (
    <section className="relative isolate w-full min-h-[clamp(60svh,72svh,86svh)] md:min-h-[clamp(50svh,64svh,76svh)] lg:min-h-[clamp(60svh,72svh,86svh)] overflow-hidden">
      {/* Fondo negro común */}
      <div aria-hidden className="absolute inset-0 -z-30 bg-black" />

      {/* Partículas: solo desktop para performance */}
      <div className="hidden md:block">
        <ParticlesBackground />
      </div>

      {/* ---------- MOBILE: video vertical ---------- */}
      {mobileVideoSrc && (
        <div className="relative block md:hidden h-[100svh]">
          <video
            className="absolute inset-0 w-full h-full object-cover"
            src={mobileVideoSrc}
            poster={mobileVideoPoster}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            disablePictureInPicture
            aria-hidden
          />
          {/* Filtro/gradientes para legibilidad */}
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/60"
          />
        </div>
      )}

      {/* ---------- DESKTOP: tira IG ---------- */}
      <div
        ref={stripRef}
        className="hidden md:block absolute inset-x-0 top-1/2 -translate-y-1/2 mx-auto w-full max-w-[1600px] md:max-w-[1760px] px-2 sm:px-4 md:px-6"
        style={{ height: 'clamp(360px, 58svh, 780px)' }}
      >
        <div className="relative w-full h-full">
          <div
            className="absolute left-0 top-0 h-full"
            style={{ width: slotW }}
          />
          {images.map((src, i) => {
            const xTarget = i * (slotW + gap);
            const delay = baseDelay * i;
            const parallaxX = shouldReduce ? 0 : cursor.x * (i - 2) * 2;
            const parallaxY = shouldReduce ? 0 : cursor.y * (i - 2) * 1.5;
            return (
              <motion.div
                key={`${src}-${i}`}
                initial={
                  shouldReduce
                    ? { x: xTarget, opacity: 1 }
                    : { x: -startOffset, opacity: 0 }
                }
                animate={{ x: xTarget, opacity: 1 }}
                transition={{
                  duration: baseDur,
                  delay,
                  ease: [0.22, 1, 0.36, 1]
                }}
                className="absolute top-0 h-full will-change-transform"
                style={{ left: 0, width: slotW }}
              >
                <motion.div
                  className="relative h-full rounded-[22px] overflow-hidden bg-black/70 ring-1 ring-[#a38321]/30 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.7)]"
                  style={{ transformStyle: 'preserve-3d' }}
                  animate={shouldReduce ? {} : { x: parallaxX, y: parallaxY }}
                  transition={{
                    type: 'spring',
                    stiffness: 80,
                    damping: 20,
                    mass: 0.4
                  }}
                >
                  <motion.img
                    src={src}
                    alt={`Colección Regia ${i + 1}`}
                    className="absolute inset-0 h-full w-full object-cover select-none [image-rendering:auto]"
                    draggable={false}
                    decoding="async"
                    fetchpriority={i === 0 ? 'high' : 'auto'}
                    sizes="(min-width: 1024px) 18vw, (min-width: 768px) 22vw, 40vw"
                    initial={{
                      scale: 1.08,
                      x: i % 2 === 0 ? -6 : 6,
                      y: i % 2 === 0 ? -4 : 4
                    }}
                    animate={{ scale: 1.0, x: 0, y: 0 }}
                    transition={{
                      duration: 4.6,
                      delay: delay + 0.08,
                      ease: [0.16, 1, 0.3, 1]
                    }}
                  />
                  <div
                    aria-hidden
                    className="absolute -inset-[1px] rounded-[22px] pointer-events-none"
                    style={{
                      background:
                        'radial-gradient(120% 100% at 50% 0%, rgba(250,215,160,0.12), rgba(163,131,33,0.06) 35%, transparent 60%)'
                    }}
                  />
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 rounded-[22px] border border-[#a38321]/40"
                  />
                  {!shouldReduce && (
                    <motion.div
                      aria-hidden
                      className="absolute inset-0 pointer-events-none mix-blend-screen"
                      initial={{ x: '-120%' }}
                      animate={{ x: ['-120%', '140%'] }}
                      transition={{
                        duration: 3.2,
                        delay: delay + 0.4,
                        repeat: Infinity,
                        repeatDelay: 2.2,
                        ease: [0.6, 0.05, 0.01, 0.99]
                      }}
                      style={{
                        background:
                          'linear-gradient(75deg, rgba(255,255,255,0) 45%, rgba(255,255,255,0.22) 50%, rgba(255,255,255,0) 55%)'
                      }}
                    />
                  )}
                  {!shouldReduce && <SparklesLayer seed={i} />}
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Fade inferior para legibilidad en ambos modos */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-28 -z-10 bg-gradient-to-b from-transparent to-black/60"
      />

      {/* Overlay (CTA/texto) visible en ambos */}
      <PostHero targetId="featured-products" />
    </section>
  );
}

/* SparklesLayer igual que ya lo tenías */
function SparklesLayer({ seed = 0 }) {
  const points = React.useMemo(() => {
    const rnd = mulberry32(seed + 12345);
    const total = 8;
    return new Array(total).fill(0).map(() => ({
      left: Math.round(rnd() * 1000) / 10 + '%',
      top: Math.round(rnd() * 1000) / 10 + '%',
      size: 2 + Math.round(rnd() * 4),
      delay: rnd() * 2,
      dur: 2.6 + rnd() * 2.4,
      opacity: 0.2 + rnd() * 0.35
    }));
  }, [seed]);

  return (
    <div className="absolute inset-0 pointer-events-none">
      {points.map((p, idx) => (
        <motion.span
          key={idx}
          className="absolute rounded-full"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            background:
              'radial-gradient(circle, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.2) 40%, rgba(255,255,255,0) 70%)',
            filter: 'drop-shadow(0 0 6px rgba(255,255,255,0.25))'
          }}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, p.opacity, 0],
            scale: [0.8, 1, 0.8],
            y: [-2, 0, -2]
          }}
          transition={{
            duration: p.dur,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
      ))}
    </div>
  );
}

function mulberry32(a) {
  return function () {
    let t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}