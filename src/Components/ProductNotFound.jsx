import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MessageCircle, ArrowLeft, Search, Sparkles } from 'lucide-react';
import ParticlesBackground from './ParticlesBackground';

/**
 * ProductNotFound — Gold/Black Empty State
 *
 * Props opcionales:
 * - title?: string
 * - description?: string
 * - whatsapp?: string (ej: "+5493812472636")
 * - backHref?: string (ruta para volver, ej: "/")
 * - onSearchClick?: () => void (abre buscador/abre modal)
 * - suggestions?: { label: string; href: string }[]
 */
export default function ProductNotFound({
  title = 'Producto no encontrado',
  description = 'No pudimos encontrar lo que buscás. Probá con otras palabras o contactanos y te ayudamos al instante.',
  whatsapp = '+5493812472636',
  backHref = '/',
  onSearchClick,
  suggestions = [
    { label: 'Ver catálogo premium', href: '/productos/premium' },
    { label: 'Remeras clásicas', href: '/productos/clasicas' },
    { label: 'Novedades', href: '/novedades' }
  ]
}) {
  const fade = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
  };

  const waUrl = `https://wa.me/${whatsapp}?text=${encodeURIComponent(
    'Hola Regia, no encuentro un producto. ¿Me ayudás a conseguirlo?'
  )}`;

  return (
    <section className="-mt-16 relative min-h-[70vh] grid place-items-center bg-[#0a0a0a] text-white overflow-hidden">
      <ParticlesBackground></ParticlesBackground>

      {/* Tarjeta */}
      <motion.div
        variants={fade}
        initial="hidden"
        animate="show"
        className="mx-4 w-full max-w-xl rounded-2xl bg-white/5 ring-1 ring-white/10 p-6 text-center backdrop-blur"
      >
        <div className="mx-auto mb-4 w-20 h-20 rounded-2xl grid place-items-center bg-black/50 ring-1 ring-white/10">
          <img
            src="/Hero/notfound.avif"
            alt="Producto no encontrado"
            className="w-12 h-12 object-contain opacity-90"
            loading="lazy"
          />
        </div>

        <h2 className="text-2xl font-semibold">{title}</h2>
        <p className="mt-2 text-white/70 text-sm">{description}</p>

        {/* Acciones */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold bg-gradient-to-r from-[#f0d68a] to-[#d4af37] text-black hover:scale-[1.02] transition"
          >
            <MessageCircle className="w-4 h-4" />
            WhatsApp ahora
          </a>

          {onSearchClick ? (
            <button
              type="button"
              onClick={onSearchClick}
              className="inline-flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold bg-white/10 hover:bg-white/15 ring-1 ring-white/10"
            >
              <Search className="w-4 h-4" />
              Abrir buscador
            </button>
          ) : (
            <Link
              to="/productos"
              className="inline-flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold bg-white/10 hover:bg-white/15 ring-1 ring-white/10"
            >
              <Search className="w-4 h-4" />
              Ver productos
            </Link>
          )}

          <Link
            to={backHref}
            className="inline-flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold bg-white/5 hover:bg-white/10 ring-1 ring-white/10"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver
          </Link>
        </div>

        {/* Sugerencias */}
        {suggestions?.length > 0 && (
          <div className="mt-6 text-left">
            <p className="text-xs text-white/60 mb-2">Quizás te interese:</p>
            <ul className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm">
              {suggestions.map((s, i) => (
                <li key={i}>
                  <Link
                    to={s.href}
                    className="group flex items-center gap-2 rounded-lg px-3 py-2 bg-white/5 hover:bg-white/10 ring-1 ring-white/10"
                  >
                    <Sparkles className="w-4 h-4 text-[#f0d68a]" />
                    <span className="group-hover:underline">{s.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </motion.div>

      {/* Strip inferior dorado */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#d4af37] via-[#f0d68a] to-[#d4af37]"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        style={{ transformOrigin: 'right' }}
      />
    </section>
  );
}
