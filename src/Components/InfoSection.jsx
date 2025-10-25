import React, { useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  FaShippingFast,
  FaCreditCard,
  FaWhatsapp,
  FaMapMarkerAlt
} from 'react-icons/fa';

/**
 * InfoSectionRegia — UX elevada
 * - Cards “glass” con borde dorado y halo sutil
 * - Stagger + hover con resp. a prefers-reduced-motion
 * - CTA WhatsApp con mensaje prellenado y UTM opcional
 * - Chips de medios de pago
 * - Datos locales (Monteros, Tucumán) + botón “Cómo llegar” opcional
 */
export default function InfoSection({
  className = '',
  whatsappNumber = '+5493810000000', // << COMPLETAR
  whatsappMessage = 'Hola Regia 👋 Me gustaría hacer una consulta.',
  shippingText = 'Envíos a todo el país',
  shippingBadge = '24/48 hs a Tucumán',
  payments = ['Transferencia', 'Efectivo', 'Débito', 'Crédito'],
  address = 'Monteros, Tucumán',
  gmapsLink = '', // deja vacío para ocultar el botón
  showMapButton = true
}) {
  const shouldReduce = useReducedMotion();

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

  const waHref = useMemo(() => {
    const text = encodeURIComponent(whatsappMessage);
    // UTM opcional para medir conversiones desde esta sección
    const utm = encodeURIComponent(
      'utm_source=web&utm_medium=infobar&utm_campaign=wa_consultas'
    );
    return `https://wa.me/${whatsappNumber.replace(
      /[^\d]/g,
      ''
    )}?text=${text}%0A%0A${utm}`;
  }, [whatsappNumber, whatsappMessage]);

  return (
    <section
      className={`relative py-14 sm:py-16 px-4 sm:px-6 lg:px-8 ${className}`}
    >
      <div className="max-w-6xl mx-auto">
        {/* Encabezado pequeño y sutil */}
        <div className="mb-8 text-center">
          <h2 className="font-bignoodle text-2xl sm:text-3xl md:text-4xl tracking-tight uppercase">
            <span className="bg-gradient-to-b from-[#f1d08a] via-[#caa042] to-[#a38321] bg-clip-text text-transparent">
              Comprá fácil en Regia
            </span>
          </h2>
          <p className="mt-2 text-white/70 text-sm">{address}</p>
        </div>

        {/* Grid de info */}
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
          {items.map((it, i) => (
            <motion.li
              key={it.title}
              variants={{
                hidden: { opacity: 0, y: 10 },
                show: { opacity: 1, y: 0 }
              }}
            >
              <div className="relative rounded-2xl p-[1px] bg-[linear-gradient(135deg,rgba(241,208,138,0.6)_0%,rgba(202,160,66,0.5)_45%,rgba(163,131,33,0.5)_100%)]">
                <motion.div
                  className="relative rounded-2xl h-full bg-black/40 backdrop-blur-md overflow-hidden"
                  whileHover={shouldReduce ? {} : { y: -2 }}
                  transition={{
                    type: 'spring',
                    stiffness: 120,
                    damping: 16,
                    mass: 0.4
                  }}
                >
                  {/* Halo suave */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 blur-[12px] bg-[radial-gradient(60%_60%_at_50%_10%,rgba(241,208,138,0.2),rgba(163,131,33,0.08)_60%,transparent_80%)]"
                  />
                  {/* Contenido */}
                  <div className="flex flex-col items-center text-center p-5 sm:p-6">
                    <motion.div
                      className="mb-3 grid place-items-center h-14 w-14 rounded-full border border-[#a38321]/40 bg-black/50"
                      whileHover={
                        shouldReduce ? {} : { scale: 1.04, rotate: 1 }
                      }
                      transition={{
                        type: 'spring',
                        stiffness: 180,
                        damping: 12
                      }}
                      aria-hidden
                    >
                      <span className="text-xl text-[#f1d08a]">{it.icon}</span>
                    </motion.div>

                    <h3 className="text-lg font-semibold">{it.title}</h3>
                    <p className="mt-1 text-white/70 text-sm">{it.desc}</p>

                    {/* Badge/envíos */}
                    {it.badge && (
                      <span className="mt-2 inline-flex items-center rounded-full border border-[#caa042]/40 bg-black/50 px-2.5 py-1 text-[11px] text-white">
                        {it.badge}
                      </span>
                    )}

                    {/* Chips de pago */}
                    {Array.isArray(it.chips) && it.chips.length > 0 && (
                      <div className="mt-3 flex flex-wrap justify-center gap-2">
                        {it.chips.map((c) => (
                          <span
                            key={c}
                            className="rounded-full border border-white/15 text-white/80 text-xs px-3 py-1"
                          >
                            {c}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* CTA WhatsApp */}
                    {it.cta && (
                      <a
                        href={waHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-flex items-center gap-2 rounded-xl border border-[#a38321]/40 px-4 py-2 text-sm text-white/90 hover:bg-[#a38321] hover:text-black transition-colors"
                        aria-label="Escribir a Regia por WhatsApp"
                      >
                        <FaWhatsapp className="text-base" />
                        Chatear ahora
                      </a>
                    )}
                  </div>
                </motion.div>
              </div>
            </motion.li>
          ))}
        </motion.ul>

        {/* Línea inferior con acción secundaria */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 text-sm">
          {showMapButton && gmapsLink && (
            <a
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-3.5 py-2 text-white/80 hover:bg-white/10 transition-colors"
              href={gmapsLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaMapMarkerAlt className="text-base" />
              Cómo llegar
            </a>
          )}
          <span className="text-white/40 select-none hidden sm:inline">•</span>
          <span className="text-white/70">
            Horario: Lun a Sáb 9:30–13:00 / 17:00–21:00
          </span>
        </div>
      </div>
    </section>
  );
}
