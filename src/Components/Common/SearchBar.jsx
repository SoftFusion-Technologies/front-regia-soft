// src/Components/Common/SearchBar.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Search, X } from 'lucide-react';

export default function SearchBar({
  value,
  onChange,
  placeholder = 'Buscar…',
  className = ''
}) {
  const hasValue = Boolean(value && value.trim());

  return (
    <motion.div
      className={`w-full ${className}`}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
    >
      <div className="relative group">
        {/* Aura / glow externo */}
        <div
          className="
            pointer-events-none
            absolute -inset-px rounded-3xl
            bg-gradient-to-r from-[#f1d08a] via-[#caa042] to-[#a38321]
            opacity-40 group-hover:opacity-90
            blur-sm group-hover:blur
            transition
          "
          aria-hidden="true"
        />

        {/* Contenedor principal */}
        <div
          className="
            relative rounded-3xl
            bg-black/70
            backdrop-blur-xl
            border border-white/10
            flex items-center gap-2
            px-3 sm:px-4 py-2.5
            shadow-[0_18px_45px_rgba(0,0,0,0.65)]
            overflow-hidden
          "
        >
          {/* Línea de energía (bottom) */}
          <div
            className="
              pointer-events-none
              absolute bottom-0 left-4 right-4
              h-[1px]
              bg-gradient-to-r from-transparent via-[#f1d08a] to-transparent
              opacity-60 group-hover:opacity-100
              transition
            "
          />

          {/* Nodo luminoso izquierda */}
          <div className="relative mr-1 hidden sm:flex">
            <span
              className="
                h-6 w-6 rounded-2xl
                bg-gradient-to-br from-[#f1d08a] via-[#caa042] to-[#a38321]
                flex items-center justify-center
                shadow-[0_0_18px_rgba(241,208,138,0.8)]
                group-hover:shadow-[0_0_26px_rgba(241,208,138,0.9)]
                transition
              "
            >
              <Search className="w-3.5 h-3.5 text-black/80" />
            </span>
          </div>

          {/* Icono móvil simplificado */}
          <div className="sm:hidden pointer-events-none flex items-center">
            <Search className="w-4 h-4 text-white/60" />
          </div>

          {/* Input */}
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            aria-label="Buscar productos"
            className="
              flex-1 bg-transparent border-0
              text-sm sm:text-[0.95rem]
              text-white placeholder:text-white/35
              focus:outline-none focus:ring-0
            "
          />

          {/* Indicador de estado / texto auxiliar */}
          <div className="hidden md:flex items-center gap-2 text-[10px] text-white/45 pr-1">
            {!hasValue ? (
              <span className="uppercase tracking-[0.14em]">
                BÚSQUEDA ACTIVA
              </span>
            ) : (
              <span className="uppercase tracking-[0.14em] text-[#f1d08a]">
                {value.length} CARACTERES
              </span>
            )}
          </div>

          {/* Botón limpiar */}
          {hasValue && (
            <button
              type="button"
              onClick={() => onChange('')}
              className="
                relative ml-1 flex items-center justify-center
                h-6 w-6 rounded-full
                border border-white/15
                bg-white/5 hover:bg-white/10
                transition
                focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f1d08a]
              "
              aria-label="Limpiar búsqueda"
            >
              <X className="w-3.5 h-3.5 text-white/70" />
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
