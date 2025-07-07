require('dotenv').config();

const express = require('express');

const cors = require('cors');

const fetch = require('node-fetch');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());

app.get('/api/weather', async (req, res) => {
    const city = req.query.city;
    const apiKey = process.env.WEATHER_API_KEY;

    if (!city) {
        return res.status(400).json({ error: 'City is required' });
    }

    try {
        const currentWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
        const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

        const [weatherResponse, forecastResponse] = await Promise.all([
            fetch(currentWeatherURL),
            fetch(forecastURL)
        ]);

        const weatherData = await weatherResponse.json();
        const forecastData = await forecastResponse.json();

        res.json({ weather: weatherData, forecast: forecastData });

    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch weather data' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})