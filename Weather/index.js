// index.js

const { getWeather } = require('./weather');

async function main() {
    const args = process.argv.slice(2);
    if (args.length === 0) {
        console.log('❗ Please provide a city name.');
        console.log('Usage: node index.js <city>');
        return;
    }

    const city = args.join(' ');

    try {
        console.log(`🌤️  Fetching weather for: ${city}...\n`);
        const weather = await getWeather(city);

        console.log(`📍 City: ${weather.city}`);
        console.log(`🌡️  Temperature: ${weather.temperature}°C`);
        console.log(`☁️  Condition: ${weather.condition}`);
        console.log(`💨 Wind: ${weather.wind}`);
    } catch (err) {
        console.error('Error:', err.message);
    }
}

main();
