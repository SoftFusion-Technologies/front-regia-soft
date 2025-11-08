// src/data/vestidos.js
// Descubre imágenes sin eager
const modules = import.meta.glob(
  '../Images/Vestidos/vestido*.{jpg,jpeg,png,webp,avif}'
);
import { swatchFromName } from '../utils/colors';
import moneyAR from '../utils/money.js';
export const CATEGORY = 'vestidos'; // namespace del catálogo

// Reglas de colapso
const COLLAPSE_RULES = [
  [1, 5],
  [6, 8],
  [9, 11],
  [12, 14],
  [15, 17],
  [18, 21],
  [22, 24],
  [25, 28],
  [29, 32],
  [33, 36],
  [37, 39],
  [40, 42],
  [43, 46],
  [47, 49],
  [50, 52],
  [53, 57],
  [58, 61],
  [62, 64],
  [65, 65],
  [66, 67],
  [68, 69],
  [70, 71],
  [72, 73],
  [74, 76],
  [77, 78],
  [79, 79],
  [80, 83],
  [84, 87],
  [88, 90],
  [91, 93],
  [94, 96],
  [97, 100]
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

// ---- Overrides de catálogo (editable por vos / tu clienta) ----
// Clave = id de grupo (el representante del rango)
const DETAILS_OVERRIDES = {
  1: {
    // 1..5 -> grupo 1
    name: 'Vestido Lola',
    price: 44000,
    colors: ['Negro', 'Fucsia'],
    sizes: ['Único']
    // sizes: [] // si luego te pasan talles, agregalos
  },
  6: {
    // 6..8 -> grupo 6
    name: 'Vestido BECCA',
    price: 44000,
    // sizes: [] // si luego te pasan talles, agregalos
    colors: ['Petróleo', 'Chocolate'],
    sizes: ['Único']
  },
  9: {
    // 9.. -> grupo 9
    name: 'Vestido Lara Aplique',
    price: 19900,
    // sizes: [] // si luego te pasan talles, agregalos
    colors: ['Negro', 'Chocolate'],
    sizes: ['Único']
  },
  12: {
    name: 'Vestido GlorY',
    price: 36900,
    colors: ['Negro', 'Rosa'],
    sizes: ['Único']
  },
  15: {
    name: 'Set Emy Aplique',
    price: 36000,
    colors: ['Negro'],
    sizes: ['Único']
  },
  18: {
    name: 'Vestido Shine',
    price: 50000,
    colors: ['Negro', 'Oro', 'Negro con plata'],
    sizes: ['Único']
  },
  22: {
    name: 'Vestido CHECH',
    price: 60000,
    colors: ['Negro', 'Dorado'],
    sizes: ['Único']
  },
  25: {
    name: 'Strapless LIZZ',
    price: 24900,
    colors: ['Beige'],
    sizes: ['Único']
  },
  29: {
    // 9.. -> grupo 9
    name: 'Vestido ELISKA',
    price: 66000,
    sizes: ['1', '2', '3'],
    colors: ['Negro', 'Negro con oro', 'Negro con plata']
  },
  33: {
    // 9.. -> grupo 9
    name: 'Set KALEN',
    price: 59900,
    colors: ['Único'],
    sizes: ['Único']
  },
  37: {
    // 9.. -> grupo 9
    name: 'Vestido sublimado  Microtul',
    price: 30000,
    colors: ['azul con chocolate'],
    sizes: ['Único']
  },
  40: {
    // 9.. -> grupo 9
    name: 'Vestido IVANNA',
    price: 50000,
    colors: ['Negro'],
    sizes: ['Único']
  },
  43: {
    // 1..5 -> grupo 1
    name: 'Vestido Lola',
    price: 44000,
    colors: ['Negro', 'Fucsia'],
    sizes: ['Único']

    // sizes: [] // si luego te pasan talles, agregalos
  },
  47: {
    // 1..5 -> grupo 1
    name: 'Vestido Aplique LILI',
    price: 37900,
    colors: ['Negro', 'Petróleo'],
    sizes: ['Único']

    // sizes: [] // si luego te pasan talles, agregalos
  },
  50: {
    // 9.. -> grupo 9
    name: 'Vestido Elisa',
    price: 38000,
    colors: ['Negro'],
    sizes: ['Único']
  },
  53: {
    // 9.. -> grupo 9
    name: 'Vestido AMI',
    price: 38000,
    colors: ['Negro', 'Amarillo'],
    sizes: ['Único']
  },
  58: {
    // 9.. -> grupo 9
    name: 'Vestido CANDY',
    price: 28000,
    colors: ['Negro'],
    sizes: ['Único']
  },
  62: {
    // 9.. -> grupo 9
    name: 'Vestido Katy',
    price: 27900,
    colors: ['Negro', 'Negro con oro', 'Negro con plata'],
    sizes: ['Único']
  },
  65: {
    // 9.. -> grupo 9
    name: 'Vestido SIRENA',
    price: 33000,
    colors: ['Negro'],
    sizes: ['Único']
  },
  66: {
    // 9.. -> grupo 9
    name: 'Vestido LINA',
    price: 22000,
    colors: ['Azul'],
    sizes: ['Único']
  },
  68: {
    // 9.. -> grupo 9
    name: 'Vestido ANNA',
    price: 36000,
    colors: ['Negro'],
    sizes: ['Único']
  },
  70: {
    // 9.. -> grupo 9
    name: 'Vestido ALOHA',
    price: 28000,
    colors: ['Rosa', 'Celeste'],
    sizes: ['Único']
  },
  72: {
    // 9.. -> grupo 9
    name: 'Vestido ADA',
    price: 25000,
    colors: ['Negro', 'Celeste'],
    sizes: ['Único']
  },
  74: {
    // 9.. -> grupo 9
    name: 'Vestido MOLLY',
    price: 17000,
    colors: ['Amarillo', 'Petróleo', 'Negro'],
    sizes: ['Único']
  },
  77: {
    // 9.. -> grupo 9
    name: 'Vestido EMY',
    price: 17000,
    colors: ['Celeste', 'Negro'],
    sizes: ['Único']
  },
  80: {
    // 9.. -> grupo 9
    name: 'Mono ALISON',
    price: 65000,
    sizes: ['Único'],
    colors: ['Negro con plata']
  },
  84: {
    // 9.. -> grupo 9
    name: 'Vestido EUGE',
    price: 45000,
    colors: ['Azul'],
    sizes: ['Único']
  },
  88: {
    // 9.. -> grupo 9
    name: 'Vestido MIRI',
    price: 55000,
    colors: ['Azul', 'Negro'],
    sizes: ['Único']
  },
  91: {
    // 9.. -> grupo 9
    name: 'Vestido ZOE',
    price: 55000,
    colors: ['Negro'],
    sizes: ['Único']
  },
  94: {
    // 9.. -> grupo 9
    name: 'Vestido PAULI',
    price: 44000,
    colors: ['Negro'],
    sizes: ['Único']
  },
  97: {
    // 9.. -> grupo 9
    name: 'Vestido KAROL',
    price: 44000,
    colors: ['Negro', 'Azul'],
    sizes: ['Único']
  }
};

function makeGroup(rep, ids) {
  const loaders = ids.map((n) => byNum.get(n)?.importFn).filter(Boolean);
  const baseName = `Vestido ${String(rep).padStart(2, '0')}`;
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
    colors: Array.isArray(ov.colors) ? ov.colors.map(swatchFromName) : null,
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
export const VESTIDOS_GROUPS = groups;

export const getGroupById = (id) =>
  VESTIDOS_GROUPS.find((g) => g.id === Number(id));

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
export const VESTIDOS_PRODUCTS = VESTIDOS_GROUPS.map(groupToUiProduct);