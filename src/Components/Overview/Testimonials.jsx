// app/components/Testimonials.jsx
'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import supabase from '@/utils/supabaseClient';
import avatarPlaceholder from '../../../public/images/avatar-image.png';
import { useTheme } from '@/context/ThemeContext';

const Testimonials = () => {
  const { theme } = useTheme();
  const testimonialsData = [
    {
      name: "Rashedul Islam",
      role: "CTO at Mediusware Ltd.",
      avatar: "https://png.pngtree.com/png-clipart/20230927/original/pngtree-man-avatar-image-for-profile-png-image_13001882.png",
      content:
        "Working with Arif bhai has been fantastic. He's sharp, practical, and knows exactly how to get things done. He handles tricky problems without overcomplicating them and is truly a go-to person on the team. His communication skills are excellent as well.",
    },
    {
      name: "Fazal Mahmud Hassan",
      role: "Technical Project Manager at Mediusware Limited",
      avatar: "https://0knuxh5ufoxzu8pa.public.blob.vercel-storage.com/avatars/fazal-mahmud-hassan-9fecc267-8f6d-415f-9105-3d97cced0496.png",
      content:
        "I've had the pleasure of managing Arif on a number of difficult projects. He has consistently demonstrated strong technical expertise and a thoughtful approach to problem-solving. He is reliable, detail-oriented, and takes full ownership of his work. I particularly appreciate his persistence and analytical thinking, even when faced with unclear or unconventional client requirements, Arif took the time to understand the problem deeply and deliver an effective solution. In addition to his development skills, he is also a supportive mentor to his junior teammates, always willing to guide and share his knowledge. Arif would be a valuable asset to any team.",
    },
    {
      name: "Rafeu Riyan",
      role: "Technical Project Manager at Mediusware",
      avatar: "https://0knuxh5ufoxzu8pa.public.blob.vercel-storage.com/avatars/rafeu-riyan-95ca9f5d-033f-44ee-8b89-b4132229a590.png",
      content:
        "I had the privilege of working closely with Arif as our Lead Backend Engineer on Diplomat AI, an innovative AI-powered mobile application. From the very beginning, Arif stood out for his rare blend of technical mastery, leadership maturity, and genuine collaboration.",
    },
    {
      name: "Tarif Haque",
      role: "Technical Project Manager at Mediusware",
      avatar: "https://0knuxh5ufoxzu8pa.public.blob.vercel-storage.com/avatars/tarif-haque-b181d754-cf04-44ef-be47-e0452edc9b43.jpeg",
      content:
        "Arif is a super-awesome Solutions Architect and Full-Stack Developer. He leads us with his skills in designing and deploying scalable, high-performance systems. He consistently delivers a “wow” experience through his work—always cool-headed, communicative, and inspiring.",
    },
    // {
    //   name: "Md. Moshfiqur Rahman Rony",
    //   role: "Software Engineer at Worklife, Inc.",
    //   avatar: "https://0knuxh5ufoxzu8pa.public.blob.vercel-storage.com/avatars/md.-moshfiqur-rahman-rony-e6230786-6adc-4084-a5a8-ce3a65c47374.png",
    //   content:
    //     "I had the privilege of working with Ariful Islam, my immediate senior, for two years. Arif is an exceptional problem solver with a deep understanding of real-world challenges.",
    // },
    // {
    //   name: "Abbas Uddin Sheikh",
    //   role: "CTO at Talent Pro",
    //   avatar: "https://png.pngtree.com/png-clipart/20230927/original/pngtree-man-avatar-image-for-profile-png-image_13001882.png",
    //   content:
    //     "I had the pleasure of working with Ariful Islam during his time at Talent Pro, where he consistently demonstrated strong dedication and professionalism.",
    // }
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
    <div className={`${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'} backdrop-blur-md rounded-xl border ${theme === 'dark' ? 'border-gray-700/50' : 'border-gray-300'} p-4 lg:p-6 shadow-sm`}>
      <div className="flex items-center justify-between">
        <h3 className={`text-2xl lg:text-2xl font-bold tracking-tight ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
          What People Say
        </h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={prev}
            className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${theme === 'dark' ? 'bg-gray-700/50 hover:bg-gray-600/50 text-gray-300' : 'bg-gray-300 hover:bg-gray-400 text-gray-700'}`}
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
            className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${theme === 'dark' ? 'bg-gray-700/50 hover:bg-gray-600/50 text-gray-300' : 'bg-gray-300 hover:bg-gray-400 text-gray-700'}`}
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
                    <div className={`bg-gradient-to-br ${theme === 'dark' ? 'from-gray-800 to-gray-900 border-gray-700/40' : 'from-gray-200 to-gray-50 border-gray-300'} rounded-xl p-4 lg:p-4 shadow-md backdrop-blur-md min-h-56 h-full cursor-pointer transition-transform hover:scale-[1.01] hover:shadow-md duration-300 ease-in-out`}>
                      <div className="flex items-center space-x-4 mb-4 relative z-10">
                        <Image
                          src={testimonial.avatar || avatarPlaceholder}
                          alt={testimonial.name}
                          width={48}
                          height={48}
                          unoptimized
                          onError={(e) => {
                            // fallback to local placeholder image
                            // avatarPlaceholder is imported StaticImageData, use its src if available
                            // @ts-ignore
                            e.currentTarget.src = (avatarPlaceholder && avatarPlaceholder.src) ? avatarPlaceholder.src : String(avatarPlaceholder);
                          }}
                          className="w-12 h-12 rounded-full object-cover ring-2 ring-yellow-400/70 shadow-md"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className={`font-semibold text-lg truncate ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
                            {testimonial.name}
                          </h4>
                          <p className={`text-sm truncate ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                            {testimonial.role}
                          </p>
                        </div>
                      </div>
                      <p className={`text-sm mb-3 line-clamp-5 leading-relaxed ${theme === 'dark' ? 'text-gray-200' : 'text-gray-600'}`}>
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
































































// Dynamic Version: Using Supabase to fetch testimonials from the database.

// // app/components/Testimonials.jsx
// 'use client';
// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import Image from 'next/image';
// import supabase from '@/utils/supabaseClient';

// const Testimonials = () => {
//   const [testimonialsData, setTestimonialsData] = useState([]);
//   const [currentPage, setCurrentPage] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedTestimonial, setSelectedTestimonial] = useState(null);
//   const [showModal, setShowModal] = useState(false);

//   const itemsPerPage = 3;

//   useEffect(() => {
//     const fetchTestimonials = async () => {
//       try {
//         setLoading(true);
//         const { data, error } = await supabase
//           .from('testimonials')
//           .select('*')
//           .eq('is_approved', true)
//           .order('created_at', { ascending: false });

//         if (error) {
//           console.error('Error fetching testimonials:', error);
//           setError(error.message);
//         } else {
//           setTestimonialsData(data || []);
//         }
//       } catch (err) {
//         console.error('Unexpected error:', err);
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTestimonials();

//     // Auto-rotate every 8 seconds
//     const interval = setInterval(() => {
//       setCurrentPage((prev) => {
//         const totalPages = Math.ceil(testimonialsData.length / itemsPerPage);
//         return (prev + 1) % totalPages;
//       });
//     }, 8000);

//     return () => clearInterval(interval);
//   }, []);

//   const totalPages = Math.ceil(testimonialsData.length / itemsPerPage);

//   const next = () => {
//     setCurrentPage((prev) => (prev + 1) % totalPages);
//   };

//   const prev = () => {
//     setCurrentPage((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
//   };

//   const startIndex = currentPage * itemsPerPage;
//   const currentTestimonials = testimonialsData.slice(startIndex, startIndex + itemsPerPage);

//   // Fill with empty slots if needed (to keep grid consistent)
//   while (currentTestimonials.length < itemsPerPage) {
//     currentTestimonials.push(null);
//   }

//   if (loading) {
//     return (
//       <div className="bg-gray-900 backdrop-blur-md rounded-xl border border-gray-700/50 p-4 lg:p-6 shadow-sm">
//         <div className="flex items-center justify-between">
//           <h3 className="text-2xl lg:text-2xl font-bold tracking-tight text-gray-200">
//             What People Say
//           </h3>
//         </div>
//         <div className="flex justify-center items-center py-12">
//           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
//           <span className="ml-2 text-gray-400">Loading testimonials...</span>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="bg-gray-900 backdrop-blur-md rounded-xl border border-gray-700/50 p-4 lg:p-6 shadow-sm">
//         <div className="flex items-center justify-between">
//           <h3 className="text-2xl lg:text-2xl font-bold tracking-tight text-gray-200">
//             What People Say
//           </h3>
//         </div>
//         <div className="flex justify-center items-center py-12">
//           <div className="text-center">
//             <p className="text-red-400">Error loading testimonials: {error}</p>
//             <p className="text-gray-400 text-sm mt-2">Please try again later.</p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <>
//       <div className="bg-gray-900 backdrop-blur-md rounded-xl border border-gray-700/50 p-4 lg:p-6 shadow-sm">
//         <div className="flex items-center justify-between">
//           <h3 className="text-2xl lg:text-2xl font-bold tracking-tight text-gray-200">
//             What People Say
//           </h3>
//           <div className="flex items-center space-x-2">
//             <button
//               onClick={prev}
//               className="w-8 h-8 rounded-lg flex items-center justify-center transition-all bg-gray-700/50 hover:bg-gray-600/50 text-gray-300"
//               aria-label="Previous page"
//             >
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
//             <button
//               onClick={next}
//               className="w-8 h-8 rounded-lg flex items-center justify-center transition-all bg-gray-700/50 hover:bg-gray-600/50 text-gray-300"
//               aria-label="Next page"
//             >
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
//           <AnimatePresence mode="wait">
//             <motion.div
//               key={currentPage}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -20 }}
//               transition={{ duration: 0.4 }}
//             >
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                 {currentTestimonials.map((testimonial, idx) => (
//                   <div key={startIndex + idx}>
//                     {testimonial ? (
//                       <div
//                         className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/40 rounded-xl p-4 lg:p-4 shadow-md backdrop-blur-md min-h-56 h-full cursor-pointer transition-transform hover:scale-[1.01] hover:shadow-md duration-300 ease-in-out"
//                         onClick={() => {
//                           setSelectedTestimonial(testimonial);
//                           setShowModal(true);
//                         }}
//                       >
//                         <div className="flex items-center space-x-4 mb-4 relative z-10">
//                           <Image
//                             src={testimonial.avatar_url || "/placeholder-avatar.png"}
//                             alt={testimonial.name}
//                             width={48}
//                             height={48}
//                             unoptimized
//                             onError={(e) => {
//                               e.currentTarget.src = "/placeholder-avatar.png";
//                             }}
//                             className="w-12 h-12 rounded-full object-cover ring-2 ring-yellow-400/70 shadow-md"
//                           />
//                           <div className="flex-1 min-w-0">
//                             <h4 className="font-semibold text-lg truncate text-gray-200">
//                               {testimonial.name}
//                             </h4>
//                             <p className="text-sm truncate text-gray-300">
//                               {testimonial.designation} at <span className="font-medium text-yellow-500">{testimonial.company}</span>
//                             </p>
//                           </div>
//                         </div>
//                         <p className="text-sm mb-3 line-clamp-5 leading-relaxed text-gray-200">
//                           {testimonial.testimonial}
//                         </p>
//                       </div>
//                     ) : (
//                       <div className="invisible"> {/* Keep grid spacing */ }</div>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             </motion.div>
//           </AnimatePresence>
//         </div>

//         {/* Page indicators (dots = number of pages) */}
//         <div className="flex justify-center mt-4 gap-2">
//           {Array.from({ length: totalPages }).map((_, i) => (
//             <button
//               key={i}
//               onClick={() => setCurrentPage(i)}
//               className={`w-2 h-2 rounded-full transition-all duration-200 ${
//                 i === currentPage ? "w-6 bg-cyan-500" : "bg-gray-600 hover:bg-gray-500"
//               }`}
//               aria-label={`Go to page ${i + 1}`}
//             />
//           ))}
//         </div>
//       </div>

//       {/* Testimonial Detail Modal */}
//       {showModal && selectedTestimonial && (
//         <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
//           <div className="bg-gray-900 rounded-xl border border-gray-700/50 w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 relative">
//             <button
//               onClick={() => setShowModal(false)}
//               className="absolute top-4 right-4 text-gray-400 hover:text-gray-200 transition-colors"
//               aria-label="Close testimonial"
//             >
//               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
//                 <path d="M18 6 6 18"></path>
//                 <path d="m6 6 12 12"></path>
//               </svg>
//             </button>

//             <div className="flex items-start space-x-4">
//               <Image
//                 src={selectedTestimonial.avatar_url || "/placeholder-avatar.png"}
//                 alt={selectedTestimonial.name}
//                 width={64}
//                 height={64}
//                 unoptimized
//                 onError={(e) => {
//                   e.currentTarget.src = "/placeholder-avatar.png";
//                 }}
//                 className="w-16 h-16 rounded-full object-cover ring-2 ring-yellow-400/70 shadow-md"
//               />
//               <div>
//                 <h3 className="text-xl font-bold text-gray-200">{selectedTestimonial.name}</h3>
//                 <p className="text-gray-400">
//                   {selectedTestimonial.designation} at <span className="font-medium text-yellow-500">{selectedTestimonial.company}</span>
//                 </p>
//                 {selectedTestimonial.location && (
//                   <p className="text-sm text-gray-500">
//                     {selectedTestimonial.location}
//                   </p>
//                 )}
//               </div>
//             </div>

//             <div className="mt-6">
//               <p className="text-gray-300 leading-relaxed">
//                 {selectedTestimonial.testimonial}
//               </p>
//             </div>

//             <div className="mt-6 text-sm text-gray-500">
//               <p>Submitted on: {new Date(selectedTestimonial.created_at).toLocaleDateString()}</p>
//             </div>

//             <div className="mt-6 flex justify-end">
//               <button
//                 onClick={() => setShowModal(false)}
//                 className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-200 rounded-lg transition-colors"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default Testimonials;




































