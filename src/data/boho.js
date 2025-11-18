// src/data/boho.js
// Descubre imágenes sin eager
const modules = import.meta.glob(
  '../Images/Boho/boho*.{jpg,jpeg,png,webp,avif}'
);

export const CATEGORY = 'boho'; // namespace del catálogo

// === NUEVO: imports reutilizables ===
import { swatchFromName } from '../utils/colors.js';
import moneyAR from '../utils/money.js';

// Reglas de colapso
const COLLAPSE_RULES = [
  [1, 3],
  [4, 6],
  [7, 9],
  [10, 14],
  [15, 16],
  [17, 19],
  [20, 22],
  [23, 25],
  [26, 29],
  [30, 35],
  [36, 39]
];

const files = Object.entries(modules)
  .map(([path, importFn]) => {
    const filename = path.split('/').pop(); // "boho12.jpeg"
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

// Clave = id de grupo (el representante del rango)
const DETAILS_OVERRIDES = {
  1: {
    name: 'Set BOHO LALI con aplique',
    // price: 60000,
    colors: ['Negro', 'Chocolate', 'Natural']
    // sizes: ['Talles 34 al 44']
  },
  4: {
    name: 'Set BOHO NANI Strapless Volado , pollera Volados ',
    // price: 60000,
    colors: ['Blanco', 'Natural']
    // sizes: ['Talles 34 al 44']
  },
  7: {
    name: 'Set Boho  LINA Top pico , short Volados ',
    // price: 60000,
    colors: ['Negro', 'Chocolate', 'Blanco']
    // sizes: ['Talles 34 al 44']
  },
  10: {
    name: 'Set BOHO NINA',
    // price: 60000,
    colors: ['Negro', 'Blanco']
    // sizes: ['Talles 34 al 44']
  },
  15: {
    name: 'Vestido Boho MERY',
    // price: 60000,
    colors: ['Negro', 'Chocolate', 'Natural']
    // sizes: ['Talles 34 al 44']
  },
  17: {
    name: 'Vestido Boho Aplique',
    // price: 60000,
    colors: ['Negro', 'Blanco']
    // sizes: ['Talles 34 al 44']
  },
  20: {
    name: 'Set Boho LILI Skort , blusa',
    // price: 60000,
    colors: ['Negro', 'Blanco']
    // sizes: ['Talles 34 al 44']
  },
  23: {
    name: 'Set Boho AMIRA',
    // price: 60000,
    colors: ['Blanco']
    // sizes: ['Talles 34 al 44']
  },
  26: {
    name: 'Vestido Boho LISET',
    // price: 60000,
    colors: ['Chocolate', 'Beige']
    // sizes: ['Talles 34 al 44']
  },
  30: {
    name: 'Vestido Boho IVI ',
    // price: 60000,
    colors: ['Chocolate', 'Natural']
    // sizes: ['Talles 34 al 44']
  },
  36: {
    name: 'Camisa Boho NATY',
    // price: 60000,
    colors: ['Chocolate', 'Blanco']
    // sizes: ['Talles 34 al 44']
  }
};

// === ELIMINADO: normalize, COLOR_HEX, GRADIENT_BG, colorToSwatch ===
function makeGroup(rep, ids) {
  const loaders = ids.map((n) => byNum.get(n)?.importFn).filter(Boolean);
  const baseName = `boho ${String(rep).padStart(2, '0')}`;
  const ov = DETAILS_OVERRIDES[rep] || {};
  const name = ov.name || baseName;
  const slug = slugify(`${rep}-${name}`);
  return {
    id: rep,
    uid: `${CATEGORY}-${rep}`, // único global
    category: CATEGORY, // para resolver data source
    slug,
    name,
    to: `/product/${CATEGORY}/${rep}/${slug}`, // URL namespaced
    price: ov.price ?? null,
    sizes: Array.isArray(ov.sizes) ? ov.sizes : null,
    colors: Array.isArray(ov.colors) ? ov.colors.map(swatchFromName) : null, // 👈 usa util
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
export const BOHO_GROUP = groups;

export const getGroupById = (id) => BOHO_GROUP.find((g) => g.id === Number(id));

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
    price: g.price == null ? 'Consultar' : moneyAR(g.price), // usa util
    priceRaw: g.price ?? null,
    // para grillas y tarjetas lazy:
    imageLoader: () => loadPrimaryImage(g),
    // para detalle:
    galleryLoader: () => loadAllImages(g),
    variants: {
      colors: g.colors, // [{name,hex,bg?}] o null
      sizes: g.sizes
    }
  };
}

// Colección lista para pintar en grillas (FeaturedProducts, etc.)
export const BOHO_PRODUCTS = BOHO_GROUP.map(groupToUiProduct);
