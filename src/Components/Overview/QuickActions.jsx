// 'use client';
// import React from 'react';

// const QuickActions = () => {
//   return (
//     <div className="grid grid-cols-2 md:grid-cols-4 gap-2 lg:gap-4">
//       {/* Download CV */}
//       <div className="bg-gray-900 backdrop-blur-md rounded-xl border border-gray-700/50 p-4 lg:p-6 shadow-sm text-center h-full">
//         <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center mx-auto mb-2">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             width="24"
//             height="24"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="2"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             className="lucide lucide-file-text h-8 w-8 text-white"
//           >
//             <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
//             <path d="M14 2v4a2 2 0 0 0 2 2h4" />
//             <path d="M10 9H8" />
//             <path d="M16 13H8" />
//             <path d="M16 17H8" />
//           </svg>
//         </div>
//         <h3 className="text-lg font-bold text-gray-200">Download CV</h3>
//         <p className="text-sm mb-4 text-gray-400">Get my resume in PDF format</p>
//         <a target="_blank" href="docs/resume.pdf" rel="noopener noreferrer">
//           <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-10 px-4 py-2 w-full bg-orange-500/20 hover:bg-orange-500/30 text-orange-400 border-orange-500/50 border backdrop-blur-sm">
//             Download PDF
//           </button>
//         </a>
//       </div>

//       {/* GitHub Profile */}
//       <div className="bg-gray-900 backdrop-blur-md rounded-xl border border-gray-700/50 p-4 lg:p-6 shadow-sm text-center h-full">
//         <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-teal-600 rounded-xl flex items-center justify-center mx-auto mb-2">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             width="24"
//             height="24"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="2"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             className="lucide lucide-github h-8 w-8 text-white"
//           >
//             <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
//             <path d="M9 18c-4.51 2-5-2-7-2" />
//           </svg>
//         </div>
//         <h3 className="text-lg font-bold text-gray-200">GitHub Profile</h3>
//         <p className="text-sm mb-4 text-gray-400">Explore my projects & contributions</p>
//         <a target="_blank" href="https://github.com/arifrexa" rel="noopener noreferrer">
//           <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-10 px-4 py-2 w-full bg-green-500/20 hover:bg-green-500/30 text-green-400 border-green-500/50 border backdrop-blur-sm">
//             View GitHub
//           </button>
//         </a>
//       </div>

//       {/* LinkedIn */}
//       <div className="bg-gray-900 backdrop-blur-md rounded-xl border border-gray-700/50 p-4 lg:p-6 shadow-sm text-center h-full">
//         <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-2">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             width="24"
//             height="24"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="2"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             className="lucide lucide-linkedin h-8 w-8 text-white"
//           >
//             <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
//             <rect width="4" height="12" x="2" y="9" />
//             <circle cx="4" cy="4" r="2" />
//           </svg>
//         </div>
//         <h3 className="text-lg font-bold text-gray-200">LinkedIn</h3>
//         <p className="text-sm mb-4 text-gray-400">Connect & grow our network together</p>
//         <a target="_blank" href="https://www.linkedin.com/in/md-arif-rexa/" rel="noopener noreferrer">
//           <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-10 px-4 py-2 w-full bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 border-blue-500/50 border backdrop-blur-sm">
//             View LinkedIn
//           </button>
//         </a>
//       </div>

//       {/* Submit Feedback */}
//       <div className="bg-gray-900 backdrop-blur-md rounded-xl border border-gray-700/50 p-4 lg:p-6 shadow-sm text-center h-full">
//         <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mx-auto mb-2">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             width="24"
//             height="24"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="2"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             className="lucide lucide-message-circle h-8 w-8 text-white"
//           >
//             <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
//           </svg>
//         </div>
//         <h3 className="text-lg font-bold text-gray-200">Submit Feedback</h3>
//         <p className="text-sm mb-4 text-gray-400">Share your feedback about me</p>
//         <a href="/submit-testimonial">
//           <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-10 px-4 py-2 w-full bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 border-purple-500/50 border backdrop-blur-sm">
//             Submit Testimonial
//           </button>
//         </a>
//       </div>
//     </div>
//   );
// };

