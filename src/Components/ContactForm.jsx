import React, { useMemo, useState } from 'react';
import Swal from 'sweetalert2';
import emailjs from 'emailjs-com';
import { FaWhatsapp } from 'react-icons/fa';

const GOLD_GRADIENT =
  'bg-[linear-gradient(135deg,#f1d08a_0%,#caa042_45%,#a38321_100%)]';

export default function ContactFormRegia({
  whatsappNumber = '+54 9 3812 472636',
  whatsappMessage = 'Hola Regia 👋 Me gustaría hacer una consulta.',
  title = 'Ponete en contacto con Regia'
}) {
  // IDs desde .env (Vite)
  const EMAILJS_SERVICE = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const EMAILJS_TEMPLATE = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const EMAILJS_PUBLIC = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
    company: '' // honeypot
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [startedAt] = useState(Date.now());

  const waHref = useMemo(() => {
    const text = encodeURIComponent(whatsappMessage);
    return `https://wa.me/${whatsappNumber.replace(/[^\d]/g, '')}?text=${text}`;
  }, [whatsappNumber, whatsappMessage]);

  const validate = (f) => {
    const e = {};
    if (!f.name || f.name.trim().length < 2) e.name = 'Ingresá tu nombre.';
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email);
    if (!emailOk) e.email = 'Ingresá un email válido.';
    if (!f.message || f.message.trim().length < 10)
      e.message = 'Contanos tu consulta (mín. 10 caracteres).';
    // Honeypot
    if (f.company) e.company = 'Spam detectado.';
    // Tiempo mínimo en la página (evita bots)
    if (Date.now() - startedAt < 1500) e.time = 'Muy rápido 😉';
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const eMap = validate(form);
    setErrors(eMap);
    if (Object.keys(eMap).length > 0) return;

    setLoading(true);

    // Opcional: usar EmailJS si hay envs
    const useEmailJS = EMAILJS_SERVICE && EMAILJS_TEMPLATE && EMAILJS_PUBLIC;

    try {
      if (useEmailJS) {
        await emailjs.send(
          EMAILJS_SERVICE,
          EMAILJS_TEMPLATE,
          {
            name: form.name,
            email: form.email,
            message: form.message
          },
          EMAILJS_PUBLIC
        );
      } else {
        // Simula éxito (no va a ningún lado por ahora)
        await new Promise((r) => setTimeout(r, 900));
      }

      // SweetAlert2 éxito
      await Swal.fire({
        title: '¡Mensaje enviado!',
        text: 'Gracias por escribirnos. Te vamos a responder a la brevedad por email o WhatsApp.',
        icon: 'success',
        confirmButtonText: 'Listo',
        background: '#0b0b0b',
        color: '#fff',
        confirmButtonColor: '#a38321'
      });

      setForm({ name: '', email: '', message: '', company: '' });
      setErrors({});
    } catch (err) {
      console.error(err);
      await Swal.fire({
        title: 'Ups, algo salió mal',
        text: 'No pudimos enviar el mensaje. Escribinos por WhatsApp y lo resolvemos al toque.',
        icon: 'error',
        confirmButtonText: 'Abrir WhatsApp',
        showCancelButton: true,
        cancelButtonText: 'Cerrar',
        background: '#0b0b0b',
        color: '#fff',
        confirmButtonColor: '#25D366'
      }).then((res) => {
        if (res.isConfirmed) window.open(waHref, '_blank', 'noopener');
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contacto" className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="font-bignoodle text-3xl sm:text-4xl md:text-5xl tracking-tight uppercase">
            <span
              className={`${GOLD_GRADIENT} bg-clip-text text-transparent drop-shadow-[0_1px_10px_rgba(250,215,160,0.14)]`}
            >
              {title}
            </span>
          </h2>
          <p className="mt-2 text-white/70 text-sm">
            Monteros, Tucumán • Atención personalizada
          </p>
        </div>

        {/* Card */}
        <div className="relative rounded-2xl p-[1px] bg-[linear-gradient(135deg,rgba(241,208,138,0.55)_0%,rgba(202,160,66,0.45)_45%,rgba(163,131,33,0.45)_100%)]">
          <div className="rounded-2xl bg-black/50 backdrop-blur-md p-6 sm:p-7">
            <form onSubmit={handleSubmit} noValidate>
              {/* Honeypot */}
              <input
                type="text"
                name="company"
                value={form.company}
                onChange={handleChange}
                className="hidden"
                autoComplete="off"
                tabIndex={-1}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Nombre */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-semibold mb-1"
                  >
                    Nombre
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={handleChange}
                    className={`w-full rounded-xl border bg-black/30 px-3.5 py-3 outline-none placeholder:text-white/40
                      ${
                        errors.name
                          ? 'border-red-400'
                          : 'border-white/15 focus:border-[#a38321]'
                      }`}
                    placeholder="Tu nombre"
                    autoComplete="name"
                    required
                  />
                  {errors.name && (
                    <p className="mt-1 text-xs text-red-300">{errors.name}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold mb-1"
                  >
                    Correo electrónico
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    className={`w-full rounded-xl border bg-black/30 px-3.5 py-3 outline-none placeholder:text-white/40
                      ${
                        errors.email
                          ? 'border-red-400'
                          : 'border-white/15 focus:border-[#a38321]'
                      }`}
                    placeholder="tu@email.com"
                    autoComplete="email"
                    required
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-300">{errors.email}</p>
                  )}
                </div>
              </div>

              {/* Mensaje */}
              <div className="mt-4">
                <label
                  htmlFor="message"
                  className="block text-sm font-semibold mb-1"
                >
                  Mensaje
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  className={`w-full rounded-xl border bg-black/30 px-3.5 py-3 outline-none resize-y
                    ${
                      errors.message
                        ? 'border-red-400'
                        : 'border-white/15 focus:border-[#a38321]'
                    }`}
                  placeholder="Contanos en qué podemos ayudarte"
                  required
                />
                {errors.message && (
                  <p className="mt-1 text-xs text-red-300">{errors.message}</p>
                )}
              </div>

              {/* Botón + WhatsApp */}
              <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  type="submit"
                  disabled={loading}
                  className={`inline-flex justify-center items-center gap-2 rounded-xl px-5 py-3 font-semibold text-black transition
                    ${GOLD_GRADIENT} ${
                    loading
                      ? 'opacity-80 cursor-not-allowed'
                      : 'hover:brightness-110'
                  }`}
                  aria-busy={loading}
                >
                  {loading ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-black/60 border-t-transparent" />
                      Enviando…
                    </>
                  ) : (
                    'Enviar mensaje'
                  )}
                </button>

                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex justify-center items-center gap-2 rounded-xl border border-white/15 px-5 py-3 text-white/90 hover:bg-white/10 transition"
                  aria-label="Escribir por WhatsApp"
                >
                  <FaWhatsapp className="text-lg" />
                  Chatear por WhatsApp
                </a>
              </div>

              {/* Info secundaria */}
              <p className="mt-3 text-xs text-white/50">
                Al enviar aceptás ser contactada/o por nuestros canales.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
