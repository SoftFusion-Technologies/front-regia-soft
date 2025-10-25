import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  Percent,
  Gift,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import ContactForm from '../Components/ContactForm';
import ImgHero from '/Hero/imgHero1.webp';

/**
 * Contact — Regia Gold/Black (Modern)
 * Estilo premium dorado/negro + micro-animaciones y CTAs rápidos.
 * Requiere: Tailwind + framer-motion + lucide-react
 */
export default function ContactRegia() {
  const fade = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
  };
  const stagger = {
    hidden: { opacity: 1 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.06, delayChildren: 0.04 }
    }
  };

  return (
    <section className="mt-32 relative min-h-screen bg-[#0a0a0a] text-white overflow-hidden">
      {/* Glow sutil */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -top-20 -left-24 w-[420px] h-[420px] rounded-full blur-3xl"
        style={{
          background:
            'radial-gradient(closest-side, rgba(240,214,138,0.18), transparent)'
        }}
        initial={{ opacity: 0.5 }}
        animate={{ opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Strip superior dorado */}
      <motion.div
        className="h-[3px] bg-gradient-to-r from-[#d4af37] via-[#f0d68a] to-[#d4af37]"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        style={{ transformOrigin: 'left' }}
      />

      {/* Título + copy */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fade}
          initial="hidden"
          animate="show"
          className="text-center"
        >
          <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#f0d68a] to-[#d4af37]">
              Contacto
            </span>{' '}
            <span className="text-white/90">— Regia Almacén de Moda</span>
          </h1>
          <p className="mt-3 text-white/70 max-w-2xl mx-auto">
            ¿Consultas de talles, colores o stock? Escribinos y te asesoramos al
            instante.
          </p>
        </motion.div>
      </div>

      {/* Contenido principal */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Lado izquierdo: info + promos + mapa */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-15%' }}
          >
            {/* Card de info */}
            <motion.div
              variants={fade}
              className="rounded-2xl bg-gradient-to-b from-black/60 to-black/30 ring-1 ring-white/10 p-6"
            >
              <div className="flex items-start gap-4">
                <img
                  src={ImgHero}
                  alt="Regia Monteros"
                  className="hidden sm:block w-28 h-28 object-cover rounded-xl ring-1 ring-white/10"
                />
                <div className="flex-1">
                  <h2 className="text-xl font-semibold">
                    Información de contacto
                  </h2>
                  <ul className="mt-3 space-y-3 text-sm">
                    <li className="flex items-start gap-3">
                      <Phone className="w-5 h-5 text-[#f0d68a] mt-0.5" />
                      <span>+54 9 3812 472636</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <MessageCircle className="w-5 h-5 text-[#f0d68a] mt-0.5" />
                      <a
                        href="https://wa.me/5493812472636"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        WhatsApp directo
                      </a>
                    </li>
                    <li className="flex items-start gap-3">
                      <Mail className="w-5 h-5 text-[#f0d68a] mt-0.5" />
                      <a
                        href="mailto:regiaalmacendemoda@gmail.com"
                        className="hover:underline"
                      >
                        regiaalmacendemoda@gmail.com
                      </a>
                    </li>
                    <li className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-[#f0d68a] mt-0.5" />
                      <span>Lun a Sáb — 10:00 a 13:00 / 17:00 a 21:00</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-[#f0d68a] mt-0.5" />
                      <span>
                        Centro de Monteros, Tucumán (consultá ubicación exacta
                        por WhatsApp)
                      </span>
                    </li>
                  </ul>

                  {/* Acciones rápidas */}
                  <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <a
                      href="https://wa.me/5493812472636?text=Hola%20Regia%2C%20quiero%20consultar%20por%20talles%20y%20stock"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold bg-gradient-to-r from-[#f0d68a] to-[#d4af37] text-black hover:scale-[1.02] transition"
                    >
                      <MessageCircle className="w-4 h-4" /> WhatsApp ahora
                    </a>
                    <Link
                      to="/contacto"
                      state={{ scrollTo: 'mapas' }}
                      className="inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold bg-white/10 hover:bg-white/15 ring-1 ring-white/10"
                    >
                      Cómo llegar <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Badges confianza */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="rounded-xl bg-white/5 ring-1 ring-white/10 p-3 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#f0d68a]" />
                  <span>Calidad garantizada</span>
                </div>
                <div className="rounded-xl bg-white/5 ring-1 ring-white/10 p-3 flex items-center gap-2">
                  <Gift className="w-4 h-4 text-[#f0d68a]" />
                  <span>Regalos y tarjetas</span>
                </div>
                <div className="rounded-xl bg-white/5 ring-1 ring-white/10 p-3 flex items-center gap-2">
                  <Percent className="w-4 h-4 text-[#f0d68a]" />
                  <span>Promos vigentes</span>
                </div>
              </div>
            </motion.div>

            {/* Card Promos */}
            <motion.div
              variants={fade}
              className="mt-6 rounded-2xl bg-white/5 ring-1 ring-white/10 p-6"
            >
              <h3 className="text-lg font-semibold">Promociones</h3>
              <ul className="mt-3 text-sm space-y-2 text-white/85">
                <li>15% OFF en primeras compras.</li>
                <li>Llevando 3 o más, te queda $10.000 C/U.</li>
                <li>
                  Cupón{' '}
                  <span className="text-[#f0d68a] font-medium">PROMO2025</span>{' '}
                  — enviá el código por WhatsApp.
                </li>
              </ul>
            </motion.div>
          </motion.div>

          {/* Lado derecho: formulario */}
          <motion.div
            variants={fade}
            initial="hidden"
            animate="show"
            className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-6"
          >
            <h2 className="text-xl font-semibold">Envíanos un mensaje</h2>
            <p className="text-sm text-white/70 mt-1">
              Tiempo de respuesta: dentro del día hábil.
            </p>
            <div className="h-px bg-white/10 my-4" />
            {/* ContactForm debe manejar nombre, email, asunto, mensaje */}
            <ContactForm />
          </motion.div>
        </div>
      </div>

      {/* Strip inferior dorado */}
      <motion.div
        className="h-[2px] bg-gradient-to-r from-[#d4af37] via-[#f0d68a] to-[#d4af37]"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        style={{ transformOrigin: 'right' }}
      />
    </section>
  );
}
