'use client';
import { useState, useEffect } from 'react';

const AestheticSpinner = () => {
  const [showSpinner, setShowSpinner] = useState(false);

  useEffect(() => {
    // Simulate navigation detection with a timeout for now
    let timeoutId = null;
    
    const handleClick = (e) => {
      const link = e.target.closest('a');
      if (link) {
        const href = link.getAttribute('href');
        // Only handle internal links
        if (href && !href.startsWith('http') && !href.startsWith('mailto:')) {
          setShowSpinner(true);
          // Automatically hide spinner after a short delay
          if (timeoutId) clearTimeout(timeoutId);
          timeoutId = setTimeout(() => setShowSpinner(false), 1200);
        }
      }
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  if (!showSpinner) return null;

  return (
    <div className="fixed top-0 right-0 bottom-0 left-80 z-[9999] flex items-center justify-center bg-gray-900 bg-opacity-50 backdrop-blur-sm">
      <div className="relative" style={{ width: '120px', height: '120px' }}>
        {/* Spinner SVG */}
        <svg 
          viewBox="0 0 200 200" 
          className="w-full h-full"
          aria-hidden="true"
        >
          <path 
            className="a-path stroke-cyan-400" 
            d="M50,160 L100,40 L150,160" 
            strokeDasharray="1000"
            strokeWidth="12"
            strokeLinecap="round"
            fill="none"
          />
          <path 
            className="a-path stroke-blue-500" 
            d="M65,130 L135,130" 
            strokeDasharray="1000"
            strokeWidth="10"
            strokeLinecap="round"
            fill="none"
          />
          <path 
            className="a-path stroke-purple-500" 
            d="M70,100 L130,100" 
            strokeDasharray="1000"
            strokeWidth="8"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
        
        {/* Animated glow effect */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400/20 via-blue-500/20 to-purple-500/20 animate-ping"></div>
        
        {/* Text label */}
        <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2">
          <p className="text-gray-300 text-sm font-light tracking-widest animate-pulse">
            Loading...
          </p>
        </div>
      </div>

      {/* CSS animations */}
      <style jsx>{`
        .a-path {
          stroke-dashoffset: 1000;
          animation: 
            neon-dash 3s linear infinite,
            neon-color 6s linear infinite;
          filter: drop-shadow(0 0 8px currentColor);
        }

        @keyframes neon-dash {
          0%, 10% { stroke-dashoffset: 1000; }
          60%, 100% { stroke-dashoffset: 0; }
        }

        @keyframes neon-color {
          0%   { filter: drop-shadow(0 0 8px currentColor); }
          50%  { filter: drop-shadow(0 0 15px currentColor); }
          100% { filter: drop-shadow(0 0 8px currentColor); }
        }
      `}</style>
    </div>
  );
};

export default AestheticSpinner;