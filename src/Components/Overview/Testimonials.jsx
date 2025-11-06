// 'use client';
// import React from 'react';

// const Testimonials = () => {
//   return (
//     <div>
//       <div className="bg-gray-900 backdrop-blur-md rounded-xl border border-gray-700/50 p-4 lg:p-6 shadow-sm h-full">
//         <div className="flex items-center justify-between">
//           <h3 className="text-2xl lg:text-2xl font-bold tracking-tight text-gray-200">
//             What People Say
//           </h3>
//           <div className="flex items-center space-x-2">
//             <button className="w-8 h-8 rounded-lg flex items-center justify-center transition-all bg-gray-700/50 hover:bg-gray-600/50 text-gray-300">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="24"
//                 height="24"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 className="lucide lucide-chevron-left w-4 h-4"
//               >
//                 <path d="m15 18-6-6 6-6"></path>
//               </svg>
//             </button>
//             <button className="w-8 h-8 rounded-lg flex items-center justify-center transition-all bg-gray-700/50 hover:bg-gray-600/50 text-gray-300">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="24"
//                 height="24"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 className="lucide lucide-chevron-right w-4 h-4"
//               >
//                 <path d="m9 18 6-6-6-6"></path>
//               </svg>
//             </button>
//           </div>
//         </div>

//         <div className="relative mt-4">
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//             <div>
//               <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/40 rounded-xl p-4 lg:p-4 shadow-md backdrop-blur-md min-h-56 h-full cursor-pointer transition-transform hover:scale-[1.01] hover:shadow-md duration-300 ease-in-out">
//                 <div className="flex items-center space-x-4 mb-4 relative z-10">
//                   <img
//                     src=""
//                     alt="Rashedul Islam"
//                     className="w-12 h-12 rounded-full object-cover ring-2 ring-yellow-400/70 shadow-md"
//                   />
//                   <div className="flex-1 min-w-0">
//                     <h4 className="font-semibold text-lg truncate text-gray-200">
//                       Rashedul Islam
//                     </h4>
//                     <p className="text-sm truncate text-gray-300">
//                       CTO at <span className="font-medium text-yellow-500">Mediusware Ltd.</span>
//                     </p>
//                   </div>
//                 </div>
//                 <p className="text-sm mb-3 line-clamp-5 leading-relaxed text-gray-200">
//                   Working with Sakib bhai has been fantastic. He&#x27;s sharp,
//                   practical, and knows exactly how to get things done. He
//                   handles tricky problems without overcomplicating them and is
//                   truly a go-to person on the team. His communication skills
//                   are excellent as well.
//                 </p>
//               </div>
//             </div>

//             <div>
//               <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/40 rounded-xl p-4 lg:p-4 shadow-md backdrop-blur-md min-h-56 h-full cursor-pointer transition-transform hover:scale-[1.01] hover:shadow-md duration-300 ease-in-out">
//                 <div className="flex items-center space-x-4 mb-4 relative z-10">
//                   <img
//                     src="https://0knuxh5ufoxzu8pa.public.blob.vercel-storage.com/avatars/fazal-mahmud-hassan-9fecc267-8f6d-415f-9105-3d97cced0496.png"
//                     alt="Fazal Mahmud Hassan"
//                     className="w-12 h-12 rounded-full object-cover ring-2 ring-yellow-400/70 shadow-md"
//                   />
//                   <div className="flex-1 min-w-0">
//                     <h4 className="font-semibold text-lg truncate text-gray-200">
//                       Fazal Mahmud Hassan
//                     </h4>
//                     <p className="text-sm truncate text-gray-300">
//                       Technical Project Manager at{" "}
//                       <span className="font-medium text-yellow-500">Mediusware Limited</span>
//                     </p>
//                   </div>
//                 </div>
//                 <p className="text-sm mb-3 line-clamp-5 leading-relaxed text-gray-200">
//                   I&#x27;ve had the pleasure of managing Sakib on a number of
//                   difficult projects. He has consistently demonstrated strong
//                   technical expertise and a thoughtful approach to
//                   problem-solving. He is reliable, detail-oriented, and takes
//                   full ownership of his work. I particularly appreciate his
//                   persistence and analytical thinking, even when faced with
//                   unclear or unconventional client requirements, Sakib took
//                   the time to understand the problem deeply and deliver an
//                   effective solution. In addition to his development skills,
//                   he is also a supportive mentor to his junior teammates,
//                   always willing to guide and share his knowledge. Sakib would
//                   be a valuable asset to any team.
//                 </p>
//               </div>
//             </div>

