'use client';
import React from 'react';

const FunFactsAndInterests = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
      {/* Fun Facts */}
      <div>
        <div className="bg-gray-900 backdrop-blur-md rounded-xl border border-gray-700/50 p-4 lg:p-6 shadow-sm h-full w-full">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl lg:text-2xl font-bold tracking-tight text-gray-200">
              Fun Facts
            </h3>
            <div className="flex items-center space-x-2">
              <button className="w-8 h-8 rounded-lg flex items-center justify-center transition-all bg-gray-700/50 hover:bg-gray-600/50 text-gray-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-chevron-left w-4 h-4"
                >
                  <path d="m15 18-6-6 6-6"></path>
                </svg>
              </button>
              <button className="w-8 h-8 rounded-lg flex items-center justify-center transition-all bg-gray-700/50 hover:bg-gray-600/50 text-gray-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-chevron-right w-4 h-4"
                >
                  <path d="m9 18 6-6-6-6"></path>
                </svg>
              </button>
            </div>
          </div>

          <div className="relative min-h-[130px] mt-4">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/40 rounded-xl p-4 lg:p-4 shadow-md backdrop-blur-md h-full cursor-pointer">
              <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium mb-2 bg-pink-500/20 text-pink-300">
                Lifestyle
              </div>
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h4 className="text-pink-300 text-base font-extrabold leading-tight mb-1">
                    Runs on Cha &amp; Singara
                  </h4>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Consumes at least 2 cups of milk tea or coffee daily, especially during debugging marathons
                  </p>
                </div>
                <div className="ml-3 flex items-center text-pink-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-trending-up w-4 h-4"
                  >
                    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
                    <polyline points="16 7 22 7 22 13"></polyline>
                  </svg>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-gray-700/50">
                <p className="text-pink-400 text-sm font-medium">
                  Keeps energy levels high but may increase snack budget by 30%
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-4 space-x-2">
            <button className="w-6 h-2 rounded-full transition-all duration-300 bg-blue-400 shadow-lg scale-125"></button>
            <button className="w-2 h-2 rounded-full transition-all duration-300 bg-gray-600 hover:bg-gray-500"></button>
            <button className="w-2 h-2 rounded-full transition-all duration-300 bg-gray-600 hover:bg-gray-500"></button>
            <button className="w-2 h-2 rounded-full transition-all duration-300 bg-gray-600 hover:bg-gray-500"></button>
            <button className="w-2 h-2 rounded-full transition-all duration-300 bg-gray-600 hover:bg-gray-500"></button>
            <button className="w-2 h-2 rounded-full transition-all duration-300 bg-gray-600 hover:bg-gray-500"></button>
          </div>
        </div>
      </div>

      {/* Interests */}
      <div>
        <div className="bg-gray-900 backdrop-blur-md rounded-xl border border-gray-700/50 p-4 lg:p-6 shadow-sm h-full w-full">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl lg:text-2xl font-bold tracking-tight text-gray-200">
              Interests
            </h3>
            <div className="flex items-center space-x-2">
              <button className="w-8 h-8 rounded-lg flex items-center justify-center transition-all bg-gray-700/50 hover:bg-gray-600/50 text-gray-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-chevron-left w-4 h-4"
                >
                  <path d="m15 18-6-6 6-6"></path>
                </svg>
              </button>
              <button className="w-8 h-8 rounded-lg flex items-center justify-center transition-all bg-gray-700/50 hover:bg-gray-600/50 text-gray-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-chevron-right w-4 h-4"
                >
                  <path d="m9 18 6-6-6-6"></path>
                </svg>
              </button>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-xl flex-1 flex items-center mt-4">
            <div className="w-full">
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/40 rounded-xl p-4 lg:p-4 shadow-md backdrop-blur-md h-full cursor-pointer">
                <div className="relative z-10">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-pink-500/20 to-rose-500/20 border-pink-500/30 border backdrop-blur-sm">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-zap w-6 h-6 text-white"
                      >
                        <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"></path>
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-pink-300 text-base lg:text-lg font-extrabold leading-tight mb-1">
                        Energy Level: High
                      </h4>
                      <p className="text-sm mb-2 text-gray-300">
                        Full of energy, ready for challenging tasks
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-2 mt-4">
            <button className="w-6 h-2 rounded-full transition-all duration-300 bg-blue-500 shadow-lg scale-125"></button>
            <button className="w-2 h-2 rounded-full transition-all duration-300 bg-gray-600 hover:bg-gray-500"></button>
            <button className="w-2 h-2 rounded-full transition-all duration-300 bg-gray-600 hover:bg-gray-500"></button>
            <button className="w-2 h-2 rounded-full transition-all duration-300 bg-gray-600 hover:bg-gray-500"></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FunFactsAndInterests;