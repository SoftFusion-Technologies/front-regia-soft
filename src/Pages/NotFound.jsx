import React, { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { Search, ArrowLeft, Home, Sparkles, MessageCircle } from 'lucide-react';

const GOLD = 'from-[#f1d08a] via-[#caa042] to-[#a38321]';

export default function NotFoundRegia({
  categories = ['Vestidos', 'Blusas', 'Jeans', 'Accesorios'],
  whatsappNumber = '+54 9 381 2472636',
  whatsappMessage = 'Hola Regia 👋 Estoy viendo la web y no encuentro una página.'
}) {
  const navigate = useNavigate();
  const shouldReduce = useReducedMotion();
  const [q, setQ] = useState('');

  const waHref = useMemo(() => {
    const text = encodeURIComponent(whatsappMessage);
    return `https://wa.me/${whatsappNumber.replace(/[^\d]/g, '')}?text=${text}`;
  }, [whatsappNumber, whatsappMessage]);

  const container = {
    hidden: { opacity: 0, y: 8 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const shimmer = shouldReduce
    ? {}
    : {
        x: ['-120%', '140%'],
        transition: {
          duration: 3,
          repeat: Infinity,
          repeatDelay: 1.4,
          ease: [0.6, 0.05, 0.01, 0.99]
        }
      };

  const onSearch = (e) => {
    e.preventDefault();
    const term = q.trim();
    if (!term) return;
    // ajusta a tu ruta de búsqueda
    navigate(`/buscar?q=${encodeURIComponent(term)}`);
  };

  return (
    <section className="relative isolate min-h-[100svh] flex items-center justify-center px-4 sm:px-6 lg:px-8">
      {/* Backdrop */}
      <div
        aria-hidden
        className="absolute inset-0 -z-20 bg-gradient-to-b from-black/40 via-black/60 to-black/80"
      />
      {/* Aura dorada */}
      <div
        aria-hidden
        className="absolute -z-10 inset-0 opacity-[0.18]"
        style={{
          background:
            'radial-gradient(80% 50% at 50% 0%, rgba(250,215,160,0.25), rgba(163,131,33,0.10) 45%, transparent 70%)'
        }}
      />
      {/* Glint suave
      {!shouldReduce && (
        <motion.span
          aria-hidden
          className="absolute inset-0 -z-10 mix-blend-screen"
          style={{
            background:
              'linear-gradient(70deg, transparent 45%, rgba(255,255,255,0.18) 50%, transparent 55%)'
          }}
          animate={shimmer}
        />
      )} */}

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="mx-auto w-full max-w-3xl text-center"
      >
        {/* 404 grande con degradado */}
        <div className="relative inline-flex select-none">
          <h1 className="font-bignoodle text-[84px] sm:text-[120px] leading-none tracking-tight uppercase">
            <span
              className={`bg-gradient-to-b ${GOLD} bg-clip-text text-transparent drop-shadow-[0_2px_32px_rgba(250,215,160,0.16)]`}
            >
              404
            </span>
          </h1>
          <Sparkles className="absolute -right-5 -top-2 text-white/50" />
        </div>

        <h2 className="mt-2 text-xl sm:text-2xl font-semibold text-white">
          Página no encontrada
        </h2>
        <p className="mt-2 text-white/70">
          Puede que el enlace esté roto o que la prenda haya cambiado de lugar.
          Probá buscarla o explorá la colección.
        </p>

        {/* Buscador */}
        <form
          onSubmit={onSearch}
          className="mt-6 flex items-stretch gap-2 mx-auto max-w-xl"
        >
          <div className="relative flex-1">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-white/40"
              size={18}
            />
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Buscar vestidos, blusas, jeans…"
              className="w-full rounded-xl border border-white/15 bg-black/40 pl-9 pr-3 py-3 text-sm placeholder:text-white/40 outline-none focus:border-[#a38321]"
              autoFocus
            />
          </div>
          <button
            type="submit"
            className={`rounded-xl px-4 py-3 text-sm font-semibold text-black bg-gradient-to-br ${GOLD} hover:brightness-110`}
          >
            Buscar
          </button>
        </form>

        {/* Acciones */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-4 py-2.5 text-sm text-white/90 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/40"
          >
            <Home size={16} /> Ir al inicio
          </Link>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-4 py-2.5 text-sm text-white/90 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/40"
          >
            <ArrowLeft size={16} /> Volver
          </button>
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-[#a38321]/40 px-4 py-2.5 text-sm text-white/90 hover:bg-[#a38321] hover:text-black focus:outline-none focus:ring-2 focus:ring-[#a38321]/60"
          >
            <MessageCircle size={16} /> Escribir por WhatsApp
          </a>
        </div>

        {/* Categorías (atajos) */}
        <nav
          aria-label="Explorar categorías"
          className="mt-7 flex flex-wrap items-center justify-center gap-2"
        >
          {categories.map((c) => (
            <Link
              key={c}
              to={`/categoria/${encodeURIComponent(c.toLowerCase())}`}
              className="rounded-full border border-white/15 px-3 py-1.5 text-xs sm:text-sm text-white/80 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/40"
            >
              {c}
            </Link>
          ))}
        </nav>

        {/* Microcopy */}
        <p className="mt-8 text-xs text-white/50">
          Tip: si guardaste un producto en favoritos, podés volver desde tu
          lista.
        </p>
      </motion.div>
    </section>
  );
}
