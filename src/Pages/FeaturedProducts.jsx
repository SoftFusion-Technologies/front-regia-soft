import React, { useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { VESTIDOS } from '../data/vestidos';
import DressCard from '../Components/DressCard';

export default function FeaturedProducts({
  title = 'Productos by Regia',
  initialBatch = 8,
  batchSize = 8
}) {
  const shouldReduce = useReducedMotion();

  // Usamos los vestidos (79) sin cargar imágenes aún
  const all = useMemo(() => VESTIDOS, []);
  if (!all.length) return null;

  const [visible, setVisible] = useState(initialBatch);
  const rest = all; // podés dejar spotlight si querés, acá renderizamos todo en grid

  const GOLD = 'from-[#f1d08a] via-[#caa042] to-[#a38321]';

  return (
    <section className="relative py-14 sm:py-16 px-4 sm:px-6 lg:px-8">
      {/* Título */}
      <div className="max-w-7xl mx-auto mb-8 md:mb-10" id="featured-products">
        <h2 className="text-center md:text-left font-bignoodle tracking-tight uppercase text-3xl sm:text-4xl md:text-5xl">
          <span
            className={`bg-gradient-to-b ${GOLD} bg-clip-text text-transparent`}
          >
            {title}
          </span>
        </h2>
      </div>

      {/* Grid full-bleed sin overflow lateral */}
      {/* Grid full-bleed sin recortes del primer ítem */}
      <section className="w-full overflow-x-hidden">
        {' '}
        {/* solo aquí */}
        <div
          className="
      relative left-1/2 -translate-x-1/2
      w-[var(--vw)] max-w-[var(--vw)]
      /* paddings “seguros” que no rompen el look pegado */
      pl-[max(2px,env(safe-area-inset-left))]
      pr-[max(2px,env(safe-area-inset-right))]
    "
        >
          <motion.ul
            className="
        mt-6
        grid grid-cols-2        /* 2 en mobile */
        md:grid-cols-4          /* 4 en desktop */
        gap-2 sm:gap-3 md:gap-4 lg:gap-6
      "
            initial="hidden"
            animate="show"
            variants={{
              hidden: { opacity: 1 },
              show: { opacity: 1, transition: { staggerChildren: 0.06 } }
            }}
          >
            {rest.slice(0, visible).map((item) => (
              <motion.li
                key={item.id}
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  show: { opacity: 1, y: 0 }
                }}
                className="h-full"
              >
                <DressCard item={item} />
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </section>

      {/* Cargar más (no importamos imágenes hasta que entren en viewport) */}
      {visible < rest.length && (
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() =>
              setVisible((v) => Math.min(v + batchSize, rest.length))
            }
            className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-[#ac8308] px-4 py-2.5 text-sm text-white/90 hover:bg-[#85670e]  focus:outline-none focus:ring-2 focus:ring-[#a38321] focus:ring-offset-2 focus:ring-offset-black"
          >
            Cargar más <ArrowRight size={16} />
          </button>
        </div>
      )}
    </section>
  );
}
