if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then(registration => {
                console.log('Service Worker registrado con éxito:', registration);
            })
            .catch(error => {
                console.log('Error al registrar el Service Worker:', error);
            });
    });
}

document.addEventListener("DOMContentLoaded", () => {
    // Cargar el archivo JSON con la lista de sonidos e imágenes
    fetch('/assets.json')
      .then(response => response.json())
      .then(data => {
        const list = document.getElementById('list');
        list.innerHTML = ''; // Limpiar la lista existente
  
        data.forEach(({ sound, image }) => {
          const filePath = `/sonidos/${sound}`;  // Ruta del sonido
          const imagePath = `/sonidos/images/${image}`;  // Ruta de la imagen
  
          // Crear un contenedor para cada sonido
          const item = document.createElement('div');
          item.className = 'item';
          item.setAttribute('title', filePath);
  
          // Crear la imagen si existe
          if (image) {
            const img = document.createElement('img');
            img.className = 'audio-icon';
            img.src = imagePath;
            img.alt = 'Audio Image';
            item.appendChild(img);
          }
  
          // Mostrar el nombre del archivo de sonido
          const displayName = sound.split('.')[0];  // Mostrar nombre sin extensión
          const textNode = document.createTextNode(displayName);
          item.appendChild(textNode);
  
          // Agregar el evento para reproducir el sonido cuando se hace clic
          item.addEventListener('click', () => {
            const audio = new Audio(filePath);
            audio.play();
          });
  
          // Agregar el item a la lista
          list.appendChild(item);
        });
      })
      .catch(error => console.error('Error al cargar la lista de archivos:', error));
});
