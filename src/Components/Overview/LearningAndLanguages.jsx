// app/components/LearningAndLanguages.jsx
'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import supabase from '@/utils/supabaseClient'; // Import the centralized Supabase client
import { useTheme } from '@/context/ThemeContext';

const LearningAndLanguages = () => {
  const { theme } = useTheme();
  // State for dynamic data from Supabase
  const [learningData, setLearningData] = useState([]);
  const [languagesData, setLanguagesData] = useState([]);
  // Loading states (optional, for better UX)
  const [learningLoading, setLearningLoading] = useState(true);
  const [languagesLoading, setLanguagesLoading] = useState(true);
  // Error states (optional)
  const [learningError, setLearningError] = useState(null);
  const [languagesError, setLanguagesError] = useState(null);

  // State for carousel navigation
  const [currentLearningIndex, setCurrentLearningIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const currentLearning = learningData[currentLearningIndex];

  // Fetch data from Supabase on component mount
  useEffect(() => {
    const fetchLearningData = async () => {
      try {
        let { data, error, status } = await supabase
          .from('currently_learning')
          .select('id, topic, platform, description, progress, finish_time')
          .order('priority_order', { ascending: true }); // Optional: Order by priority

        if (error && status !== 406) throw error; // Don't throw error if no rows found (status 406)
        if (data) {
          setLearningData(data);
          if (data.length > 0) {
            setCurrentLearningIndex(0); // Reset index if new data is loaded
          }
        }
      } catch (error) {
        console.error('Error fetching currently learning data:', error);
        setLearningError(error.message);
        setLearningData([]); // Clear data on error
      } finally {
        setLearningLoading(false);
      }
    };

    const fetchLanguagesData = async () => {
      try {
        let { data, error, status } = await supabase
          .from('languages')
          .select('id, name, level, width_percent')
          .order('priority_order', { ascending: true }); // Optional: Order by priority

        if (error && status !== 406) throw error; // Don't throw error if no rows found (status 406)
        if (data) {
          // Transform width_percent to a CSS width string (e.g., 90 -> "90%")
          const transformedData = data.map(lang => ({
            ...lang,
            width: `${lang.width_percent}%`
          }));
          setLanguagesData(transformedData);
        }
      } catch (error) {
        console.error('Error fetching languages data:', error);
        setLanguagesError(error.message);
        setLanguagesData([]); // Clear data on error
      } finally {
        setLanguagesLoading(false);
      }
    };

    fetchLearningData();
    fetchLanguagesData();
  }, []); // Empty dependency array ensures this runs only once on mount

  // Navigation handlers for learning carousel
  const goToNextLearning = () => {
    if (learningData.length <= 1) return; // Prevent cycling if only one item or loading
    setIsAnimating(true);
    setCurrentLearningIndex((prev) => (prev + 1) % learningData.length);
  };

  const goToPrevLearning = () => {
    if (learningData.length <= 1) return; // Prevent cycling if only one item or loading
    setIsAnimating(true);
    setCurrentLearningIndex((prev) => (prev - 1 + learningData.length) % learningData.length);
  };

  const handleLearningDotClick = (index) => {
    if (learningData.length <= 1 || index === currentLearningIndex) return; // Prevent if only one item or clicking current
    setIsAnimating(true);
    setCurrentLearningIndex(index);
  };

  // Auto-rotate learning every 6 seconds (only if more than one item)
  useEffect(() => {
    if (learningData.length <= 1) return; // Don't auto-rotate if only one item

    const interval = setInterval(() => {
      setIsAnimating(true);
      setCurrentLearningIndex((prev) => (prev + 1) % learningData.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [learningData.length]); // Re-run effect when learningData length changes

  // Reset animation flag after transition
  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => setIsAnimating(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isAnimating]);

  // Show loading indicators or errors if needed
  if (learningLoading || languagesLoading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <div className={`${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'} backdrop-blur-md rounded-xl border ${theme === 'dark' ? 'border-gray-700/50' : 'border-gray-300'} p-4 lg:p-6 shadow-sm`}>
          <h3 className={`text-2xl lg:text-2xl font-bold tracking-tight ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'} mb-4`}>Currently Learning</h3>
          <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Loading...</p>
        </div>
        <div className={`${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'} backdrop-blur-md rounded-xl border ${theme === 'dark' ? 'border-gray-700/50' : 'border-gray-300'} p-4 lg:p-6 shadow-sm`}>
          <h3 className={`text-2xl lg:text-2xl font-bold tracking-tight ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'} mb-4`}>Languages</h3>
          <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Loading...</p>
        </div>
      </div>
    );
  }

  if (learningError || languagesError) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <div className={`${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'} backdrop-blur-md rounded-xl border ${theme === 'dark' ? 'border-gray-700/50' : 'border-gray-300'} p-4 lg:p-6 shadow-sm`}>
          <h3 className={`text-2xl lg:text-2xl font-bold tracking-tight ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'} mb-4`}>Currently Learning</h3>
          <p className="text-red-400">Error: {learningError || "Failed to load learning data"}</p>
        </div>
        <div className={`${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'} backdrop-blur-md rounded-xl border ${theme === 'dark' ? 'border-gray-700/50' : 'border-gray-300'} p-4 lg:p-6 shadow-sm`}>
          <h3 className={`text-2xl lg:text-2xl font-bold tracking-tight ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'} mb-4`}>Languages</h3>
          <p className="text-red-400">Error: {languagesError || "Failed to load languages data"}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-3 sm:gap-4 mb-4">
      {/* Currently Learning */}
      <div>
        <div className={`${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'} backdrop-blur-md rounded-xl border ${theme === 'dark' ? 'border-gray-700/50' : 'border-gray-300'} p-3 sm:p-4 shadow-sm w-full h-full`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
            <h3 className={`text-lg sm:text-xl font-bold tracking-tight ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
              Currently Learning
            </h3>
            <div className="flex items-center space-x-2">
              <button
                onClick={goToPrevLearning}
                className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all ${theme === 'dark' ? 'bg-gray-700/50 hover:bg-gray-600/50 text-gray-300' : 'bg-gray-300 hover:bg-gray-400 text-gray-700'} disabled:opacity-30 disabled:cursor-not-allowed`}
                disabled={learningData.length <= 1} // Disable if only one item
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16" height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-chevron-left w-3 h-3 sm:w-4 sm:h-4"
                >
                  <path d="m15 18-6-6 6-6"></path>
                </svg>
              </button>
              <button
                onClick={goToNextLearning}
                className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all ${theme === 'dark' ? 'bg-gray-700/50 hover:bg-gray-600/50 text-gray-300' : 'bg-gray-300 hover:bg-gray-400 text-gray-700'} disabled:opacity-30 disabled:cursor-not-allowed`}
                disabled={learningData.length <= 1} // Disable if only one item
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16" height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-chevron-right w-3 h-3 sm:w-4 sm:h-4"
                >
                  <path d="m9 18 6-6-6-6"></path>
                </svg>
              </button>
            </div>
          </div>

          <div className="relative overflow-hidden min-h-[120px] mt-3">
            {learningData.length > 0 ? (
              <motion.div
                key={currentLearningIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className={`bg-gradient-to-br ${theme === 'dark' ? 'from-gray-800 to-gray-900 border-gray-700/40' : 'from-gray-200 to-gray-100 border-gray-300'} rounded-xl p-3 sm:p-4 shadow-md backdrop-blur-md h-full`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start gap-2 mb-3">
                  <div className="flex-1">
                    <h3 className={`text-base sm:text-lg font-bold leading-tight ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
                      {currentLearning.topic}
                    </h3>
                    <p className={`text-xs sm:text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>via {currentLearning.platform}</p>
                    <p className={`mt-2 text-xs sm:text-sm line-clamp-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                      {currentLearning.description}
                    </p>
                  </div>
                </div>

                <div className="space-y-2 sm:space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-xs sm:text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Progress</span>
                      <span className={`font-bold text-xs sm:text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{currentLearning.progress}%</span>
                    </div>
                    <div className={`w-full h-3 sm:h-4 rounded-full ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-300'}`}>
                      <div
                        className="h-3 sm:h-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${currentLearning.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  <p className={`text-xs sm:text-sm font-semibold ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    Est. completion: {currentLearning.finish_time}
                  </p>
                </div>
              </motion.div>
            ) : (
              <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} text-center py-4`}>No learning items found.</p>
            )}
          </div>

          {learningData.length > 1 && ( // Only show dots if there's more than one item
            <div className="flex justify-center mt-3 space-x-1">
              {learningData.map((_, i) => (
                <button
                  key={i}
                  onClick={() => handleLearningDotClick(i)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i === currentLearningIndex
                      ? 'w-5 sm:w-6 bg-blue-400 shadow-lg scale-125'
                      : `${theme === 'dark' ? 'bg-gray-600 hover:bg-gray-500' : 'bg-gray-400 hover:bg-gray-500'}`
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Languages */}
      <div>
        <div className={`${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'} backdrop-blur-md rounded-xl border ${theme === 'dark' ? 'border-gray-700/50' : 'border-gray-300'} p-3 sm:p-4 shadow-sm w-full h-full`}>
          <h3 className={`text-lg sm:text-xl font-bold tracking-tight ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'} mb-3`}>
            Languages
          </h3>

          <div className="space-y-2">
            {languagesData.length > 0 ? (
              languagesData.map((lang) => (
                <div
                  key={lang.id} // Use the database ID as the key
                  className={`bg-gradient-to-br ${theme === 'dark' ? 'from-gray-800 to-gray-900 border-gray-700/40' : 'from-gray-200 to-gray-100 border-gray-300'} rounded-xl p-3 sm:p-4 shadow-md backdrop-blur-md`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center space-x-2 w-full sm:w-auto">
                      <div className="w-3 h-3 bg-green-500 rounded-full relative">
                        <div className="absolute top-0 left-0 w-3 h-3 bg-green-500 rounded-full"></div>
                      </div>
                      <span className={`font-semibold text-sm sm:text-md ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>{lang.name}</span>
                    </div>
                    <div className="flex items-center space-x-2 w-full sm:w-auto flex-grow">
                      <div className={`w-full rounded-full h-2 sm:h-3 overflow-hidden shadow-inner relative ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-300'}`}>
                        <div
                          className="bg-gradient-to-r from-green-400 to-blue-500 h-2 sm:h-3 rounded-full transition-all duration-500 ease-out"
                          style={{ width: lang.width }} // Use the transformed width string
                        ></div>
                      </div>
                      <span className={`text-xs sm:text-sm whitespace-nowrap ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{lang.level}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} text-center`}>No languages found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningAndLanguages;