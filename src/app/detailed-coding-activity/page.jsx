'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import DetailedCodingChart from '@/Components/CodingActivity/DetailedCodingChart';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useTheme } from '@/context/ThemeContext';

const DetailedCodingActivity = () => {
  const { theme } = useTheme();
  // Default to empty string for "Average" view
  const [selectedDate, setSelectedDate] = useState('');
  const [historicalData, setHistoricalData] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(false);

  // Animation variants
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
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  // Fetch historical data
  useEffect(() => {
    const fetchHistoricalData = async () => {
      setLoadingHistory(true);
      try {
        const response = await fetch('/api/daily-coding-history');
        const data = await response.json();

        if (data.success) {
          setHistoricalData(data.data);
        }
      } catch (error) {
        console.error('Error fetching historical data:', error);
      } finally {
        setLoadingHistory(false);
      }
    };

    fetchHistoricalData();
  }, []);

  // Prepare data for charts
  const chartData = historicalData.map(item => ({
    date: item.date.split('-').pop(), // Just the day number
    fullDate: item.date, // Full date for tooltip
    hours: item.totalHours,
    projects: item.projectCount
  }));

  // Gradient Colors
  const chartColors = {
    hours: { stroke: '#8B5CF6', fill: '#8B5CF6' }, // Violet
    projects: { stroke: '#10B981', fill: '#10B981' } // Emerald
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-950' : 'bg-gray-50'} transition-colors duration-300`}>
      {/* Dynamic Background Gradient */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full blur-[100px] opacity-20 ${theme === 'dark' ? 'bg-blue-600' : 'bg-blue-400'}`}></div>
        <div className={`absolute top-[20%] -right-[10%] w-[40%] h-[40%] rounded-full blur-[100px] opacity-20 ${theme === 'dark' ? 'bg-purple-600' : 'bg-purple-400'}`}></div>
      </div>

      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {/* Header Section */}
        <motion.div variants={item} className="text-center space-y-4">
          <h1 className="text-4xl md:text-6xl font-black tracking-tight">
            <span className={`bg-clip-text text-transparent bg-gradient-to-r ${theme === 'dark' ? 'from-blue-400 via-purple-400 to-pink-400' : 'from-blue-600 via-purple-600 to-pink-600'}`}>
              Coding Activity
            </span>
            <span className={`block text-lg md:text-xl font-medium mt-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              Visualize your daily productivity & achievements
            </span>
          </h1>
        </motion.div>

        {/* Controls Section: Average vs Date */}
        <motion.div variants={item} className="flex justify-center">
          <div className={`backdrop-blur-xl rounded-2xl border p-2 flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4 shadow-lg ${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white/40 border-white/20'}`}>

            <button
              onClick={() => setSelectedDate('')}
              className={`px-6 py-2 rounded-xl transition-all font-semibold ${selectedDate === ''
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                  : theme === 'dark' ? 'text-gray-300 hover:bg-white/5' : 'text-gray-600 hover:bg-black/5'
                }`}
            >
              30-Day Average
            </button>

            <div className={`h-8 w-[1px] hidden sm:block ${theme === 'dark' ? 'bg-white/10' : 'bg-black/10'}`}></div>

            <div className="flex items-center space-x-2 px-2">
              <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>or pick date:</span>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className={`rounded-xl px-3 py-1.5 outline-none border transition-all focus:ring-2 focus:ring-purple-500 ${theme === 'dark' ? 'bg-gray-800/50 border-gray-600 text-white' : 'bg-white/80 border-gray-200 text-gray-800'}`}
              />
            </div>
          </div>
        </motion.div>

        {/* Status Indicator */}
        <motion.div variants={item} className="text-center">
          <span className={`inline-block px-4 py-1 rounded-full text-sm font-medium ${theme === 'dark' ? 'bg-blue-900/30 text-blue-300' : 'bg-blue-100 text-blue-700'}`}>
            {selectedDate
              ? `Showing details for: ${new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}`
              : 'Showing Average Stats (Last 30 Days)'
            }
          </span>
        </motion.div>

        {/* Historical Trend Chart Area */}
        <motion.div variants={item}>
          <div className={`rounded-3xl p-1 md:p-8 backdrop-blur-xl border shadow-2xl ${theme === 'dark' ? 'bg-gray-900/40 border-white/5' : 'bg-white/60 border-white/40'}`}>
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 px-4">
              <h3 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                30-Day Activity Trend
              </h3>
              <div className="flex gap-4 mt-4 md:mt-0">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-violet-500"></span>
                  <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Hours</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                  <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Projects</span>
                </div>
              </div>
            </div>

            <div className="h-[400px] w-full">
              {loadingHistory ? (
                <div className="flex justify-center items-center h-full">
                  <div className="animate-pulse flex flex-col items-center">
                    <div className="h-4 w-32 bg-gray-700 rounded mb-2"></div>
                    <div className="h-32 w-full bg-gray-700/20 rounded-xl"></div>
                  </div>
                </div>
              ) : historicalData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={chartColors.hours.fill} stopOpacity={0.3} />
                        <stop offset="95%" stopColor={chartColors.hours.fill} stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="colorProjects" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={chartColors.projects.fill} stopOpacity={0.3} />
                        <stop offset="95%" stopColor={chartColors.projects.fill} stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'} />
                    <XAxis
                      dataKey="date"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: theme === 'dark' ? '#9CA3AF' : '#6B7280', fontSize: 12 }}
                      dy={10}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: theme === 'dark' ? '#9CA3AF' : '#6B7280', fontSize: 12 }}
                      tickFormatter={(value) => `${value}h`}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: theme === 'dark' ? 'rgba(17, 24, 39, 0.8)' : 'rgba(255, 255, 255, 0.8)',
                        backdropFilter: 'blur(10px)',
                        border: 'none',
                        borderRadius: '12px',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                      }}
                      itemStyle={{ color: theme === 'dark' ? '#fff' : '#000' }}
                      labelStyle={{ color: theme === 'dark' ? '#9CA3AF' : '#6B7280', marginBottom: '0.5rem' }}
                      cursor={{ stroke: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)', strokeWidth: 2 }}
                    />
                    <Area
                      type="monotone"
                      dataKey="hours"
                      stroke={chartColors.hours.stroke}
                      fillOpacity={1}
                      fill="url(#colorHours)"
                      strokeWidth={3}
                    />
                    <Area
                      type="monotone"
                      dataKey="projects"
                      stroke={chartColors.projects.stroke}
                      fillOpacity={1}
                      fill="url(#colorProjects)"
                      strokeWidth={3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex h-full items-center justify-center text-gray-500">
                  No historical data available.
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Detailed Breakdown Component */}
        <motion.div variants={item}>
          <DetailedCodingChart date={selectedDate} />
        </motion.div>

      </motion.div>
    </div>
  );
};

export default DetailedCodingActivity;