// export default QuickActions;


















// // /home/arif/PR projects/python revision/my-portfolio-with-next/src/Components/Overview/QuickActions.jsx
// 'use client';
// import React, { useState } from 'react';
// import { createClient } from '@supabase/supabase-js';

// // Initialize Supabase client using environment variables
// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
// const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// if (!supabaseUrl || !supabaseAnonKey) {
//   console.error('Missing Supabase URL or Anon Key in environment variables.');
//   // Handle this error appropriately in your application
// }

// const supabase = createClient(supabaseUrl, supabaseAnonKey);

// const QuickActions = () => {
//   const [isDownloading, setIsDownloading] = useState(false); // State to manage download status

//   const handleDownloadCV = async () => {
//     setIsDownloading(true); // Set loading state

//     try {
//       // Query the 'documents' table where name is 'Resume'
//       const { data, error } = await supabase
//         .from('documents')
//         .select('url')
//         .eq('name', 'Resume')
//         .single(); // Use .single() if you expect exactly one result

//       if (error) {
//         throw error; // Rethrow to be caught by the catch block
//       }

//       if (!data || !data.url) {
//         console.error('No resume URL found in the database.');
//         alert('Resume URL not found.');
//         return;
//       }

//       // The 'url' from Supabase is typically a public URL for the file stored in Supabase Storage
//       // If it's a Storage URL, you can directly use it for download
//       // If it's a path within Supabase Storage, you might need to generate a signed URL, but for public files, the direct URL often works.
//       // For this example, we assume it's a direct public URL.
//       const resumeUrl = data.url;

//       // Create a temporary anchor element to trigger the download
//       const link = document.createElement('a');
//       link.href = resumeUrl;
//       // Optional: Set a default filename if the URL doesn't contain one
//       link.setAttribute('download', 'Resume.pdf'); // Default filename
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);

//     } catch (error) {
//       console.error('Error fetching resume URL or initiating download:', error.message);
//       alert(`Error downloading CV: ${error.message}`);
//     } finally {
//       setIsDownloading(false); // Reset loading state
//     }
//   };

//   return (
//     <div className="grid grid-cols-2 md:grid-cols-4 gap-2 lg:gap-4">
//       {/* Download CV */}
//       <div className="bg-gray-900 backdrop-blur-md rounded-xl border border-gray-700/50 p-4 lg:p-6 shadow-sm text-center h-full">
//         <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center mx-auto mb-2">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             width="24"
//             height="24"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="2"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             className="lucide lucide-file-text h-8 w-8 text-white"
//           >
//             <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
//             <path d="M14 2v4a2 2 0 0 0 2 2h4" />
//             <path d="M10 9H8" />
//             <path d="M16 13H8" />
//             <path d="M16 17H8" />
//           </svg>
//         </div>
//         <h3 className="text-lg font-bold text-gray-200">Download CV</h3>
//         <p className="text-sm mb-4 text-gray-400">Get my resume in PDF format</p>
//         {/* Changed from <a> to <button> */}
//         <button
//           onClick={handleDownloadCV}
//           disabled={isDownloading} // Disable button while downloading
//           className={`inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-10 px-4 py-2 w-full backdrop-blur-sm border ${
//             isDownloading
//               ? 'bg-orange-500/10 text-orange-400/50 border-orange-500/20 cursor-not-allowed' // Style for disabled state
//               : 'bg-orange-500/20 hover:bg-orange-500/30 text-orange-400 border-orange-500/50'
//           }`}
//         >
//           {isDownloading ? 'Downloading...' : 'Download PDF'} {/* Show loading text */}
//         </button>
//       </div>

