'use client';
import React from 'react';

const LatestBlogPosts = () => {
    return (
        <div className="" >
            <div
                className="bg-gray-900 backdrop-blur-md rounded-xl border border-gray-700/50 p-4 lg:p-6 shadow-sm   h-full">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                        <h3 className="text-2xl lg:text-2xl font-bold tracking-tight text-gray-200">
                            Latest Blog Posts</h3>
                    </div><a href="blogs.html"><button
                        className="group flex items-center gap-1 font-semibold transition-all duration-200 rounded-lg px-2 sm:px-3 py-1 sm:py-1.5 text-sm sm:text-base whitespace-nowrap text-gray-300 hover:text-white">View
                        All<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                            viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                            className="lucide lucide-arrow-right w-3 h-3 sm:w-4 sm:h-4 transition-transform group-hover:translate-x-1">
                            <path d="M5 12h14"></path>
                            <path d="m12 5 7 7-7 7"></path>
                        </svg></button></a>
                </div>
                <div
                    className="bg-gray-900 backdrop-blur-md rounded-xl border border-gray-700/50 p-4 lg:p-6 shadow-sm  relative rounded-xl border backdrop-blur-md  shadow-md px-4 py-4 bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700/40 ">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                        viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                        strokeLinecap="round" strokeLinejoin="round"
                        className="lucide lucide-circle-x w-12 h-12 mx-auto mb-2 text-gray-600">
                        <circle cx="12" cy="12" r="10"></circle>
                        <path d="m15 9-6 6"></path>
                        <path d="m9 9 6 6"></path>
                    </svg>
                    <p className="text-md text-center font-medium text-gray-400">No data available</p>
                </div>
            </div>
        </div>
    );
};

export default LatestBlogPosts;