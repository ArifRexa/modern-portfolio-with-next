'use client';
import React from 'react';
import { useTheme } from '@/context/ThemeContext';

const QuickInsights = () => {
    const { theme } = useTheme();
    return (
        <div className={`${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'} backdrop-blur-md rounded-xl border ${theme === 'dark' ? 'border-gray-700/50' : 'border-gray-300'} p-4 lg:p-6 shadow-sm`}>
            <div className="flex items-center justify-between mb-4">
                <h3 className={`text-2xl lg:text-2xl font-bold tracking-tight ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>Quick Insights</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-3">
                <div
                    className={`${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'} backdrop-blur-md rounded-xl border ${theme === 'dark' ? 'border-gray-700/50' : 'border-gray-300'} p-4 lg:p-6 shadow-sm  relative rounded-xl p-4 lg:p-4 border backdrop-blur-md shadow-md ${theme === 'dark' ? 'bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700/40' : 'bg-gradient-to-br from-gray-200 to-gray-100 border-gray-300'} h-full`}>
                    <div className="flex items-center space-x-3 mb-3">
                        <div className="w-10 h-10 bg-black rounded flex items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-github text-white"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg></div>
                        <div>
                            <div className={`${theme === 'dark' ? 'font-semibold text-gray-200' : 'font-semibold text-gray-800'}`}>GitHub</div>
                            <div className={`${theme === 'dark' ? 'text-xs text-gray-400' : 'text-xs text-gray-600'}`}>@arifrexa</div>
                        </div>
                    </div>
                    <div className="space-y-1 text-sm">
                        <div className="flex justify-between"><span
                            className={`${theme === 'dark' ? 'font-medium text-gray-300' : 'font-medium text-gray-700'}`}>Repositories</span><span
                                className={`${theme === 'dark' ? 'font-medium text-gray-300' : 'font-medium text-gray-700'}`}>258</span></div>
                        <div className="flex justify-between"><span
                            className={`${theme === 'dark' ? 'font-medium text-gray-300' : 'font-medium text-gray-700'}`}>Stars</span><span
                                className={`${theme === 'dark' ? 'font-medium text-gray-300' : 'font-medium text-gray-700'}`}>18</span></div>
                    </div>
                </div>
                <div
                    className={`${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'} backdrop-blur-md rounded-xl border ${theme === 'dark' ? 'border-gray-700/50' : 'border-gray-300'} p-4 lg:p-6 shadow-sm  relative rounded-xl p-4 lg:p-4 border backdrop-blur-md shadow-md ${theme === 'dark' ? 'bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700/40' : 'bg-gradient-to-br from-gray-200 to-gray-100 border-gray-300'} h-full`}>
                    <div className="flex items-center space-x-3 mb-3">
                        <div className="w-10 h-10 bg-red-500 rounded flex items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="white"><path d="M22.5,10.5c0.8,0,1.5,0.7,1.5,1.5v7.5c0,0.8-0.7,1.5-1.5,1.5h-3c-0.8,0-1.5-0.7-1.5-1.5V12c0-0.8,0.7-1.5,1.5-1.5H22.5z"></path><path d="M13.5,3C14.3,3,15,3.7,15,4.5v15c0,0.8-0.7,1.5-1.5,1.5h-3C9.7,21,9,20.3,9,19.5v-15C9,3.7,9.7,3,10.5,3H13.5z"></path><path d="M4.5,7.5C5.3,7.5,6,8.2,6,9v10.5C6,20.3,5.3,21,4.5,21h-3C0.7,21,0,20.3,0,19.5V9c0-0.8,0.7-1.5,1.5-1.5H4.5z"></path></svg></div>
                        <div>
                            <div className={`${theme === 'dark' ? 'font-semibold text-gray-200' : 'font-semibold text-gray-800'}`}>CodeForces</div>
                            <div className={`${theme === 'dark' ? 'text-xs text-gray-400' : 'text-xs text-gray-600'}`}>newbie</div>
                        </div>
                    </div>
                    <div
                        className="space-y-1 text-sm">
                        <div className="flex justify-between"><span
                            className={`${theme === 'dark' ? 'font-medium text-gray-300' : 'font-medium text-gray-700'}`}>Rating</span><span
                                className={`${theme === 'dark' ? 'font-medium text-gray-300' : 'font-medium text-gray-700'}`}>1011</span></div>
                        <div className="flex justify-between"><span
                            className={`${theme === 'dark' ? 'font-medium text-gray-300' : 'font-medium text-gray-700'}`}>Max Rating</span><span
                                className={`${theme === 'dark' ? 'font-medium text-gray-300' : 'font-medium text-gray-700'}`}>1428</span></div>
                    </div>
                </div>
                <div
                    className={`${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'} backdrop-blur-md rounded-xl border ${theme === 'dark' ? 'border-gray-700/50' : 'border-gray-300'} p-4 lg:p-6 shadow-sm  relative rounded-xl p-4 lg:p-4 border backdrop-blur-md shadow-md ${theme === 'dark' ? 'bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700/40' : 'bg-gradient-to-br from-gray-200 to-gray-100 border-gray-300'} h-full`}>
                    <div className="flex items-center space-x-3 mb-3">
                        <div className="w-10 h-10 bg-yellow-500 rounded flex items-center justify-center"><svg fill="#ffffff" width="20" height="20" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M21.469 23.907l-3.595 3.473c-0.624 0.625-1.484 0.885-2.432 0.885s-1.807-0.26-2.432-0.885l-5.776-5.812c-0.62-0.625-0.937-1.537-0.937-2.485 0-0.952 0.317-1.812 0.937-2.432l5.76-5.844c0.62-0.619 1.5-0.859 2.448-0.859s1.808 0.26 2.432 0.885l3.595 3.473c0.687 0.688 1.823 0.663 2.536-0.052 0.708-0.713 0.735-1.848 0.047-2.536l-3.473-3.511c-0.901-0.891-2.032-1.505-3.261-1.787l3.287-3.333c0.688-0.687 0.667-1.823-0.047-2.536s-1.849-0.735-2.536-0.052l-13.469 13.469c-1.307 1.312-1.989 3.113-1.989 5.113 0 1.996 0.683 3.86 1.989 5.168l5.797 5.812c1.307 1.307 3.115 1.937 5.115 1.937 1.995 0 3.801-0.683 5.109-1.989l3.479-3.521c0.688-0.683 0.661-1.817-0.052-2.531s-1.849-0.74-2.531-0.052zM27.749 17.349h-13.531c-0.932 0-1.692 0.801-1.692 1.791 0 0.991 0.76 1.797 1.692 1.797h13.531c0.933 0 1.693-0.807 1.693-1.797 0-0.989-0.76-1.791-1.693-1.791z"></path></svg></div>
                        <div>
                            <div className={`${theme === 'dark' ? 'font-semibold text-gray-200' : 'font-semibold text-gray-800'}`}>LeetCode</div>
                            <div className={`${theme === 'dark' ? 'text-xs text-gray-400' : 'text-xs text-gray-600'}`}>Ranking: 1474378</div>
                        </div>
                    </div>
                    <div
                        className="space-y-1 text-sm">
                        <div className="flex justify-between"><span
                            className={`${theme === 'dark' ? 'font-medium text-gray-300' : 'font-medium text-gray-700'}`}>Solved</span><span
                                className={`${theme === 'dark' ? 'font-medium text-gray-300' : 'font-medium text-gray-700'}`}>91</span></div>
                        <div className="flex justify-between"><span
                            className={`${theme === 'dark' ? 'font-medium text-gray-300' : 'font-medium text-gray-700'}`}>AC Rate</span><span
                                className={`${theme === 'dark' ? 'font-medium text-gray-300' : 'font-medium text-gray-700'}`}>85%</span></div>
                        <div className="flex justify-between"><span
                            className={`${theme === 'dark' ? 'font-medium text-gray-300' : 'font-medium text-gray-700'}`}>Contest Rating</span><span
                                className={`${theme === 'dark' ? 'font-medium text-gray-300' : 'font-medium text-gray-700'}`}>1734</span></div>
                    </div>
                </div>
                <div
                    className={`${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'} backdrop-blur-md rounded-xl border ${theme === 'dark' ? 'border-gray-700/50' : 'border-gray-300'} p-4 lg:p-6 shadow-sm  relative rounded-xl p-4 lg:p-4 border backdrop-blur-md shadow-md ${theme === 'dark' ? 'bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700/40' : 'bg-gradient-to-br from-gray-200 to-gray-100 border-gray-300'} h-full`}>
                    <div className="flex items-center space-x-3 mb-3">
                        <div
                            className="w-10 h-10 bg-orange-500 rounded flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 333333 333333"
                                width="20" height="20" fill="white">
                                <path
                                    d="M322831 117669l-25376 33059-2-2-17596 37756-4-2-9020 40667-203391-45092-2 2 9020-40681 203308 45065-188724-88000v-2l17606-37772 188714 87992L132160 23894 150493 0h18967l153372 117669zM62501 229173h208330v41665l-208330-4v-41661z">
                                </path>
                                <path
                                    d="M333333 208338v124995H0V208338h41665v83330h250003v-83330z">
                                </path>
                            </svg>
                        </div>
                        <div>
                            <div className={`${theme === 'dark' ? 'font-semibold text-gray-200' : 'font-semibold text-gray-800'}`}>Stack Overflow</div>
                            <div className={`${theme === 'dark' ? 'text-xs text-gray-400' : 'text-xs text-gray-600'}`}>Reputation: 372</div>
                        </div>
                    </div>
                    <div className="space-y-1 text-sm">
                        <div className="flex justify-between"><span
                            className={`${theme === 'dark' ? 'font-medium text-gray-300' : 'font-medium text-gray-700'}`}>Questions</span><span
                                className={`${theme === 'dark' ? 'font-medium text-gray-300' : 'font-medium text-gray-700'}`}>4</span></div>
                        <div className="flex justify-between"><span
                            className={`${theme === 'dark' ? 'font-medium text-gray-300' : 'font-medium text-gray-700'}`}>Answers</span><span
                                className={`${theme === 'dark' ? 'font-medium text-gray-300' : 'font-medium text-gray-700'}`}>30</span></div>
                        <div className="flex justify-between"><span
                            className={`${theme === 'dark' ? 'font-medium text-gray-300' : 'font-medium text-gray-700'}`}>Badges</span><span
                                className={`${theme === 'dark' ? 'font-medium text-gray-300' : 'font-medium text-gray-700'}`}>15</span></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuickInsights;