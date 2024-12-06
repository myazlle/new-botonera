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

// Obtiene los sonidos e imágenes dinámicamente
fetch('/list-files')
    .then(response => response.json())
    .then(data => {
        const list = document.getElementById('list');
        list.innerHTML = ''; // Limpia el contenedor previo

        data.forEach(({ sound, image, isDir }) => {
            const className = isDir ? 'folder' : '';
            const filePath = `/sonidos/${sound}`;
            const imagePath = image ? `/sonidos/images/${image}` : null;

            const item = document.createElement('div');
            item.className = className;
            item.setAttribute('title', filePath);

            if (imagePath) {
                const img = document.createElement('img');
                img.className = 'audio-icon';
                img.src = imagePath;
                img.alt = 'Audio Image';
                item.appendChild(img);
            }

            const displayName = sound.indexOf('.') > -1
                ? sound.substring(0, sound.lastIndexOf('.'))
                : sound;

            const textNode = document.createTextNode(displayName);
            item.appendChild(textNode);

            item.addEventListener('click', () => {
                if (!isDir) {
                    const audio = new Audio(filePath);
                    audio.play();
                }
            });

            list.appendChild(item);
        });
    })
    .catch(error => console.error('Error fetching files:', error));
