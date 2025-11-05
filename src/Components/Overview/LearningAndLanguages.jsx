// // app/components/LearningAndLanguages.tsx
// 'use client';
// import React from 'react';

// const LearningAndLanguages = () => {
//   return (
//     <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
//       {/* Currently Learning */}
//       <div>
//         <div className="bg-gray-900 backdrop-blur-md rounded-xl border border-gray-700/50 p-4 lg:p-6 shadow-sm w-full h-full">
//           <div className="flex items-center justify-between">
//             <h3 className="text-2xl lg:text-2xl font-bold tracking-tight text-gray-200">
//               Currently Learning
//             </h3>
//             <div className="flex items-center space-x-2">
//               <button className="w-8 h-8 rounded-lg flex items-center justify-center transition-all bg-gray-700/50 hover:bg-gray-600/50 text-gray-300">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   width="24"
//                   height="24"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="currentColor"
//                   strokeWidth="2"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   className="lucide lucide-chevron-left w-4 h-4"
//                 >
//                   <path d="m15 18-6-6 6-6"></path>
//                 </svg>
//               </button>
//               <button className="w-8 h-8 rounded-lg flex items-center justify-center transition-all bg-gray-700/50 hover:bg-gray-600/50 text-gray-300">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   width="24"
//                   height="24"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="currentColor"
//                   strokeWidth="2"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   className="lucide lucide-chevron-right w-4 h-4"
//                 >
//                   <path d="m9 18 6-6-6-6"></path>
//                 </svg>
//               </button>
//             </div>
//           </div>

//           <div className="relative overflow-hidden min-h-[120px] mt-4">
//             <div>
//               <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/40 rounded-xl p-4 lg:p-4 shadow-md backdrop-blur-md h-full">
//                 <div className="flex items-center space-x-3 mb-4">
//                   <div>
//                     <h3 className="text-gray-200 text-xl font-bold leading-tight">
//                       AWS Web Services
//                     </h3>
//                     <p className="text-sm text-gray-400">via AWS Documentation / Tutorials</p>
//                     <p className="mt-4 text-sm line-clamp-2 lg:line-clamp-2 text-gray-300">
//                       Learning AWS web services in detail, covering core concepts like EC2, S3,
//                       IAM, Lambda, and VPC, while preparing for the AWS Certified Solutions
//                       Architect exam.
//                     </p>
//                   </div>
//                 </div>

//                 <div className="space-y-3">
//                   <div>
//                     <div className="flex items-center justify-between mb-1">
//                       <span className="text-gray-400">Progress</span>
//                       <span className="text-gray-400 font-bold">18%</span>
//                     </div>
//                     <div className="w-full h-4 rounded-full bg-gray-700">
//                       <div
//                         className="h-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-full transition-all duration-1000 ease-out"
//                         style={{ width: '18%' }}
//                       ></div>
//                     </div>
//                   </div>
//                   <p className="text-sm font-semibold text-gray-400">Est. completion: 2026-04-30</p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="flex justify-center mt-4 space-x-1">
//             <button className="w-2 h-2 rounded-full transition-all duration-300 bg-blue-400 shadow-lg scale-125"></button>
//             <button className="w-2 h-2 rounded-full transition-all duration-300 bg-gray-600 hover:bg-gray-500"></button>
//           </div>
//         </div>
//       </div>

//       {/* Languages */}
//       <div>
//         <div className="bg-gray-900 backdrop-blur-md rounded-xl border border-gray-700/50 p-4 lg:p-6 shadow-sm w-full h-full">
//           <h3 className="text-2xl lg:text-2xl font-bold tracking-tight text-gray-200 mb-4">
//             Languages
//           </h3>

