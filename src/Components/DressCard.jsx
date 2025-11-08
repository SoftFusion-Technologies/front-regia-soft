// src/Components/DressCard.jsx
import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { moneyAR } from '../utils/money';

export default function DressCard({ item }) {
  const { name, price, imageLoader, to } = item;
  const [src, setSrc] = useState(null);
  const ref = useRef(null);

  useEffect(() => {
    let mounted = true;
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      async ([entry]) => {
        if (entry.isIntersecting && mounted) {
          try {
            const url = await imageLoader();
            if (mounted) setSrc(url);
          } catch {}
          io.disconnect();
        }
      },
      { root: null, rootMargin: '120px 0px', threshold: 0.01 }
    );

    io.observe(el);
    return () => {
      mounted = false;
      io.disconnect();
    };
  }, [imageLoader]);

  return (
    <Link to={to} aria-label={name}>
      {' '}
      {/* 👈 usar `to` directamente */}
      <motion.article
        ref={ref}
        className="group relative overflow-hidden rounded-xl ring-1 ring-white/10 bg-black/40"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <div className="relative w-full aspect-[4/5] overflow-hidden">
          {src ? (
            <img
              src={src}
              alt={name}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03] select-none"
              loading="lazy"
              decoding="async"
              draggable={false}
            />
          ) : (
            <div className="absolute inset-0 bg-white/5 animate-pulse" />
          )}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-b from-transparent to-black/60"
          />
        </div>

        <div className="relative z-10 p-3">
          <h3 className="text-white text-sm font-medium leading-snug">
            {name}
          </h3>
          <p className="text-white/80 text-sm">
            {price == null ? 'Consultar' : moneyAR(price)}
          </p>
        </div>
      </motion.article>
    </Link>
  );
}
