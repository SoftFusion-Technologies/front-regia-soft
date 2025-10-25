import React, { useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  FaShippingFast,
  FaCreditCard,
  FaWhatsapp,
  FaMapMarkerAlt,
  FaRegClock,
  FaCopy,
  FaCheck
} from 'react-icons/fa';
import ParticlesBackground from './ParticlesBackground';
// (Opcionales) íconos de marcas de pago si usás react-icons/si
// import { SiMercadopago, SiVisa, SiMastercard, SiAmericanexpress } from 'react-icons/si';

/**
 * InfoSectionRegia_v3 — pulido extra (micro-UX + accesibilidad)
 *
 * Novedades:
 * - Glint animado (sutil) en cards sin saturar
 * - Botón "Copiar WhatsApp" con feedback ✅ (sin deps)
 * - Horarios con icono y semántica, accesible
 * - Chips de pago mejorados (tooltip simple via title)
 * - CTA secundaria "Cómo llegar" con fallback a Maps
 * - Respeta prefers-reduced-motion
 */
export default function InfoSectionRegia({
  className = '',
  whatsappNumber = '+5493810000000', // << COMPLETAR con el real
  whatsappMessage = 'Hola Regia 👋 Me gustaría hacer una consulta.',
  shippingText = 'Envíos a todo el país',
  shippingBadge = '24/48 hs a Tucumán',
  payments = ['Transferencia', 'Efectivo', 'Débito', 'Crédito'],
  address = 'Monteros, Tucumán',
  gmapsLink = '', // deja vacío para ocultar el botón
  showMapButton = true,
  schedule = 'Lun a Sáb 9:30–13:00 / 17:00–21:00'
}) {
  const shouldReduce = useReducedMotion();
  const [copied, setCopied] = useState(false);

  const items = useMemo(
    () => [
      {
        icon: <FaShippingFast />,
        title: 'Envíos',
        desc: shippingText,
        badge: shippingBadge
      },
      {
        icon: <FaCreditCard />,
        title: 'Pagos',
        desc: 'Rápidos y seguros',
        chips: payments
      },
      {
        icon: <FaWhatsapp />,
        title: 'Consultas',
        desc: 'Atención personalizada por WhatsApp',
        cta: true
      }
    ],
    [shippingText, shippingBadge, payments]
  );

  const digits = whatsappNumber.replace(/[^\d]/g, '');
  const waHref = useMemo(() => {
    const text = encodeURIComponent(whatsappMessage);
    const utm = encodeURIComponent(
      'utm_source=web&utm_medium=infobar&utm_campaign=wa_consultas'
    );
    return `https://wa.me/${digits}?text=${text}%0A%0A${utm}`;
  }, [digits, whatsappMessage]);

  const copyNumber = async () => {
    try {
      await navigator.clipboard.writeText(`+${digits}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch (_) {}
  };

  const GOLD = 'from-[#f1d08a] via-[#caa042] to-[#a38321]';

  const zoomChild = {
    rest: { scale: 1 },
    hover: {
      scale: 1.03,
      transition: { type: 'spring', stiffness: 220, damping: 18 }
    }
  };
  const zoomChip = {
    rest: { scale: 1 },
    hover: {
      scale: 1.06,
      transition: { type: 'spring', stiffness: 240, damping: 16 }
    }
  };

  return (
    <section
      className={`relative py-14 sm:py-16 px-4 sm:px-6 lg:px-8 ${className}`}
    >
      <ParticlesBackground></ParticlesBackground>
      <div className="max-w-6xl mx-auto">
        {/* Encabezado */}
        <div className="mb-8 text-center">
          <h2 className="font-bignoodle text-2xl sm:text-3xl md:text-4xl tracking-tight uppercase">
            <span
              className={`bg-gradient-to-b ${GOLD} bg-clip-text text-transparent`}
            >
              Comprá fácil en Regia
            </span>
          </h2>
          <p className="mt-2 text-white/70 text-sm">{address}</p>
        </div>

        {/* Grid */}
        <motion.ul
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: { opacity: 1 },
            show: { opacity: 1, transition: { staggerChildren: 0.08 } }
          }}
        >
          {items.map((it) => (
            <motion.li
              key={it.title}
              variants={{
                hidden: { opacity: 0, y: 10 },
                show: { opacity: 1, y: 0 }
              }}
            >
              <div className="relative rounded-2xl p-[1px] bg-[linear-gradient(135deg,rgba(241,208,138,0.6)_0%,rgba(202,160,66,0.5)_45%,rgba(163,131,33,0.5)_100%)]">
                {/* Card = trigger de hover */}
                <motion.div
                  className="relative rounded-2xl h-full bg-black/40 backdrop-blur-md overflow-hidden group"
                  initial="rest"
                  animate="rest"
                  whileHover="hover"
                  transition={{
                    type: 'spring',
                    stiffness: 120,
                    damping: 16,
                    mass: 0.4
                  }}
                >
                  {/* Contenido */}
                  <div className="flex flex-col items-center text-center p-5 sm:p-6 relative z-[1]">
                    {/* Icono */}
                    <motion.div
                      className="mb-3 grid place-items-center h-14 w-14 rounded-full border border-[#a38321]/40 bg-black/50"
                      variants={zoomChild}
                      aria-hidden
                    >
                      <span className="text-xl text-[#f1d08a]">{it.icon}</span>
                    </motion.div>

                    {/* Título + descripción */}
                    <motion.h3
                      className="text-lg font-semibold"
                      variants={zoomChild}
                    >
                      {it.title}
                    </motion.h3>
                    <motion.p
                      className="mt-1 text-white/70 text-sm"
                      variants={zoomChild}
                    >
                      {it.desc}
                    </motion.p>

                    {/* Badge/envíos */}
                    {it.badge && (
                      <motion.span
                        variants={zoomChild}
                        className="mt-2 inline-flex items-center rounded-full border border-[#caa042]/40 bg-black/50 px-2.5 py-1 text-[11px] text-white"
                      >
                        {it.badge}
                      </motion.span>
                    )}

                    {/* Chips pagos */}
                    {Array.isArray(it.chips) && it.chips.length > 0 && (
                      <div className="mt-3 flex flex-wrap justify-center gap-2">
                        {it.chips.map((c) => (
                          <motion.span
                            key={c}
                            title={`Medio de pago: ${c}`}
                            variants={zoomChild}
                            whileHover={zoomChip.hover}
                            className="rounded-full border border-white/15 text-white/80 text-xs px-3 py-1"
                          >
                            {c}
                          </motion.span>
                        ))}
                      </div>
                    )}

                    {/* CTA WhatsApp + Copiar */}
                    {it.cta && (
                      <div className="mt-4 flex items-center gap-2">
                        <motion.a
                          href={waHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          variants={zoomChild}
                          whileHover={{ scale: 1.05 }}
                          className="inline-flex items-center gap-2 rounded-xl border border-[#a38321]/40 px-4 py-2 text-sm text-white/90 hover:bg-[#a38321] hover:text-black transition-colors"
                          aria-label="Escribir a Regia por WhatsApp"
                        >
                          <FaWhatsapp className="text-base" />
                          Chatear ahora
                        </motion.a>

                        <motion.button
                          type="button"
                          onClick={copyNumber}
                          variants={zoomChild}
                          whileHover={{ scale: 1.05 }}
                          className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-3 py-2 text-sm text-white/80 hover:bg-white/10"
                          aria-live="polite"
                          aria-label="Copiar número de WhatsApp"
                        >
                          {copied ? (
                            <FaCheck className="text-green-400" />
                          ) : (
                            <FaCopy />
                          )}
                          {copied ? 'Copiado' : 'Copiar'}
                        </motion.button>
                      </div>
                    )}
                  </div>
                </motion.div>
              </div>
            </motion.li>
          ))}
        </motion.ul>

        {/* Línea inferior */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 text-sm">
          {showMapButton && gmapsLink && (
            <a
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-3.5 py-2 text-white/90 hover:bg-white/10 transition-colors"
              href={gmapsLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaMapMarkerAlt className="text-base" />
              Cómo llegar
            </a>
          )}
          <span className="text-white/40 select-none hidden sm:inline">•</span>
          <span className="inline-flex items-center gap-2 text-white/70">
            <FaRegClock className="opacity-70" /> Horario: {schedule}
          </span>
        </div>
      </div>
    </section>
  );
}
