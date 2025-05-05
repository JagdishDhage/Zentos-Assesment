const fs = require('fs');
const path = require('path');
const { API_KEY, BASE_URL } = require('./config');

const CACHE_FILE = path.join(__dirname, 'cache.json');

const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));


async function fetchWeather(city) {
    const apiUrl = `${BASE_URL}?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`;
    const res = await fetch(apiUrl);

    if (!res.ok) {
        throw new Error(`Failed to fetch weather data: ${res.statusText}`);
    }

    const json = await res.json();
    return {
        city: json.name,
        temperature: json.main.temp,
        condition: json.weather[0].description,
        wind: `${json.wind.speed} m/s`
    };
}


function loadCache() {
    if (!fs.existsSync(CACHE_FILE)) {
        return {};
    }
    const fileData = fs.readFileSync(CACHE_FILE, 'utf-8');
    return JSON.parse(fileData);
}


function saveCache(cacheData) {
    fs.writeFileSync(CACHE_FILE, JSON.stringify(cacheData, null, 2));
}


async function getWeather(city) {
    const cache = loadCache();
    const now = Date.now();
    const cachedEntry = cache[city.toLowerCase()];

  
    if (cachedEntry && (now - cachedEntry.timestamp < 10 * 60 * 1000)) {
        console.log('👉 Pulled from cache.\n');
        return cachedEntry.data;
    }

   
    const latestWeather = await fetchWeather(city);

    
    cache[city.toLowerCase()] = {
        data: latestWeather,
        timestamp: now
    };
    saveCache(cache);

    return latestWeather;
}

module.exports = { getWeather };