//       {/* GitHub Profile */}
//       <div className="bg-gray-900 backdrop-blur-md rounded-xl border border-gray-700/50 p-4 lg:p-6 shadow-sm text-center h-full">
//         <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-teal-600 rounded-xl flex items-center justify-center mx-auto mb-2">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             width="24"
//             height="24"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="2"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             className="lucide lucide-github h-8 w-8 text-white"
//           >
//             <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
//             <path d="M9 18c-4.51 2-5-2-7-2" />
//           </svg>
//         </div>
//         <h3 className="text-lg font-bold text-gray-200">GitHub Profile</h3>
//         <p className="text-sm mb-4 text-gray-400">Explore my projects & contributions</p>
//         <a target="_blank" href="https://github.com/arifrexa" rel="noopener noreferrer">
//           <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-10 px-4 py-2 w-full bg-green-500/20 hover:bg-green-500/30 text-green-400 border-green-500/50 border backdrop-blur-sm">
//             View GitHub
//           </button>
//         </a>
//       </div>

//       {/* LinkedIn */}
//       <div className="bg-gray-900 backdrop-blur-md rounded-xl border border-gray-700/50 p-4 lg:p-6 shadow-sm text-center h-full">
//         <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-2">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             width="24"
//             height="24"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="2"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             className="lucide lucide-linkedin h-8 w-8 text-white"
//           >
//             <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
//             <rect width="4" height="12" x="2" y="9" />
//             <circle cx="4" cy="4" r="2" />
//           </svg>
//         </div>
//         <h3 className="text-lg font-bold text-gray-200">LinkedIn</h3>
//         <p className="text-sm mb-4 text-gray-400">Connect & grow our network together</p>
//         <a target="_blank" href="https://www.linkedin.com/in/md-arif-rexa/" rel="noopener noreferrer">
//           <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-10 px-4 py-2 w-full bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 border-blue-500/50 border backdrop-blur-sm">
//             View LinkedIn
//           </button>
//         </a>
//       </div>

//       {/* Submit Feedback */}
//       <div className="bg-gray-900 backdrop-blur-md rounded-xl border border-gray-700/50 p-4 lg:p-6 shadow-sm text-center h-full">
//         <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mx-auto mb-2">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             width="24"
//             height="24"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="2"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             className="lucide lucide-message-circle h-8 w-8 text-white"
//           >
//             <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
//           </svg>
//         </div>
//         <h3 className="text-lg font-bold text-gray-200">Submit Feedback</h3>
//         <p className="text-sm mb-4 text-gray-400">Share your feedback about me</p>
//         <a href="/submit-testimonial">
//           <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-10 px-4 py-2 w-full bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 border-purple-500/50 border backdrop-blur-sm">
//             Submit Testimonial
//           </button>
//         </a>
//       </div>
//     </div>
//   );
// };

// export default QuickActions;















