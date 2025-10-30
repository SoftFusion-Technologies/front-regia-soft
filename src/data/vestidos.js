// src/data/vestidos.js
// Descubre imágenes sin eager
const modules = import.meta.glob(
  '../Images/Vestidos/vestido*.{jpg,jpeg,png,webp,avif}'
);

// Reglas de colapso: [inicio, fin] inclusivos
// 👇 podés agregar más rangos si tu clienta detecta otros duplicados
const COLLAPSE_RULES = [
  [1, 5], // 1..5 => se muestra como "Vestido 1"
  [6, 8], // 6..8 => se muestra como "Vestido 6"
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
  [79, 79]
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

function makeGroup(rep, ids) {
  const loaders = ids.map((n) => byNum.get(n).importFn);
  const name = `Vestido ${String(rep).padStart(2, '0')}`;
  const slug = slugify(`${rep}-${name}`);
  return {
    id: rep,
    ids,
    name,
    slug,
    price: null, // null => “Consultar”
    primaryLoader: loaders[0], // imagen para tarjetas/listado
    loaders // todas las imágenes del grupo (para detalle)
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

// 2) El resto (no incluidos en reglas) quedan como grupo individual
for (const f of files) {
  if (!used.has(f.num)) groups.push(makeGroup(f.num, [f.num]));
}

groups.sort((a, b) => a.id - b.id);

export const VESTIDOS_GROUPS = groups;

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

export const getGroupById = (id) =>
  VESTIDOS_GROUPS.find((g) => g.id === Number(id));

export const moneyAR = (n) =>
  n == null
    ? null
    : new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS'
      }).format(Number(n) || 0);
