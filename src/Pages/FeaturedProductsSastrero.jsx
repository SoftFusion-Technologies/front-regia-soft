// src/Components/FeaturedProductsSastrero.jsx
import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import DressCard from '../Components/DressCard'; 
import { SASTREROS_GROUP, loadPrimaryImage } from '../data/sastrero';

export default function FeaturedProductsSastrero({
  title = 'Productos by Regia - Sastreros',
  initialBatch = 8,
  batchSize = 8
}) {
  const GOLD = 'from-[#f1d08a] via-[#caa042] to-[#a38321]';

  // g ya trae { id, uid, category, slug, name, price, to, ... }
  const groups = useMemo(
    () =>
      SASTREROS_GROUP.map((g) => ({
        ...g,
        imageLoader: () => loadPrimaryImage(g) // portada
      })),
    []
  );

  const [visible, setVisible] = useState(initialBatch);

  return (
    <section className="relative py-14 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto mb-8 md:mb-10" id="featured-products">
        <h2 className="text-center md:text-left font-bignoodle tracking-tight uppercase text-3xl sm:text-4xl md:text-5xl">
          <span className={`bg-gradient-to-b ${GOLD} bg-clip-text text-transparent`}>
            {title}
          </span>
        </h2>
      </div>

      {/* full-bleed estable, sin scroll lateral */}
      <section className="w-full overflow-x-hidden">
        <div
          className="
            relative left-1/2 -translate-x-1/2
            w-[var(--vw)] max-w-[var(--vw)]
            pl-[max(2px,env(safe-area-inset-left))]
            pr-[max(2px,env(safe-area-inset-right))]
          "
        >
          <motion.ul
            className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4 lg:gap-6
                       pl-[max(2px,env(safe-area-inset-left))] pr-[max(2px,env(safe-area-inset-right))]"
            initial="hidden"
            animate="show"
            variants={{
              hidden: { opacity: 1 },
              show: { opacity: 1, transition: { staggerChildren: 0.06 } }
            }}
          >
            {groups.slice(0, visible).map((item) => (
              <motion.li
                key={item.uid}
                variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
                className="h-full"
              >
                <DressCard item={item} /> {/* usa item.to adentro */}
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </section>

      {visible < groups.length && (
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => setVisible((v) => Math.min(v + batchSize, groups.length))}
            className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-black/70 px-4 py-2.5 text-sm text-white/90 hover:bg-black focus:outline-none focus:ring-2 focus:ring-[#a38321] focus:ring-offset-2 focus:ring-offset-black"
          >
            Cargar más <ArrowRight size={16} />
          </button>
        </div>
      )}
    </section>
  );
}
