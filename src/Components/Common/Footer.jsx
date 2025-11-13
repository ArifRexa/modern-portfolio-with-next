'use client';

import Link from "next/link";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="py-12 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-16">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Brand Info */}
                    <div className="flex flex-col">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Ariful Islam</h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                            Full Stack Developer passionate about creating beautiful and functional web experiences.
                        </p>
                        <div className="flex space-x-4">
                            <a
                                href="https://github.com/arifrexa"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors duration-300"
                                aria-label="GitHub"
                            >
                                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                                </svg>
                            </a>
                            <a
                                href="https://linkedin.com/in/md-arif-rexa"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors duration-300"
                                aria-label="LinkedIn"
                            >
                                <svg className="w-6 h-6 mt-1" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                </svg>
                            </a>
                            <a
                                href="mailto:arif.reza3126@gmail.com"
                                className="text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors duration-300"
                                aria-label="Email"
                            >
                                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="flex flex-col">
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link 
                                    href="/" 
                                    className="text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors duration-300"
                                >
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link 
                                    href="/about" 
                                    className="text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors duration-300"
                                >
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/projects" 
                                    className="text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors duration-300"
                                >
                                    Projects
                                </Link>
                            </li>
                            <li>
                                <Link 
                                    href="/contact" 
                                    className="text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors duration-300"
                                >
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="flex flex-col">
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Contact</h4>
                        <ul className="space-y-2">
                            <li className="text-gray-600 dark:text-gray-400">
                                Location: Pallabi, Mirpur, Dhaka Bangladesh.
                            </li>
                            <li>
                                <a 
                                    href="mailto:ariful.islam.arifrexa@gmail.com" 
                                    className="text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors duration-300"
                                >
                                    Email: arif.reza3126@gmail.com
                                </a>
                            </li>
                            <li>
                                <a 
                                    href="tel:+8801712345678" 
                                    className="text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors duration-300"
                                >
                                    Phone: +880 1677243126
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 md:mb-0">
                        © {currentYear} Ariful Islam. All rights reserved.
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                        Built with Next.js, Tailwind CSS, and ❤️
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;