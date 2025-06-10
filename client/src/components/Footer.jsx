import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 py-4 mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
            <div className="container mx-auto px-4">
                <p>
                    🌤️ ClimCol &copy; {new Date().getFullYear()} — Desarrollado por Andrés Galvis
                </p>
                <p className="mt-1">
                    Datos del clima por <a href="https://www.weatherapi.com/" target="_blank" rel="noopener noreferrer"
                        className="text-blue-500 dark:text-blue-400 hover:underline">
                        WeatherAPI.com
                    </a>
                </p>
            </div>
        </footer>
    );
};

export default Footer;