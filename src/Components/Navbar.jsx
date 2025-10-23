import React, { useEffect, useMemo, useRef, useState, useContext } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X, ChevronDown } from 'lucide-react';
import LogoRg from '../Images/logoRegia.jpg';
import { menuItems } from '../Config/menu';
import { CartContext } from '../Components/CartContext';
import ParticlesBackground from './ParticlesBackground';
/**
 * NavbarGaláctico
 * — Tema: negro/azul galáctico + acentos dorados
 * — UX: centrado en claridad, contraste y accesibilidad
 * — Desktop: menú con submenús tipo popover de vidrio (glass)
 * — Mobile: drawer lateral con overlay + acordeones
 * — Accesibilidad: navegación por teclado, aria-* consistentes
 */
export default function NavbarGaláctico() {
  const { cartItems } = useContext(CartContext);
  const total = useMemo(
    () => cartItems.reduce((a, b) => a + b.quantity, 0),
    [cartItems]
  );

  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openSub, setOpenSub] = useState(null);
  const [prefersReduced, setPrefersReduced] = useState(false);
  const drawerRef = useRef(null);
  const location = useLocation();

  // Cerrar menús al cambiar de ruta
  useEffect(() => {
    setIsOpen(false);
    setOpenSub(null);
  }, [location.pathname]);

  // Respeta prefers-reduced-motion
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReduced(media.matches);
    const onChange = () => setPrefersReduced(media.matches);
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  // Detecta scroll para estilo sticky/blur (inspirado en ejemplo)
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || document.documentElement.scrollTop;
      setScrolled(y > 50);
    };
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Cerrar por Escape
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
        setOpenSub(null);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Bloquear scroll cuando el drawer está abierto (mobile)
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => (document.body.style.overflow = '');
  }, [isOpen]);

  const GOLD = '#F5D36C'; // dorado principal
  const GOLD_SOFT = '#ac8a1e'; // dorado suave

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 text-gray-100 max-w-full mx-auto px-6 border-b ${
        isOpen
          ? 'h-24 bg-black border-white/10'
          : scrolled
          ? 'h-20 bg-black/80 backdrop-blur-md border-white/10 shadow-lg shadow-black/20 transition-all duration-300 ease-in-out'
          : 'h-24 bg-black border-transparent transition-all duration-300 ease-in-out'
      }`}
      aria-label="Navegación principal"
    >
      {/* Partículas con opacidad dinámica */}
      <div className={`transition-opacity duration-300 pointer-events-none`}>
        <ParticlesBackground />
      </div>
      {/* Capa de fondo galáctico */}
      <div className="relative w-full">
        {/* Contenedor */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          {/* GRID: marca | menú | acciones */}
          <div className="grid grid-cols-[auto_1fr_auto] items-center gap-2 md:gap-4 h-20">
            {/* Marca */}
            <div className="flex items-center gap-3 min-w-0">
              <Link to="/" className="shrink-0" aria-label="Inicio">
                <img
                  src={LogoRg}
                  alt="Regia"
                  className="h-9 w-auto rounded-md ring-1 ring-white/10 shadow-sm"
                />
              </Link>

              <Link
                to="/"
                aria-label="Regia - Almacén de Moda"
                className="flex flex-col leading-none select-none min-w-0"
              >
                <span
                  className="font-brand text-[20px] sm:text-[22px] md:text-[24px] font-semibold tracking-[0.02em] uppercase"
                  style={{ color: GOLD }}
                >
                  REGIA
                </span>
                {/* <span
                  className="hidden lg:block font-brand text-[12.5px] tracking-[0.12em] uppercase whitespace-nowrap truncate max-w-[420px]"
                  style={{ color: GOLD_SOFT }}
                  title="ALMACÉN DE MODA · INDUMENTARIA FEMENINA"
                >
                  ALMACÉN DE MODA · INDUMENTARIA FEMENINA
                </span> */}
              </Link>
            </div>

            {/* Menú desktop (estilo ejemplo: centrado + subrayado dinámico) */}
            <div className="hidden xl:flex items-center justify-center">
              <ul
                className={`flex items-center gap-10 transition-all duration-300 ${
                  scrolled ? 'text-xs' : 'text-sm 2xl:text-lg'
                }`}
              >
                {menuItems.map((item) => (
                  <li
                    key={item.id}
                    className="relative group"
                    onMouseEnter={() => setOpenSub(item.id)}
                    onMouseLeave={() => setOpenSub(null)}
                    onBlur={(e) => {
                      // Cierra si el foco se va fuera de este <li> (accesibilidad teclado)
                      if (!e.currentTarget.contains(e.relatedTarget))
                        setOpenSub(null);
                    }}
                  >
                    {item.submenu ? (
                      <>
                        <button
                          className={`uppercase tracking-[0.12em] font-semibold transition-all duration-200 ${
                            scrolled
                              ? 'text-gray-100 drop-shadow-[0_0_8px_rgba(255,255,255,0.35)]'
                              : 'text-gray-200 drop-shadow-[0_0_6px_rgba(200,200,200,0.25)]'
                          } group-hover:-translate-y-[1px] group-hover:tracking-[0.14em]`}
                          style={{ color: GOLD_SOFT }}
                          aria-expanded={openSub === item.id}
                          aria-haspopup="true"
                        >
                          {item.label}
                        </button>

                        {/* Submenú */}
                        {openSub === item.id && (
                          <div
                            className="
      absolute left-0 top-full z-[200] min-w-64
      rounded-xl border border-white/10 ring-1 ring-white/10
      bg-black/95 backdrop-blur-xl shadow-2xl overflow-hidden pointer-events-auto
      before:content-[''] before:absolute before:-top-2 before:left-0 before:h-2 before:w-full
    "
                            // Opcional: si querés máxima tolerancia:
                            onMouseEnter={() => setOpenSub(item.id)}
                            onMouseLeave={() => setOpenSub(null)}
                          >
                            <ul
                              className={`p-2 ${
                                item.submenu.length > 6
                                  ? 'grid grid-cols-2 gap-1'
                                  : ''
                              }`}
                            >
                              {item.submenu.map((sub) => (
                                <li key={sub.id}>
                                  <NavLink
                                    to={sub.href}
                                    className={({ isActive }) =>
                                      [
                                        'block px-3 py-2 rounded-md font-brand uppercase tracking-[0.06em] text-[14.5px] transition',
                                        isActive
                                          ? 'bg-white/5 font-semibold'
                                          : 'hover:bg-white/5'
                                      ].join(' ')
                                    }
                                    style={({ isActive }) => ({
                                      color: isActive ? GOLD : GOLD_SOFT
                                    })}
                                  >
                                    {sub.label}
                                  </NavLink>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </>
                    ) : (
                      <>
                        <NavLink
                          to={item.href}
                          className={({ isActive }) =>
                            [
                              'uppercase tracking-[0.12em] font-semibold transition-all duration-200',
                              scrolled
                                ? 'text-gray-100 drop-shadow-[0_0_8px_rgba(255,255,255,0.35)]'
                                : 'text-gray-200 drop-shadow-[0_0_6px_rgba(200,200,200,0.25)]',
                              'group-hover:-translate-y-[1px] group-hover:tracking-[0.14em]',
                              isActive
                                ? 'opacity-100'
                                : 'opacity-90 hover:opacity-100'
                            ].join(' ')
                          }
                          style={({ isActive }) => ({
                            color: isActive ? GOLD : GOLD_SOFT
                          })}
                        >
                          {item.label}
                        </NavLink>
                        {/* underline effect */}
                        <span className="pointer-events-none absolute -bottom-1 left-0 w-full h-[2px] bg-gray-600/50 rounded-full" />
                        <span
                          className={`pointer-events-none absolute -bottom-1 left-0 h-[2px] w-full rounded-full origin-left scale-x-0 transition-all duration-200 group-hover:scale-x-100 ${
                            scrolled ? 'bg-gray-100' : 'bg-gray-300'
                          }`}
                        />
                      </>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Acciones */}
            <div className="ml-auto flex items-center gap-2 md:gap-3">
              <Link
                to="/cart"
                className="relative inline-flex items-center justify-center gap-2 rounded-xl border px-3 py-2 transition backdrop-blur-sm bg-white/[0.03] hover:bg-white/[0.06] border-white/10 ring-1 ring-white/10"
                aria-label="Ver carrito"
              >
                <ShoppingCart className="h-5 w-5" style={{ color: GOLD }} />
                <span
                  className="hidden sm:inline text-[14.5px] font-brand font-medium uppercase tracking-[0.08em]"
                  style={{ color: GOLD_SOFT }}
                >
                  Carrito
                </span>
                {total > 0 && (
                  <span
                    className="absolute -right-2 -top-2 min-w-[22px] h-[22px] rounded-full text-[11px] font-semibold grid place-items-center shadow-xl"
                    style={{ background: GOLD, color: '#0b1224' }}
                    aria-label={`Tienes ${total} productos en el carrito`}
                  >
                    {total}
                  </span>
                )}
              </Link>

              <button
                className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] ring-1 ring-white/10"
                onClick={() => setIsOpen((s) => !s)}
                aria-label="Abrir menú"
                aria-expanded={isOpen}
                aria-controls="drawer-nav"
              >
                {isOpen ? (
                  <X className="h-5 w-5" style={{ color: GOLD }} />
                ) : (
                  <Menu className="h-5 w-5" style={{ color: GOLD }} />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Drawer Mobile */}
      {/* Overlay */}
      <div
        className={`md:hidden fixed inset-0 z-[70] bg-black/50 backdrop-blur-sm transition-opacity ${
          isOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
        aria-hidden
      />

      {/* Panel */}
      <aside
        id="drawer-nav"
        ref={drawerRef}
        className={`md:hidden fixed top-0 right-0 h-[100dvh] w-[86%] max-w-sm z-[75] transform transition-transform duration-300 ease-out bg-[#0b0f14] backdrop-blur-xl border-l border-white/10 ring-1 ring-white/10 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Menú móvil"
      >
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <img
              src={LogoRg}
              alt="Regia"
              className="h-9 w-auto rounded-md ring-1 ring-white/10"
            />
            <span
              className="font-brand text-lg font-semibold uppercase"
              style={{ color: GOLD }}
            >
              Regia
            </span>
          </div>

          <button
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06]"
            onClick={() => setIsOpen(false)}
            aria-label="Cerrar menú"
          >
            <X className="h-5 w-5" style={{ color: GOLD }} />
          </button>
        </div>

        <div className="p-3">
          <ul className="space-y-1 max-h-[calc(100dvh-140px)] overflow-y-auto pr-1">
            {menuItems.map((item) =>
              item.submenu ? (
                <li
                  key={item.id}
                  className="rounded-lg border border-white/10 bg-white/[0.02]"
                >
                  <details className="group [&_summary::-webkit-details-marker]:hidden">
                    <summary
                      className="flex cursor-pointer items-center justify-between rounded-lg px-3 py-3 text-base font-brand font-medium uppercase tracking-[0.08em]"
                      style={{ color: GOLD }}
                    >
                      {item.label}
                      <ChevronDown
                        className="h-4 w-4 opacity-90 transition-transform group-open:rotate-180"
                        style={{ color: GOLD_SOFT }}
                      />
                    </summary>
                    <ul className="mt-1 space-y-1 border-t border-white/10">
                      {item.submenu.map((sub) => (
                        <li key={sub.id}>
                          <Link
                            to={sub.href}
                            className="block px-3 py-2 text-[15px] font-brand uppercase hover:bg-white/[0.04]"
                            style={{ color: GOLD_SOFT }}
                            onClick={() => setIsOpen(false)}
                          >
                            {sub.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </details>
                </li>
              ) : (
                <li key={item.id}>
                  <Link
                    to={item.href}
                    className="block rounded-lg px-3 py-3 text-base font-brand font-medium uppercase hover:bg-white/[0.04] border border-white/10 bg-white/[0.02]"
                    style={{ color: GOLD_SOFT }}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            )}
          </ul>
        </div>

        {/* CTA inferior */}
        <div className="p-4 border-t border-white/10">
          <Link
            to="/cart"
            onClick={() => setIsOpen(false)}
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl border px-4 py-3 transition bg-white/[0.04] hover:bg-white/[0.08] border-white/10"
          >
            <ShoppingCart className="h-5 w-5" style={{ color: GOLD }} />
            <span
              className="text-sm font-semibold uppercase tracking-[0.1em]"
              style={{ color: GOLD }}
            >
              Ir al carrito {total > 0 ? `(${total})` : ''}
            </span>
          </Link>
        </div>
      </aside>
    </nav>
  );
}
