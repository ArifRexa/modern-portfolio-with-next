'use client';
import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';

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
    const { theme } = useTheme();
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
            className={`w-full mx-auto backdrop-blur-xl rounded-2xl border overflow-hidden shadow-2xl relative transition-all duration-300 ${theme === 'dark' ? 'bg-gray-900/40 border-white/10' : 'bg-white/60 border-white/40'}`}
        >
            {/* Decorative element */}
            <div className={`absolute -right-20 -top-20 w-64 h-64 bg-green-500/10 rounded-full blur-[80px] pointer-events-none`}></div>

            <motion.div className={`${theme === 'dark' ? 'bg-black/40 border-white/5' : 'bg-white/40 border-black/5'} px-4 py-3 flex items-center justify-between border-b relative z-10`} variants={item}>
                <div className="flex items-center space-x-2">
                    <motion.div
                        className="w-3 h-3 bg-red-500 rounded-full shadow-sm"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.2, delay: 0.1 }}
                        whileHover={{ scale: 1.2 }}
                    ></motion.div>
                    <motion.div
                        className="w-3 h-3 bg-yellow-400 rounded-full shadow-sm"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.2, delay: 0.2 }}
                        whileHover={{ scale: 1.2 }}
                    ></motion.div>
                    <motion.div
                        className="w-3 h-3 bg-green-500 rounded-full shadow-sm"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.2, delay: 0.3 }}
                        whileHover={{ scale: 1.2 }}
                    ></motion.div>
                </div>
                <div className={`text-xs font-mono font-medium opacity-50 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                    zsh — {username} — 80x24
                </div>
                <div className="flex items-center space-x-2 opacity-0 md:opacity-100">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-minimize w-4 h-4 text-gray-400"><path d="M8 3v3a2 2 0 0 1-2 2H3"></path><path d="M21 8h-3a2 2 0 0 1-2-2V3"></path><path d="M3 16h3a2 2 0 0 1 2 2v3"></path><path d="M16 21v-3a2 2 0 0 1 2-2h3"></path></svg>
                </div>
            </motion.div>
            <motion.div className="p-4 lg:p-6 relative z-10" variants={item}>
                <motion.div
                    ref={terminalRef}
                    className={`font-mono text-xs md:text-sm leading-relaxed h-80 md:h-96 mb-4 w-full overflow-y-auto border rounded-xl px-4 py-4 transition-colors ${theme === 'dark' ? 'bg-black/60 text-green-400 border-white/5' : 'bg-gray-100/50 text-gray-800 border-gray-200'}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    tabIndex="0"
                >
                    <>
                        {/* Command history */}
                        {commandHistory.map((cmd, index) => (
                            <div key={index} className="mb-3">
                                <div className="mb-1 flex">
                                    <span className={theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}>➜</span>
                                    <span className={`mx-2 ${theme === 'dark' ? 'text-cyan-400' : 'text-cyan-600'}`}>~</span>
                                    <span className={theme === 'dark' ? 'text-green-400' : 'text-gray-600'}>{cmd.input}</span>
                                </div>
                                <div className={`ml-6 whitespace-pre-wrap ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{cmd.output}</div>
                            </div>
                        ))}
                    </>

                    {/* Current input - starts with $ and then shows the prompt */}
                    <div className="flex items-center">
                        <span className={theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}>➜</span>
                        <span className={`mx-2 ${theme === 'dark' ? 'text-cyan-400' : 'text-cyan-600'}`}>~</span>
                        <span className={theme === 'dark' ? 'text-green-400' : 'text-green-600'}>&nbsp;▌</span>
                    </div>
                </motion.div>
                <motion.div
                    className="flex flex-wrap gap-2 mb-4"
                    variants={container}
                >
                    <motion.button
                        className={`inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium ring-offset-background transition-all focus-visible:outline-none h-9 rounded-lg px-4 text-xs shadow-lg hover:-translate-y-0.5 ${theme === 'dark' ? 'bg-green-500/20 hover:bg-green-500/30 text-green-400 border border-green-500/30' : 'bg-green-100/80 hover:bg-green-200 text-green-700 border border-green-200'}`}
                        variants={item}
                        onClick={async () => {
                            const newCommand = {
                                input: './download_cv.sh',
                                output: 'Downloading resume...',
                            };
                            setCommandHistory(prev => [...prev, newCommand]);

                            // Fetch resume from Supabase and download it
                            // Import the Supabase client
                            const { default: supabase } = await import('@/utils/supabaseClient');

                            try {
                                const { data, error } = await supabase
                                    .from('documents')
                                    .select('url')
                                    .eq('name', 'Resume')
                                    .single();

                                if (error) {
                                    throw error;
                                }

                                if (!data || !data.url) {
                                    const errorMsg = 'Resume URL not found.';
                                    setCommandHistory(prev => [...prev, {
                                        input: './download_cv.sh',
                                        output: errorMsg,
                                    }]);
                                    alert(errorMsg);
                                    return;
                                }

                                let resumeUrl = data.url;

                                // Detect Google Drive & convert to direct download link
                                if (resumeUrl.includes('drive.google.com')) {
                                    const match = resumeUrl.match(/\/d\/(.*?)\//);

                                    if (match && match[1]) {
                                        const fileId = match[1];
                                        resumeUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
                                    }
                                }

                                // Create hidden download link
                                const link = document.createElement('a');
                                link.href = resumeUrl;
                                link.setAttribute('download', 'Resume.pdf');
                                link.target = "_blank"; // Important for Google Drive download

                                document.body.appendChild(link);
                                link.click();
                                document.body.removeChild(link);

                                // Increment download count after successful download
                                try {
                                    await fetch('/api/resume-stats', { method: 'POST' });
                                    console.log('Resume download count incremented from terminal');
                                } catch (statsError) {
                                    console.error('Error incrementing download count:', statsError);
                                    // Don't fail the download if stats update fails
                                }
                            } catch (error) {
                                console.error('Download error:', error.message);
                                const errorMsg = `Error downloading CV: ${error.message}`;
                                setCommandHistory(prev => [...prev, {
                                    input: './download_cv.sh',
                                    output: errorMsg,
                                }]);
                                alert(errorMsg);
                            }
                        }}
                    >./download_cv.sh</motion.button>
                    <motion.button
                        className={`inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium ring-offset-background transition-all focus-visible:outline-none h-9 rounded-lg px-4 text-xs shadow-lg hover:-translate-y-0.5 ${theme === 'dark' ? 'bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-400 border border-indigo-500/30' : 'bg-indigo-100/80 hover:bg-indigo-200 text-indigo-700 border border-indigo-200'}`}
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
                        className={`inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium ring-offset-background transition-all focus-visible:outline-none h-9 rounded-lg px-4 text-xs shadow-lg hover:-translate-y-0.5 ${theme === 'dark' ? 'bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 border border-purple-500/30' : 'bg-purple-100/80 hover:bg-purple-200 text-purple-700 border border-purple-200'}`}
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
                    className={`rounded-xl p-4 mt-4 border shadow-sm transition-colors duration-300 ${theme === 'dark' ? 'bg-gray-700/30' : 'bg-gray-300/30'} ${theme === 'dark' ? 'border-gray-600/30' : 'border-gray-400/30'}`}
                    variants={item}
                >
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 gap-1 text-xs lg:text-sm font-mono leading-tight"
                        variants={container}
                    >
                        <motion.div variants={item}><span className={`font-bold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>OS:</span> <span
                            className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} font-medium`}>macOS Sonoma</span></motion.div>
                        <motion.div variants={item}><span className={`font-bold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Shell:</span> <span
                            className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} font-medium`}>zsh 5.9 + Oh My Zsh</span>
                        </motion.div>
                        <motion.div variants={item}><span className={`font-bold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Terminal:</span>
                            <span className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} font-medium`}>iTerm2 +
                                Powerlevel10k</span>
                        </motion.div>
                        <motion.div variants={item}><span className={`font-bold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Editor:</span> <span
                            className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} font-medium`}>VS Code, Vim</span></motion.div>
                        <motion.div variants={item}><span className={`font-bold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Font:</span> <span
                            className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} font-medium`}>JetBrains Mono</span></motion.div>
                        <motion.div variants={item}><span className={`font-bold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Theme:</span> <span
                            className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} font-medium`}>Dracula + One Dark Pro</span>
                        </motion.div>
                        <motion.div variants={item}><span className={`font-bold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>CLI Tools:</span>
                            <span className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} font-medium`}>fzf, bat, ripgrep,
                                lsd</span>
                        </motion.div>
                        <motion.div variants={item}><span className={`font-bold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Package
                            Manager:</span> <span
                                className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} font-medium`}>Homebrew, pipx</span></motion.div>
                    </motion.div>
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

export default TerminalWindow;