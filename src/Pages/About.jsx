import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin,
  Clock,
  Phone,
  Sparkles,
  ShieldCheck,
  ShoppingBag,
  ArrowRight,
  MessageCircle
} from 'lucide-react';

/**
 * About — Regia Almacén de Moda (Monteros, Tucumán)
 * + Animaciones: entrada, scroll-reveal, hover y acentos brillantes
 */
export default function AboutRegia() {
  const navigate = useNavigate();
  const goToContacto = () =>
    navigate('/contacto', { state: { scrollTo: 'mapas' } });

  // Variants de animación reutilizables
  const fadeUp = {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } }
  };

  const stagger = {
    hidden: { opacity: 1 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.05 }
    }
  };

  const hoverCard = {
    rest: { y: 0, boxShadow: '0 0 0 rgba(0,0,0,0)' },
    hover: {
      y: -4,
      boxShadow: '0 20px 40px rgba(0,0,0,0.25)',
      transition: { type: 'spring', stiffness: 260, damping: 20 }
    }
  };

  const glowPulse = {
    initial: { opacity: 0.4 },
    animate: {
      opacity: [0.4, 0.9, 0.4],
      transition: { duration: 2.6, repeat: Infinity, ease: 'easeInOut' }
    }
  };

  return (
    <section className="mt-20 relative bg-[#0a0a0a] text-white overflow-hidden">
      {/* Partículas doradas sutiles */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -top-24 -left-24 w-[420px] h-[420px] rounded-full blur-3xl"
        style={{
          background:
            'radial-gradient(closest-side, rgba(240,214,138,0.25), transparent)'
        }}
        {...glowPulse}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 -right-24 w-[420px] h-[420px] rounded-full blur-3xl"
        style={{
          background:
            'radial-gradient(closest-side, rgba(212,175,55,0.2), transparent)'
        }}
        {...glowPulse}
        transition={{ ...glowPulse.transition, delay: 0.8 }}
      />

      {/* Top strip dorado animado */}
      <motion.div
        className="h-[3px] bg-gradient-to-r from-[#d4af37] via-[#f0d68a] to-[#d4af37]"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        style={{ transformOrigin: 'left' }}
      />

      {/* Hero */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-10 pb-8">
        <motion.div variants={fadeUp} initial="hidden" animate="show">
          <h1 className="text-center font-semibold tracking-tight text-4xl sm:text-5xl">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#f0d68a] to-[#d4af37]">
              Regia
            </span>{' '}
            <span className="text-white/90">— Almacén de Moda</span>
          </h1>
          <motion.p
            className="mt-3 text-center text-white/70 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Estilo contemporáneo con alma clásica. Prendas seleccionadas para
            resaltar tu mejor versión.
          </motion.p>
        </motion.div>

        {/* Hero badges (stagger) */}
        <motion.div
          className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-20%' }}
        >
          {[
            {
              icon: <ShoppingBag className="w-5 h-5 text-[#f0d68a]" />,
              title: 'Curaduría premium',
              desc: 'Colecciones limitadas y atemporales.'
            },
            {
              icon: <ShieldCheck className="w-5 h-5 text-[#f0d68a]" />,
              title: 'Calidad garantizada',
              desc: 'Materiales nobles, terminaciones superiores.'
            },
            {
              icon: <Sparkles className="w-5 h-5 text-[#f0d68a]" />,
              title: 'Asesoramiento',
              desc: 'Atención personalizada en Monteros.'
            }
          ].map((b, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              whileHover="hover"
              initial="rest"
              animate="rest"
              className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-4"
              variants2={hoverCard}
              onMouseEnter={(e) => e.currentTarget.classList.add('shadow-gold')}
              onMouseLeave={(e) =>
                e.currentTarget.classList.remove('shadow-gold')
              }
            >
              <div className="flex items-start gap-3">
                {b.icon}
                <div>
                  <p className="font-medium">{b.title}</p>
                  <p className="text-sm text-white/70">{b.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Contenido principal */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Sobre Regia */}
          <motion.div
            className="lg:col-span-3"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-15%' }}
          >
            <div className="relative rounded-2xl ring-1 ring-white/10 bg-gradient-to-b from-black/60 to-black/30 p-6 overflow-hidden">
              {/* brillo diagonal */}
              <motion.span
                aria-hidden
                className="pointer-events-none absolute -inset-x-20 -top-1 h-20 rotate-2"
                style={{
                  background:
                    'linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)'
                }}
                initial={{ x: '-40%', opacity: 0 }}
                whileInView={{ x: '40%', opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.6, ease: 'easeOut' }}
              />

              <h2 className="text-2xl font-semibold">Quiénes somos</h2>
              <p className="mt-3 text-white/80 leading-relaxed">
                Bienvenidos a{' '}
                <span className="text-[#f0d68a] font-medium">Regia</span>, tu{' '}
                <em>Almacén de Moda</em> en Monteros, Tucumán. Somos una casa de
                estilo enfocada en prendas de calidad, cortes impecables y
                detalles que elevan cualquier look. Creemos en la elegancia
                cotidiana: piezas versátiles, combinables y con identidad.
              </p>

              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                {[
                  {
                    t: 'Misión',
                    d: 'Acercar moda de calidad con una experiencia cálida y curada, ayudándote a expresar tu estilo personal con confianza.'
                  },
                  {
                    t: 'Visión',
                    d: 'Ser el referente de moda en la región, combinando tendencias y atemporalidad con un sello propio: dorado y negro.'
                  }
                ].map((it, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ y: -3 }}
                    transition={{ type: 'spring', stiffness: 220, damping: 18 }}
                    className="rounded-xl bg-black/40 ring-1 ring-white/10 p-4"
                  >
                    <p className="font-medium mb-1">{it.t}</p>
                    <p className="text-white/80">{it.d}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Datos prácticos / CTA */}
          <motion.div
            className="lg:col-span-2"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-15%' }}
          >
            <div className="rounded-2xl ring-1 ring-white/10 bg-white/5 p-6">
              <h3 className="text-xl font-semibold">Monteros, Tucumán</h3>
              <ul className="mt-3 space-y-3 text-sm">
                <motion.li className="flex items-start gap-3" variants={fadeUp}>
                  <MapPin className="w-5 h-5 text-[#f0d68a] shrink-0 mt-0.5" />
                  <span>
                    Estamos en el centro de Monteros. Te esperamos con asesoría
                    personalizada.
                  </span>
                </motion.li>
                <motion.li className="flex items-start gap-3" variants={fadeUp}>
                  <Clock className="w-5 h-5 text-[#f0d68a] shrink-0 mt-0.5" />
                  <span>
                    Horarios: Lun a Sáb — 10:00 a 13:00 / 17:00 a 21:00
                  </span>
                </motion.li>
                <motion.li className="flex items-start gap-3" variants={fadeUp}>
                  <Phone className="w-5 h-5 text-[#f0d68a] shrink-0 mt-0.5" />
                  <span>
                    Consultas y reservas:{' '}
                    <span className="text-white/90">WhatsApp</span>
                  </span>
                </motion.li>
              </ul>

              <motion.div
                className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3"
                variants={stagger}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
              >
                <motion.button
                  onClick={goToContacto}
                  className="inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold bg-gradient-to-r from-[#f0d68a] to-[#d4af37] text-black hover:scale-[1.02] transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f0d68a]"
                  variants={fadeUp}
                  whileTap={{ scale: 0.98 }}
                >
                  Cómo llegar
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
                <motion.a
                  href="https://wa.me/5490000000000" // TODO: reemplazar por número real
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold bg-white/10 hover:bg-white/15 ring-1 ring-white/10 transition"
                  variants={fadeUp}
                  whileTap={{ scale: 0.98 }}
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp
                </motion.a>
              </motion.div>

              <motion.p
                className="mt-3 text-[12px] text-white/60"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                *Los horarios pueden variar en feriados. Consultanos por DM o
                WhatsApp.
              </motion.p>
            </div>
          </motion.div>
        </div>

        {/* Valores diferenciales */}
        <motion.div
          className="mt-10 rounded-2xl ring-1 ring-white/10 bg-black/40 p-6"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <h3 className="text-xl font-semibold">Nuestro sello</h3>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            {[
              'Selección limitada',
              'Atención 1 a 1',
              'Calidad que perdura'
            ].map((t, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -4, scale: 1.01 }}
                transition={{ type: 'spring', stiffness: 220, damping: 18 }}
                className="group relative rounded-xl bg-white/5 ring-1 ring-white/10 p-4 overflow-hidden"
              >
                {/* shimmer */}
                <motion.span
                  aria-hidden
                  className="absolute -inset-x-10 -top-1 h-10 rotate-2 opacity-0 group-hover:opacity-100"
                  style={{
                    background:
                      'linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)'
                  }}
                  transition={{ duration: 0.6 }}
                />
                <p className="font-medium">{t}</p>
                <p className="text-white/80 mt-1">
                  {idx === 0 &&
                    'Piezas curadas por temporada: comprás menos, combinás más.'}
                  {idx === 1 &&
                    'Asesoría de looks, talles y colores para cada ocasión.'}
                  {idx === 2 &&
                    'Materiales nobles, confección cuidada y terminaciones superiores.'}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Footer strip dorado */}
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
