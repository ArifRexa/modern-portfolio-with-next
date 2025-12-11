// app/components/RealTimeActivity.jsx
'use client';
import React, { useState, useEffect, useMemo } from 'react';
import { getTodaysMeetings, getCoffeeCount } from '@/utils/activityTracker';
import { useTheme } from '@/context/ThemeContext';
import DetailedCodingChart from '@/Components/CodingActivity/DetailedCodingChart';

const RealTimeActivity = () => {
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

    const [dailySchedule, setDailySchedule] = useState(initialSchedule);
    const [currentTime, setCurrentTime] = useState(new Date());

    // State for dynamic stats with loading indicators
    const [dailyStats, setDailyStats] = useState({
        codingTime: "...", // Loading indicator
        commits: "...",    // Loading indicator
        meetings: getTodaysMeetings(),  // Random but consistent number for the day (0-4)
        coffees: getCoffeeCount(),      // Dynamic based on time of day (0-3)
    });

    // Fetch dynamic data on component mount
    useEffect(() => {
        const fetchCodingTime = async () => {
            try {
                const response = await fetch('/api/wakatime?extended=true'); // ensure extended data
                if (!response.ok) throw new Error('Failed to fetch coding time');

                const data = await response.json();
                setDailyStats(prev => ({
                    ...prev,
                    codingTime: data.extendedData?.coding_time?.today || '0 mins' // ✅ corrected
                }));
            } catch (error) {
                console.error('Error fetching coding time:', error);
                setDailyStats(prev => ({ ...prev, codingTime: '0 mins' }));
            }
        };

        const fetchCommitCount = async () => {
            try {
                const response = await fetch('/api/github/commits'); // Replace with your actual API endpoint
                if (!response.ok) throw new Error('Failed to fetch commit count');
                const data = await response.json();
                setDailyStats(prev => ({ ...prev, commits: data.commitCount })); // Assuming API returns { commitCount: 5 }
            } catch (error) {
                console.error('Error fetching commit count:', error);
                setDailyStats(prev => ({ ...prev, commits: 0 })); // Fallback on error
            }
        };

        // Call the fetch functions
        fetchCodingTime();
        fetchCommitCount();
    }, []); // Empty dependency array ensures this runs only once on mount

    const [codingActivity, setCodingActivity] = useState([
        { period: "Night (12AM-6AM)", hours: "0.00", percent: 0, height: "0px" },
        { period: "Morning (6AM-12PM)", hours: "0.00", percent: 0, height: "0px" },
        { period: "Afternoon (12PM-6PM)", hours: "0.00", percent: 0, height: "0px" },
        { period: "Evening (6PM-12AM)", hours: "0.00", percent: 0, height: "0px" },
    ]);

    // Fetch dynamic coding activity data from the database
    useEffect(() => {
        const fetchCodingActivity = async () => {
            try {
                const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
                const response = await fetch(`/api/daily-coding-breakdown?date=${today}`);
                if (!response.ok) throw new Error('Failed to fetch coding activity breakdown');
                const data = await response.json();

                if (data.success && data.codingBreakdown) {
                    const breakdown = data.codingBreakdown;

                    // Prepare raw hours (numbers)
                    // const night = breakdown.night_time || 0;
                    // const morning = (breakdown.morning_time  || 0) - night;
                    // const afternoon = (breakdown.afternoon_time || 0) - morning - night;
                    // const evening = (breakdown.evening_time || 0) - afternoon - morning - night;
                    const night = breakdown.night_time || 0;
                    const morning = breakdown.morning_time || 0;
                    const afternoon = breakdown.afternoon_time || 0;
                    const evening = breakdown.evening_time || 0;

                    const formattedData = [
                        { period: "Night (12AM-6AM)", hours: night },
                        { period: "Morning (6AM-12PM)", hours: morning },
                        { period: "Afternoon (12PM-6PM)", hours: afternoon },
                        { period: "Evening (6PM-12AM)", hours: evening },
                    ];

                    // Calculate max for percentages and height
                    const maxHours = Math.max(...formattedData.map(item => item.hours));
                    const finalData = formattedData.map(item => ({
                        ...item,
                        percent: maxHours > 0 ? parseFloat(((item.hours / maxHours) * 100).toFixed(2)) : 0,
                        height: maxHours > 0 ? `${Math.round((item.hours / maxHours) * 180)}px` : '0px',
                        hours: item.hours.toFixed(2), // ✅ now it's safe
                    }));
                    setCodingActivity(finalData);
                }
            } catch (error) {
                console.error('Error fetching coding activity:', error);
            }
        };
        fetchCodingActivity();
    }, []);


    const [activeDevices] = useState([
        // { name: "MacBook Pro", type: "laptop", status: "active" },
        // { name: "Xiaomi Note 13 Pro", type: "smartphone", status: "active" },
        { name: "MacBook Pro", type: "laptop", status: "active" },
        { name: "Windows", type: "laptop", status: "active" },
        { name: "Linux", type: "laptop", status: "active" },
        { name: "Honor X9C", type: "smartphone", status: "active" }
    ]);

    const [healthData] = useState({
        steps: { today: 0, goal: 10000, progress: 0 },
        calories: { burned: 964, bmr: 963, active: 0 },
        distance: { today: "0.00", week: "15.59", longest: "8.56" },
        weeklyGoalCompleted: 1,
        totalWeeklySteps: 18274,
    });

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

    // Update schedule based on current time
    useEffect(() => {
        const updateSchedule = () => {
            const now = new Date();
            const currentHour = now.getHours() + now.getMinutes() / 60;
            const updatedSchedule = initialSchedule.map(item => {
                const status = determineActivityStatus(item.startHour, item.endHour, currentHour);
                return { ...item, status };
            });
            setDailySchedule(updatedSchedule);

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
        };

        // Update immediately and then every minute
        updateSchedule();
        const intervalId = setInterval(updateSchedule, 60000);
        return () => clearInterval(intervalId);
    }, [initialSchedule]);

    // Update current time every minute
    useEffect(() => {
        const timeInterval = setInterval(() => {
            setCurrentTime(new Date());
        }, 60000);
        return () => clearInterval(timeInterval);
    }, []);

    // Update coffee count as time passes throughout the day
    useEffect(() => {
        const coffeeInterval = setInterval(() => {
            setDailyStats(prevStats => ({
                ...prevStats,
                coffees: getCoffeeCount()
            }));
        }, 60000); // Update every minute

        return () => clearInterval(coffeeInterval);
    }, []);

    const getStatusColor = (status) => {
        switch (status) {
            case 'Completed':
                return theme === 'dark' ? 'bg-green-500/20 text-green-400 border-green-500/50' : 'bg-green-100 text-green-700 border-green-200';
            case 'Current':
                return theme === 'dark' ? 'bg-blue-500/20 text-blue-400 border-blue-500/50' : 'bg-blue-100 text-blue-700 border-blue-200';
            case 'Upcoming':
                return theme === 'dark' ? 'bg-gray-500/20 text-gray-400 border-gray-500/50' : 'bg-gray-100 text-gray-700 border-gray-200';
            case 'active':
                return theme === 'dark' ? 'bg-green-500/20 text-green-400 border-green-500/50' : 'bg-green-100 text-green-700 border-green-200';
            case 'Offline':
                return theme === 'dark' ? 'bg-gray-500/20 text-gray-400 border-gray-500/50' : 'bg-gray-100 text-gray-700 border-gray-200';
            default:
                return theme === 'dark' ? 'bg-gray-500/20 text-gray-400 border-gray-500/50' : 'bg-gray-100 text-gray-700 border-gray-200';
        }
    };

    const getDeviceIcon = (type) => {
        if (type === 'laptop') {
            return (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${theme === 'dark' ? 'text-white' : 'text-gray-800'} w-5 h-5`}>
                    <path d="M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.55a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45L4 16"></path>
                </svg>
            );
        }
        return (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${theme === 'dark' ? 'text-white' : 'text-gray-800'} w-5 h-5`}>
                <rect width="14" height="20" x="5" y="2" rx="2" ry="2"></rect>
                <path d="M12 18h.01"></path>
            </svg>
        );
    };

    // Function to convert decimal hours to hours and minutes format (e.g., 4.70h -> 4h 42m)
    const convertToHoursAndMinutes = (decimalHours) => {
        const hours = Math.floor(parseFloat(decimalHours) || 0);
        const minutes = Math.round(((parseFloat(decimalHours) || 0) - hours) * 60);

        if (hours > 0 && minutes > 0) {
            return `${hours}h ${minutes}m`;
        } else if (hours > 0) {
            return `${hours}h`;
        } else if (minutes > 0) {
            return `${minutes}m`;
        } else {
            return '0m';
        }
    };

    return (
        <div className="space-y-6">
            {/* Current Activity Card */}
            <div
                className={`${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'} backdrop-blur-md rounded-xl border ${theme === 'dark' ? 'border-gray-700/50' : 'border-gray-300/50'} p-4 lg:p-6 shadow-sm`}
                style={{ opacity: 1, transform: 'none' }}
            >
                <div className="flex flex-col md:flex-row flex-wrap md:justify-between gap-6 items-center text-center md:text-left">
                    <div className="flex flex-col space-y-4 w-full md:w-auto items-center md:items-start">
                        <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 items-center">
                            <div className="relative">
                                <div className="w-16 h-16 bg-linear-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                                    {currentActivity.emoji}
                                </div>
                                <div className="absolute bottom-0.5 -right-0.5 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
                            </div>
                            <div>
                                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 items-center mb-1">
                                    <h3 className={`text-2xl font-bold ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>Currently: {currentActivity.activity}</h3>
                                </div>
                                <div className="flex flex-wrap justify-center sm:justify-start items-center gap-2 lg:gap-4 text-sm lg:text-md">
                                    <span className={`flex items-center ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-map-pin w-4 h-4 mr-1">
                                            <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path>
                                            <circle cx="12" cy="10" r="3"></circle>
                                        </svg>
                                        {currentActivity.location}
                                    </span>
                                    <span className={`flex items-center ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-heart w-4 h-4 mr-1">
                                            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                                        </svg>
                                        {currentActivity.mood}
                                    </span>
                                    <span className={`flex items-center ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-clock w-4 h-4 mr-1">
                                            <circle cx="12" cy="12" r="10"></circle>
                                            <polyline points="12 6 12 12 16 14"></polyline>
                                        </svg>
                                        {currentActivity.time}
                                    </span>
                                    <span className={`flex items-center ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-eye w-4 h-4 mr-1">
                                            <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"></path>
                                            <circle cx="12" cy="12" r="3"></circle>
                                        </svg>
                                        {currentActivity.activeDevices} active devices
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex w-full md:w-auto justify-center md:justify-end">
                        <div className={`py-0.5 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 w-fit flex items-center gap-1 px-3 text-sm font-medium border backdrop-blur-sm rounded-full ${theme === 'dark' ? 'bg-gray-500/20 hover:bg-gray-500/30 text-gray-400 border-gray-500/50' : 'bg-gray-200 hover:bg-gray-300 text-gray-600 border-gray-300'}`}>
                            <span className={`flex w-2.5 h-2.5 rounded-full animate-pulse ${theme === 'dark' ? 'bg-gray-400' : 'bg-gray-600'}`}></span>
                            {currentActivity.status}
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col-reverse lg:flex-row gap-4 items-stretch">
                {/* Schedule Section */}
                <div className="w-full lg:w-2/3 space-y-4 order-2 lg:order-1 flex flex-col">
                    <div
                        className={`${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'} backdrop-blur-md rounded-xl border ${theme === 'dark' ? 'border-gray-700/50' : 'border-gray-300/50'} p-4 lg:p-6 shadow-sm h-full`}
                        style={{ opacity: 1, transform: 'none' }}
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-4">
                                <h3 className={`text-2xl lg:text-2xl font-bold tracking-tight ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>Today&apos;s Schedule</h3>
                            </div>
                        </div>
                        <div className="space-y-2">
                            {dailySchedule.map((item, index) => (
                                <div
                                    key={index}
                                    className={`relative rounded-xl border backdrop-blur-md shadow-md p-1 lg:py-2 ${item.status === 'Current'
                                        ? theme === 'dark'
                                            ? 'from-blue-900/30 to-blue-800/20 border-blue-500/50'
                                            : 'from-blue-100 to-blue-200 border-blue-300'
                                        : item.status === 'Completed'
                                            ? theme === 'dark'
                                                ? 'from-green-900/20 to-green-800/10 border-green-500/30'
                                                : 'from-green-100 to-green-200 border-green-300'
                                            : theme === 'dark'
                                                ? 'from-gray-800 to-gray-900 border-gray-700/40'
                                                : 'from-gray-100 to-gray-200 border-gray-300'
                                        } bg-linear-to-br`}
                                >
                                    <div className="flex items-center space-x-4">
                                        <div className={`text-sm font-mono ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{item.time}</div>
                                        <div className="text-2xl">{item.emoji}</div>
                                        <div className="flex-1">
                                            <div className={`font-medium ${item.status === 'Current'
                                                ? theme === 'dark'
                                                    ? 'text-blue-300'
                                                    : 'text-blue-600'
                                                : item.status === 'Completed'
                                                    ? theme === 'dark'
                                                        ? 'text-green-300'
                                                        : 'text-green-600'
                                                    : theme === 'dark'
                                                        ? 'text-white'
                                                        : 'text-gray-800'
                                                }`}>
                                                {item.activity}
                                            </div>
                                        </div>
                                        <div className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${getStatusColor(item.status)}`}>
                                            {item.status}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                {/* Stats & Devices Section */}
                <aside className="w-full lg:w-1/3 space-y-4 order-1 lg:order-2 flex flex-col h-auto">
                    {/* Today's Stats */}
                    <div
                        className={`${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'} backdrop-blur-md rounded-xl border ${theme === 'dark' ? 'border-gray-700/50' : 'border-gray-300/50'} p-4 lg:p-6 shadow-sm`}
                        style={{ opacity: 1, transform: 'none' }}
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-4">
                                <h3 className={`text-2xl lg:text-2xl font-bold tracking-tight ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>Today&apos;s Stats</h3>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="text-center">
                                <div className={`text-2xl font-bold ${theme === 'dark' ? 'text-yellow-400' : 'text-yellow-600'}`}>{dailyStats.codingTime}</div> {/* Dynamic */}
                                <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Coding</div>
                            </div>
                            <div className="text-center">
                                <div className={`text-2xl font-bold ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`}>{dailyStats.commits}</div> {/* Dynamic */}
                                <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Commits</div>
                            </div>
                            <div className="text-center">
                                <div className={`text-2xl font-bold ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`}>{dailyStats.meetings}</div>
                                <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Meetings</div>
                            </div>
                            <div className="text-center">
                                <div className={`text-2xl font-bold ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>{dailyStats.coffees}</div>
                                <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Coffees</div>
                            </div>
                        </div>
                    </div>
                    {/* Coding Activity */}
                    <div
                        className={`${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'} backdrop-blur-md rounded-xl border ${theme === 'dark' ? 'border-gray-700/50' : 'border-gray-300/50'} p-4 lg:p-6 shadow-sm`}
                        style={{ opacity: 1, transform: 'none' }}
                    >
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-4">
                                <h3 className={`text-2xl lg:text-2xl font-bold tracking-tight ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>Today&apos;s Coding Activity</h3>
                            </div>
                        </div>
                        <div className="rounded-lg transition-all duration-300">
                            <div className="flex justify-between items-end h-65 gap-2">
                                {codingActivity.map((period, index) => (
                                    <div key={index} className="flex-1 flex flex-col items-center gap-1 group">
                                        <span className={`text-xs font-semibold order-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{period.period.split(' ')[0]}</span>
                                        <span className={`text-xs font-semibold order-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{`(${period.period.split('(')[1].split(')')[0]})`}</span>
                                        <div className="w-full flex flex-col items-center relative">
                                            <span className={`text-xs font-semibold mb-1 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>{convertToHoursAndMinutes(period.hours)}</span>
                                            <div className={`w-full max-w-20px h-[180px] rounded-t-md ${theme === 'dark' ? 'bg-gray-800/30' : 'bg-gray-300/30'} overflow-hidden transition-all duration-300 group-hover:shadow-md flex items-end`}>
                                                <div
                                                    className={`w-full rounded-t-md bg-linear-to-t from-teal-500 to-cyan-400 group-hover:opacity-90 transition-all duration-300`}
                                                    style={{ height: period.height }}
                                                ></div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    {/* Devices */}
                    <div
                        className={`${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'} backdrop-blur-md rounded-xl border ${theme === 'dark' ? 'border-gray-700/50' : 'border-gray-300/50'} p-4 lg:p-6 shadow-sm`}
                        style={{ opacity: 1, transform: 'none' }}
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-4">
                                <h3 className={`text-2xl lg:text-2xl font-bold tracking-tight ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>Devices</h3>
                            </div>
                        </div>
                        {activeDevices.map((device, index) => (
                            <div key={index} className="flex items-center space-x-4 py-2 rounded-lg">
                                <div className={`w-10 h-10 bg-linear-to-br ${theme === 'dark' ? 'from-gray-800 to-gray-700' : 'from-gray-200 to-gray-300'} rounded-lg flex items-center justify-center`}>
                                    {getDeviceIcon(device.type)}
                                </div>
                                <div className="flex-1">
                                    <div className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>{device.name}</div>
                                </div>
                                <div className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${getStatusColor(device.status)}`}>
                                    {device.status}
                                </div>
                            </div>
                        ))}
                    </div>
                </aside>
            </div>
            {/* Health & Fitness Section */}
            <div
                className={`${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'} backdrop-blur-md rounded-xl border ${theme === 'dark' ? 'border-gray-700/50' : 'border-gray-300/50'} p-4 lg:p-6 shadow-sm space-y-4`}
                style={{ opacity: 1, transform: 'none' }}
            >
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                        <h3 className={`text-2xl lg:text-2xl font-bold tracking-tight ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>Health & Fitness</h3>
                    </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-3">
                    {/* Steps Card */}
                    <div className={`relative rounded-xl p-4 lg:p-4 border backdrop-blur-md shadow-md bg-linear-to-br ${theme === 'dark' ? 'from-gray-800 to-gray-900 border-gray-700/40' : 'from-gray-200 to-gray-300 border-gray-300/40'} h-full`}>
                        <div className="flex items-center space-x-3 mb-4">
                            <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center shadow-sm">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                                    <path d="M4 16v-2.38C4 11.5 2.97 10.5 3 8c.03-2.72 1.49-6 4.5-6C9.37 2 10 3.8 10 5.5c0 3.11-2 5.66-2 8.68V16a2 2 0 1 1-4 0Z"></path>
                                    <path d="M20 20v-2.38c0-2.12 1.03-3.12 1-5.62-.03-2.72-1.49-6-4.5-6C14.63 6 14 7.8 14 9.5c0 3.11 2 5.66 2 8.68V20a2 2 0 1 0 4 0Z"></path>
                                    <path d="M16 17h4"></path>
                                    <path d="M4 13h4"></path>
                                </svg>
                            </div>
                            <div>
                                <div className={`text-lg font-semibold ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>Steps</div>
                                <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Total movement count</div>
                            </div>
                        </div>
                        <div className="space-y-1 text-sm">
                            <div className="flex justify-between">
                                <span className={`font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Today</span>
                                <span className={`font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{healthData.steps.today}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className={`font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Goal</span>
                                <span className={`font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{healthData.steps.goal}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className={`font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Progress</span>
                                <span className={`font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{healthData.steps.progress}%</span>
                            </div>
                        </div>
                    </div>
                    {/* Calories Card */}
                    <div className={`relative rounded-xl p-4 lg:p-4 border backdrop-blur-md shadow-md bg-linear-to-br ${theme === 'dark' ? 'from-gray-800 to-gray-900 border-gray-700/40' : 'from-gray-200 to-gray-300 border-gray-300/40'} h-full`}>
                        <div className="flex items-center space-x-3 mb-4">
                            <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center shadow-sm">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                                    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path>
                                </svg>
                            </div>
                            <div>
                                <div className={`text-lg font-semibold ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>Calories</div>
                                <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Calories burned vs goal</div>
                            </div>
                        </div>
                        <div className="space-y-1 text-sm">
                            <div className="flex justify-between">
                                <span className={`font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Burned</span>
                                <span className={`font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{healthData.calories.burned}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className={`font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>BMR</span>
                                <span className={`font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{healthData.calories.bmr}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className={`font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Active Minutes</span>
                                <span className={`font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{healthData.calories.active}</span>
                            </div>
                        </div>
                    </div>
                    {/* Distance Card */}
                    <div className={`relative rounded-xl p-4 lg:p-4 border backdrop-blur-md shadow-md bg-linear-to-br ${theme === 'dark' ? 'from-gray-800 to-gray-900 border-gray-700/40' : 'from-gray-200 to-gray-300 border-gray-300/40'} h-full`}>
                        <div className="flex items-center space-x-3 mb-4">
                            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center shadow-sm">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                                    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
                                    <polyline points="16 7 22 7 22 13"></polyline>
                                </svg>
                            </div>
                            <div>
                                <div className={`text-lg font-semibold ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>Distance</div>
                                <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Distance covered</div>
                            </div>
                        </div>
                        <div className="space-y-1 text-sm">
                            <div className="flex justify-between">
                                <span className={`font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Today</span>
                                <span className={`font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{healthData.distance.today} km</span>
                            </div>
                            <div className="flex justify-between">
                                <span className={`font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>This Week</span>
                                <span className={`font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{healthData.distance.week} km</span>
                            </div>
                            <div className="flex justify-between">
                                <span className={`font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Longest</span>
                                <span className={`font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{healthData.distance.longest} km</span>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Weekly Goal Achievement */}
                <div className={`relative rounded-xl p-4 lg:p-4 border backdrop-blur-md shadow-md bg-linear-to-br ${theme === 'dark' ? 'from-gray-800 to-gray-900 border-gray-700/40' : 'from-gray-200 to-gray-300 border-gray-300/40'} h-full`}>
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                        <div>
                            <h3 className={`text-xl font-semibold mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>Weekly Goal Achievement</h3>
                            <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Walked <span className={`font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{healthData.totalWeeklySteps}</span> steps this week!</p>
                        </div>
                        <div className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${theme === 'dark' ? 'bg-gray-600 text-gray-200' : 'bg-gray-300 text-gray-700'}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`lucide lucide-target w-5 h-5 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>
                                <circle cx="12" cy="12" r="10"></circle>
                                <circle cx="12" cy="12" r="6"></circle>
                                <circle cx="12" cy="12" r="2"></circle>
                            </svg>
                            <span className={`font-semibold ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>{healthData.weeklyGoalCompleted}/7 Days Goal Met</span>
                        </div>
                    </div>
                </div>
            </div>
            {/* Detailed Coding Activity Section */}
            <div
                className={`${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'} backdrop-blur-md rounded-xl border ${theme === 'dark' ? 'border-gray-700/50' : 'border-gray-300/50'} p-4 lg:p-6 shadow-sm`}
                style={{ opacity: 1, transform: 'none' }}
            >
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                        <h3 className={`text-2xl lg:text-2xl font-bold tracking-tight ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>Detailed Coding Activity</h3>
                    </div>
                    <a
                        href="/detailed-coding-activity"
                        className={`px-4 py-2 rounded-lg transition-colors ${theme === 'dark' ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
                    >
                        View Full Details
                    </a>
                </div>
                <DetailedCodingChart date={new Date().toISOString().split('T')[0]} />
            </div>
        </div>
    );
};

export default RealTimeActivity;