// app/components/LearningAndLanguages.jsx
'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import supabase from '@/utils/supabaseClient'; // Import the centralized Supabase client

const LearningAndLanguages = () => {
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
        <div className="bg-gray-900 backdrop-blur-md rounded-xl border border-gray-700/50 p-4 lg:p-6 shadow-sm">
          <h3 className="text-2xl lg:text-2xl font-bold tracking-tight text-gray-200 mb-4">Currently Learning</h3>
          <p className="text-gray-400">Loading...</p>
        </div>
        <div className="bg-gray-900 backdrop-blur-md rounded-xl border border-gray-700/50 p-4 lg:p-6 shadow-sm">
          <h3 className="text-2xl lg:text-2xl font-bold tracking-tight text-gray-200 mb-4">Languages</h3>
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (learningError || languagesError) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <div className="bg-gray-900 backdrop-blur-md rounded-xl border border-gray-700/50 p-4 lg:p-6 shadow-sm">
          <h3 className="text-2xl lg:text-2xl font-bold tracking-tight text-gray-200 mb-4">Currently Learning</h3>
          <p className="text-red-400">Error: {learningError || "Failed to load learning data"}</p>
        </div>
        <div className="bg-gray-900 backdrop-blur-md rounded-xl border border-gray-700/50 p-4 lg:p-6 shadow-sm">
          <h3 className="text-2xl lg:text-2xl font-bold tracking-tight text-gray-200 mb-4">Languages</h3>
          <p className="text-red-400">Error: {languagesError || "Failed to load languages data"}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
      {/* Currently Learning */}
      <div>
        <div className="bg-gray-900 backdrop-blur-md rounded-xl border border-gray-700/50 p-4 lg:p-6 shadow-sm w-full h-full">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl lg:text-2xl font-bold tracking-tight text-gray-200">
              Currently Learning
            </h3>
            <div className="flex items-center space-x-2">
              <button
                onClick={goToPrevLearning}
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-all bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 disabled:opacity-30 disabled:cursor-not-allowed"
                disabled={learningData.length <= 1} // Disable if only one item
              >
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
              <button
                onClick={goToNextLearning}
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-all bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 disabled:opacity-30 disabled:cursor-not-allowed"
                disabled={learningData.length <= 1} // Disable if only one item
              >
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

          <div className="relative overflow-hidden min-h-[120px] mt-4">
            {learningData.length > 0 ? (
              <motion.div
                key={currentLearningIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/40 rounded-xl p-4 lg:p-4 shadow-md backdrop-blur-md h-full"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div>
                    <h3 className="text-gray-200 text-xl font-bold leading-tight">
                      {currentLearning.topic}
                    </h3>
                    <p className="text-sm text-gray-400">via {currentLearning.platform}</p>
                    <p className="mt-4 text-sm line-clamp-2 lg:line-clamp-2 text-gray-300">
                      {currentLearning.description}
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-gray-400">Progress</span>
                      <span className="text-gray-400 font-bold">{currentLearning.progress}%</span>
                    </div>
                    <div className="w-full h-4 rounded-full bg-gray-700">
                      <div
                        className="h-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${currentLearning.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  <p className="text-sm font-semibold text-gray-400">
                    Est. completion: {currentLearning.finish_time}
                  </p>
                </div>
              </motion.div>
            ) : (
              <p className="text-gray-400 text-center py-4">No learning items found.</p>
            )}
          </div>

          {learningData.length > 1 && ( // Only show dots if there's more than one item
            <div className="flex justify-center mt-4 space-x-1">
              {learningData.map((_, i) => (
                <button
                  key={i}
                  onClick={() => handleLearningDotClick(i)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i === currentLearningIndex
                      ? 'w-6 bg-blue-400 shadow-lg scale-125'
                      : 'bg-gray-600 hover:bg-gray-500'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Languages */}
      <div>
        <div className="bg-gray-900 backdrop-blur-md rounded-xl border border-gray-700/50 p-4 lg:p-6 shadow-sm w-full h-full">
          <h3 className="text-2xl lg:text-2xl font-bold tracking-tight text-gray-200 mb-4">
            Languages
          </h3>

          <div className="space-y-2">
            {languagesData.length > 0 ? (
              languagesData.map((lang) => (
                <div
                  key={lang.id} // Use the database ID as the key
                  className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/40 rounded-xl p-4 lg:p-4 shadow-md backdrop-blur-md"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full relative">
                        <div className="absolute top-0 left-0 w-3 h-3 bg-green-500 rounded-full"></div>
                      </div>
                      <span className="font-semibold text-md text-gray-200">{lang.name}</span>
                    </div>
                    <div className="flex items-center space-x-3 ml-4 w-full max-w-md">
                      <div className="w-full rounded-full h-3 overflow-hidden shadow-inner relative bg-gray-700">
                        <div
                          className="bg-gradient-to-r from-green-400 to-blue-500 h-3 rounded-full transition-all duration-500 ease-out"
                          style={{ width: lang.width }} // Use the transformed width string
                        ></div>
                      </div>
                      <span className="text-sm w-52 text-right text-gray-400">{lang.level}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-400 text-center">No languages found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningAndLanguages;