// src/data/dressThumbs.js
// Mapa { "1": "url-a-vestido1.jpeg", "2": "url-a-vestido2.jpeg", ... }
// No descarga las imágenes, solo resuelve las URLs (hash del bundler).
const files = import.meta.glob(
  '../Images/Vestidos/vestido*.{jpg,jpeg,png,webp,avif}',
  { eager: true, as: 'url' }
);

export const DRESS_THUMBS = Object.fromEntries(
  Object.entries(files).map(([path, url]) => {
    const filename = path.split('/').pop(); // "vestido12.jpeg"
    const num = Number(filename.match(/\d+/)?.[0] ?? 0);
    return [String(num), url];
  })
);
