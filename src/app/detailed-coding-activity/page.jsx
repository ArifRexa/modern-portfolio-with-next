'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import DetailedCodingChart from '@/Components/CodingActivity/DetailedCodingChart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { useTheme } from '@/context/ThemeContext';

const DetailedCodingActivity = () => {
  const { theme } = useTheme();
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [historicalData, setHistoricalData] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(false);

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
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
    day: item.date, // Full date for tooltip
    hours: item.totalHours,
    editors: item.editorCount,
    languages: item.languageCount,
    projects: item.projectCount
  }));

  return (
    <motion.div
      className="space-y-6"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {/* Header */}
      <motion.div variants={item} className="text-center p-2 sm:px-8 lg:px-12">
        <h1 className={`relative inline-block text-3xl sm:text-4xl md:text-4xl font-extrabold tracking-tight ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
          Detailed Coding Activity
        </h1>
        <p className={`max-w-2xl mx-auto text-sm sm:text-base md:text-lg leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
          Deep dive into your coding activities with detailed breakdowns
        </p>
        <span className={`block h-1 w-16 mx-auto mt-3 rounded-full bg-blue-400`}></span>
      </motion.div>

      {/* Historical Trend Chart */}
      <motion.div variants={item}>
        <div className={`${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'} backdrop-blur-md rounded-xl border ${theme === 'dark' ? 'border-gray-700/50' : 'border-gray-300'} p-4 lg:p-6 shadow-sm`}>
          <h3 className={`text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>30-Day Coding Trend</h3>
          {loadingHistory ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : historicalData.length > 0 ? (
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={chartData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 30 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#4B5563' : '#D1D5DB'} />
                  <XAxis
                    dataKey="date"
                    stroke={theme === 'dark' ? '#9CA3AF' : '#6B7280'}
                  />
                  <YAxis
                    stroke={theme === 'dark' ? '#9CA3AF' : '#6B7280'}
                    tickFormatter={(value) => `${value}h`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: theme === 'dark' ? '#1F2937' : '#F9FAFB',
                      borderColor: theme === 'dark' ? '#374151' : '#E5E7EB',
                      borderRadius: '0.5rem',
                      color: theme === 'dark' ? '#F9FAFB' : '#1F2937',
                    }}
                    formatter={(value, name) => {
                      if (name === 'hours') return [`${value}h`, 'Hours'];
                      return [value, name === 'editors' ? 'Editors' : name === 'languages' ? 'Languages' : 'Projects'];
                    }}
                    labelFormatter={(label) => {
                      // Find the full date from the original data
                      const fullDate = historicalData.find(item => item.date.endsWith(label))?.date;
                      return `Date: ${fullDate}`;
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="hours"
                    name="Hours"
                    stroke="#3B82F6"
                    strokeWidth={2}
                    dot={{ stroke: '#3B82F6', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, stroke: '#3B82F6' }}
                  />
                  <Line
                    type="monotone"
                    dataKey="projects"
                    name="Projects"
                    stroke="#10B981"
                    strokeWidth={2}
                    dot={{ stroke: '#10B981', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, stroke: '#10B981' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="flex justify-center items-center h-64">
              <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>No historical data available</p>
            </div>
          )}
        </div>
      </motion.div>

      {/* Date Selector */}
      <motion.div variants={item} className="flex flex-col items-center">
        <div className={`${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'} backdrop-blur-md rounded-xl border ${theme === 'dark' ? 'border-gray-700/50' : 'border-gray-300'} p-4 shadow-sm w-full max-w-md`}>
          <label className={`block text-center mb-2 font-medium ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>
            Select Date
          </label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className={`w-full p-2 rounded-lg border ${theme === 'dark' ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-700'}`}
          />
        </div>
        <div className={`mt-2 px-4 py-2 rounded-lg ${theme === 'dark' ? 'bg-blue-900/30 text-blue-300' : 'bg-blue-100 text-blue-700'}`}>
          Showing details for: {new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
      </motion.div>

      {/* Detailed Coding Charts */}
      <motion.div variants={item}>
        <DetailedCodingChart date={selectedDate} />
      </motion.div>
    </motion.div>
  );
};

export default DetailedCodingActivity;