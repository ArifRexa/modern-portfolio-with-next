import React from 'react';

const TerminalWindow = () => {
    return (
        <div className="w-full mx-auto bg-gray-900 border-gray-700/50 backdrop-blur-md rounded-xl border overflow-hidden shadow-sm">
            <div className="bg-gray-800/30 border-gray-700/50 px-4 py-3 flex items-center justify-between border-b">
                <div class="flex items-center space-x-2">
                    <div class="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div class="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div class="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div class="flex items-center space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-minimize w-4 h-4 text-gray-400"><path d="M8 3v3a2 2 0 0 1-2 2H3"></path><path d="M21 8h-3a2 2 0 0 1-2-2V3"></path><path d="M3 16h3a2 2 0 0 1 2 2v3"></path><path d="M16 21v-3a2 2 0 0 1 2-2h3"></path></svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-maximize w-4 h-4 text-gray-400"><path d="M8 3H5a2 2 0 0 0-2 2v3"></path><path d="M21 8V5a2 2 0 0 0-2-2h-3"></path><path d="M3 16v3a2 2 0 0 0 2 2h3"></path><path d="M16 21h3a2 2 0 0 0 2-2v-3"></path></svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x w-4 h-4 text-gray-400"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
                </div>
            </div>
            <div className="p-4 lg:p-6">
                <div
                    class="font-mono text-xs md:text-sm leading-relaxed whitespace-pre-wrap h-130 md:h-120 mb-4 w-full overflow-hidden border rounded-md px-4 py-4 text-green-400 bg-black/30 border-gray-700/50">
                    $ <span className="animate-pulse">▌</span>
                </div>
                <div
                    class="flex flex-wrap gap-2 mb-4"><button
                        class="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 h-9 rounded-md px-3 bg-green-500/20 hover:bg-green-500/30 text-green-400 border-green-500/50 border text-xs">./download_cv.sh</button><button
                            class="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 h-9 rounded-md px-3 bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 border-gray-700/50 border text-xs">copy
                        email</button><button
                            class="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 h-9 rounded-md px-3 bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 border-gray-700/50 border text-xs">open
                        github</button></div>
                <div
                    class="rounded-xl p-4 mt-4 border shadow-sm transition-colors duration-300 bg-gray-700/30 border-gray-600/30">
                    <div
                        class="grid grid-cols-1 md:grid-cols-2 gap-1 text-xs lg:text-sm font-mono leading-tight">
                        <div><span class="font-bold text-gray-300">OS:</span> <span
                            class="text-gray-400 font-medium">macOS Sonoma</span></div>
                        <div><span class="font-bold text-gray-300">Shell:</span> <span
                            class="text-gray-400 font-medium">zsh 5.9 + Oh My Zsh</span>
                        </div>
                        <div><span class="font-bold text-gray-300">Terminal:</span>
                            <span class="text-gray-400 font-medium">iTerm2 +
                                Powerlevel10k</span>
                        </div>
                        <div><span class="font-bold text-gray-300">Editor:</span> <span
                            class="text-gray-400 font-medium">VS Code, Vim</span></div>
                        <div><span class="font-bold text-gray-300">Font:</span> <span
                            class="text-gray-400 font-medium">JetBrains Mono</span></div>
                        <div><span class="font-bold text-gray-300">Theme:</span> <span
                            class="text-gray-400 font-medium">Dracula + One Dark Pro</span>
                        </div>
                        <div><span class="font-bold text-gray-300">CLI Tools:</span>
                            <span class="text-gray-400 font-medium">fzf, bat, ripgrep,
                                lsd</span>
                        </div>
                        <div><span class="font-bold text-gray-300">Package
                            Manager:</span> <span
                                class="text-gray-400 font-medium">Homebrew, pipx</span></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TerminalWindow;