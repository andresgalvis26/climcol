import React, { useState, useEffect } from 'react';
import { Cloud, Sun, CloudRain, Thermometer, Wind, Droplets, Eye, BarChart3, Home, TrendingUp, TrendingDown } from 'lucide-react';
import SearchBar from './components/SearchBar.jsx';

const WeatherApp = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [weatherCache, setWeatherCache] = useState({});
  const [searchCity, setSearchCity] = useState('');
  const [searchedWeather, setSearchedWeather] = useState(null);

  // Ciudades principales para mostrar
  const cities = [
    { name: 'Bogotá', lat: 4.7110, lon: -74.0721 },
    { name: 'Medellín', lat: 6.2442, lon: -75.5812 },
    { name: 'Cali', lat: 3.4516, lon: -76.5320 },
    { name: 'Barranquilla', lat: 10.9639, lon: -74.7964 },
    { name: 'Cartagena', lat: 10.3910, lon: -75.4794 },
    { name: 'Bucaramanga', lat: 7.1253, lon: -73.1198 },
    { name: 'Pereira', lat: 4.8133, lon: -75.6961 },
    { name: 'Santa Marta', lat: 11.2408, lon: -74.1990 },
    { name: 'Cúcuta', lat: 7.8939, lon: -72.5078 }
  ];

  const normalizeWeatherData = (data) => {
    return {
      city: data.location.name,
      region: data.location.region,
      temperature: data.current.temp_c,
      condition: data.current.condition.text,
      humidity: data.current.humidity,
      windSpeed: data.current.wind_kph,
      visibility: data.current.vis_km,
      pressure: data.current.pressure_mb,
      feelsLike: data.current.feelslike_c,
      uvIndex: data.current.uv,
      lastUpdated: data.current.last_updated
    };
  }

  const fetchWeatherData = async (city) => {
    if (weatherCache[city]) { // Verifica si los datos ya están en caché
      return weatherCache[city]; // ✅ aseguras que siempre se normalice
    }

    try {
      const response = await fetch(`http://localhost:3000/weather?city=${encodeURIComponent(city)}`);
      const data = await response.json();


      if (!data || !data.location || !data.current) {
        console.log(`⚠️ Datos inválidos para ${city}`, data);
        return null;
      }

      console.log(`🌤️  Datos del clima para ${city} cargados exitosamente del API:`, data);

      const normalized = normalizeWeatherData(data);
      setWeatherCache(prevCache => ({ ...prevCache, [city]: normalized })); // Guardamos en caché los datos
      return normalized;
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setError('Error al cargar los datos del clima');
      return;
    }
  }

  useEffect(() => {
    const loadWeatherData = async () => {
      setLoading(true);

      try {
        const allData = await Promise.all(
          cities.map(async (cityObj) => {
            const data = await fetchWeatherData(cityObj.name);
            if (!data) {
              console.log(`⚠️ No se pudo obtener datos para ${cityObj.name}`);
            }
            return data;
          })
        );

        const validData = allData.filter(Boolean); // Filtra las respuestas válidas
        setWeatherData(validData); // Actualiza el estado solo con datos válidos
        setError(null); // Resetea el error si la carga fue exitosa
      } catch (err) {
        setError('Error al cargar los datos del clima' + err.message);
      } finally {
        setLoading(false);
      }
    };

    loadWeatherData();
  }, []);

  const getWeatherIcon = (condition) => {
    switch (condition.toLowerCase()) {
      case 'soleado':
        return <Sun className="w-12 h-12 text-yellow-500" />;
      case 'nublado':
        return <Cloud className="w-12 h-12 text-gray-400" />;
      case 'lluvia ligera':
      case 'lluvia':
        return <CloudRain className="w-12 h-12 text-blue-500" />;
      default:
        return <Cloud className="w-12 h-12 text-gray-400" />;
    }
  };

  const WeatherCard = ({ weather }) => (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-shadow duration-300 border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-800">{weather.city}, {weather.region}</h3>
        {getWeatherIcon(weather.condition)}
      </div>

      <div className="mb-4">
        <div className="text-3xl font-bold text-gray-900 mb-1">
          {weather.temperature}°C
        </div>
        <div className="text-gray-600">{weather.condition}</div>
        <div className="text-sm text-gray-500">
          Sensación térmica: {weather.feelsLike}°C
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className="flex items-center">
          <Droplets className="w-4 h-4 text-blue-500 mr-2" />
          <span className="text-gray-600">Humedad: {weather.humidity}%</span>
        </div>
        <div className="flex items-center">
          <Wind className="w-4 h-4 text-gray-500 mr-2" />
          <span className="text-gray-600">Viento: {weather.windSpeed} km/h</span>
        </div>
        <div className="flex items-center">
          <Eye className="w-4 h-4 text-purple-500 mr-2" />
          <span className="text-gray-600">Visibilidad: {weather.visibility} km</span>
        </div>
        <div className="flex items-center">
          <Thermometer className="w-4 h-4 text-red-500 mr-2" />
          <span className="text-gray-600">Presión: {weather.pressure} hPa</span>
        </div>
      </div>
    </div>
  );

  const Title = () => (
    <div className="text-center mb-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-2">
        Estado del Clima
      </h1>
      <p className="text-gray-600 mb-2">
        Información actualizada del clima en las principales ciudades de Colombia
      </p>
      <p className="text-gray-500 text-sm">
        Actualizado por última vez: {weatherData.length > 0 ? weatherData[0].lastUpdated : 'Cargando...'}
      </p>
    </div>
  )

  const HomePage = () => (
    <div className="space-y-6">
      {loading && (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      )}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {searchedWeather && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-700 mb-2">Resultado de búsqueda:</h2>
          <WeatherCard weather={searchedWeather} />
        </div>
      )}

      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {weatherData.map((weather, index) => (
            <WeatherCard key={index} weather={weather} />
          ))}
        </div>
      )}
    </div>
  );

  const Dashboard = () => {
    const avgTemp = weatherData.length > 0
      ? (weatherData.reduce((sum, w) => sum + w.temperature, 0) / weatherData.length).toFixed(1)
      : 0;

    const maxTemp = weatherData.length > 0
      ? Math.max(...weatherData.map(w => w.temperature))
      : 0;

    const minTemp = weatherData.length > 0
      ? Math.min(...weatherData.map(w => w.temperature))
      : 0;

    const avgHumidity = weatherData.length > 0
      ? (weatherData.reduce((sum, w) => sum + w.humidity, 0) / weatherData.length).toFixed(1)
      : 0;

    const StatCard = ({ title, value, unit, icon, color, trend }) => (
      <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 rounded-lg ${color}`}>
            {icon}
          </div>
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
        <div className="text-2xl font-bold text-gray-900 mb-1">
          {value}{unit}
        </div>
        <div className="text-gray-600 text-sm">{title}</div>
      </div>
    );

    return (
      <div className="space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Dashboard del Clima
          </h1>
          <p className="text-gray-600">
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
                color="bg-orange-100"
                trend={2.6}
              />
              <StatCard
                title="Temperatura Máxima"
                value={maxTemp}
                unit="°C"
                icon={<TrendingUp className="w-6 h-6 text-red-600" />}
                color="bg-red-100"
                trend={1.5}
              />
              <StatCard
                title="Temperatura Mínima"
                value={minTemp}
                unit="°C"
                icon={<TrendingDown className="w-6 h-6 text-blue-600" />}
                color="bg-blue-100"
                trend={-0.8}
              />
              <StatCard
                title="Humedad Promedio"
                value={avgHumidity}
                unit="%"
                icon={<Droplets className="w-6 h-6 text-blue-600" />}
                color="bg-blue-100"
                trend={-1.2}
              />
            </div>

            <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Resumen por Ciudad
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Ciudad</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Temperatura</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Condición</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Humedad</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Viento</th>
                    </tr>
                  </thead>
                  <tbody>
                    {weatherData.map((weather, index) => (
                      <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium text-gray-900">{weather.city}</td>
                        <td className="py-3 px-4 text-gray-700">{weather.temperature}°C</td>
                        <td className="py-3 px-4 text-gray-700">{weather.condition}</td>
                        <td className="py-3 px-4 text-gray-700">{weather.humidity}%</td>
                        <td className="py-3 px-4 text-gray-700">{weather.windSpeed} km/h</td>
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

  const Navigation = () => (
    <nav className="bg-white shadow-lg border-b border-gray-200 mb-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <Cloud className="w-8 h-8 text-blue-500" />
            <span className="text-xl font-bold text-gray-900">ClimCol</span>
          </div>
          <div className="flex space-x-4">
            <button
              onClick={() => setCurrentPage('home')}
              className={`flex items-center px-4 py-2 rounded-lg transition-colors ${currentPage === 'home'
                ? 'bg-blue-500 text-white'
                : 'text-gray-600 hover:bg-gray-100'
                }`}
            >
              <Home className="w-4 h-4 mr-2" />
              Inicio
            </button>
            <button
              onClick={() => setCurrentPage('dashboard')}
              className={`flex items-center px-4 py-2 rounded-lg transition-colors ${currentPage === 'dashboard'
                ? 'bg-blue-500 text-white'
                : 'text-gray-600 hover:bg-gray-100'
                }`}
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              Dashboard
            </button>
          </div>
        </div>
      </div>
    </nav>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navigation />
      <div className="container mx-auto px-4 pb-8">
        <Title />

        <SearchBar
          searchCity={searchCity}
          setSearchCity={setSearchCity}
          fetchWeatherData={fetchWeatherData}
          setSearchedWeather={setSearchedWeather}
          setError={setError}
        />
        {/* <div className="mb-6 text-right bg-red-100">
          <input
            type="text"
            placeholder="Buscar ciudad..."
            value={searchCity}
            onChange={(e) => setSearchCity(e.target.value)}
            className="px-4 w-1/4 py-2 border rounded-md text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={async () => {
              const result = await fetchWeatherData(searchCity);
              if (result) {
                setSearchedWeather(result);
              } else {
                setSearchedWeather(null);
                setError('No se encontró la ciudad o hubo un error');
              }
            }}
            className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
          >
            Buscar
          </button>
        </div> */}
        {currentPage === 'home' ? <HomePage /> : <Dashboard />}
      </div>
    </div>
  );
};

export default WeatherApp;