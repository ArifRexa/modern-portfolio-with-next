'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const FunFactsAndInterests = () => {
  // Hardcoded fun facts from your data
  const funFactsData = [
    {
      title: "Runs on Cha & Singara",
      description: "Consumes at least 2 cups of milk tea or coffee daily, especially during debugging marathons",
      category: "Lifestyle",
      impact: "Keeps energy levels high but may increase snack budget by 30%",
      color: "pink",
      is_active: true
    },
    {
      title: "Writes Code Past Midnight",
      description: "Peak productivity hours start after 11 PM when Dhaka traffic noise finally fades",
      category: "Work Habits",
      impact: "Delivers bug-free commits but shifts sleeping schedule by +2 hours",
      color: "blue",
      is_active: true
    },
    {
      title: "Regular Adda with Tech Friends",
      description: "Weekly meetups at local cafes to discuss AI, football, and startup ideas",
      category: "Social",
      impact: "Expands network and sparks side-project inspiration",
      color: "green",
      is_active: true
    },
    {
      title: "Cricket Match = Half-Day Productivity",
      description: "When Bangladesh is playing, commits drop by 50% but morale skyrockets",
      category: "Passion",
      impact: "Boosts team spirit but delays Jira ticket resolutions",
      color: "red",
      is_active: true
    },
    {
      title: "Traffic Jam Problem Solver",
      description: "Stuck in endless Dhaka traffic, juggling debugging, emails, and questioning my life choices",
      category: "Productivity",
      impact: "Turns wasted hours into productive sessions",
      color: "indigo",
      is_active: true
    },
    {
      title: "Has More Repos Than Finished Projects",
      description: "Starts a fresh GitHub repo for every random idea that crosses my mind, yet almost 80% of them remain untouched",
      category: "Developer Life",
      impact: "Boosts creativity but clutters GitHub profile",
      color: "brown",
      is_active: true
    }
  ];

  // Hardcoded groove/interest data
  const grooveData = [
    {
      title: "Energy Level: High",
      subtitle: "Full of energy, ready for challenging tasks",
      type: "ENERGY_LEVEL"
    },
    {
      title: "Coffee Count Today: 1",
      subtitle: "A gentle start to the day",
      type: "COFFEE"
    },
    {
      title: "Clean Code by Robert Martin",
      subtitle: "A Handbook of Agile Software Craftsmanship",
      type: "READING_BOOK"
    },
    {
      title: "Deep Music for Focus and Stress Relief",
      subtitle: "Music for Deep Focus",
      type: "LISTENING"
    }
  ];

  const [currentFactIndex, setCurrentFactIndex] = useState(0);
  const [currentInterestIndex, setCurrentInterestIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Use current fact based on state
  const funFact = funFactsData[currentFactIndex];

  // Use current interest based on state
  const currentInterest = grooveData[currentInterestIndex];

  // Color mapping
  const colorMap = {
    pink: { bg: 'bg-pink-500/20', text: 'text-pink-300', strong: 'text-pink-400' },
    blue: { bg: 'bg-blue-500/20', text: 'text-blue-300', strong: 'text-blue-400' },
    green: { bg: 'bg-green-500/20', text: 'text-green-300', strong: 'text-green-400' },
    red: { bg: 'bg-red-500/20', text: 'text-red-300', strong: 'text-red-400' },
    indigo: { bg: 'bg-indigo-500/20', text: 'text-indigo-300', strong: 'text-indigo-400' },
    brown: { bg: 'bg-orange-500/20', text: 'text-orange-300', strong: 'text-orange-400' },
  };

  const color = colorMap[funFact.color] || colorMap.pink;

  // Navigation functions for fun facts
  const goToNextFact = () => {
    setIsAnimating(true);
    setCurrentFactIndex((prevIndex) => (prevIndex + 1) % funFactsData.length);
  };

  const goToPrevFact = () => {
    setIsAnimating(true);
    setCurrentFactIndex((prevIndex) => (prevIndex - 1 + funFactsData.length) % funFactsData.length);
  };

  // Navigation functions for interests
  const goToNextInterest = () => {
    setIsAnimating(true);
    setCurrentInterestIndex((prevIndex) => (prevIndex + 1) % grooveData.length);
  };

  const goToPrevInterest = () => {
    setIsAnimating(true);
    setCurrentInterestIndex((prevIndex) => (prevIndex - 1 + grooveData.length) % grooveData.length);
  };

  // Function to handle dot click for fun facts
  const handleFactDotClick = (index) => {
    if (index !== currentFactIndex) {
      setIsAnimating(true);
      setCurrentFactIndex(index);
    }
  };

  // Function to handle dot click for interests
  const handleInterestDotClick = (index) => {
    if (index !== currentInterestIndex) {
      setIsAnimating(true);
      setCurrentInterestIndex(index);
    }
  };

  // Auto-rotate fun facts every 10 seconds
  useEffect(() => {
    const factInterval = setInterval(() => {
      setIsAnimating(true);
      setCurrentFactIndex((prevIndex) => (prevIndex + 1) % funFactsData.length);
    }, 4500);

    // Reset animation state after transition
    const resetAnimation = setTimeout(() => {
      setIsAnimating(false);
    }, 300);

    return () => {
      clearInterval(factInterval);
      clearTimeout(resetAnimation);
    };
  }, [currentFactIndex]);

  // Auto-rotate interests every 10 seconds
  useEffect(() => {
    const interestInterval = setInterval(() => {
      setIsAnimating(true);
      setCurrentInterestIndex((prevIndex) => (prevIndex + 1) % grooveData.length);
    }, 5000);

    return () => {
      clearInterval(interestInterval);
    };
  }, []);

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
              <button 
                onClick={goToPrevFact}
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-all bg-gray-700/50 hover:bg-gray-600/50 text-gray-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-left w-4 h-4">
                  <path d="m15 18-6-6 6-6"></path>
                </svg>
              </button>
              <button 
                onClick={goToNextFact}
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-all bg-gray-700/50 hover:bg-gray-600/50 text-gray-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right w-4 h-4">
                  <path d="m9 18 6-6-6-6"></path>
                </svg>
              </button>
            </div>
          </div>

          <div className="relative min-h-[130px] mt-4">
            <motion.div
              key={currentFactIndex} 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/40 rounded-xl p-4 lg:p-4 shadow-md backdrop-blur-md h-full cursor-pointer"
            >
              <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium mb-2 ${color.bg} ${color.text}`}>
                {funFact.category}
              </div>
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h4 className={`text-base font-extrabold leading-tight mb-1 ${color.text}`}>
                    {funFact.title}
                  </h4>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {funFact.description}
                  </p>
                </div>
                <div className="ml-3 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`lucide lucide-trending-up w-4 h-4 ${color.strong}`}>
                    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
                    <polyline points="16 7 22 7 22 13"></polyline>
                  </svg>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-gray-700/50">
                <p className={`text-sm font-medium ${color.strong}`}>
                  {funFact.impact}
                </p>
              </div>
            </motion.div>
          </div>

          <div className="flex justify-center mt-4 space-x-2">
            {funFactsData.map((_, i) => (
              <button
                key={i}
                onClick={() => handleFactDotClick(i)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i === currentFactIndex ? 'w-6 bg-blue-400 shadow-lg scale-125' : 'bg-gray-600 hover:bg-gray-500'
                }`}
              />
            ))}
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
              <button 
                onClick={goToPrevInterest}
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-all bg-gray-700/50 hover:bg-gray-600/50 text-gray-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-left w-4 h-4">
                  <path d="m15 18-6-6 6-6"></path>
                </svg>
              </button>
              <button 
                onClick={goToNextInterest}
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-all bg-gray-700/50 hover:bg-gray-600/50 text-gray-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right w-4 h-4">
                  <path d="m9 18 6-6-6-6"></path>
                </svg>
              </button>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-xl flex-1 flex items-center mt-4">
            <div className="w-full">
              <motion.div
                key={currentInterestIndex} 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/40 rounded-xl p-4 lg:p-4 shadow-md backdrop-blur-md h-full cursor-pointer"
              >
                <div className="relative z-10">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-pink-500/20 to-rose-500/20 border-pink-500/30 border backdrop-blur-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-zap w-6 h-6 text-white">
                        <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"></path>
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-pink-300 text-base lg:text-lg font-extrabold leading-tight mb-1">
                        {currentInterest.title}
                      </h4>
                      <p className="text-sm mb-2 text-gray-300">
                        {currentInterest.subtitle}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          <div className="flex justify-center gap-2 mt-4">
            {grooveData.map((_, i) => (
              <button
                key={i}
                onClick={() => handleInterestDotClick(i)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i === currentInterestIndex ? 'w-6 bg-blue-500 shadow-lg scale-125' : 'bg-gray-600 hover:bg-gray-500'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FunFactsAndInterests;