import React, { useContext, useEffect, useMemo, useState } from 'react';
import { CartContext } from './CartContext';
import { DRESS_THUMBS } from '../data/dressThumbs';

const PH_FALLBACK =
  'data:image/svg+xml;utf8,\
<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96">\
<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">\
<stop offset="0" stop-color="#111"/><stop offset="1" stop-color="#222"/></linearGradient></defs>\
<rect width="100%" height="100%" fill="url(#g)"/><text x="50%" y="50%" dy=".35em" text-anchor="middle" fill="#777" font-size="10">Imagen</text></svg>';

function moneyAR(n) {
  if (n == null || n === '') return 'Consultar';
  if (typeof n === 'string') return n;
  try {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS'
    }).format(Number(n));
  } catch {
    return String(n);
  }
}

function buildWhatsAppLink({ phone, text }) {
  const digits = String(phone).replace(/\D+/g, '');
  return `https://wa.me/${digits}?text=${encodeURIComponent(text || '')}`;
}

/** 1) Resolver síncrono por campos comunes, 2) por id con DRESS_THUMBS, 3) por imageLoader, 4) placeholder */
function CartItemThumb({ item, alt = 'Producto', className = '' }) {
  const [src, setSrc] = useState(null);
  const [error, setError] = useState(false);

  const syncSrc = useMemo(() => {
    const cands = [
      item?.thumb,
      item?.thumbnail,
      item?.imageThumb,
      item?.imageFront,
      item?.imagePack,
      item?.imageBack,
      item?.image,
      Array.isArray(item?.images) ? item.images[0] : null,
      Array.isArray(item?.hero) ? item.hero[0] : null
    ].filter(Boolean);
    return cands[0] || null;
  }, [item]);

  // Resolver por id con el mapa de vestidos (soporta items persistidos sin funciones)
  const guessFromId = useMemo(() => {
    const key = String(item?.id ?? '').replace(/\D+/g, '');
    return key && DRESS_THUMBS[key] ? DRESS_THUMBS[key] : null;
  }, [item?.id]);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      // preferí síncrono si existe
      if (syncSrc) {
        setSrc(syncSrc);
        return;
      }
      // luego por id (vestidos)
      if (guessFromId) {
        setSrc(guessFromId);
        return;
      }
      // si AddToCart guardó la función (misma sesión)
      if (typeof item?.imageLoader === 'function') {
        try {
          const url = await item.imageLoader();
          if (!cancelled) {
            setSrc(url || PH_FALLBACK);
            return;
          }
        } catch {}
      }
      // fallback final
      if (!cancelled) setSrc(PH_FALLBACK);
    })();

    return () => {
      cancelled = true;
    };
  }, [syncSrc, guessFromId, item]);

  return (
    <img
      src={error ? PH_FALLBACK : src || PH_FALLBACK}
      alt={alt}
      className={className || 'w-12 h-12 object-cover rounded'}
      width={48}
      height={48}
      loading="lazy"
      decoding="async"
      draggable={false}
      onError={() => setError(true)}
    />
  );
}

export default function FloatingCart() {
  const { isFloatingCartOpen, setIsFloatingCartOpen, cartItems } =
    useContext(CartContext);

  const waMessage = useMemo(() => {
    let lines = ['¡Hola! Quiero realizar una compra. Detalles:\n'];
    for (const it of cartItems) {
      lines.push(`• ${it.title || 'Producto'}`);
      if (it.quantity != null) lines.push(`  Cantidad: ${it.quantity}`);
      if (it.price != null) lines.push(`  Precio: ${moneyAR(it.price)}`);
      if (it.selectedColor?.name)
        lines.push(`  Color: ${it.selectedColor.name}`);
      if (it.selectedSize?.name) lines.push(`  Talle: ${it.selectedSize.name}`);
      lines.push('');
    }
    lines.push('¡Gracias!');
    return lines.join('\n');
  }, [cartItems]);

  const whatsappLink = buildWhatsAppLink({
    phone: '5493812472636', // <- Ajustá tu número acá
    text: waMessage
  });

  if (!isFloatingCartOpen) return null;

  return (
    <div className="fixed top-0 right-0 w-80 max-w-[90vw] h-full bg-[#0b0b0b] text-white shadow-2xl border-l border-white/10 z-[120]">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        <h2 className="text-lg font-semibold tracking-wide">Mi Carrito</h2>
        <button
          onClick={() => setIsFloatingCartOpen(false)}
          className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-white/10 hover:bg-white/15 active:scale-95 transition"
          aria-label="Cerrar"
        >
          ✕
        </button>
      </div>

      {/* Items */}
      {cartItems.length === 0 ? (
        <div className="p-6 text-center text-white/70">
          El carrito está vacío.
        </div>
      ) : (
        <ul className="p-4 space-y-4 overflow-y-auto max-h-[calc(100vh-180px)]">
          {cartItems.map((item) => (
            <li
              key={`${item.id}-${item.selectedColor?.id ?? ''}-${
                item.selectedSize?.id ?? ''
              }`}
              className="flex items-center gap-3 p-2 rounded-lg ring-1 ring-white/10 bg-white/[0.03]"
            >
              <CartItemThumb item={item} alt={item.title} />

              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{item.title}</p>
                <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-white/70">
                  <span>Cant: {item.quantity ?? 1}</span>
                  {item.selectedColor?.name && (
                    <span className="inline-flex items-center gap-1">
                      <span
                        className="inline-block w-3.5 h-3.5 rounded-full ring-1 ring-white/20"
                        style={{ backgroundColor: item.selectedColor.hex }}
                        aria-hidden
                      />
                      {item.selectedColor.name}
                    </span>
                  )}
                  {item.selectedSize?.name && (
                    <span>Talle: {item.selectedSize.name}</span>
                  )}
                </div>
              </div>

              <p className="text-sm font-semibold shrink-0">
                {moneyAR(item.price)}
              </p>
            </li>
          ))}
        </ul>
      )}

      {/* Footer */}
      {cartItems.length > 0 && (
        <div className="p-4 border-t border-white/10 space-y-3">
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 bg-green-600 hover:bg-green-700 text-white font-semibold transition"
          >
            Finalizar compra por WhatsApp
          </a>

          <button
            onClick={() => (window.location.href = '/productos')}
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 bg-white/[0.06] hover:bg-white/[0.1] text-white font-medium transition"
          >
            Seguir comprando
          </button>
        </div>
      )}
    </div>
  );
}
