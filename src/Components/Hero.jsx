import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import PostHero from './PostHero';
import ParticlesBackground from './ParticlesBackground';

/**
 * Hero — IG Strip (5 imágenes verticales)
 * - Muestra 5 imágenes formato Instagram (4:5 aprox.)
 * - Animación inicial en cascada: todas nacen desde el slot 1 y se acomodan a la derecha (1→5)
 * - Luego quedan fijas
 * - Responsive real con svh + clamp
 */
export default function Hero({
  igImages = [imgInsta1, imgInsta2, imgInsta3, imgInsta4, imgInsta5]
}) {
  const shouldReduce = useReducedMotion();
  const images = useMemo(() => igImages.slice(0, 5), [igImages]);

  // Medición del ancho del contenedor para calcular el ancho de cada slot
  const stripRef = useRef(null);
  const [slotW, setSlotW] = useState(0);
  const [gap, setGap] = useState(12);

  // Offset inicial desde el margen izquierdo (para que entren desde afuera del slot 1)
  const startOffset = React.useMemo(() => Math.min(64, slotW * 0.25), [slotW]); // gap en px (ajustable)

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
        : 8; // lg/md/sm      setGap(g);
      const totalGap = g * (cols - 1);
      const per = Math.max(0, Math.floor((w - totalGap) / cols));
      setSlotW(per);
    };
    calc();
    window.addEventListener('resize', calc);
    return () => window.removeEventListener('resize', calc);
  }, []);

  // Duraciones y delays de la cascada
  const baseDur = 1.1; // más lento
  const baseDelay = 0.28; // más espaciamiento entre entradas

  return (
    <section className="relative isolate w-full min-h-[clamp(60svh,72svh,86svh)] md:min-h-[clamp(50svh,64svh,76svh)] lg:min-h-[clamp(60svh,72svh,86svh)] mt-0 overflow-hidden">
      {/* Fondo liso para cuando las imágenes no llenan (bg-contain look) */}
      <div aria-hidden className="absolute inset-0 -z-20 bg-black" />
      <ParticlesBackground></ParticlesBackground>
      {/* Tira de imágenes IG */}
      <div
        ref={stripRef}
        className="mt-10 absolute inset-x-0 top-1/2 -translate-y-1/2 mx-auto w-full max-w-[1600px] md:max-w-[1760px] px-2 sm:px-4 md:px-6"
        style={{
          // altura del strip (pensado para 4:5 vertical):
          // alto aproximado de las tarjetas (se recorta con object-cover)
          height: 'clamp(360px, 58svh, 780px)'
        }}
      >
        <div className="relative w-full" style={{ height: '100%' }}>
          {/* Slot 1 como referencia de origen */}
          <div
            className="absolute left-0 top-0 h-full"
            style={{ width: slotW }}
          />

          {images.map((src, i) => {
            const xTarget = i * (slotW + gap);
            const delay = baseDelay * i;

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
                <div className="relative h-full rounded-2xl overflow-hidden ring-1 ring-[#a38321]/25 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.6)] bg-black">
                  {' '}
                  <motion.img
                    src={src}
                    alt="Colección Regia"
                    className="absolute inset-0 h-full w-full object-cover select-none"
                    draggable={false}
                    initial={{
                      scale: 1.08,
                      x: i % 2 === 0 ? -6 : 6,
                      y: i % 2 === 0 ? -4 : 4
                    }}
                    animate={{ scale: 1.0, x: 0, y: 0 }}
                    transition={{
                      duration: 4.6,
                      delay: delay + 0.1,
                      ease: [0.16, 1, 0.3, 1]
                    }}
                  />
                  {/* Borde dorado suave */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 rounded-2xl border border-[#a38321]/40"
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Fade inferior para legibilidad */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 -z-10 bg-gradient-to-b from-transparent to-black/50"
      />

      {/* Overlay del hero (texto/CTA) */}
      <PostHero targetId="featured-products" />
    </section>
  );
}
