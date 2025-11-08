// src/data/sastrero.js
// Descubre imágenes sin eager
const modules = import.meta.glob(
  '../Images/Sastrero/sastrero*.{jpg,jpeg,png,webp,avif}'
);

export const CATEGORY = 'sastrero'; // namespace del catálogo

// Reglas de colapso
const COLLAPSE_RULES = [
  [1, 3],
  [4, 6],
  [7, 9],
  [10, 11],
  [12, 13],
  [14, 15],
  [17, 18],
  [20, 21]
];

const files = Object.entries(modules)
  .map(([path, importFn]) => {
    const filename = path.split('/').pop(); // "vestido12.jpeg"
    const num = Number(filename.match(/\d+/)?.[0] ?? 0);
    return { num, filename, importFn };
  })
  .filter((f) => f.num > 0)
  .sort((a, b) => a.num - b.num);

const byNum = new Map(files.map((f) => [f.num, f]));
const used = new Set();

function slugify(text) {
  return String(text)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export const moneyAR = (n) =>
  n == null
    ? null
    : new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS'
      }).format(Number(n) || 0);

// Clave = id de grupo (el representante del rango)
const DETAILS_OVERRIDES = {
  1: {
    // 1..5 -> grupo 1
    name: 'Set KAREN',
    //price: 44000,
    colors: ['Rosa', 'Beige', 'Celeste']
    // sizes: ['Único']
    // sizes: [] // si luego te pasan talles, agregalos
  },
  4: {
    // 1..5 -> grupo 1
    name: 'Set LARA Forrado ',
    //price: 44000,
    colors: ['Negro', 'Beige', 'Verde']
    // sizes: ['Único']
    // sizes: [] // si luego te pasan talles, agregalos
  },
  14: {
    // 1..5 -> grupo 1
    name: 'Blazer ARMANI',
    //price: 44000,
    colors: ['Negro', 'Beige', 'Celeste', 'Blanco', 'Rosa', 'Amarillo'],
    sizes: ['1', '2', '3']
    // sizes: [] // si luego te pasan talles, agregalos
  },
  15: {
    // 1..5 -> grupo 1
    name: 'Chaleco CADILLAC',
    //price: 44000,
    colors: ['Negro', 'Beige', 'Blanco', 'Amarillo'],
    sizes: ['1', '2', '3']
    // sizes: [] // si luego te pasan talles, agregalos
  },
  16: {
    // 1..5 -> grupo 1
    name: 'Chaleco CADILLAC',
    //price: 44000,
    colors: ['Negro', 'Beige', 'Blanco', 'Amarillo'],
    sizes: ['1', '2', '3']
    // sizes: [] // si luego te pasan talles, agregalos
  },
  17: {
    // 1..5 -> grupo 1
    name: 'Set GUCCI',
    //price: 44000,
    colors: ['Celeste', 'Beige', 'Negro', 'Amarillo'],
    sizes: ['1', '2', '3']
    // sizes: [] // si luego te pasan talles, agregalos
  },
  19: {
    // 1..5 -> grupo 1
    name: 'Short Zadic',
    //price: 44000,
    colors: ['Blanco', 'Negro'],
    sizes: ['1', '2', '3', '4']
    // sizes: [] // si luego te pasan talles, agregalos
  },
  20: {
    // 1..5 -> grupo 1
    name: 'Set MIRI Brodery ',
    //price: 44000,
    colors: ['Blanco', 'Negro'],
    sizes: ['Talles M al XL']
    // sizes: [] // si luego te pasan talles, agregalos
  }
};

// Paleta para puntito de color (heurística simpática)
const normalize = (s = '') =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // quita acentos
    .replace(/\s+/g, ' ')
    .trim();

