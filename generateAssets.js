const fs = require('fs');
const path = require('path');

// Directorios de sonidos e imágenes
const soundsFolder = path.join(__dirname, 'public', 'sonidos');
const imagesFolder = path.join(soundsFolder, 'images');

// Asegurarse de que las carpetas existen
if (!fs.existsSync(soundsFolder)) {
  console.error('Error: La carpeta de sonidos no existe.');
  process.exit(1);
}

if (!fs.existsSync(imagesFolder)) {
  console.error('Error: La carpeta de imágenes no existe.');
  process.exit(1);
}

// Lee todos los archivos de sonido (mp3)
const sounds = fs.readdirSync(soundsFolder).filter(file => file.endsWith('.mp3'));

// Lee todos los archivos de imagen (jpg y png)
const images = fs.readdirSync(imagesFolder).filter(file => 
  file.endsWith('.jpg') || file.endsWith('.png')
);

// Genera un array de objetos con los sonidos y sus imágenes correspondientes
const assets = sounds.map(sound => {
  const imageName = images.find(image => image.startsWith(sound.replace('.mp3', ''))) || 'default.jpg';
  return {
    sound,
    image: imageName
  };
});

// Verifica si hay sonidos
if (assets.length === 0) {
  console.error('Error: No se encontraron sonidos en la carpeta.');
  process.exit(1);
}

// Escribe el archivo assets.json en la carpeta public
const outputPath = path.join(__dirname, 'public', 'assets.json');

fs.writeFileSync(outputPath, JSON.stringify(assets, null, 2));

console.log('Archivo assets.json generado exitosamente en:', outputPath);