//           <div className="space-y-2">
//             {[
//               { name: 'Bengali', level: 'Native', width: '100%' },
//               { name: 'English', level: 'Fluent', width: '90%' },
//               { name: 'Urdu', level: 'Conversational', width: '70%' },
//               { name: 'Turkish', level: 'Conversational', width: '70%' },
//             ].map((lang) => (
//               <div
//                 key={lang.name}
//                 className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/40 rounded-xl p-4 lg:p-4 shadow-md backdrop-blur-md"
//               >
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center space-x-2">
//                     <div className="w-3 h-3 bg-green-500 rounded-full relative">
//                       <div className="absolute top-0 left-0 w-3 h-3 bg-green-500 rounded-full"></div>
//                     </div>
//                     <span className="font-semibold text-md text-gray-200">{lang.name}</span>
//                   </div>
//                   <div className="flex items-center space-x-3 ml-4 w-full max-w-md">
//                     <div className="w-full rounded-full h-3 overflow-hidden shadow-inner relative bg-gray-700">
//                       <div
//                         className="bg-gradient-to-r from-green-400 to-blue-500 h-3 rounded-full transition-all duration-500 ease-out"
//                         style={{ width: lang.width }}
//                       ></div>
//                     </div>
//                     <span className="text-sm w-52 text-right text-gray-400">{lang.level}</span>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LearningAndLanguages;




// app/components/LearningAndLanguages.tsx
// app/components/LearningAndLanguages.jsx
'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const LearningAndLanguages = () => {
  // Hardcoded learning data
  const learningData = [
    {
      topic: "AWS Web Services",
      platform: "AWS Documentation / Tutorials",
      description: "Learning AWS web services in detail, covering core concepts like EC2, S3, IAM, Lambda, and VPC, while preparing for the AWS Certified Solutions Architect exam.",
      progress: 18,
      finish_time: "2026-04-30"
    },
    {
      topic: "Docker - Advanced",
      platform: "Docker Documentations",
      description: "Explore the advanced containerization techniques and unlock the transformative benefits of packaging, deploying, and managing your applications in isolated, portable environments.",
      progress: 6,
      finish_time: "2025-12-31"
    }
  ];

  // Hardcoded languages
  const languagesData = [
    { name: "Bengali", level: "Native", width: "100%" },
    { name: "English", level: "Fluent", width: "90%" },
    { name: "Chinese", level: "Conversational", width: "70%" }
  ];

  const [currentLearningIndex, setCurrentLearningIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const currentLearning = learningData[currentLearningIndex];

  // Navigation handlers for learning
  const goToNextLearning = () => {
    setIsAnimating(true);
    setCurrentLearningIndex((prev) => (prev + 1) % learningData.length);
  };

  const goToPrevLearning = () => {
    setIsAnimating(true);
    setCurrentLearningIndex((prev) => (prev - 1 + learningData.length) % learningData.length);
  };

  const handleLearningDotClick = (index) => {
    if (index !== currentLearningIndex) {
      setIsAnimating(true);
      setCurrentLearningIndex(index);
    }
  };

  // Auto-rotate learning every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setCurrentLearningIndex((prev) => (prev + 1) % learningData.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  // Reset animation flag after transition
  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => setIsAnimating(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isAnimating]);

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
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-all bg-gray-700/50 hover:bg-gray-600/50 text-gray-300"
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
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-all bg-gray-700/50 hover:bg-gray-600/50 text-gray-300"
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
          </div>

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
        </div>
      </div>

      {/* Languages — static (no carousel needed) */}
      <div>
        <div className="bg-gray-900 backdrop-blur-md rounded-xl border border-gray-700/50 p-4 lg:p-6 shadow-sm w-full h-full">
          <h3 className="text-2xl lg:text-2xl font-bold tracking-tight text-gray-200 mb-4">
            Languages
          </h3>

          <div className="space-y-2">
            {languagesData.map((lang) => (
              <div
                key={lang.name}
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
                        style={{ width: lang.width }}
                      ></div>
                    </div>
                    <span className="text-sm w-52 text-right text-gray-400">{lang.level}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningAndLanguages;