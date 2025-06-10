import React, { useState, useEffect } from 'react';
import HomePage from './pages/HomePage.jsx';
import Dashboard from './pages/Dashboard.jsx';
import SearchBar from './components/SearchBar.jsx';
import Footer from './components/Footer.jsx';
import Navigation from './components/Navigation.jsx';
import WeatherCard from './components/WeatherCard.jsx';


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
      // const response = await fetch(`/weather?city=${encodeURIComponent(city)}`);
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

  const Title = () => (
    <div className="text-center mb-8">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
        Estado del Clima
      </h1>
      <p className="text-gray-600 dark:text-gray-300 mb-2">
        Información actualizada del clima en las principales ciudades de Colombia
      </p>
      <p className="text-gray-500 dark:text-gray-400 text-sm">
        Actualizado por última vez: {weatherData.length > 0 ? weatherData[0].lastUpdated : 'Cargando...'}
      </p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <Navigation
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      <div className="container mx-auto px-4 pb-8">
        {currentPage === 'home' ? (
          <HomePage
            loading={loading}
            error={error}
            weatherData={weatherData}
            searchCity={searchCity}
            setSearchCity={setSearchCity}
            fetchWeatherData={fetchWeatherData}
            setSearchedWeather={setSearchedWeather}
            searchedWeather={searchedWeather}
            setError={setError}
            WeatherCard={WeatherCard}
            Title={Title}
            SearchBar={SearchBar}
          />
        ) : (
          <Dashboard
            loading={loading}
            error={error}
            weatherData={weatherData}
          />
        )}
      </div>
      <Footer />
    </div>
  );
};

export default WeatherApp;