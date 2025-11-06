'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import avatar from '../../../public/images/avatar.jpg';

const Sidebar = ({ className = '', theme = 'dark' }) => {
  const [activeTab, setActiveTab] = useState('overview');

  // Determine classes based on theme
  const sidebarBgClass = theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100';
  const textClass = theme === 'dark' ? 'text-gray-200' : 'text-gray-800';
  const borderClass = theme === 'dark' ? 'border-gray-700/50' : 'border-gray-300';
  const navItemHoverClass = theme === 'dark' ? 'hover:bg-gray-800/50' : 'hover:bg-gray-200';
  const navItemTextClass = theme === 'dark' ? 'text-gray-300' : 'text-gray-700';
  const navItemActiveClass = theme === 'dark' ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-600';

  return (
    <aside className={`fixed left-0 top-0 h-screen w-80 z-50 backdrop-blur-md border ${borderClass} shadow-sm transform transition-transform duration-300 lg:translate-x-0 -translate-x-full ${className} lg:static lg:sticky lg:top-0 lg:h-screen lg:overflow-hidden ${sidebarBgClass}`}>
      <div className="p-6">
        <div className="flex items-center space-x-4 mb-6">
          <Image src={avatar} alt="Profile Picture" className="w-16 h-16 rounded-xl object-cover" />
          <div>
            <h3 className={`text-lg font-bold ${textClass}`}>Ariful Islam</h3>
            <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Software Engineer</p>
          </div>
        </div>

        <nav className="space-y-2">
          <Link
            href="/"
            className={`flex items-center space-x-3 py-2 lg:py-2.5 px-4 rounded-xl transition-colors duration-300 ${activeTab === 'overview' ? navItemActiveClass : navItemHoverClass + ' ' + navItemTextClass}`}
            onClick={() => setActiveTab('overview')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`lucide lucide-user w-5 h-5 ${textClass}`}><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
            <span className="font-medium">Overview</span>
          </Link>
          {/* Other nav items... */}
          <a
            className={`w-full flex items-center space-x-3 py-2 lg:py-2.5 px-4 rounded-xl transition-colors duration-300 border ${theme === 'dark' ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/30 border-transparent' : 'text-gray-600 hover:text-gray-800 hover:bg-gray-300/30 border-transparent'} text-left`}
            href="/professional-experience"><svg xmlns="http://www.w3.org/2000/svg"
              width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              className="lucide lucide-briefcase w-5 h-5">
              <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
              <rect width="20" height="14" x="2" y="6" rx="2"></rect>
            </svg><span className="font-medium">Professional Experience</span></a><a
              className={`w-full flex items-center space-x-3 py-2 lg:py-2.5 px-4 rounded-xl transition-colors duration-300 border ${theme === 'dark' ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/30 border-transparent' : 'text-gray-600 hover:text-gray-800 hover:bg-gray-300/30 border-transparent'} text-left`}
              href="/technical-skills"><svg xmlns="http://www.w3.org/2000/svg" width="24"
                height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                className="lucide lucide-lightbulb w-5 h-5">
              <path
                d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5">
              </path>
              <path d="M9 18h6"></path>
              <path d="M10 22h4"></path>
            </svg><span className="font-medium">Technical Skills</span></a><a
              className={`w-full flex items-center space-x-3 py-2 lg:py-2.5 px-4 rounded-xl transition-colors duration-300 border ${theme === 'dark' ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/30 border-transparent' : 'text-gray-600 hover:text-gray-800 hover:bg-gray-300/30 border-transparent'} text-left`}
              href="/academic-background"><svg xmlns="http://www.w3.org/2000/svg" width="24"
                height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                className="lucide lucide-graduation-cap w-5 h-5">
              <path
                d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z">
              </path>
              <path d="M22 10v6"></path>
              <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"></path>
            </svg><span className="font-medium">Academic Background</span></a><a
              className={`w-full flex items-center space-x-3 py-2 lg:py-2.5 px-4 rounded-xl transition-colors duration-300 border ${theme === 'dark' ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/30 border-transparent' : 'text-gray-600 hover:text-gray-800 hover:bg-gray-300/30 border-transparent'} text-left`}
              href="/projects"><svg xmlns="http://www.w3.org/2000/svg" width="24"
                height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                className="lucide lucide-lightbulb w-5 h-5">
              <path
                d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5">
              </path>
              <path d="M9 18h6"></path>
              <path d="M10 22h4"></path>
            </svg><span className="font-medium">Projects &amp; Portfolio</span></a><a
              className={`w-full flex items-center space-x-3 py-2 lg:py-2.5 px-4 rounded-xl transition-colors duration-300 border ${theme === 'dark' ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/30 border-transparent' : 'text-gray-600 hover:text-gray-800 hover:bg-gray-300/30 border-transparent'} text-left`}
              href="/coding-activities"><svg xmlns="http://www.w3.org/2000/svg" width="24"
                height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                className="lucide lucide-code w-5 h-5">
              <polyline points="16 18 22 12 16 6"></polyline>
              <polyline points="8 6 2 12 8 18"></polyline>
            </svg><span className="font-medium">Coding Activities</span></a><a
              className={`w-full flex items-center space-x-3 py-2 lg:py-2.5 px-4 rounded-xl transition-colors duration-300 border ${theme === 'dark' ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/30 border-transparent' : 'text-gray-600 hover:text-gray-800 hover:bg-gray-300/30 border-transparent'} text-left`}
              href="/github-contributions"><svg xmlns="http://www.w3.org/2000/svg" width="24"
                height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                className="lucide lucide-github w-5 h-5">
              <path
                d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4">
              </path>
              <path d="M9 18c-4.51 2-5-2-7-2"></path>
            </svg><span className="font-medium">GitHub Contributions</span></a><a
              className={`w-full flex items-center space-x-3 py-2 lg:py-2.5 px-4 rounded-xl transition-colors duration-300 border ${theme === 'dark' ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/30 border-transparent' : 'text-gray-600 hover:text-gray-800 hover:bg-gray-300/30 border-transparent'} text-left`}
              href="/competitive-programming"><svg xmlns="http://www.w3.org/2000/svg"
                width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                className="lucide lucide-binary w-5 h-5">
              <rect x="14" y="14" width="4" height="6" rx="2"></rect>
              <rect x="6" y="4" width="4" height="6" rx="2"></rect>
              <path d="M6 20h4"></path>
              <path d="M14 10h4"></path>
              <path d="M6 14h2v6"></path>
              <path d="M14 4h2v6"></path>
            </svg><span className="font-medium">Competitive Programming</span></a><a
              className={`w-full flex items-center space-x-3 py-2 lg:py-2.5 px-4 rounded-xl transition-colors duration-300 border ${theme === 'dark' ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/30 border-transparent' : 'text-gray-600 hover:text-gray-800 hover:bg-gray-300/30 border-transparent'} text-left`}
              href="/awards-certifications"><svg xmlns="http://www.w3.org/2000/svg" width="24"
                height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                className="lucide lucide-trophy w-5 h-5">
              <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
              <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
              <path d="M4 22h16"></path>
              <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
              <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
              <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
            </svg><span className="font-medium">Awards &amp; Certifications</span></a><a
              className={`w-full flex items-center space-x-3 py-2 lg:py-2.5 px-4 rounded-xl transition-colors duration-300 border ${theme === 'dark' ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/30 border-transparent' : 'text-gray-600 hover:text-gray-800 hover:bg-gray-300/30 border-transparent'} text-left`}
              href="/blogs"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                className="lucide lucide-rss w-5 h-5">
              <path d="M4 11a9 9 0 0 1 9 9"></path>
              <path d="M4 4a16 16 0 0 1 16 16"></path>
              <circle cx="5" cy="19" r="1"></circle>
            </svg><span className="font-medium">Blogs</span></a><a
              className={`w-full flex items-center space-x-3 py-2 lg:py-2.5 px-4 rounded-xl transition-colors duration-300 border ${theme === 'dark' ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/30 border-transparent' : 'text-gray-600 hover:text-gray-800 hover:bg-gray-300/30 border-transparent'} text-left`}
              href="/contact"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round"
                className="lucide lucide-phone w-5 h-5">
              <path
                d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z">
              </path>
            </svg><span className="font-medium">Contact</span></a>
        </nav>
      </div>

      <div className={`p-4 border-t ${borderClass}`}>
        <div className="grid grid-cols-2 gap-2">
          <div className={`${theme === 'dark' ? 'bg-gray-800/40' : 'bg-gray-200/40'} ${borderClass} p-2 rounded`}>
            <p className={`text-xs ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'} uppercase tracking-wide font-semibold text-center`}>CV</p>
            <p className={`text-sm font-bold text-blue-300 text-center`}>Downloads</p>
          </div>
          <div className={`${theme === 'dark' ? 'bg-gray-800/40' : 'bg-gray-200/40'} ${borderClass} p-2 rounded`}>
            <p className={`text-xs ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'} uppercase tracking-wide font-semibold text-center`}>Visitors</p>
            <p className={`text-sm font-bold text-green-300 text-center`}>Count</p>
          </div>
        </div>
      </div>

    </aside>
  );
};

export default Sidebar;