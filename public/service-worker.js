import { precacheAndRoute } from 'workbox-precaching';

// Definimos los archivos que deben ser precacheados
precacheAndRoute([
  { url: '/', revision: null }, // Usa null para indicar que no hay versión específica
  { url: '/index.html', revision: null },
  { url: '/style.css', revision: null },
  { url: '/app.js', revision: null },
  { url: '/sonidos/', revision: null }, // Aquí debes indicar el recurso correcto
  // Si tienes más recursos estáticos, añádelos aquí
]);

// Si deseas manejar la caché de otros recursos, puedes agregar lógica personalizada
self.addEventListener('fetch', event => {
  // Puedes manejar otros tipos de peticiones aquí si es necesario
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});