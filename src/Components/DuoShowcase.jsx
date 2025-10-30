// src/Components/DuoShowcase.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// Botón (Link o button)
function ViewMoreButton({ label = 'Ver más', href, onClick, aria }) {
  const base =
    'relative inline-flex items-center justify-center px-4 py-2 rounded-xl text-sm md:text-base font-medium border transition';
  const styles =
    'bg-black/70 text-white border-white/20 hover:bg-black hover:border-white/30';
  const glow =
    'before:absolute before:inset-0 before:rounded-xl before:bg-[radial-gradient(120%_120%_at_50%_-20%,rgba(245,211,108,0.22),transparent_60%)] before:opacity-70';

  return href ? (
    <Link to={href} aria-label={aria} className={`${base} ${styles} ${glow}`}>
      {label}
    </Link>
  ) : (
    <button
      onClick={onClick}
      aria-label={aria}
      className={`${base} ${styles} ${glow}`}
    >
      {label}
    </button>
  );
}

// Tarjeta con imagen + overlay + CTA
function ImageCard({
  src,
  alt = '',
  href,
  onClick,
  priority = false,
  ratio = '4 / 5'
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.995, filter: 'blur(6px)' }}
      whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="group relative overflow-hidden rounded-none bg-black"
      style={{ aspectRatio: ratio }} // mismo formato en todas las resoluciones
    >
      <img
        src={src}
        alt={alt}
        className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.03] select-none"
        loading={priority ? 'eager' : 'lazy'}
        fetchpriority={priority ? 'high' : 'auto'}
        sizes="(min-width: 1024px) 50vw, 50vw"
        draggable={false}
      />

      {/* Gradiente inferior para legibilidad */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-b from-transparent to-black/65"
      />

      {/* Botón Ver más */}
      <div className="absolute bottom-3 left-3">
        <ViewMoreButton
          label="Ver más"
          href={href}
          onClick={onClick}
          aria={`Ver más de ${alt || 'colección'}`}
        />
      </div>

      {/* Línea dorada en hover (detalle) */}
      <span
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-[#f1d08a] via-[#caa042] to-[#a38321] transition-all duration-500 group-hover:w-full"
      />
    </motion.div>
  );
}

/**
 * DuoShowcase v2 (full-bleed)
 * - Dos imágenes pegadas a los bordes del viewport (full-bleed), gap mínimo al centro.
 * - Mismo formato (aspect-ratio) en mobile y desktop; solo cambia el tamaño.
 *
 * Props:
 * left:  { src, alt?, href?, onClick? }
 * right: { src, alt?, href?, onClick? }
 * ratio?: string CSS aspect-ratio (default "4 / 5")
 * gap?: 'tight' | 'normal' (default 'tight')
 * bleed?: boolean (default true) => full-bleed contra bordes
 * className?: string
 */
export default function DuoShowcase({
  left,
  right,
  ratio = '4 / 5',
  gap = 'tight',
  bleed = true,
  className = ''
}) {
  const gapCls =
    gap === 'tight' ? 'gap-[6px] sm:gap-2 md:gap-3' : 'gap-2 sm:gap-3 md:gap-4';

  // ✅ Full-bleed sin overflow: centrado por translate + ancho viewport
  // Tip: si querés, podés cambiar w-[100vw] por w-[100svw] (más preciso en mobile modernos)
  const bleedCls = bleed
    ? 'relative left-1/2 -translate-x-1/2 w-[100vw] max-w-[100vw] overflow-x-clip'
    : 'mx-auto max-w-7xl px-4 sm:px-6';

  return (
    <section className={['w-full overflow-x-clip', className].join(' ')}>
      <div className={bleedCls}>
        <div className={`mt-5 grid grid-cols-2 ${gapCls}`}>
          <ImageCard {...left} ratio={ratio} priority />
          <ImageCard {...right} ratio={ratio} />
        </div>
      </div>
    </section>
  );
}
