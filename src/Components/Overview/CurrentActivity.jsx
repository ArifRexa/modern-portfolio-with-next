'use client';
import React from 'react';

const CurrentActivity = () => {
    return (
        <div className="bg-gray-900 backdrop-blur-md rounded-xl border border-gray-700/50 p-4 lg:p-6 shadow-sm">
            <div className="flex flex-col md:flex-row flex-wrap md:justify-between gap-6 items-center text-center md:text-left">
                <div className="flex flex-col sm:flex-row sm:items-center space-y-4 w-full md:w-auto items-center md:items-start">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                        🍽️</div>
                    <div>
                        <div
                            className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 items-center">
                            <h3 className="text-xl font-semibold text-gray-200">Currently:
                                Lunch Break
                            </h3>
                        </div>
                        <div
                            className="flex flex-wrap justify-center sm:justify-start items-center gap-2 lg:gap-4 text-sm">
                            <span className="flex items-center text-gray-300">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-map-pin w-3 h-3 mr-1"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path><circle cx="12" cy="10" r="3"></circle></svg>Mediusware LTD.</span><span
                                    className="flex items-center  text-gray-300"><svg
                                        xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                        className="lucide lucide-heart w-3 h-3 mr-1">
                                    <path
                                        d="m19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z">
                                    </path>
                                </svg>Relaxed</span><span className="flex items-center text-gray-300"><svg
                                    xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                    className="lucide lucide-clock w-3 h-3 mr-1">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <polyline points="12 6 12 12 16 14"></polyline>
                                </svg>02:07 PM</span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center text-sm w-full md:w-auto mt-auto"><a href="real-time-activity.html"
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 h-10 px-4 py-2 bg-green-500/20 hover:bg-green-500/30 text-green-400 border-green-500/50 border backdrop-blur-sm">View
                    Activity<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                        className="lucide lucide-external-link w-3 h-3 ml-2">
                        <path d="M15 3h6v6"></path>
                        <path d="m10 14 9-9"></path>
                        <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6"></path>
                    </svg></a><span
                        className="absolute bottom-full mb-2 w-max left-1/2 border -translate-x-1/2 bg-gray-700/50 text-gray-300 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">Debugging code •
                        09:00 PM</span>
                </div>
            </div>
        </div>
    );
};

export default CurrentActivity;