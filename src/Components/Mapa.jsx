import React from 'react';

export default function MapaRegiaDark({ height = 420, className = '' }) {
  // Coordenadas de Regia (de tu link)
  const lat = -27.1694629;
  const lng = -65.4998665;

  // Embed sin pb gigante; no requiere API key
  const src = `https://www.google.com/maps?q=${lat},${lng}&z=16&output=embed`;

  const mapsLink =
    'https://www.google.com/maps/place/Regia/@-27.1694629,-65.4998665,17z';

  return (
    <section id="ubicacion" className={`relative w-full ${className}`}>
      {/* Marco dorado suave */}
      <div className="relative rounded-2xl p-[1px] bg-[linear-gradient(135deg,rgba(241,208,138,0.45)_0%,rgba(202,160,66,0.35)_45%,rgba(163,131,33,0.35)_100%)]">
        <div className="relative rounded-2xl overflow-hidden bg-black">
          {/* Iframe con filtro dark */}
          <div className="relative" style={{ height }}>
            <iframe
              title="Ubicación Regia"
              src={src}
              className="absolute inset-0 w-full h-full"
              style={{
                border: 0,
                // Filtro dark moderno, readable labels
                filter:
                  'grayscale(25%) invert(92%) hue-rotate(180deg) brightness(90%) contrast(90%)'
              }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>

          {/* Overlay sutil para contraste */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(80% 60% at 50% 20%, rgba(0,0,0,0.25), rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.65) 80%)'
            }}
          />

          {/* CTA: abrir en Google Maps */}
          <div className="absolute left-3 bottom-3 z-10">
            <a
              href={mapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-black/60 px-3.5 py-2 text-sm text-white/90 hover:bg-white/10"
            >
              Abrir en Google Maps
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
