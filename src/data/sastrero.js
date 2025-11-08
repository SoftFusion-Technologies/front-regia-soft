// src/data/sastrero.js
// Descubre imágenes sin eager
const modules = import.meta.glob(
  '../Images/Sastrero/sastrero*.{jpg,jpeg,png,webp,avif}'
);

export const CATEGORY = 'sastrero'; // namespace del catálogo

// === NUEVO: imports reutilizables ===
import { swatchFromName } from '../utils/colors.js';
import moneyAR from '../utils/money.js';

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
    const filename = path.split('/').pop(); // "sastrero12.jpeg"
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
    name: 'Set KAREN',
    colors: ['Rosa', 'Beige', 'Celeste']
  },
  4: {
    name: 'Set LARA Forrado ',
    colors: ['Negro', 'Beige', 'Verde']
  },
  7: {
    name: 'Set LARA Forrado ',
    colors: ['Negro', 'Beige', 'Verde']
  },
  14: {
    name: 'Blazer ARMANI',
    colors: ['Negro', 'Beige', 'Celeste', 'Blanco', 'Rosa', 'Amarillo'],
    sizes: ['1', '2', '3']
  },
  15: {
    name: 'Chaleco CADILLAC',
    colors: ['Negro', 'Beige', 'Blanco', 'Amarillo'],
    sizes: ['1', '2', '3']
  },
  16: {
    name: 'Chaleco CADILLAC',
    colors: ['Negro', 'Beige', 'Blanco', 'Amarillo'],
    sizes: ['1', '2', '3']
  },
  17: {
    name: 'Set GUCCI',
    colors: ['Celeste', 'Beige', 'Negro', 'Amarillo'],
    sizes: ['1', '2', '3']
  },
  19: {
    name: 'Short Zadic',
    colors: ['Blanco', 'Negro'],
    sizes: ['1', '2', '3', '4']
  },
  20: {
    name: 'Set MIRI Brodery ',
    colors: ['Blanco', 'Negro'],
    sizes: ['Talles M al XL']
  }
};

// === ELIMINADO: normalize, COLOR_HEX, GRADIENT_BG, colorToSwatch ===

function makeGroup(rep, ids) {
  const loaders = ids.map((n) => byNum.get(n)?.importFn).filter(Boolean);
  const baseName = `Sastrero ${String(rep).padStart(2, '0')}`;
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
export const SASTREROS_PRODUCTS = SASTREROS_GROUP.map(groupToUiProduct);