//             <div>
//               <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/40 rounded-xl p-4 lg:p-4 shadow-md backdrop-blur-md min-h-56 h-full cursor-pointer transition-transform hover:scale-[1.01] hover:shadow-md duration-300 ease-in-out">
//                 <div className="flex items-center space-x-4 mb-4 relative z-10">
//                   <img
//                     src="https://0knuxh5ufoxzu8pa.public.blob.vercel-storage.com/avatars/rafeu-riyan-95ca9f5d-033f-44ee-8b89-b4132229a590.png"
//                     alt="Rafeu Riyan"
//                     className="w-12 h-12 rounded-full object-cover ring-2 ring-yellow-400/70 shadow-md"
//                   />
//                   <div className="flex-1 min-w-0">
//                     <h4 className="font-semibold text-lg truncate text-gray-200">
//                       Rafeu Riyan
//                     </h4>
//                     <p className="text-sm truncate text-gray-300">
//                       Technical Project Manager at{" "}
//                       <span className="font-medium text-yellow-500">Mediusware</span>
//                     </p>
//                   </div>
//                 </div>
//                 <p className="text-sm mb-3 line-clamp-5 leading-relaxed text-gray-200">
//                   I had the privilege of working closely with Sakib as our
//                   Lead Backend Engineer on Diplomat AI, an innovative
//                   AI-powered mobile application. From the very beginning,
//                   Sakib stood out for his rare blend of technical mastery,
//                   leadership maturity, and genuine collaboration.
//                   He architected a scalable and resilient backend
//                   infrastructure and led the team with clarity, empathy, and
//                   precision. Beyond his strong command of backend technologies
//                   and AI systems, what truly makes Sakib exceptional is his
//                   ability to bring people together translating complex ideas
//                   into simple, actionable steps, and fostering a culture of
//                   trust, learning, and shared ownership.
//                   Sakib consistently balances innovation with delivery
//                   discipline, ensuring that ambitious ideas turn into
//                   tangible, high quality outcomes. His calm approach to
//                   challenges, proactive communication, and willingness to
//                   mentor others have made a lasting impact on both the product
//                   and the team.
//                   I wholeheartedly recommend Sakib for any role that values
//                   technical excellence, collaborative leadership, and forward
//                   thinking innovation.
//                 </p>
//               </div>
//             </div>
//           </div>

//           <div className="flex justify-center mt-4 gap-2">
//             <button className="w-6 h-2 rounded-full transition-all duration-200 bg-cyan-500"></button>
//             <button className="w-2 h-2 rounded-full transition-all duration-200 bg-gray-600 hover:bg-gray-500"></button>
//             <button className="w-2 h-2 rounded-full transition-all duration-200 bg-gray-600 hover:bg-gray-500"></button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Testimonials;












