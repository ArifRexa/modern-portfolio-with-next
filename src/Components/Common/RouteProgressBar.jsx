'use client';
import { useEffect } from 'react';
import nprogress from 'nprogress';
import 'nprogress/nprogress.css';

const RouteProgressBar = () => {
  useEffect(() => {
    // Handle clicks on internal links
    const handleLinkClick = (e) => {
      const link = e.target.closest('a');
      if (link) {
        const href = link.getAttribute('href');
        // Only handle internal links
        if (href && !href.startsWith('http') && !href.startsWith('mailto:')) {
          nprogress.start();
          // Add timeout to ensure it completes
          setTimeout(() => nprogress.done(), 800);
        }
      }
    };

    document.addEventListener('click', handleLinkClick);

    // Custom styles to match your theme
    const style = document.createElement('style');
    style.textContent = `
      #nprogress .bar {
        background: linear-gradient(90deg, #22d3ee, #3b82f6); /* cyan to blue */
        height: 3px;
        z-index: 9999;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.removeEventListener('click', handleLinkClick);
      document.head.removeChild(style);
    };
  }, []);

  return null;
};

export default RouteProgressBar;