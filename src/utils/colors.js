
// Normaliza claves de color: minúsculas, sin acentos, espacios compactados
export const normalizeColorKey = (s = '') =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

// 🎨 Paleta con claves NORMALIZADAS
export const COLOR_HEX = {
  negro: '#000000',
  blanco: '#ffffff',
  fucsia: '#d81b60',
  fucia: '#d81b60', // alias

  petroleo: '#1e4b5b',
  chocolate: '#4e342e',

  'negro con oro': '#d4af37', // fallback cuando no usemos gradiente
  'negro con plata': '#c0c0c0',
  oro: '#d4af37',
  plata: '#c0c0c0',
  rosa: '#ff69b4',
  dorado: '#d4af37',
  beige: '#D7C4A3',
  azul: '#1565c0',
  'azul con chocolate': '#1565c0', // fallback
  celeste: '#74ACDF',
  verde: '#2e7d32', // ✅ agregado
  unico: '#9e9e9e',
  único: '#9e9e9e',
  amarillo: '#FFEB3B'
};

// 🌗 Gradientes para combos (claves NORMALIZADAS)
export const GRADIENT_BG = {
  'negro con oro': 'linear-gradient(45deg,#111 50%,#d4af37 50%)',
  'negro con plata': 'linear-gradient(45deg,#111 50%,#c0c0c0 50%)',
  'azul con chocolate': 'linear-gradient(45deg,#1565c0 50%,#4e342e 50%)'
};

// Devuelve un swatch desde el nombre (usa gradiente si hay, hex como fallback)
export function swatchFromName(name = '') {
  const key = normalizeColorKey(name);
  const bg = GRADIENT_BG[key] || null;
  const hex = COLOR_HEX[key] || '#999999';
  return bg ? { name, hex, bg } : { name, hex };
}

// Por si querés usar la función concreta de gradiente en algún lado
export function gradientForComboName(name = '') {
  const key = normalizeColorKey(name);
  return GRADIENT_BG[key] || null;
}
