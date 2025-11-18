// src/Components/FeaturedProductsBoho.jsx
import React, { useMemo, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import DressCard from '../Components/DressCard';
import { BOHO_GROUP, loadPrimaryImage } from '../data/boho';
import SearchBar from '../Components/Common/SearchBar';
import EmptyStateGalactic from '../Components/Common/EmptyStateGalactic';

// normalizador simple (sin acentos, minúsculas)
const norm = (s = '') =>
  s
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();

export default function FeaturedProductsBoho({
  title = 'Productos by Regia - Cápsula BOHO CHIC',
  initialBatch = 8,
  batchSize = 8
}) {
  const GOLD = 'from-[#f1d08a] via-[#caa042] to-[#a38321]';

  // g ya trae { id, uid, category, slug, name, price, to, ... }
  const groups = useMemo(
    () =>
      BOHO_GROUP.map((g) => ({
        ...g,
        imageLoader: () => loadPrimaryImage(g) // portada
      })),
    []
  );

  const [visible, setVisible] = useState(initialBatch);
  const [query, setQuery] = useState('');

  // Filtrado por búsqueda
  const filteredGroups = useMemo(() => {
    if (!query) return groups;

    const q = norm(query);
    return groups.filter((g) => {
      const name = norm(g.name);
      const category = norm(g.category || '');
      const slug = norm(g.slug || '');
      return name.includes(q) || category.includes(q) || slug.includes(q);
    });
  }, [groups, query]);

  // Cuando cambia la búsqueda, reseteamos el batch visible
  useEffect(() => {
    setVisible(initialBatch);
  }, [query, initialBatch]);

  const canLoadMore = visible < filteredGroups.length;

  return (
    <section className="relative py-14 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto mb-6 md:mb-8" id="featured-products">
        {/* Título */}
        <h2 className="text-center md:text-left font-bignoodle tracking-tight uppercase text-3xl sm:text-4xl md:text-5xl">
          <span
            className={`bg-gradient-to-b ${GOLD} bg-clip-text text-transparent`}
          >
            {title}
          </span>
        </h2>

        {/* Buscador */}
        <div className="mt-4 max-w-md md:max-w-sm lg:max-w-md">
          <SearchBar
            value={query}
            onChange={setQuery}
            placeholder="Buscar por nombre o categoría…"
          />
          {query && (
            <p className="mt-1 text-xs text-white/50">
              Mostrando {Math.min(visible, filteredGroups.length)} de{' '}
              {filteredGroups.length} resultados.
            </p>
          )}
        </div>
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
            {filteredGroups.slice(0, visible).map((item) => (
              <motion.li
                key={item.uid}
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  show: { opacity: 1, y: 0 }
                }}
                className="h-full"
              >
                <DressCard item={item} />
              </motion.li>
            ))}

            {/* Sin resultados */}
            {filteredGroups.length === 0 && (
              <li className="col-span-full">
                <EmptyStateGalactic
                  query={query}
                  onReset={() => setQuery('')}
                />
              </li>
            )}
          </motion.ul>
        </div>
      </section>

      {canLoadMore && (
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() =>
              setVisible((v) => Math.min(v + batchSize, filteredGroups.length))
            }
            className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-black/70 px-4 py-2.5 text-sm text-white/90 hover:bg-black focus:outline-none focus:ring-2 focus:ring-[#a38321] focus:ring-offset-2 focus:ring-offset-black"
          >
            Cargar más <ArrowRight size={16} />
          </button>
        </div>
      )}
    </section>
  );
}
