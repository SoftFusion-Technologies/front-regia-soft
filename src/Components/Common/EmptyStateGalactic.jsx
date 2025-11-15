// src/Components/Common/EmptyStateGalactic.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { SearchX, Sparkles } from 'lucide-react';

export default function EmptyStateGalactic({
  query = '',
  title = 'Sin coincidencias',
  message,
  onReset
}) {
  const hasQuery = Boolean(query && query.trim());

  const finalMessage =
    message ||
    (hasQuery
      ? 'Probá ajustar la búsqueda, revisar la ortografía o usar menos palabras.'
      : 'Probá cambiar los filtros o explorar otras categorías.');

  return (
    <motion.div
      className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-black/85 via-black/70 to-[#10090f] px-6 py-7 sm:px-8 sm:py-9"
      initial={{ opacity: 0, y: 8, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
    >
      {/* Glows de fondo */}
      <div
        className="pointer-events-none absolute -top-24 -right-10 h-52 w-52 rounded-full bg-[#f1d08a]/15 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-20 -left-8 h-48 w-48 rounded-full bg-[#caa042]/20 blur-3xl"
        aria-hidden="true"
      />

      {/* Grid interna */}
      <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        {/* Lado izquierdo: icono + texto */}
        <div className="flex items-start gap-4">
          {/* Icono dentro de “nodo energético” */}
          <div className="mt-1">
            <div className="relative">
              <div className="absolute inset-0 rounded-2xl bg-[#f1d08a]/40 blur-md" />
              <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#f1d08a] via-[#caa042] to-[#a38321] shadow-[0_0_28px_rgba(241,208,138,0.8)]">
                <SearchX className="w-5 h-5 text-black/80" />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm sm:text-base font-semibold tracking-wide text-white">
              {title}
            </h3>

            {/* Query resaltada */}
            {hasQuery && (
              <p className="mt-1 text-xs text-white/60">
                No se encontraron resultados para{' '}
                <span className="inline-flex items-center gap-1 rounded-full bg-white/5 px-2 py-0.5 text-[11px] text-[#f1d08a] border border-[#f1d08a]/30">
                  <Sparkles className="w-3 h-3" />“{query}”
                </span>
              </p>
            )}

            <p className="mt-2 text-xs sm:text-sm text-white/65 leading-relaxed">
              {finalMessage}
            </p>

            {/* Tips rápidos */}
            <ul className="mt-3 flex flex-wrap gap-2 text-[11px] text-white/50">
              <li className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1">
                Filtrá por otra palabra clave
              </li>
              <li className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1">
                Usá menos filtros
              </li>
              <li className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1">
                Revisá mayúsculas / tildes
              </li>
            </ul>
          </div>
        </div>

        {/* Lado derecho: acciones */}
        <div className="flex flex-col items-start md:items-end gap-3 text-xs sm:text-sm">
          {onReset && hasQuery && (
            <button
              type="button"
              onClick={onReset}
              className="
                inline-flex items-center gap-1.5
                rounded-2xl border border-white/15
                bg-white/5 px-3 py-1.5
                text-[11px] uppercase tracking-[0.16em]
                text-white/80 hover:bg-white/10
                focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f1d08a]
                transition
              "
            >
              <span>Limpiar búsqueda</span>
            </button>
          )}

          <p className="text-[10px] text-white/45 max-w-xs text-right">
            Tip: usá palabras como “set”, “vestido”, “chaleco” o colores para
            encontrar más rápido lo que buscás.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
