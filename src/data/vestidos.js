// src/data/vestidos.js
// Descubre sin eager (NO carga todo en el bundle inicial)
const modules = import.meta.glob(
  '../Images/Vestidos/vestido*.{jpg,jpeg,png,webp,avif}'
);

const RAW = Object.entries(modules)
  .map(([path, importFn]) => {
    const filename = path.split('/').pop(); // "vestido12.jpeg"
    const num = Number(filename.match(/\d+/)?.[0] ?? 0);
    return { num, filename, importFn };
  })
  .sort((a, b) => a.num - b.num);

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

// Si querés setear nombres/precios puntuales, tocá este array (chiquito).
const OVERRIDES = [
  // { id: 1, name: 'Vestido Satén Negro', price: 19999 },
];

const overridesById = new Map(OVERRIDES.map((o) => [o.id, o]));

export const VESTIDOS = RAW.map(({ num, filename, importFn }, idx) => {
  const id = num || idx + 1;
  const baseName = `Vestido ${String(id).padStart(2, '0')}`;
  const ov = overridesById.get(id) || {};
  const name = ov.name || baseName;
  const price = Object.prototype.hasOwnProperty.call(ov, 'price')
    ? ov.price
    : null;

  return {
    id,
    slug: slugify(`${id}-${name}`),
    name,
    price, // null => “Consultar”
    filename,
    // Loader: devuelve la URL cuando haga falta (import dinámico)
    imageLoader: async () => (await importFn()).default
  };
});
