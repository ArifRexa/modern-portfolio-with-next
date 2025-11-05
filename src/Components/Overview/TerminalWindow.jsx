'use client';
import React from 'react';
import { motion } from 'framer-motion';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
};

const TerminalWindow = () => {
    return (
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="w-full mx-auto bg-gray-900 border-gray-700/50 backdrop-blur-md rounded-xl border overflow-hidden shadow-sm"
        >
            <motion.div className="bg-gray-800/30 border-gray-700/50 px-4 py-3 flex items-center justify-between border-b" variants={item}>
                <div className="flex items-center space-x-2">
                    <motion.div 
                      className="w-3 h-3 bg-red-500 rounded-full" 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.2, delay: 0.1 }}
                    ></motion.div>
                    <motion.div 
                      className="w-3 h-3 bg-yellow-500 rounded-full" 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.2, delay: 0.2 }}
                    ></motion.div>
                    <motion.div 
                      className="w-3 h-3 bg-green-500 rounded-full" 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.2, delay: 0.3 }}
                    ></motion.div>
                </div>
                <div className="flex items-center space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-minimize w-4 h-4 text-gray-400"><path d="M8 3v3a2 2 0 0 1-2 2H3"></path><path d="M21 8h-3a2 2 0 0 1-2-2V3"></path><path d="M3 16h3a2 2 0 0 1 2 2v3"></path><path d="M16 21v-3a2 2 0 0 1 2-2h3"></path></svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-maximize w-4 h-4 text-gray-400"><path d="M8 3H5a2 2 0 0 0-2 2v3"></path><path d="M21 8V5a2 2 0 0 0-2-2h-3"></path><path d="M3 16v3a2 2 0 0 0 2 2h3"></path><path d="M16 21h3a2 2 0 0 0 2-2v-3"></path></svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x w-4 h-4 text-gray-400"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
                </div>
            </motion.div>
            <motion.div className="p-4 lg:p-6" variants={item}>
                <motion.div
                    className="font-mono text-xs md:text-sm leading-relaxed whitespace-pre-wrap h-130 md:h-120 mb-4 w-full overflow-hidden border rounded-md px-4 py-4 text-green-400 bg-black/30 border-gray-700/50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                >
                    $ <span className="animate-pulse">▌</span>
                </motion.div>
                <motion.div
                    className="flex flex-wrap gap-2 mb-4"
                    variants={container}
                >
                    <motion.button
                        className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-9 rounded-md px-3 bg-green-500/20 hover:bg-green-500/30 text-green-400 border-green-500/50 border text-xs"
                        variants={item}
                    >./download_cv.sh</motion.button>
                    <motion.button
                        className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-9 rounded-md px-3 bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 border-gray-700/50 border text-xs"
                        variants={item}
                    >copy email</motion.button>
                    <motion.button
                        className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-9 rounded-md px-3 bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 border-gray-700/50 border text-xs"
                        variants={item}
                    >open github</motion.button>
                </motion.div>
                <motion.div
                    className="rounded-xl p-4 mt-4 border shadow-sm transition-colors duration-300 bg-gray-700/30 border-gray-600/30"
                    variants={item}
                >
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 gap-1 text-xs lg:text-sm font-mono leading-tight"
                        variants={container}
                    >
                        <motion.div variants={item}><span className="font-bold text-gray-300">OS:</span> <span
                            className="text-gray-400 font-medium">macOS Sonoma</span></motion.div>
                        <motion.div variants={item}><span className="font-bold text-gray-300">Shell:</span> <span
                            className="text-gray-400 font-medium">zsh 5.9 + Oh My Zsh</span>
                        </motion.div>
                        <motion.div variants={item}><span className="font-bold text-gray-300">Terminal:</span>
                            <span className="text-gray-400 font-medium">iTerm2 +
                                Powerlevel10k</span>
                        </motion.div>
                        <motion.div variants={item}><span className="font-bold text-gray-300">Editor:</span> <span
                            className="text-gray-400 font-medium">VS Code, Vim</span></motion.div>
                        <motion.div variants={item}><span className="font-bold text-gray-300">Font:</span> <span
                            className="text-gray-400 font-medium">JetBrains Mono</span></motion.div>
                        <motion.div variants={item}><span className="font-bold text-gray-300">Theme:</span> <span
                            className="text-gray-400 font-medium">Dracula + One Dark Pro</span>
                        </motion.div>
                        <motion.div variants={item}><span className="font-bold text-gray-300">CLI Tools:</span>
                            <span className="text-gray-400 font-medium">fzf, bat, ripgrep,
                                lsd</span>
                        </motion.div>
                        <motion.div variants={item}><span className="font-bold text-gray-300">Package
                            Manager:</span> <span
                                className="text-gray-400 font-medium">Homebrew, pipx</span></motion.div>
                    </motion.div>
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

export default TerminalWindow;