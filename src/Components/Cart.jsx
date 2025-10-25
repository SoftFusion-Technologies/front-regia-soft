import React, { useContext, useEffect, useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { CartContext } from './CartContext';
import EmptyCart from '../Config/EmptyCart';
import {
  Trash2,
  Plus,
  Minus,
  Tag,
  Truck,
  ShieldCheck,
  ArrowLeft,
  MessageCircle
} from 'lucide-react';

/**
 * CartRegia_v3 — Carrito moderno con UX elevada
 * - Layout de 2 columnas: lista (izq) + resumen sticky (der)
 * - Controles de cantidad accesibles, remove, color/talle visibles
 * - Subtotal, envío estimado (placeholder), cupón (dummy) y CTA WhatsApp
 * - Link de WhatsApp con detalle de items, talles y color
 * - Respeta prefers-reduced-motion; estilos Regia (dorado)
 */
export default function CartRegia() {
  const shouldReduce = useReducedMotion();
  const {
    cartItems = [],
    removeFromCart,
    updateQuantity
  } = useContext(CartContext);

  // Scroll arriba al montar
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Parseo robusto de precio (puede venir como "$34.990" o "34990")
  const parsePrice = (p) => {
    if (typeof p === 'number') return p;
    if (typeof p !== 'string') return 0;
    // Eliminar todo menos dígitos y coma/punto
    const clean = p.replace(/[^0-9.,]/g, '').replace(/\.(?=\d{3}(\D|$))/g, ''); // quita separadores de miles
    const normalized = clean.replace(',', '.');
    const val = parseFloat(normalized);
    return Number.isFinite(val) ? val : 0;
  };

  const items = Array.isArray(cartItems) ? cartItems : [];

  const subtotal = useMemo(() => {
    return items.reduce(
      (acc, it) => acc + parsePrice(it.price) * (it.quantity || 1),
      0
    );
  }, [items]);

  const shippingEstimate = 0; // placeholder (si luego integrás cálculo por CP)
  const total = subtotal + shippingEstimate;

  const formatARS = (n) =>
    n.toLocaleString('es-AR', {
      style: 'currency',
      currency: 'ARS',
      maximumFractionDigits: 0
    });

  const makeWhatsAppLink = () => {
    const number = '+54 9 381 2472636'; // << ACTUALIZAR si es necesario
    let message =
      '¡Hola! Quiero realizar una compra en Regia. Estos son los detalles:%0A%0A';
    items.forEach((item, idx) => {
      const lines = [];
      lines.push(`• Producto: ${item.title}`);
      lines.push(`  Cantidad: ${item.quantity || 1}`);
      if (item.selectedColor?.name)
        lines.push(`  Color: ${item.selectedColor.name}`);
      if (item.selectedSize?.name)
        lines.push(`  Talle: ${item.selectedSize.name}`);
      const unit = parsePrice(item.price);
      if (unit) lines.push(`  Precio: ${formatARS(unit)}`);
      message += encodeURIComponent(lines.join('\n')) + '%0A%0A';
    });
    message += encodeURIComponent(
      `Subtotal: ${formatARS(subtotal)}\nTotal: ${formatARS(total)}`
    );
    const digits = number.replace(/\D/g, '');
    return `https://wa.me/${digits}?text=${message}`;
  };

  const inc = (it) => {
    if (typeof updateQuantity === 'function') {
      updateQuantity(
        it.id,
        (it.quantity || 1) + 1,
        it.selectedColor,
        it.selectedSize
      );
    }
  };
  const dec = (it) => {
    if ((it.quantity || 1) <= 1) return;
    if (typeof updateQuantity === 'function') {
      updateQuantity(
        it.id,
        (it.quantity || 1) - 1,
        it.selectedColor,
        it.selectedSize
      );
    }
  };

  const GOLD = 'from-[#f1d08a] via-[#caa042] to-[#a38321]';

  if (!items.length) {
    return (
      <div className="mt-10 px-4 sm:px-6 lg:px-8">
        <EmptyCart />
      </div>
    );
  }

  return (
    <section className="relative isolate py-10 sm:py-12 px-4 sm:px-6 lg:px-8">
      {/* Backdrop suave */}
      <div
        aria-hidden
        className="absolute inset-0 -z-20 bg-gradient-to-b from-black/30 via-black/60 to-black/80"
      />

      <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Col izquierda: Items */}
        <div className="lg:col-span-2">
          <h1 className="font-bignoodle text-3xl sm:text-4xl tracking-tight uppercase text-center sm:text-left">
            <span
              className={`bg-gradient-to-b ${GOLD} bg-clip-text text-transparent`}
            >
              Mi Carrito
            </span>
          </h1>

          <ul className="mt-6 space-y-4">
            {items.map((it) => (
              <motion.li
                key={`${it.id}-${it.selectedColor?.name || 'c'}-${
                  it.selectedSize?.name || 's'
                }`}
                initial={shouldReduce ? { opacity: 1 } : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="relative grid grid-cols-[96px_1fr_auto] sm:grid-cols-[112px_1fr_auto] items-center gap-3 sm:gap-4 rounded-2xl p-[1px] bg-[linear-gradient(135deg,rgba(241,208,138,0.35)_0%,rgba(202,160,66,0.25)_45%,rgba(163,131,33,0.25)_100%)]"
              >
                <div className="col-span-3 sm:col-span-3 rounded-2xl bg-black/40 backdrop-blur-md p-3 sm:p-4">
                  <div className="grid grid-cols-[96px_1fr_auto] sm:grid-cols-[112px_1fr_auto] items-center gap-3 sm:gap-4">
                    {/* Imagen */}
                    <div className="relative h-24 w-24 sm:h-28 sm:w-28 rounded-xl overflow-hidden border border-white/10 bg-black/30">
                      <img
                        src={it.imageFront || '/imgs/placeholder.webp'}
                        alt={it.title}
                        className="h-full w-full object-cover"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>

                    {/* Info */}
                    <div className="min-w-0">
                      <h3 className="font-semibold leading-tight truncate">
                        {it.title}
                      </h3>
                      <div className="mt-1 text-sm text-white/70 flex flex-wrap items-center gap-x-3 gap-y-1">
                        {it.selectedColor?.name && (
                          <div className="flex items-center gap-2">
                            <span
                              className="inline-block h-4 w-4 rounded-full border border-white/20"
                              style={{
                                backgroundColor: it.selectedColor.hex || '#999'
                              }}
                              aria-label={`Color ${it.selectedColor.name}`}
                            />
                            <span>{it.selectedColor.name}</span>
                          </div>
                        )}
                        {it.selectedSize?.name && (
                          <span>Talle: {it.selectedSize.name}</span>
                        )}
                        {it.price && (
                          <span className="text-white">
                            {formatARS(parsePrice(it.price))}
                          </span>
                        )}
                      </div>

                      {/* Controles de cantidad */}
                      {typeof updateQuantity === 'function' && (
                        <div className="mt-3 inline-flex items-center gap-2 rounded-xl border border-white/15 bg-black/30 px-2 py-1">
                          <button
                            type="button"
                            onClick={() => dec(it)}
                            className="grid place-items-center h-7 w-7 rounded-lg hover:bg-white/10"
                            aria-label="Disminuir cantidad"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="px-2 text-sm tabular-nums">
                            {it.quantity || 1}
                          </span>
                          <button
                            type="button"
                            onClick={() => inc(it)}
                            className="grid place-items-center h-7 w-7 rounded-lg hover:bg-white/10"
                            aria-label="Aumentar cantidad"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Acciones */}
                    <div className="flex flex-col items-end gap-2 self-start">
                      <button
                        type="button"
                        onClick={() =>
                          removeFromCart?.(
                            it.id,
                            it.selectedColor,
                            it.selectedSize
                          )
                        }
                        className="inline-flex items-center gap-1 text-red-300 hover:text-red-200"
                      >
                        <Trash2 size={16} />
                        <span className="text-sm">Eliminar</span>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.li>
            ))}
          </ul>

          <div className="mt-6">
            <a
              href="/productos"
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-4 py-2.5 text-sm text-white/90 hover:bg-white/10"
            >
              <ArrowLeft size={16} /> Seguir comprando
            </a>
          </div>
        </div>

        {/* Col derecha: Resumen */}
        <div className="lg:col-span-1 mt-16">
          <div className="lg:sticky lg:top-20">
            <div className="rounded-2xl p-[1px] bg-[linear-gradient(135deg,rgba(241,208,138,0.35)_0%,rgba(202,160,66,0.25)_45%,rgba(163,131,33,0.25)_100%)]">
              <div className="rounded-2xl bg-black/50 backdrop-blur-md p-5">
                <h2 className="text-lg font-semibold">Resumen</h2>

                {/* Cupón (UI dummy) */}
                <div className="mt-3 flex items-stretch gap-2">
                  <div className="relative flex-1">
                    <Tag
                      size={16}
                      className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-white/40"
                    />
                    <input
                      type="text"
                      placeholder="Código de descuento"
                      className="w-full rounded-xl border border-white/15 bg-black/30 pl-9 pr-3 py-2.5 text-sm placeholder:text-white/40 outline-none focus:border-[#a38321]"
                    />
                  </div>
                  <button
                    className={`rounded-xl px-3.5 py-2.5 text-sm font-semibold text-black bg-gradient-to-br ${GOLD} hover:brightness-110`}
                    type="button"
                  >
                    Aplicar
                  </button>
                </div>

                {/* Totales */}
                <dl className="mt-4 space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <dt className="text-white/70">Subtotal</dt>
                    <dd className="font-semibold text-white">
                      {formatARS(subtotal)}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-white/70 flex items-center gap-1">
                      <Truck size={14} /> Envío
                    </dt>
                    <dd className="text-white">
                      {shippingEstimate === 0
                        ? 'A calcular'
                        : formatARS(shippingEstimate)}
                    </dd>
                  </div>
                  <div className="border-t border-white/10 pt-2 flex items-center justify-between text-base">
                    <dt className="font-semibold text-white">Total</dt>
                    <dd className="font-semibold text-emerald-500">
                      {formatARS(total)}
                    </dd>
                  </div>
                </dl>

                {/* Beneficios */}
                <ul className="mt-4 space-y-1 text-xs text-white/60">
                  <li className="flex items-center gap-2">
                    <ShieldCheck size={14} className="text-white/50" /> Pago
                    seguro
                  </li>
                  <li className="flex items-center gap-2">
                    <Truck size={14} className="text-white/50" /> Envíos a todo
                    el país
                  </li>
                </ul>

                {/* CTA WhatsApp */}
                <a
                  href={makeWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-black bg-gradient-to-br ${GOLD} hover:brightness-110`}
                >
                  <MessageCircle size={16} /> Finalizar compra por WhatsApp
                </a>

                {/* Leyenda */}
                <p className="mt-3 text-[11px] text-white/50">
                  Al continuar, se abrirá WhatsApp con el detalle de tu pedido
                  para coordinar pago y envío.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
