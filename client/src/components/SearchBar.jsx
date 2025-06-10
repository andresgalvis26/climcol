import React from 'react';

const SearchBar = ({ searchCity, setSearchCity, fetchWeatherData, setSearchedWeather, setError }) => {
    const handleSearch = async () => {
        if (!searchCity.trim()) return;

        const result = await fetchWeatherData(searchCity);
        if (result) {
            setSearchedWeather(result);
            setError(null);
        } else {
            setSearchedWeather(null);
            setError('No se encontró la ciudad o hubo un error');
        }
    };

    return (
        <div className="mb-6 text-right">
            <input
                type="text"
                placeholder="Buscar ciudad..."
                value={searchCity}
                onChange={(e) => setSearchCity(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                className="px-4 w-1/4 py-2 border rounded-md text-gray-700 dark:text-white dark:bg-gray-800 dark:border-gray-600 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
                onClick={handleSearch}
                className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
            >
                Buscar
            </button>
            {searchCity && (
                <button
                    onClick={() => {
                        setSearchCity('');
                        setSearchedWeather(null);
                        setError(null);
                    }}
                    className="ml-2 px-4 py-2 bg-yellow-300 text-gray-700 dark:bg-yellow-400 dark:text-gray-900 rounded-md hover:bg-yellow-400 dark:hover:bg-yellow-500 transition"
                >
                    Limpiar
                </button>
            )}
        </div>
    );
};

export default SearchBar;