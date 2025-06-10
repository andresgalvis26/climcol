import express from 'express';
import path from 'path';
import fetch from 'node-fetch';
import cors from 'cors';
import { fileURLToPath } from 'url';
const cache = new Map();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Clave de API (¡No olvides ocultarla en producción!)
const API_KEY = 'efa072cb69e34196903170840250606';
const API_URL = 'https://api.weatherapi.com/v1';


// Habilitar CORS (opcional si frontend está en mismo dominio)
app.use(cors());

// Servir contenido estático desde React
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint proxy a la API de clima
app.get('/weather', async (req, res) => {
    const city = req.query.city; // Valor por defecto si no se proporciona
    if (!city) {
        return res.status(400).json({ error: 'Parámetro "city" es requerido.' });
    }

    // const cached = cache.get(city);

    // if (cached && Date.now() - cached.timestamp < 15 * 60 * 1000) { // 15 minutos
    //     console.log('Datos de clima obtenidos desde caché para:', city);
    //     return res.json(cached.data);
    // }

    try {
        const response = await fetch(`${API_URL}/current.json?key=${API_KEY}&q=${encodeURIComponent(city)}&lang=es`);

        const data = await response.json();
        console.log('Weather data:', data);
        cache.set(city, { data, timestamp: Date.now() });
        res.json(data);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        res.status(500).json({ error: 'Failed to fetch weather data' });
        return;
    }
})


// Fallback para SPA (React Router)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`🌤️  Servidor ClimCol en puerto ${PORT}`)
    // console.log(`Serving static files from ${path.join(__dirname, '/client/dist')}`);
})