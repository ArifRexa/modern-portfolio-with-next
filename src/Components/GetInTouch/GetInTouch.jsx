'use client';
import React from 'react';

const GetInTouch = () => {
  return (
    <div className="bg-gray-900 backdrop-blur-md rounded-xl border border-gray-700/50 p-4 lg:p-6 shadow-sm h-full">
      <div className="text-center mx-auto text-gray-900">
        <h3 className="text-2xl font-bold mb-2 text-gray-200">Get In Touch</h3>
        <p className="text-base mb-6 text-gray-400">
          I&#x27;m always interested in new opportunities and collaborations. Feel free to reach out if you&#x27;d like
          to work together!
        </p>
        <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-10 w-full sm:w-auto px-6 py-2 rounded-md border backdrop-blur-sm bg-pink-500/20 hover:bg-pink-500/30 text-pink-400 border-pink-500/50 transition-colors duration-200">
          Send Email
        </button>
      </div>
    </div>
  );
};

export default GetInTouch;