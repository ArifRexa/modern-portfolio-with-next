'use client';
import React from 'react';
import { motion } from 'framer-motion';

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
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const PersonalInfo = () => {
    return (
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="bg-gray-900 backdrop-blur-md rounded-xl border border-gray-700/50 p-4 lg:p-6 shadow-sm"
        >
            <motion.div className="flex flex-col md:flex-row lg:items-start lg:justify-between w-full relative" variants={item}>
                <div className="relative mx-auto lg:mx-0">
                    <div className="w-56 h-56  flex items-center justify-center  font-bold shadow-sm overflow-hidden boder border-gray-900">
                        <img src="/placeholder-avatar.jpg" alt="Ariful Islam"
                            className="w-full h-full object-cover rounded-xl" />
                    </div>
                    <div
                        className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full border-2 shadow-md flex items-center justify-center bg-gray-500 border-gray-500/50">
                        <div className="w-3 h-3 rounded-full bg-gray-600"></div>
                        <div className="w-3 h-3 rounded-full animate-ping absolute bg-white/40"></div>
                        <div className="w-3 h-3 rounded-full absolute bg-white/80"></div>
                    </div>
                </div>
                <motion.div className="flex-1 text-center lg:text-left" variants={item}>
                    <div
                        className="flex flex-col lg:flex-row lg:items-center lg:justify-between w-full relative">
                        <div
                            className="hidden xl:flex absolute top-0 right-0 items-center space-x-2">
                            <div
                                className="py-0.5 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 w-fit flex items-center gap-1 px-3 text-sm font-medium border backdrop-blur-sm rounded-full bg-gray-500/20 hover:bg-gray-500/30 text-gray-400">
                                <span
                                    className="flex w-2.5 h-2.5 rounded-full animate-pulse bg-gray-400"></span>Offline
                            </div>
                            <div
                                className="py-0.5 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 w-fit flex items-center gap-1 px-3 text-sm font-medium border backdrop-blur-sm rounded-full bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 border-blue-500/50">
                                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20"><path d="M10 2a5 5 0 00-5 5v1H4a2 2 0 00-2 2v5a2 2 0 002 2h12a2 2 0 002-2v-5a2 2 0 00-2-2h-1V7a5 5 0 00-5-5zm-3 6V7a3 3 0 016 0v1H7z"></path></svg>Available for Hire
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 flex items-center lg:pl-0">
                        <address
                            className="flex flex-col lg:flex-row items-center lg:space-x-4 font-medium not-italic">
                            <a href="https://maps.app.goo.gl/8jxqFzZa9ab5AASq8" target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center hover:underline text-gray-400"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-map-pin h-4 w-4 mr-1"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path><circle cx="12" cy="10" r="3"></circle></svg>Dhaka, Bangladesh</a><a href="mailto:rsakib13@gmail.com"
                                    target="_blank" rel="noopener noreferrer"
                                    className="flex items-center hover:underline text-gray-400"><svg
                                        xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                        className="lucide lucide-mail h-4 w-4 mr-1">
                                    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                                </svg>rsakib13@gmail.com</a>
                        </address>
                    </div>
                </motion.div>
            </motion.div>
            <motion.section 
              aria-label="Today&#x27;s Stats" 
              className="mt-8 pt-8 border-t border-gray-800" 
              variants={item}
            >
                <h2 className="text-xl text-center font-semibold mb-6 text-gray-200">Today&#x27;S Stats</h2>
                <motion.dl 
                  className="grid grid-cols-2 sm:grid-cols-4 gap-4"
                  variants={container}
                >
                    <motion.div className="text-center" variants={item}>
                        <dd
                            className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 text-transparent bg-clip-text">
                            0.9h</dd>
                        <dt className="uppercase text-sm font-semibold text-gray-300">Coding</dt>
                    </motion.div>
                    <motion.div className="text-center" variants={item}>
                        <dd
                            className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-indigo-500 text-transparent bg-clip-text">
                            <span></span>
                        </dd>
                        <dt className="uppercase text-sm font-semibold text-gray-300">Commits</dt>
                    </motion.div>
                    <motion.div className="text-center" variants={item}>
                        <dd
                            className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-violet-500 text-transparent bg-clip-text">
                            <span></span>
                        </dd>
                        <dt className="uppercase text-sm font-semibold text-gray-300">Meetings</dt>
                    </motion.div>
                    <motion.div className="text-center" variants={item}>
                        <dd
                            className="text-3xl font-bold bg-gradient-to-r from-green-400 to-teal-500 text-transparent bg-clip-text">
                            <span></span>
                        </dd>
                        <dt className="uppercase text-sm font-semibold text-gray-300">Coffees</dt>
                    </motion.div>
                </motion.dl>
            </motion.section>
        </motion.div>
    );
};

export default PersonalInfo;