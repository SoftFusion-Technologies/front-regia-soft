import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
  useCallback
} from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * FeaturedGallery — Black & Gold, NEXT‑LEVEL (PC fix)
 *
 * Cambios clave vs versión anterior:
 * - Variante "magazine" ahora usa grid con filas automáticas y `row-span-2` para que la tarjeta grande
 *   iguale EXACTAMENTE la altura de las 2 secundarias (sin huecos en desktop).
 * - `Card` soporta modo `fill` para ocupar alto total del contenedor (sin aspect fijo).
 */
export default function FeaturedGallery({
  files = [
    '/ProductsDestacados/1.jpg',
    '/ProductsDestacados/2.jpg',
    '/ProductsDestacados/3.jpg',
    '/ProductsDestacados/4.jpg',
    '/ProductsDestacados/5.jpg',
    '/ProductsDestacados/6.jpg',
    '/ProductsDestacados/7.jpg',
    '/ProductsDestacados/8.jpg'
  ],
  variant = 'magazine', // 'grid' | 'magazine'
  itemsPerSlide = { base: 1, md: 2, lg: 3, xl: 4 },
  intervalMs = 3600,
  rounded = 'rounded-3xl',
  showArrows = true,
  showDots = true
}) {
  const all = useMemo(() => (files || []).filter(Boolean), [files]);
  const [index, setIndex] = useState(0);
  const [isHover, setIsHover] = useState(false);
  const [loaded, setLoaded] = useState(() => new Set());
  const timerRef = useRef(null);
  const containerRef = useRef(null);

  const prefersReduced = usePrefersReducedMotion();
  const visibleCount = useResponsiveVisibleCount(itemsPerSlide);
  const isMagazine = variant === 'magazine';

  const current = useMemo(
    () => selectCircular(all, index, isMagazine ? 3 : visibleCount),
    [all, index, visibleCount, isMagazine]
  );

  const next = useCallback(
    () => setIndex((i) => (i + 1) % (all.length || 1)),
    [all.length]
  );
  const prev = useCallback(
    () => setIndex((i) => (i - 1 + (all.length || 1)) % (all.length || 1)),
    [all.length]
  );

  useEffect(() => {
    const stop = () => clearInterval(timerRef.current);
    const start = () => {
      stop();
      const enough = (isMagazine ? 3 : visibleCount) < all.length;
      if (!prefersReduced && !isHover && enough)
        timerRef.current = setInterval(next, intervalMs);
    };
    const onVisibility = () =>
      typeof document !== 'undefined' && document.hidden ? stop() : start();
    start();
    if (typeof document !== 'undefined')
      document.addEventListener('visibilitychange', onVisibility);
    return () => {
      stop();
      if (typeof document !== 'undefined')
        document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [
    all.length,
    visibleCount,
    intervalMs,
    isHover,
    prefersReduced,
    isMagazine,
    next
  ]);

  useEffect(() => {
    const onKey = (e) => {
      if (!containerRef.current) return;
      if (
        !containerRef.current.matches(':hover') &&
        !containerRef.current.contains(document.activeElement)
      )
        return;
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    if (typeof window !== 'undefined')
      window.addEventListener('keydown', onKey);
    return () =>
      typeof window !== 'undefined' &&
      window.removeEventListener('keydown', onKey);
  }, [next, prev]);

  const dragProps = prefersReduced
    ? {}
    : {
        drag: 'x',
        dragConstraints: { left: 0, right: 0 },
        dragElastic: 0.12,
        onDragEnd: (_e, info) => {
          const threshold = 80;
          if (info.offset.x < -threshold) next();
          if (info.offset.x > threshold) prev();
        }
      };

  return (
    <div
      ref={containerRef}
      className="relative w-full select-none"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      aria-label="Productos destacados"
    >
      <div className="relative bg-black/95 py-5 sm:py-8 md:py-10 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <div
            className="absolute -inset-32 opacity-25 blur-3xl"
            style={{
              background:
                'conic-gradient(from 120deg, #eab30833, #00000066, #eab30833)'
            }}
          />
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <motion.div {...dragProps} className="relative">
            <AnimatePresence initial={false} mode="popLayout">
              {isMagazine ? (
                <Magazine
                  key={`mag-${index}`}
                  files={current}
                  rounded={rounded}
                  loaded={loaded}
                  setLoaded={setLoaded}
                />
              ) : (
                <Grid
                  key={`grid-${index}`}
                  files={current}
                  visibleCount={visibleCount}
                  rounded={rounded}
                  loaded={loaded}
                  setLoaded={setLoaded}
                />
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {showArrows && all.length > (isMagazine ? 3 : visibleCount) && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-between px-2 sm:px-4">
            <button
              onClick={prev}
              className="pointer-events-auto inline-flex size-9 sm:size-10 items-center justify-center rounded-full bg-black/60 ring-1 ring-white/10 hover:bg-black/80 backdrop-blur transition focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400"
              aria-label="Anterior"
            >
              <ArrowLeft />
            </button>
            <button
              onClick={next}
              className="pointer-events-auto inline-flex size-9 sm:size-10 items-center justify-center rounded-full bg-black/60 ring-1 ring-white/10 hover:bg-black/80 backdrop-blur transition focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400"
              aria-label="Siguiente"
            >
              <ArrowRight />
            </button>
          </div>
        )}

        {showDots && (
          <div className="mt-5 flex items-center justify-center gap-2">
            {Array.from({ length: Math.min(all.length, 8) }).map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i % all.length)}
                className={`h-1.5 w-7 rounded-full transition-all ${
                  index % all.length === i
                    ? 'bg-yellow-400'
                    : 'bg-yellow-400/30 hover:bg-yellow-400/60'
                }`}
                aria-label={`Ir al set ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ======= Sub‑componentes ======= */
function Grid({ files, visibleCount, rounded, loaded, setLoaded }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -14 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30, mass: 0.7 }}
      className="grid gap-4 sm:gap-5 md:gap-6"
      style={{
        gridTemplateColumns: `repeat(${Math.max(
          1,
          visibleCount
        )}, minmax(0, 1fr))`
      }}
    >
      {files.map((src) => (
        <Card
          key={src}
          src={src}
          rounded={rounded}
          loaded={loaded}
          setLoaded={setLoaded}
          aspect="aspect-[4/5]"
        />
      ))}
    </motion.div>
  );
}

function Magazine({ files, rounded, loaded, setLoaded }) {
  const [a, b, c] = files; // 1 grande + 2 medianas
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -14 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30, mass: 0.7 }}
      // PC fix: 3 columnas + filas de igual altura; la principal ocupa 2 filas
      className="grid gap-4 sm:gap-5 md:gap-6 grid-cols-1 md:grid-cols-3 md:auto-rows-[1fr]"
    >
      {/* Principal (2 cols x 2 filas) */}
      <div className="md:col-span-2 md:row-span-2">
        <Card
          src={a}
          rounded={rounded}
          loaded={loaded}
          setLoaded={setLoaded}
          fill
          minH="md:min-h-[520px]"
        />
      </div>

      {/* Secundarias (cada una toma 1 fila) */}
      <Card
        src={b}
        rounded={rounded}
        loaded={loaded}
        setLoaded={setLoaded}
        fill
      />
      <Card
        src={c}
        rounded={rounded}
        loaded={loaded}
        setLoaded={setLoaded}
        fill
      />
    </motion.div>
  );
}

function Card({
  src,
  rounded,
  loaded,
  setLoaded,
  aspect = 'aspect-[4/5]',
  fill = false,
  minH = ''
}) {
  const isLoaded = loaded.has(src);
  return (
    <motion.figure
      whileHover={{ scale: 1.01, rotateX: 1.2, rotateY: -1.2 }}
      transition={{ type: 'spring', stiffness: 250, damping: 18 }}
      className={`relative ${rounded} overflow-hidden ring-1 ring-yellow-500/30 bg-gradient-to-b from-black to-black/70 h-full`}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* Marco dorado dinámico */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit]"
        style={{
          padding: 1,
          background:
            'linear-gradient(135deg, rgba(234,179,8,0.9), rgba(234,179,8,0.2) 25%, rgba(0,0,0,0) 45%, rgba(234,179,8,0.15) 65%, rgba(234,179,8,0.8) 100%)',
          WebkitMask:
            'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude'
        }}
      />

      <a
        // href={src}
        className="group block size-full"
        aria-label="Producto destacado"
      >
        <div
          className={`${
            fill ? `h-full ${minH}` : `${aspect}`
          } w-full overflow-hidden`}
        >
          <motion.img
            src={src}
            alt="Producto destacado"
            className={`h-full w-full object-cover transition-[filter,transform] duration-700 ${
              !isLoaded ? 'blur-md scale-[1.02]' : 'blur-0 scale-100'
            }`}
            loading="lazy"
            onLoad={() => setLoaded(new Set(loaded).add(src))}
          />
        </div>

        {/* Overlays */}
        <div className="pointer-events-none absolute inset-0 rounded-[inherit] bg-gradient-to-t from-black/45 via-transparent to-black/10" />
      </a>
    </motion.figure>
  );
}

/* ======= Helpers ======= */
function selectCircular(arr, start, count) {
  if (!arr?.length) return [];
  const out = [];
  for (let i = 0; i < Math.min(count, arr.length); i++)
    out.push(arr[(start + i) % arr.length]);
  return out;
}

function useResponsiveVisibleCount(map) {
  const get = () => {
    if (typeof window === 'undefined') return map.base ?? 1;
    if (window.matchMedia('(min-width: 1280px)').matches) return map.xl ?? 4;
    if (window.matchMedia('(min-width: 1024px)').matches) return map.lg ?? 3;
    if (window.matchMedia('(min-width: 768px)').matches) return map.md ?? 2;
    return map.base ?? 1;
  };
  const [n, setN] = useState(get());
  useEffect(() => {
    const onResize = () => setN(get());
    const mq1 =
      typeof window !== 'undefined' && window.matchMedia('(min-width: 768px)');
    const mq2 =
      typeof window !== 'undefined' && window.matchMedia('(min-width: 1024px)');
    const mq3 =
      typeof window !== 'undefined' && window.matchMedia('(min-width: 1280px)');
    mq1 && mq1.addEventListener('change', onResize);
    mq2 && mq2.addEventListener('change', onResize);
    mq3 && mq3.addEventListener('change', onResize);
    typeof window !== 'undefined' &&
      window.addEventListener('resize', onResize);
    return () => {
      mq1 && mq1.removeEventListener('change', onResize);
      mq2 && mq2.removeEventListener('change', onResize);
      mq3 && mq3.removeEventListener('change', onResize);
      typeof window !== 'undefined' &&
        window.removeEventListener('resize', onResize);
    };
  }, [map.base, map.md, map.lg, map.xl]);
  return n;
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(!!mq.matches);
    const onChange = () => setReduced(!!mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  return reduced;
}

/* ======= Iconos ======= */
function ArrowLeft() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-4 sm:size-5 text-yellow-300"
      aria-hidden
    >
      <path
        d="M14 18l-6-6 6-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function ArrowRight() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-4 sm:size-5 text-yellow-300"
      aria-hidden
    >
      <path
        d="M10 6l6 6-6 6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
