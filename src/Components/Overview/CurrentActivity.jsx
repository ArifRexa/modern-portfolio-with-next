'use client';
import React, { useState, useEffect, useMemo } from 'react';
import { useTheme } from '@/context/ThemeContext';

const CurrentActivity = () => {
  const { theme } = useTheme();
    const [currentActivity, setCurrentActivity] = useState({
        activity: "Lunch Break",
        emoji: "🍽️",
        location: "Mediusware LTD.",
        mood: "Relaxed",
        time: "02:08 PM",
        status: "Offline",
        activeDevices: 4,
    });

    // Initial schedule with start and end hours
    const initialSchedule = useMemo(() => ([
        { time: "00:00", activity: "Sleeping", emoji: "🛌", startHour: 0, endHour: 8, status: "Completed" },
        { time: "08:00", activity: "Morning routine", emoji: "🪥", startHour: 8, endHour: 8.5, status: "Completed" },
        { time: "08:30", activity: "Morning Walk", emoji: "🚶", startHour: 8.5, endHour: 9.5, status: "Completed" },
        { time: "09:30", activity: "Having breakfast", emoji: "🍞", startHour: 9.5, endHour: 10, status: "Completed" },
        { time: "10:00", activity: "Going to the office", emoji: "🚗", startHour: 10, endHour: 11, status: "Completed" },
        { time: "11:00", activity: "Scrum meeting", emoji: "📅", startHour: 11, endHour: 12, status: "Completed" },
        { time: "12:00", activity: "Writing code", emoji: "💻", startHour: 12, endHour: 14, status: "Completed" },
        { time: "14:00", activity: "Lunch Break", emoji: "🍽️", startHour: 14, endHour: 15, status: "Current" },
        { time: "15:00", activity: "Debugging code", emoji: "🐛", startHour: 15, endHour: 16, status: "Upcoming" },
        { time: "16:00", activity: "Deep coding focus", emoji: "🖥️", startHour: 16, endHour: 17, status: "Upcoming" },
        { time: "17:00", activity: "Code review", emoji: "🔍", startHour: 17, endHour: 18, status: "Upcoming" },
        { time: "18:00", activity: "Client Meeting", emoji: "🤝", startHour: 18, endHour: 19, status: "Upcoming" },
        { time: "19:00", activity: "Mentoring team", emoji: "👥", startHour: 19, endHour: 20, status: "Upcoming" },
        { time: "20:00", activity: "Commuting back home", emoji: "🚗", startHour: 20, endHour: 21, status: "Upcoming" },
        { time: "21:00", activity: "Evening meal", emoji: "🍲", startHour: 21, endHour: 22, status: "Upcoming" },
        { time: "22:00", activity: "Learning new tech", emoji: "🚀", startHour: 22, endHour: 23, status: "Upcoming" },
        { time: "23:00", activity: "Evening wind-down", emoji: "📺", startHour: 23, endHour: 24, status: "Upcoming" },
    ]), []);

    // Function to determine activity status based on current time
    const determineActivityStatus = (startHour, endHour, currentHour) => {
        if (currentHour >= startHour && currentHour < endHour) {
            return 'Current';
        } else if (currentHour >= endHour) {
            return 'Completed';
        } else {
            return 'Upcoming';
        }
    };

    const [upcomingActivity, setUpcomingActivity] = useState({
        activity: "Debugging code",
        time: "03:00 PM"
    });

    // Format time to 12-hour format
    const formatTime = (hour) => {
        const hourInt = Math.floor(hour);
        const minutes = Math.floor((hour - hourInt) * 60);
        const ampm = hourInt >= 12 ? 'PM' : 'AM';
        const formattedHour = hourInt % 12 || 12;
        return `${formattedHour}:${minutes.toString().padStart(2, '0')} ${ampm}`;
    };

    // Update current and upcoming activities based on current time
    useEffect(() => {
        const updateActivities = () => {
            const now = new Date();
            const currentHour = now.getHours() + now.getMinutes() / 60;

            const updatedSchedule = initialSchedule.map(item => {
                const status = determineActivityStatus(item.startHour, item.endHour, currentHour);
                return {
                    ...item,
                    status,
                    time: formatTime(item.startHour) // Format the time to 12-hour format
                };
            });

            // Update current activity based on current hour
            const currentActivityItem = updatedSchedule.find(item => item.status === 'Current') ||
                updatedSchedule.find(item => item.status === 'Upcoming');
            if (currentActivityItem) {
                setCurrentActivity(prev => ({
                    ...prev,
                    activity: currentActivityItem.activity,
                    emoji: currentActivityItem.emoji,
                    time: currentActivityItem.time,
                    status: currentActivityItem.status === 'Current' ? 'Online' : 'Offline'
                }));
            }

            // Find the first upcoming activity
            const nextActivityItem = updatedSchedule.find(item => item.status === 'Upcoming');
            if (nextActivityItem) {
                setUpcomingActivity({
                    activity: nextActivityItem.activity,
                    time: nextActivityItem.time
                });
            }
        };

        // Update immediately and then every minute
        updateActivities();
        const intervalId = setInterval(updateActivities, 60000);

        return () => clearInterval(intervalId);
    }, [initialSchedule]);

    return (
        <div className={`${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'} backdrop-blur-md rounded-xl border ${theme === 'dark' ? 'border-gray-700/50' : 'border-gray-300'} p-4 lg:p-6 shadow-sm`}>
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center space-x-4">
                    <div className="relative">
                        <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                            {currentActivity.emoji}
                        </div>
                        <div className="absolute bottom-0.5 -right-0.5 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
                    </div>
                    <div className="text-center md:text-left">
                        <h3 className={`text-xl font-semibold ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>Currently: {currentActivity.activity}</h3>
                        <div className="flex flex-wrap justify-center md:justify-start items-center gap-4 mt-2 text-sm text-gray-300">
                            <span className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-map-pin w-4 h-4 mr-2">
                                    <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path>
                                    <circle cx="12" cy="10" r="3"></circle>
                                </svg>
                                {currentActivity.location}
                            </span>
                            <span className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-heart w-4 h-4 mr-2">
                                    <path d="m19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                                </svg>
                                {currentActivity.mood}
                            </span>
                            <span className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-clock w-4 h-4 mr-2">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <polyline points="12 6 12 12 16 14"></polyline>
                                </svg>
                                {currentActivity.time}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="w-full md:w-auto flex flex-col items-center gap-4">
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        Next: <span className={`text-gray-400 font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{upcomingActivity.activity}</span> • {upcomingActivity.time}
                    </p>
                    <a href="/real-time-activity"
                        className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-10 px-4 py-2 bg-green-500/20 hover:bg-green-500/30 text-green-400 border-green-500/50 border backdrop-blur-sm w-full md:w-auto">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-activity w-4 h-4 mr-2"><path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"></path></svg>
                        View Activity
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                            className="lucide lucide-external-link w-4 h-4">
                            <path d="M15 3h6v6"></path>
                            <path d="m10 14 9-9"></path>
                            <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6"></path>
                        </svg>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default CurrentActivity;