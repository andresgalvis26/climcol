import React, { useState, useEffect } from 'react';
import { Cloud, Home, BarChart3, Moon, Sun } from 'lucide-react';

const Navigation = ({ currentPage, setCurrentPage }) => {

    const [isDark, setIsDark] = useState(() =>
        document.documentElement.classList.contains('dark')
    );

    const toggleDarkMode = () => {
        document.documentElement.classList.toggle('dark');
        setIsDark((prev) => !prev);
        localStorage.setItem('theme', isDark ? 'light' : 'dark');
    };

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            document.documentElement.classList.toggle('dark', savedTheme === 'dark');
            setIsDark(savedTheme === 'dark');
        }
    }, []);


    return (
        <nav className="bg-white dark:bg-gray-900 shadow-lg border-b border-gray-200 dark:border-gray-700 mb-8">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center space-x-2">
                        <Cloud className="w-8 h-8 text-blue-500" />
                        <span className="text-xl font-bold text-gray-900 dark:text-white">ClimCol</span>
                    </div>
                    <div className="flex space-x-4">
                        <button
                            onClick={() => setCurrentPage('home')}
                            className={`flex items-center px-4 py-2 rounded-lg transition-colors ${currentPage === 'home'
                                ? 'bg-blue-500 text-white'
                                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                                }`}
                        >
                            <Home className="w-4 h-4 mr-2" />
                            Inicio
                        </button>
                        <button
                            onClick={() => setCurrentPage('dashboard')}
                            className={`flex items-center px-4 py-2 rounded-lg transition-colors ${currentPage === 'dashboard'
                                ? 'bg-blue-500 text-white'
                                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                                }`}
                        >
                            <BarChart3 className="w-4 h-4 mr-2" />
                            Dashboard
                        </button>

                        <button
                            onClick={toggleDarkMode}
                            className="p-2 rounded-md bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition"
                            title="Cambiar tema"
                        >
                            {isDark ? (
                                <Sun className="w-5 h-5 text-yellow-400" />
                            ) : (
                                <Moon className="w-5 h-5 text-gray-800" />
                            )}
                        </button>

                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navigation;
