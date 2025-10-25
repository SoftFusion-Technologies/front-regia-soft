import React, { useId, useState, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../Components/CartContext';
import {
  ShoppingCart,
  CheckCircle2,
  AlertCircle,
  Minus,
  Plus
} from 'lucide-react';

/**
 * AddToCartButton — Gold/Black UX v2
 *
 * - Sin alerts: validación elegante inline (talle y color)
 * - Botón principal con gradiente dorado + glow al hover
 * - Stepper de cantidad accesible (teclado + mouse)
 * - Toast de confirmación con CTA "Ver carrito"
 * - Estados: idle → adding → added
 */
export default function AddToCartButton({
  product,
  selectedColor,
  selectedSize,
  stock = 99,
  minQty = 1,
  maxQty = 10,
  onAdded
}) {
  const { addToCart } = useContext(CartContext);
  const [qty, setQty] = useState(minQty);
  const [status, setStatus] = useState('idle');
  const [errors, setErrors] = useState({ size: false, color: false });
  const navigate = useNavigate();
  const qtyId = useId();

  const clamp = (n) => Math.min(Math.max(n, minQty), Math.min(maxQty, stock));
  const dec = () => setQty((q) => clamp(q - 1));
  const inc = () => setQty((q) => clamp(q + 1));

  const onQtyInput = (e) => {
    const n = Number(e.target.value);
    if (Number.isFinite(n)) setQty(clamp(n));
  };

  const validate = () => {
    const sizeErr = !selectedSize;
    const colorErr = !selectedColor;
    setErrors({ size: sizeErr, color: colorErr });
    return !(sizeErr || colorErr);
  };

  const handleAdd = async () => {
    if (!validate()) return;
    setStatus('adding');

    const item = {
      ...product,
      quantity: qty,
      selectedSize,
      selectedColor
    };

    try {
      addToCart(item);
      setStatus('added');
      onAdded?.(item);
      // Auto-ocultar toast después de 2.2s
      setTimeout(() => setStatus('idle'), 2200);
    } catch (_) {
      setStatus('idle');
    }
  };

  const disabled = status === 'adding' || stock <= 0;

  return (
    <div className="relative">
      {/* Controles */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Stepper */}
        <label htmlFor={qtyId} className="sr-only">
          Cantidad
        </label>
        <div className="inline-flex items-stretch rounded-2xl overflow-hidden ring-1 ring-white/10 bg-white/5">
          <button
            type="button"
            onClick={dec}
            className="px-3 py-2 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f0d68a]"
            aria-label="Disminuir"
          >
            <Minus className="w-4 h-4" />
          </button>
          <input
            id={qtyId}
            inputMode="numeric"
            pattern="[0-9]*"
            type="number"
            min={minQty}
            max={Math.min(maxQty, stock)}
            value={qty}
            onChange={onQtyInput}
            className="w-14 text-center bg-transparent outline-none text-white/90"
          />
          <button
            type="button"
            onClick={inc}
            className="px-3 py-2 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f0d68a]"
            aria-label="Aumentar"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {/* Botón principal */}
        <button
          type="button"
          onClick={handleAdd}
          disabled={disabled}
          className={`relative inline-flex items-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f0d68a]
            ${disabled ? 'opacity-60 cursor-not-allowed' : 'hover:scale-[1.02]'}
            bg-gradient-to-r from-[#f0d68a] to-[#d4af37] text-black shadow-[0_0_0_0_rgba(0,0,0,0)] hover:shadow-[0_8px_30px_rgba(212,175,55,0.25)]`}
        >
          <ShoppingCart className="w-4 h-4" />
          {status === 'adding' ? 'Agregando…' : 'Agregar al carrito'}
        </button>

        {/* Stock */}
        <span className="text-xs text-white/70 ml-1">
          {stock > 0 ? `Stock: ${stock}` : 'Sin stock'}
        </span>
      </div>

      {/* Mensajes de validación */}
      <div className="mt-2 space-y-1">
        <AnimatePresence>
          {(errors.size || errors.color) && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="flex items-center gap-2 text-[12px] text-red-300"
            >
              <AlertCircle className="w-4 h-4" />
              <span>
                {errors.size && errors.color
                  ? 'Seleccioná talle y color para continuar.'
                  : errors.size
                  ? 'Seleccioná un talle para continuar.'
                  : 'Seleccioná un color para continuar.'}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Toast de confirmación */}
      <AnimatePresence>
        {status === 'added' && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            className="absolute left-0 right-0 mt-3"
          >
            <div className="rounded-2xl bg-black/70 ring-1 ring-white/10 backdrop-blur p-3 flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-white/90">
                <CheckCircle2 className="w-5 h-5 text-[#f0d68a]" />
                <span>¡Producto agregado al carrito!</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => navigate('/cart')}
                  className="px-3 py-2 text-xs rounded-xl bg-white/10 hover:bg-white/15 ring-1 ring-white/10"
                >
                  Ver carrito
                </button>
                <button
                  type="button"
                  onClick={() => setStatus('idle')}
                  className="px-3 py-2 text-xs rounded-xl bg-white/5 hover:bg-white/10 ring-1 ring-white/10"
                >
                  Seguir comprando
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
