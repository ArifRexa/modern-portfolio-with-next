'use client';
import React from 'react';
import { useTheme } from '@/context/ThemeContext';

const LatestBlogPosts = () => {
    const { theme } = useTheme();
    return (
        <div className="" >
            <div
                className={`${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'} backdrop-blur-md rounded-xl border ${theme === 'dark' ? 'border-gray-700/50' : 'border-gray-300'} p-4 lg:p-6 shadow-sm   h-full`}>
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                        <h3 className={`text-2xl lg:text-2xl font-bold tracking-tight ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
                            Latest Blog Posts</h3>
                    </div><a href="blogs.html"><button
                        className={`group flex items-center gap-1 font-semibold transition-all duration-200 rounded-lg px-2 sm:px-3 py-1 sm:py-1.5 text-sm sm:text-base whitespace-nowrap ${theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>View
                        All<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                            viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                            className="lucide lucide-arrow-right w-3 h-3 sm:w-4 sm:h-4 transition-transform group-hover:translate-x-1">
                            <path d="M5 12h14"></path>
                            <path d="m12 5 7 7-7 7"></path>
                        </svg></button></a>
                </div>
                <div
                    className={`${theme === 'dark' ? 'bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700/40' : 'bg-gradient-to-br from-gray-200 to-gray-100 border-gray-300'} backdrop-blur-md rounded-xl border p-4 lg:p-6 shadow-md relative rounded-xl border backdrop-blur-md shadow-md px-4 py-4`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                        viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                        strokeLinecap="round" strokeLinejoin="round"
                        className={`lucide lucide-circle-x w-12 h-12 mx-auto mb-2 ${theme === 'dark' ? 'text-gray-600' : 'text-gray-500'}`}>
                        <circle cx="12" cy="12" r="10"></circle>
                        <path d="m15 9-6 6"></path>
                        <path d="m9 9 6 6"></path>
                    </svg>
                    <p className={`text-md text-center font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>No data available</p>
                </div>
            </div>
        </div>
    );
};

export default LatestBlogPosts;