// app/components/Testimonials.jsx
'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Testimonials = () => {
  const testimonialsData = [
    {
      name: "Rashedul Islam",
      role: "CTO at Mediusware Ltd.",
      avatar: "/avatar.webp",
      content:
        "Working with Sakib bhai has been fantastic. He's sharp, practical, and knows exactly how to get things done. He handles tricky problems without overcomplicating them and is truly a go-to person on the team. His communication skills are excellent as well.",
    },
    {
      name: "Fazal Mahmud Hassan",
      role: "Technical Project Manager at Mediusware Limited",
      avatar: "https://0knuxh5ufoxzu8pa.public.blob.vercel-storage.com/avatars/fazal-mahmud-hassan-9fecc267-8f6d-415f-9105-3d97cced0496.png",
      content:
        "I've had the pleasure of managing Sakib on a number of difficult projects. He has consistently demonstrated strong technical expertise and a thoughtful approach to problem-solving. He is reliable, detail-oriented, and takes full ownership of his work. I particularly appreciate his persistence and analytical thinking, even when faced with unclear or unconventional client requirements, Sakib took the time to understand the problem deeply and deliver an effective solution. In addition to his development skills, he is also a supportive mentor to his junior teammates, always willing to guide and share his knowledge. Sakib would be a valuable asset to any team.",
    },
    {
      name: "Rafeu Riyan",
      role: "Technical Project Manager at Mediusware",
      avatar: "https://0knuxh5ufoxzu8pa.public.blob.vercel-storage.com/avatars/rafeu-riyan-95ca9f5d-033f-44ee-8b89-b4132229a590.png",
      content:
        "I had the privilege of working closely with Sakib as our Lead Backend Engineer on Diplomat AI, an innovative AI-powered mobile application. From the very beginning, Sakib stood out for his rare blend of technical mastery, leadership maturity, and genuine collaboration.",
    },
    {
      name: "Tarif Haque",
      role: "Technical Project Manager at Mediusware",
      avatar: "https://0knuxh5ufoxzu8pa.public.blob.vercel-storage.com/avatars/tarif-haque-b181d754-cf04-44ef-be47-e0452edc9b43.jpeg",
      content:
        "Sakib is a super-awesome Solutions Architect and Full-Stack Developer. He leads us with his skills in designing and deploying scalable, high-performance systems. He consistently delivers a “wow” experience through his work—always cool-headed, communicative, and inspiring.",
    },
    {
      name: "Md. Moshfiqur Rahman Rony",
      role: "Software Engineer at Worklife, Inc.",
      avatar: "https://0knuxh5ufoxzu8pa.public.blob.vercel-storage.com/avatars/md.-moshfiqur-rahman-rony-e6230786-6adc-4084-a5a8-ce3a65c47374.png",
      content:
        "I had the privilege of working with Sakib Rahman, my immediate senior, for two years. Sakib is an exceptional problem solver with a deep understanding of real-world challenges.",
    },
    {
      name: "Abbas Uddin Sheikh",
      role: "CTO at Talent Pro",
      avatar: "/avatar.webp",
      content:
        "I had the pleasure of working with Sakib Rahman during his time at Talent Pro, where he consistently demonstrated strong dedication and professionalism.",
    }
  ];

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(testimonialsData.length / itemsPerPage);

  const next = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prev = () => {
    setCurrentPage((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
  };

  // Auto-rotate every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      next();
    }, 8000);
    return () => clearInterval(interval);
  }, [currentPage]);

  const startIndex = currentPage * itemsPerPage;
  const currentTestimonials = testimonialsData.slice(startIndex, startIndex + itemsPerPage);

  // Fill with empty slots if needed (to keep grid consistent)
  while (currentTestimonials.length < itemsPerPage) {
    currentTestimonials.push(null);
  }

  return (
    <div className="bg-gray-900 backdrop-blur-md rounded-xl border border-gray-700/50 p-4 lg:p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl lg:text-2xl font-bold tracking-tight text-gray-200">
          What People Say
        </h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={prev}
            className="w-8 h-8 rounded-lg flex items-center justify-center transition-all bg-gray-700/50 hover:bg-gray-600/50 text-gray-300"
            aria-label="Previous page"
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
            onClick={next}
            className="w-8 h-8 rounded-lg flex items-center justify-center transition-all bg-gray-700/50 hover:bg-gray-600/50 text-gray-300"
            aria-label="Next page"
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

      <div className="relative mt-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {currentTestimonials.map((testimonial, idx) => (
                <div key={startIndex + idx}>
                  {testimonial ? (
                    <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/40 rounded-xl p-4 lg:p-4 shadow-md backdrop-blur-md min-h-56 h-full cursor-pointer transition-transform hover:scale-[1.01] hover:shadow-md duration-300 ease-in-out">
                      <div className="flex items-center space-x-4 mb-4 relative z-10">
                        <img
                          src={testimonial.avatar}
                          onError={(e) => {
                            e.currentTarget.src = "/placeholder-avatar.png";
                          }}
                          alt={testimonial.name}
                          className="w-12 h-12 rounded-full object-cover ring-2 ring-yellow-400/70 shadow-md"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-lg truncate text-gray-200">
                            {testimonial.name}
                          </h4>
                          <p className="text-sm truncate text-gray-300">
                            {testimonial.role}
                          </p>
                        </div>
                      </div>
                      <p className="text-sm mb-3 line-clamp-5 leading-relaxed text-gray-200">
                        {testimonial.content}
                      </p>
                    </div>
                  ) : (
                    <div className="invisible"> {/* Keep grid spacing */ }</div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Page indicators (dots = number of pages) */}
      <div className="flex justify-center mt-4 gap-2">
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i)}
            className={`w-2 h-2 rounded-full transition-all duration-200 ${
              i === currentPage ? "w-6 bg-cyan-500" : "bg-gray-600 hover:bg-gray-500"
            }`}
            aria-label={`Go to page ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Testimonials;























