import React, { useEffect, useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  FaFacebook,
  FaInstagram,
  FaTiktok,
  FaWhatsapp,
  FaArrowUp,
  FaMapMarkerAlt,
  FaRegCreditCard,
  FaTruck
} from 'react-icons/fa';

/**
 * FooterRegia_v3 — UX elevada (glass + dorado, accesible y útil)
 *
 * - NAP (Nombre, Dirección, Tel.) claro para SEO local
 * - CTA WhatsApp flotante + BackToTop con aparición suave
 * - Links semánticos (nav) y alt/aria accesibles
 * - Newsletter (dummy) para captar leads
 * - Badges de confianza (Envíos / Pagos)
 * - Respeta prefers-reduced-motion
 */
export default function FooterRegia({
  whatsappNumber = '+54 9 381 2472636',
  whatsappMessage = 'Hola Regia 👋 Me gustaría hacer una consulta.',
  instagram = 'https://www.instagram.com/regiaalmacendemoda',
  facebook = '', // si no hay, queda oculto
  tiktok = '', // si no hay, queda oculto
  address = 'Monteros, Tucumán',
  mapLink = 'https://maps.google.com/?q=Regia%20Monteros%20Tucum%C3%A1n',
  emailPublic = 'hola@regia.com.ar'
}) {
  const shouldReduce = useReducedMotion();
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 320);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const waHref = useMemo(() => {
    const text = encodeURIComponent(whatsappMessage);
    return `https://wa.me/${whatsappNumber.replace(/\D/g, '')}?text=${text}`;
  }, [whatsappNumber, whatsappMessage]);

  const socials = [
    {
      href: instagram,
      icon: <FaInstagram />,
      label: 'Instagram',
      show: !!instagram
    },
    {
      href: facebook,
      icon: <FaFacebook />,
      label: 'Facebook',
      show: !!facebook
    },
    { href: tiktok, icon: <FaTiktok />, label: 'TikTok', show: !!tiktok }
  ].filter((s) => s.show);

  const fadeUp = {
    hidden: { opacity: 0, y: 8 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const GOLD = 'from-[#f1d08a] via-[#caa042] to-[#a38321]';

  return (
    <footer className="relative mt-16 border-t border-white/10 bg-gradient-to-b from-black/40 via-black/60 to-black/80 text-white">
      {/* upper strip */}
      <motion.div
        initial={shouldReduce ? 'show' : 'hidden'}
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeUp}
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10"
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand + NAP */}
          <div>
            <h2 className="font-bignoodle text-3xl tracking-tight uppercase">
              <span
                className={`bg-gradient-to-b ${GOLD} bg-clip-text text-transparent`}
              >
                Regia
              </span>
            </h2>
            <p className="mt-2 text-white/70 text-sm">
              Boutique de moda femenina. Estilo, calidad y tendencia desde
              Monteros, Tucumán.
            </p>
            <ul className="mt-4 space-y-1 text-sm text-white/80">
              <li className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-white/60" /> {address}
              </li>
              <li>
                <a
                  href={`mailto:${emailPublic}`}
                  className="hover:underline underline-offset-4"
                >
                  {emailPublic}
                </a>
              </li>
              <li>
                <a
                  href={mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline underline-offset-4"
                >
                  Ver ubicación
                </a>
              </li>
            </ul>
            {/* Socials */}
            {socials.length > 0 && (
              <nav aria-label="Redes sociales" className="mt-4">
                <ul className="flex items-center gap-3">
                  {socials.map((s) => (
                    <li key={s.label}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={s.label}
                        className="grid place-items-center h-9 w-9 rounded-full border border-white/15 hover:border-white/30 transition"
                      >
                        <span className="text-white/90">{s.icon}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            )}
          </div>

          {/* Enlaces */}
          <div>
            <h3 className="text-base font-semibold">Enlaces</h3>
            <ul className="mt-3 space-y-2 text-white/80 text-sm">
              <li>
                <a
                  href="/tienda"
                  className="hover:underline underline-offset-4"
                >
                  Tienda
                </a>
              </li>
              <li>
                <a
                  href="/novedades"
                  className="hover:underline underline-offset-4"
                >
                  Novedades
                </a>
              </li>
              <li>
                <a
                  href="/productos-destacados"
                  className="hover:underline underline-offset-4"
                >
                  Destacados
                </a>
              </li>
              <li>
                <a
                  href="/contacto"
                  className="hover:underline underline-offset-4"
                >
                  Contacto
                </a>
              </li>
            </ul>
          </div>

          {/* Confianza */}
          <div>
            <h3 className="text-base font-semibold">Comprá segura</h3>
            <ul className="mt-3 space-y-3 text-sm">
              <li className="flex items-center gap-2 text-white/80">
                <FaTruck className="text-white/60" /> Envíos a todo el país
              </li>
              <li className="flex items-center gap-2 text-white/80">
                <FaRegCreditCard className="text-white/60" /> Transferencia,
                débito y crédito
              </li>
              <li className="text-white/60 text-xs">
                Cambios dentro de los 10 días con ticket.
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-base font-semibold">Sumate a Regia</h3>
            <p className="mt-2 text-sm text-white/70">
              Enterate primero de lanzamientos y promos.
            </p>
            <form
              className="mt-3 flex items-stretch gap-2"
              onSubmit={(e) => {
                e.preventDefault(); /* placeholder */
              }}
            >
              <input
                type="email"
                required
                placeholder="Tu email"
                className="flex-1 rounded-xl border border-white/15 bg-black/40 px-3.5 py-2.5 text-sm placeholder:text-white/40 outline-none focus:border-[#a38321]"
              />
              <button
                type="submit"
                className={`rounded-xl px-4 py-2.5 text-sm font-semibold text-black bg-gradient-to-br ${GOLD} hover:brightness-110 transition`}
              >
                Suscribirme
              </button>
            </form>
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-2 rounded-xl border border-white/15 px-3.5 py-2 text-sm text-white/90 hover:bg-white/10 transition"
              aria-label="Escribir por WhatsApp"
            >
              <FaWhatsapp /> Chatear ahora
            </a>
          </div>
        </div>
      </motion.div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-5 text-xs sm:text-sm text-white/60 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>
            © {new Date().getFullYear()} Regia. Todos los derechos reservados.
          </p>
          <nav className="flex items-center gap-4">
            <a href="/terminos" className="hover:underline underline-offset-4">
              Términos
            </a>
            <a
              href="/privacidad"
              className="hover:underline underline-offset-4"
            >
              Privacidad
            </a>
            <a
              href="/devoluciones"
              className="hover:underline underline-offset-4"
            >
              Cambios y devoluciones
            </a>
          </nav>
          <p className="text-white/40">
            Hecho con ♥ por{' '}
            <a
              href="https://softfusion.com.ar/"
              target="_blank"
              rel="noopener noreferrer"
              className="decoration-white/30 hover:decoration-white"
            >
              <span className='text-pink-600'>SoftFusion</span>
            </a>
          </p>
        </div>
      </div>

      {/* Floating actions */}
      {/* WA Bubble */}
      <a
        href={waHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp Regia"
        className="fixed bottom-6 right-6 grid place-items-center h-12 w-12 rounded-full bg-[#25D366] text-black shadow-lg focus:outline-none focus:ring-2 focus:ring-white/60"
      >
        <FaWhatsapp className="text-xl" />
      </a>

      {/* Back to top */}
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Volver arriba"
        className={`fixed bottom-6 right-24 grid place-items-center h-12 w-12 rounded-full border border-white/15 bg-black/70 text-white/90 shadow-lg transition ${
          showTop
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-2 pointer-events-none'
        }`}
      >
        <FaArrowUp className="text-lg" />
      </button>
    </footer>
  );
}
