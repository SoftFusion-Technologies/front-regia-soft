// src/data/vestidos.js
// Descubre automáticamente todas las imágenes vestido*.{jpg,jpeg,png,webp,avif}
const images = import.meta.glob(
  '../Images/Vestidos/vestido*.{jpg,jpeg,png,webp,avif}',
  {
    eager: true,
    import: 'default'
  }
);

// Convierte el diccionario en array ordenado por número (vestido12.jpeg => 12)
const RAW = Object.entries(images)
  .map(([path, url]) => {
    const filename = path.split('/').pop(); // "vestido12.jpeg"
    const numMatch = filename.match(/\d+/); // ["12"]
    const num = numMatch ? Number(numMatch[0]) : 0;
    return { num, filename, image: url };
  })
  .sort((a, b) => a.num - b.num);

// Opcional: overrides mínimos para algunos items (nombre, precio, tags, etc.)
const OVERRIDES = [
  // { id: 1, name: 'Vestido Satén Negro', price: 19999, tags: ['fiesta','satén'] },
  // { id: 7, price: 25999 },
];
const overridesById = new Map(OVERRIDES.map((o) => [o.id, o]));

// Utils
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

// Export principal: VESTIDOS
export const VESTIDOS = RAW.map((it, idx) => {
  const id = it.num || idx + 1;
  const baseName = `Vestido ${String(id).padStart(2, '0')}`;
  const o = overridesById.get(id) || {};
  const name = o.name || baseName;
  const price = Object.prototype.hasOwnProperty.call(o, 'price')
    ? o.price
    : null; // null = “Consultar”
  const tags = o.tags || [];
  const slug = slugify(`${id}-${name}`);
  return {
    id,
    slug,
    name,
    price,
    tags,
    filename: it.filename,
    image: it.image
  };
});

export const getById = (id) => VESTIDOS.find((x) => x.id === id);
export const getBySlug = (slug) => VESTIDOS.find((x) => x.slug === slug);