// /home/arif/PR projects/python revision/my-portfolio-with-next/src/Components/Overview/QuickActions.jsx
'use client';
import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client using environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase URL or Anon Key in environment variables.');
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const QuickActions = () => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadCV = async () => {
    setIsDownloading(true);

    try {
      // ✅ Fetch Resume URL from Supabase
      const { data, error } = await supabase
        .from('documents')
        .select('url')
        .eq('name', 'Resume')
        .single();

      if (error) {
        throw error;
      }

      if (!data || !data.url) {
        alert('Resume URL not found.');
        return;
      }

      let resumeUrl = data.url;

      // ✅ Detect Google Drive & convert to direct download link
      if (resumeUrl.includes('drive.google.com')) {
        // Extract file ID
        const match = resumeUrl.match(/\/d\/(.*?)\//);

        if (match && match[1]) {
          const fileId = match[1];
          // ✅ Force download link
          resumeUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
        }
      }

      console.log("Final download URL:", resumeUrl);

      // ✅ Create hidden download link
      const link = document.createElement('a');
      link.href = resumeUrl;
      link.setAttribute('download', 'Resume.pdf');
      link.target = "_blank"; // Important for Google Drive download

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

    } catch (error) {
      console.error('Download error:', error.message);
      alert('Error downloading CV: ' + error.message);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 lg:gap-4">

      {/* ✅ Download CV */}
      <div className="bg-gray-900 backdrop-blur-md rounded-xl border border-gray-700/50 p-4 lg:p-6 shadow-sm text-center h-full">
        <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center mx-auto mb-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor"
            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            className="lucide lucide-file-text h-8 w-8 text-white">
            <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
            <path d="M14 2v4a2 2 0 0 0 2 2h4" />
            <path d="M10 9H8" />
            <path d="M16 13H8" />
            <path d="M16 17H8" />
          </svg>
        </div>
        <h3 className="text-lg font-bold text-gray-200">Download CV</h3>
        <p className="text-sm mb-4 text-gray-400">Get my resume in PDF format</p>

        <button
          onClick={handleDownloadCV}
          disabled={isDownloading}
          className={`inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors h-10 px-4 py-2 w-full backdrop-blur-sm border ${
            isDownloading
              ? 'bg-orange-500/10 text-orange-400/50 border-orange-500/20 cursor-not-allowed'
              : 'bg-orange-500/20 hover:bg-orange-500/30 text-orange-400 border-orange-500/50'
          }`}
        >
          {isDownloading ? 'Downloading...' : 'Download PDF'}
        </button>
      </div>

      {/* GitHub Profile */}
      <div className="bg-gray-900 backdrop-blur-md rounded-xl border border-gray-700/50 p-4 lg:p-6 shadow-sm text-center h-full">
        <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-teal-600 rounded-xl flex items-center justify-center mx-auto mb-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor"
            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            className="lucide lucide-github h-8 w-8 text-white">
            <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
            <path d="M9 18c-4.51 2-5-2-7-2" />
          </svg>
        </div>
        <h3 className="text-lg font-bold text-gray-200">GitHub Profile</h3>
        <p className="text-sm mb-4 text-gray-400">Explore my projects & contributions</p>
        <a target="_blank" href="https://github.com/arifrexa" rel="noopener noreferrer">
          <button className="h-10 px-4 py-2 w-full bg-green-500/20 hover:bg-green-500/30 text-green-400 border-green-500/50 border rounded-md">
            View GitHub
          </button>
        </a>
      </div>

      {/* LinkedIn */}
      <div className="bg-gray-900 backdrop-blur-md rounded-xl border border-gray-700/50 p-4 lg:p-6 shadow-sm text-center h-full">
        <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor"
            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            className="lucide lucide-linkedin h-8 w-8 text-white">
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
            <rect width="4" height="12" x="2" y="9" />
            <circle cx="4" cy="4" r="2" />
          </svg>
        </div>
        <h3 className="text-lg font-bold text-gray-200">LinkedIn</h3>
        <p className="text-sm mb-4 text-gray-400">Connect & grow our network together</p>
        <a target="_blank" href="https://www.linkedin.com/in/md-arif-rexa/" rel="noopener noreferrer">
          <button className="h-10 px-4 py-2 w-full bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 border-blue-500/50 border rounded-md">
            View LinkedIn
          </button>
        </a>
      </div>

      {/* Submit Feedback */}
      <div className="bg-gray-900 backdrop-blur-md rounded-xl border border-gray-700/50 p-4 lg:p-6 shadow-sm text-center h-full">
        <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mx-auto mb-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor"
            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            className="lucide lucide-message-circle h-8 w-8 text-white">
            <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
          </svg>
        </div>
        <h3 className="text-lg font-bold text-gray-200">Submit Feedback</h3>
        <p className="text-sm mb-4 text-gray-400">Share your feedback about me</p>
        <a href="/submit-testimonial">
          <button className="h-10 px-4 py-2 w-full bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 border-purple-500/50 border rounded-md">
            Submit Testimonial
          </button>
        </a>
      </div>

    </div>
  );
};

export default QuickActions;







