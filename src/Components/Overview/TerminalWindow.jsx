'use client';
import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

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
    const ref = useRef(null);
    const terminalRef = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });
    const [commandHistory, setCommandHistory] = useState([]);
    const [currentCommand, setCurrentCommand] = useState('');
    const [currentPath, setCurrentPath] = useState('~');
    const [isTyping, setIsTyping] = useState(false);
    const [username, setUsername] = useState('Ariful Islam');
    const [showCursor, setShowCursor] = useState(true);
    const hasRun = useRef(false); // Ref to track if the simulation has already run
    
    
    // Initialize demo sequence and simulate typing inside the effect to avoid changing deps
    useEffect(() => {
        // In StrictMode, this effect runs twice, but we use ref to prevent double execution
        const demoSequence = [
            {
                command: 'who_am_i?',
                output: `${username} — Lead Engineer | System Architect | Problem Solver`
            },
            {
                command: 'uptime',
                output: '15,000+ hours shipped | 99.99% uptime mindset'
            },
            {
                command: 'ls stack/',
                output: 'Python Django FastAPI Redis Kafka Postgres AWS Docker K8s gRPC CI/CD'
            },
            {
                command: 'top -l 1 | grep leadership',
                output: 'Scaling teams, systems & engineering culture'
            },
            {
                command: 'tail -f logs/strategy.log',
                output: 'Decisions fueled by data, uptime, and user empathy'
            },
            {
                command: 'netstat -an | grep :443',
                output: 'Secured systems. Encrypted by default.'
            },
            {
                command: `curl -X POST /ideas -d 'from=${username}'`,
                output: 'Building what matters. Shipping what scales.'
            },
            {
                command: 'crontab -l',
                output: 'Automating pain points. 0 3 * * * deploy && sleep'
            },
            {
                command: "echo 'Let's build resilient, scalable systems.'",
                output: "Let's build resilient, scalable systems. Ready when you are."
            }
        ];

        const simulateTyping = async () => {
            setIsTyping(true);

            // Clear command history at the start of simulation
            setCommandHistory([]);

            // Add commands with delays to simulate typing
            for (let i = 0; i < demoSequence.length; i++) {
                const { command, output } = demoSequence[i];

                // Add the command and output to history
                const commandEntry = {
                    input: command,
                    output: output
                };

                setCommandHistory(prev => [...prev, commandEntry]);

                // Wait for the output to be displayed
                await new Promise(resolve => setTimeout(resolve, 2000));
            }

            setIsTyping(false);
        };

        const timer = setTimeout(() => {
            if (hasRun.current) return; // Prevent double execution in React StrictMode
            hasRun.current = true;

            // Run simulation after setting up the interval
            simulateTyping();
        }, 0);

        // Set up cursor blinking effect (this runs on each effect run, but that's okay)
        const cursorInterval = setInterval(() => {
            setShowCursor(prev => !prev);
        }, 500);

        return () => {
            clearTimeout(timer);
            clearInterval(cursorInterval);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // run once

    // Focus terminal when component mounts
    useEffect(() => {
        if (terminalRef.current) {
            terminalRef.current.focus();
        }
    }, []);

    // Add command history to terminal
    useEffect(() => {
        if (terminalRef.current) {
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
    }, [commandHistory]);

    return (
        <motion.div 
          ref={ref}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          variants={container}
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
                    ref={terminalRef}
                    className="font-mono text-xs md:text-sm leading-relaxed h-130 md:h-120 mb-4 w-full overflow-y-auto border rounded-md px-4 py-4 text-green-400 bg-black/30 border-gray-700/50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    tabIndex="0"
                >
                    <>
                        {/* Command history */}
                        {commandHistory.map((cmd, index) => (
                            <div key={index}>
                                <div className="mb-1 text-green-400">
                                    $ {username}@macbook:~$ {cmd.input}
                                </div>
                                <div className="mb-2 text-green-400 whitespace-pre-wrap">{cmd.output}</div>
                            </div>
                        ))}
                    </>
                    
                    {/* Current input - starts with $ and then shows the prompt */}
                    <div className="flex items-center">
                        <span className="text-green-400">$ {username}@macbook:~$ </span>
                        {/* <span className={`${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity text-green-400`}>_</span> */}
                        <span className={`${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity text-green-400`}> &nbsp;▌</span>
                    </div>
                </motion.div>
                <motion.div
                    className="flex flex-wrap gap-2 mb-4"
                    variants={container}
                >
                    <motion.button
                        className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-9 rounded-md px-3 bg-green-500/20 hover:bg-green-500/30 text-green-400 border-green-500/50 border text-xs"
                        variants={item}
                        onClick={() => {
                            const newCommand = {
                                input: './download_cv.sh',
                                output: 'Downloading resume...',
                            };
                            setCommandHistory(prev => [...prev, newCommand]);
                        }}
                    >./download_cv.sh</motion.button>
                    <motion.button
                        className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-9 rounded-md px-3 bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 border-gray-700/50 border text-xs"
                        variants={item}
                        onClick={() => {
                            navigator.clipboard.writeText('arif.reza3126@gmail.com');
                            const newCommand = {
                                input: 'copy email',
                                output: 'arif.reza3126@gmail.com copied to clipboard!',
                            };
                            setCommandHistory(prev => [...prev, newCommand]);
                        }}
                    >copy email</motion.button>
                    <motion.button
                        className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-9 rounded-md px-3 bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 border-gray-700/50 border text-xs"
                        variants={item}
                        onClick={() => {
                            window.open('https://github.com/arifrexa', '_blank');
                            const newCommand = {
                                input: 'open github',
                                output: 'Opening GitHub profile...',
                            };
                            setCommandHistory(prev => [...prev, newCommand]);
                        }}
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