// 🎨 Paleta con claves NORMALIZADAS
const COLOR_HEX = {
  negro: '#000000',
  blanco: '#ffffff',
  fucsia: '#d81b60', // alias abajo
  fucia: '#d81b60',

  petroleo: '#1e4b5b', // ✅ Petróleo
  chocolate: '#4e342e', // ✅ Chocolate

  'negro con oro': '#d4af37', // fallback cuando no usemos gradiente
  'negro con plata': '#c0c0c0',
  oro: '#d4af37',
  plata: '#c0c0c0',
  rosa: '#ff69b4',
  dorado: '#d4af37',
  beige: '#D7C4A3',
  azul: '#1565c0', // ✅ Azul
  'azul con chocolate': '#1565c0', // ✅ fallback cuando no usemos gradiente
  celeste: '#74ACDF',
  unico: '#9e9e9e', // ✅ “Único” (neutro)
  único: '#9e9e9e', // (con tilde, por si te pasan así el texto)
  amarillo: '#FFEB3B',
  verde: '#2e7d32'
};

// 🌗 Gradientes para combos (opcional)
const GRADIENT_BG = {
  'negro con oro': 'linear-gradient(45deg,#111 50%,#d4af37 50%)',
  'negro con plata': 'linear-gradient(45deg,#111 50%,#c0c0c0 50%)'
};

function colorToSwatch(name = '') {
  const key = normalize(name); // <-- ahora “Petróleo” => “petroleo”
  const bg = GRADIENT_BG[key] || null;
  const hex = COLOR_HEX[key] || '#999999'; // si no existe, gris
  // devolvemos bg si hay combo; el hex queda como fallback
  return bg ? { name, hex, bg } : { name, hex };
}

function makeGroup(rep, ids) {
  const loaders = ids.map((n) => byNum.get(n)?.importFn).filter(Boolean);
  const baseName = `Sastrero ${String(rep).padStart(2, '0')}`;
  const ov = DETAILS_OVERRIDES[rep] || {};
  const name = ov.name || baseName;
  const slug = slugify(`${rep}-${name}`);
  return {
    id: rep,
    uid: `${CATEGORY}-${rep}`, // 👈 único global
    category: CATEGORY, // 👈 para resolver data source
    slug,
    name,
    to: `/product/${CATEGORY}/${rep}/${slug}`, // 👈 URL namespaced
    price: ov.price ?? null,
    sizes: Array.isArray(ov.sizes) ? ov.sizes : null,
    colors: Array.isArray(ov.colors) ? ov.colors.map(colorToSwatch) : null,
    primaryLoader: loaders[0],
    loaders
  };
}
const groups = [];
// 1) Colapsa según reglas
for (const [start, end] of COLLAPSE_RULES) {
  const ids = [];
  for (let n = start; n <= end; n++) {
    if (byNum.has(n)) {
      ids.push(n);
      used.add(n);
    }
  }
  if (ids.length) groups.push(makeGroup(ids[0], ids));
}
// 2) El resto (no incluidos) como grupo individual
for (const f of files) {
  if (!used.has(f.num)) groups.push(makeGroup(f.num, [f.num]));
}
groups.sort((a, b) => a.id - b.id);

// --------- Helpers de carga de imágenes ----------
export const SASTREROS_GROUP = groups;

export const getGroupById = (id) =>
  SASTREROS_GROUP.find((g) => g.id === Number(id));

export async function loadPrimaryImage(group) {
  const m = await group.primaryLoader();
  return m.default;
}
export async function loadAllImages(group) {
  const arr = await Promise.all(
    group.loaders.map((fn) => fn().then((m) => m.default))
  );
  return arr;
}

// --------- Adaptador a “producto UI” (para grillas) ----------
export function groupToUiProduct(g) {
  return {
    id: g.id,
    slug: g.slug,
    title: g.name,
    price: g.price == null ? 'Consultar' : moneyAR(g.price),
    priceRaw: g.price ?? null,
    // para grillas y tarjetas lazy:
    imageLoader: () => loadPrimaryImage(g),
    // para detalle:
    galleryLoader: () => loadAllImages(g),
    // variantes (si no hay override, podés usar tus defaults en el detalle)
    variants: {
      colors: g.colors, // [{name,hex}] o null
      sizes: g.sizes // ['S','M','L'] o ['1','2','3'] o null
    }
  };
}

// Colección lista para pintar en grillas (FeaturedProducts, etc.)
export const SASTREROS_PRODUCTS = SASTREROS_GROUP.map(groupToUiProduct);
