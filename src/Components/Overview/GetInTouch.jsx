// app/components/GetInTouch.jsx (or wherever your component is located)
'use client';
import React from 'react';
import { useTheme } from '@/context/ThemeContext';

const GetInTouch = () => {
  const { theme } = useTheme();
  // Define the email address
  const emailAddress = "arif.reza3126@gmail.com"; // Replace with your actual email

  // Optional: Define a default subject and body
  const emailSubject = "Inquiry from your Portfolio";
  const emailBody = "Hello Arif,\n\nI found your portfolio and am interested in..."; // You can customize this or leave it blank

  // Construct the mailto link with optional subject and body
  const mailtoLink = `mailto:${emailAddress}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

  return (
    <div className={`${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'} backdrop-blur-md rounded-xl border ${theme === 'dark' ? 'border-gray-700/50' : 'border-gray-300'} p-4 lg:p-6 shadow-sm`}>
      <div className="text-center mx-auto">
        <h3 className={`text-2xl font-bold mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>Get In Touch</h3>
        <p className={`text-base mb-6 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
          I&apos;m always interested in new opportunities and collaborations. Feel free to reach out if you&apos;d like
          to work together!
        </p>
        {/* Use an anchor tag with the mailto link instead of a button */}
        <a href={mailtoLink} target="_blank" rel="noopener noreferrer">
          <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-10 w-full sm:w-auto px-6 py-2 rounded-md border backdrop-blur-sm bg-pink-500/20 hover:bg-pink-500/30 text-pink-400 border-pink-500/50 transition-colors duration-200">
            Send Email
          </button>
        </a>
      </div>
    </div>
  );
};

export default GetInTouch;