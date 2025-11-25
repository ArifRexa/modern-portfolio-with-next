'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function NotFound() {
  const router = useRouter();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-gray-200 p-4">
      <motion.div 
        className="text-center max-w-2xl w-full"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={item} className="mb-8">
          <div className="text-8xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            404
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Page Not Found</h1>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto rounded-full mb-6"></div>
        </motion.div>

        <motion.p variants={item} className="text-lg text-gray-300 mb-8 leading-relaxed">
          Oops! The page you're looking for seems to have vanished into the digital void. 
          It might have been moved, deleted, or perhaps it never existed in the first place.
        </motion.p>

        <motion.div variants={item} className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => router.back()}
            className="px-6 py-3 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg transition-all duration-200 text-gray-200 hover:text-white font-medium"
          >
            Go Back
          </button>
          <button
            onClick={() => router.push('/')}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 rounded-lg transition-all duration-200 text-white font-medium"
          >
            Return Home
          </button>
        </motion.div>

        <motion.div 
          variants={item} 
          className="mt-12 p-6 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50"
        >
          <h3 className="text-lg font-semibold mb-3 text-gray-200">Quick Links</h3>
          <div className="flex flex-wrap justify-center gap-3">
            <a 
              href="/" 
              className="px-4 py-2 bg-gray-700/50 hover:bg-gray-700 text-gray-300 hover:text-white rounded-lg transition-all text-sm"
            >
              Home
            </a>
            <a 
              href="/#about" 
              className="px-4 py-2 bg-gray-700/50 hover:bg-gray-700 text-gray-300 hover:text-white rounded-lg transition-all text-sm"
            >
              About
            </a>
            <a 
              href="/#projects" 
              className="px-4 py-2 bg-gray-700/50 hover:bg-gray-700 text-gray-300 hover:text-white rounded-lg transition-all text-sm"
            >
              Projects
            </a>
            <a 
              href="/#contact" 
              className="px-4 py-2 bg-gray-700/50 hover:bg-gray-700 text-gray-300 hover:text-white rounded-lg transition-all text-sm"
            >
              Contact
            </a>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}