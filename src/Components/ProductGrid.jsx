// =============================================
// File: src/components/ProductGrid.jsx
// Reusable grid (Gold/Black), with search, debounce and WhatsApp CTA
// =============================================
import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Search, MessageCircle, Sparkles } from 'lucide-react';
import ProductNotFound from '../Components/ProductNotFound';

function currency(n){ try{ return n?.toLocaleString('es-AR',{style:'currency',currency:'ARS'});}catch{ return '$'+(n??0);} }
function useDebounced(v, d=250){ const [x,setX]=useState(v); useEffect(()=>{const id=setTimeout(()=>setX(v),d); return ()=>clearTimeout(id);},[v,d]); return x; }

export default function ProductGrid({
  title = 'Productos',
  subtitle = 'Descubrí nuestra selección',
  items = [],
  onBuyClick,            // (item) => void
  itemLink,              // (item) => string | undefined
  showSearch = true,
  emptyMessage = 'No encontramos resultados.',
}){
  const [q, setQ] = useState('');
  const qd = useDebounced(q, 200);
  const list = useMemo(()=>{
    if(!qd) return items;
    const t = qd.toLowerCase();
    return items.filter(p => (p?.nombre||'').toLowerCase().includes(t));
  },[items, qd]);

  useEffect(()=>{ window.scrollTo({ top: 0, behavior: 'smooth' }); },[]);

  const fade = { hidden:{opacity:0,y:16}, show:{opacity:1,y:0,transition:{duration:.45,ease:'easeOut'}} };

  return (
    <section className="mt-20 relative py-10 md:py-14 bg-[#0a0a0a] text-white">
      <motion.div className="h-[3px] bg-gradient-to-r from-[#d4af37] via-[#f0d68a] to-[#d4af37]" initial={{scaleX:0}} animate={{scaleX:1}} transition={{duration:.6,ease:'easeOut'}} style={{transformOrigin:'left'}} />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div variants={fade} initial="hidden" animate="show" className="text-center">
          <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#f0d68a] to-[#d4af37]">{title}</span>
          </h1>
          {subtitle && <p className="mt-2 text-white/70">{subtitle}</p>}
        </motion.div>

        {showSearch && (
          <motion.div variants={fade} initial="hidden" animate="show" className="mt-6 flex justify-center">
            <div className="relative w-full sm:w-[420px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
              <input
                value={q}
                onChange={(e)=>setQ(e.target.value)}
                placeholder="Buscar productos…"
                className="w-full rounded-2xl bg-white/5 ring-1 ring-white/10 pl-11 pr-4 py-3 text-sm placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#f0d68a]"
              />
            </div>
          </motion.div>
        )}

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {list.map((p,i)=> (
            <motion.article key={p.id} variants={fade} initial="hidden" whileInView="show" viewport={{once:true, margin:'-10%'}} className="group relative rounded-2xl overflow-hidden bg-white/5 ring-1 ring-white/10 hover:ring-[#d4af37] transition">
              {itemLink ? (
                <a href={itemLink(p)} className="block">
                  <div className="aspect-[4/5] overflow-hidden">
                    <img src={p.imagen} alt={p.nombre} className="w-full h-full object-cover transition duration-500 group-hover:scale-105" />
                  </div>
                </a>
              ) : (
                <div className="aspect-[4/5] overflow-hidden">
                  <img src={p.imagen} alt={p.nombre} className="w-full h-full object-cover transition duration-500 group-hover:scale-105" />
                </div>
              )}

              <div className="p-4">
                <h3 className="text-base font-medium leading-tight line-clamp-2 min-h-[2.5rem]">{p.nombre}</h3>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#f0d68a] to-[#d4af37]">{currency(p.precio)}</span>
                </div>
                {p.promoText && <p className="mt-1 text-[12px] text-white/70 uppercase">{p.promoText}</p>}

                <div className="mt-3 flex items-center justify-between">
                  {itemLink && (
                    <a href={itemLink(p)} className="text-xs inline-flex items-center gap-1 rounded-xl px-3 py-2 bg-white/10 hover:bg-white/15 ring-1 ring-white/10" aria-label={`Ver ${p.nombre}`}>
                      <Sparkles className="w-4 h-4" /> Ver detalle
                    </a>
                  )}
                  <button type="button" onClick={()=>onBuyClick?.(p)} className="text-xs inline-flex items-center gap-1 rounded-xl px-3 py-2 font-semibold bg-gradient-to-r from-[#f0d68a] to-[#d4af37] text-black hover:scale-[1.02] transition">
                    <MessageCircle className="w-4 h-4" /> Comprar
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {(items.length===0 || list.length===0) && (
          <div className="mt-10"><ProductNotFound /></div>
        )}
      </div>

      <motion.div className="mt-10 h-[2px] bg-gradient-to-r from-[#d4af37] via-[#f0d68a] to-[#d4af37]" initial={{scaleX:0}} whileInView={{scaleX:1}} viewport={{once:true}} transition={{duration:.6,ease:'easeOut'}} style={{transformOrigin:'right'}} />
    </section>
  );
}
