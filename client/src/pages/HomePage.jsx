import React from 'react';

// Al final del archivo o en un nuevo archivo HomePage.jsx
const HomePage = ({
    loading,
    error,
    weatherData,
    searchCity,
    setSearchCity,
    fetchWeatherData,
    setSearchedWeather,
    searchedWeather,
    setError,
    WeatherCard,
    Title,
    SearchBar,
}) => (
    <>
        <Title />
        <SearchBar
            searchCity={searchCity}
            setSearchCity={setSearchCity}
            fetchWeatherData={fetchWeatherData}
            setSearchedWeather={setSearchedWeather}
            setError={setError}
        />

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
    </>
);

export default HomePage;