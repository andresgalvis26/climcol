import React from 'react';
import {
    Thermometer,
    Droplets,
    TrendingUp,
    TrendingDown
} from 'lucide-react';

const Dashboard = ({ loading, error, weatherData }) => {
    const avgTemp = weatherData.length
        ? (weatherData.reduce((sum, w) => sum + w.temperature, 0) / weatherData.length).toFixed(1)
        : 0;

    const maxTemp = weatherData.length
        ? Math.max(...weatherData.map(w => w.temperature))
        : 0;

    const minTemp = weatherData.length
        ? Math.min(...weatherData.map(w => w.temperature))
        : 0;

    const avgHumidity = weatherData.length
        ? (weatherData.reduce((sum, w) => sum + w.humidity, 0) / weatherData.length).toFixed(1)
        : 0;

    const StatCard = ({ title, value, unit, icon, color, trend }) => (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${color}`}>{icon}</div>
                {trend && (
                    <div className="flex items-center text-sm">
                        {trend > 0 ? (
                            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                        ) : (
                            <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                        )}
                        <span className={trend > 0 ? 'text-green-500' : 'text-red-500'}>
                            {Math.abs(trend)}%
                        </span>
                    </div>
                )}
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                {value}{unit}
            </div>
            <div className="text-gray-600 dark:text-gray-300 text-sm">{title}</div>
        </div>
    );

    return (
        <div className="space-y-6">
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                    Dashboard del Clima
                </h1>
                <p className="text-gray-600 dark:text-gray-300">
                    Estadísticas y análisis del clima en tiempo real
                </p>
            </div>

            {loading && (
                <div className="flex justify-center items-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                </div>
            )}

            {!loading && !error && (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <StatCard
                            title="Temperatura Promedio"
                            value={avgTemp}
                            unit="°C"
                            icon={<Thermometer className="w-6 h-6 text-orange-600" />}
                            color="bg-orange-100 dark:bg-orange-900"
                            trend={2.6}
                        />
                        <StatCard
                            title="Temperatura Máxima"
                            value={maxTemp}
                            unit="°C"
                            icon={<TrendingUp className="w-6 h-6 text-red-600" />}
                            color="bg-red-100 dark:bg-red-900"
                            trend={1.5}
                        />
                        <StatCard
                            title="Temperatura Mínima"
                            value={minTemp}
                            unit="°C"
                            icon={<TrendingDown className="w-6 h-6 text-blue-600" />}
                            color="bg-blue-100 dark:bg-blue-900"
                            trend={-0.8}
                        />
                        <StatCard
                            title="Humedad Promedio"
                            value={avgHumidity}
                            unit="%"
                            icon={<Droplets className="w-6 h-6 text-blue-600" />}
                            color="bg-blue-100 dark:bg-blue-900"
                            trend={-1.2}
                        />
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 border border-gray-100 dark:border-gray-700">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                            Resumen por Ciudad
                        </h3>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-gray-200 dark:border-gray-600">
                                        <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">Ciudad</th>
                                        <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">Temperatura</th>
                                        <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">Condición</th>
                                        <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">Humedad</th>
                                        <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">Viento</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {weatherData.map((weather, index) => (
                                        <tr key={index} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                                            <td className="py-3 px-4 font-medium text-gray-900 dark:text-white">{weather.city}</td>
                                            <td className="py-3 px-4 text-gray-700 dark:text-gray-300">{weather.temperature}°C</td>
                                            <td className="py-3 px-4 text-gray-700 dark:text-gray-300">{weather.condition}</td>
                                            <td className="py-3 px-4 text-gray-700 dark:text-gray-300">{weather.humidity}%</td>
                                            <td className="py-3 px-4 text-gray-700 dark:text-gray-300">{weather.windSpeed} km/h</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Dashboard;
// Dashboard.jsx