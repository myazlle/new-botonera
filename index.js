const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');

// Sirve la carpeta "public" (contiene HTML, JS y CSS)
app.use(express.static('public'));

// Ruta para obtener los sonidos dinámicamente
app.get('/list-files', (req, res) => {
    const soundFolder = path.join(__dirname, 'public', 'sonidos');
    const imageFolder = path.join(soundFolder, 'images');

    // Lista los sonidos e imágenes
    const sounds = fs.readdirSync(soundFolder).filter(file => file.endsWith('.mp3'));
    const images = fs.readdirSync(imageFolder).filter(file => file.endsWith('.jpg') || file.endsWith('.png'));

    // Empareja sonidos con imágenes
    const result = sounds.map(sound => {
        const imageName = images.find(image => image.startsWith(sound.replace('.mp3', ''))) || 'default.jpg';
        return { sound, image: imageName };
    });

    res.json(result);
});

// Inicia el servidor
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));