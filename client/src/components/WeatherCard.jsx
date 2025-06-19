import React from 'react';
import { Cloud, Sun, CloudRain, Thermometer, Wind, Droplets, Eye, BarChart3, Home, TrendingUp, TrendingDown, CloudDrizzle, Cloudy } from 'lucide-react';

const WeatherCard = ({ weather }) => {

    const getWeatherIcon = (condition) => {
        switch (condition.toLowerCase()) {
            case 'soleado':
                return <Sun className="w-12 h-12 text-yellow-500" />;
            case 'despejado':
                return <Sun className="w-12 h-12 text-yellow-500" />;
            case 'parcialmente nublado':
                return <Cloudy className="w-12 h-12 text-gray-400" />;
            case 'lluvia ligera':
                return <CloudRain className="w-12 h-12 text-blue-500" />;
            case 'ligeras lluvias':
                return <CloudDrizzle className="w-12 h-12 text-blue-500" />
            case 'lluvia  moderada a intervalos':
                return <CloudRain className="w-12 h-12 text-blue-500" />;
            default:
                return <Cloud className="w-12 h-12 text-gray-400" />;
        }
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-2xl transition-shadow duration-300 border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                    {weather.city}, {weather.region}
                </h3>
                {getWeatherIcon(weather.condition)}
                {/* {weather.icon} */}
            </div>

            <div className="flex items-center justify-between mb-4">
                <h5 className="text-xs font-bold text-gray-800 dark:text-white">
                    {/* {weather.country} */}
                    Lat: {weather.lat}, Long: {weather.lon}
                </h5>
            </div>



            <div className="mb-4">
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                    {weather.temperature}°C
                </div>
                <div className="text-gray-600 dark:text-gray-300">{weather.condition}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                    Sensación térmica: {weather.feelsLike}°C
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center">
                    <Droplets className="w-4 h-4 text-blue-500 mr-2" />
                    <span className="text-gray-600 dark:text-gray-300">Humedad: {weather.humidity}%</span>
                </div>
                <div className="flex items-center">
                    <Wind className="w-4 h-4 text-gray-500 mr-2" />
                    <span className="text-gray-600 dark:text-gray-300">Viento: {weather.windSpeed} km/h</span>
                </div>
                <div className="flex items-center">
                    <Eye className="w-4 h-4 text-purple-500 mr-2" />
                    <span className="text-gray-600 dark:text-gray-300">Visibilidad: {weather.visibility} km</span>
                </div>
                <div className="flex items-center">
                    <Thermometer className="w-4 h-4 text-red-500 mr-2" />
                    <span className="text-gray-600 dark:text-gray-300">Presión: {weather.pressure} hPa</span>
                </div>
            </div>
        </div>
    )
};

export default WeatherCard;
