'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import DetailedCodingChart from '@/Components/CodingActivity/DetailedCodingChart';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useTheme } from '@/context/ThemeContext';

const DetailedCodingActivity = () => {
  const { theme } = useTheme();
  // 'overview' | 'languages' | 'projects'
  const [viewMode, setViewMode] = useState('overview');
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

  // Helper: Get top N items by total duration across all history
  const getTopItems = (data, field, n = 7) => {
    const totals = {};
    data.forEach(day => {
      if (day[field]) {
        day[field].forEach(item => {
          totals[item.name] = (totals[item.name] || 0) + item.hours;
        });
      }
    });
    return Object.entries(totals)
      .sort(([, a], [, b]) => b - a)
      .slice(0, n)
      .map(([name]) => name);
  };

  // Helper to format decimal hours to "1h 30m"
  const formatDuration = (decimalHours) => {
    const hours = Math.floor(decimalHours);
    const minutes = Math.round((decimalHours - hours) * 60);
    if (hours === 0) return `${minutes}m`;
    return `${hours}h ${minutes}m`;
  };

  const topLanguages = React.useMemo(() => getTopItems(historicalData, 'languages'), [historicalData]);
  const topProjects = React.useMemo(() => getTopItems(historicalData, 'projects'), [historicalData]);

  // Color Palettes
  const colors = {
    overview: {
      items: ['Hours', 'Projects'],
      map: { Hours: '#8B5CF6', Projects: '#10B981' }
    },
    languages: {
      items: topLanguages,
      map: topLanguages.reduce((acc, lang, i) => ({
        ...acc,
        [lang]: [
          '#3B82F6', '#8B5CF6', '#EC4899', '#F59E0B', '#10B981', '#EF4444', '#6366F1'
        ][i % 7]
      }), {})
    },
    projects: {
      items: topProjects,
      map: topProjects.reduce((acc, proj, i) => ({
        ...acc,
        [proj]: [
          '#F472B6', '#34D399', '#60A5FA', '#A78BFA', '#FBBF24', '#F87171', '#2DD4BF'
        ][i % 7]
      }), {})
    }
  };

  // Prepare data for charts with dynamic keys
  const chartData = historicalData.map(item => {
    const base = {
      date: item.date.split('-').pop(),
      fullDate: item.date,
      Hours: item.totalHours,
      Projects: item.projectCount
    };

    // Initialize all keys to 0 to prevent gaps in Stacked Area Chart
    topLanguages.forEach(lang => base[lang] = 0);
    topProjects.forEach(proj => base[proj] = 0);

    // Flatten languages
    if (item.languages) {
      item.languages.forEach(l => {
        if (topLanguages.includes(l.name)) {
          base[l.name] = l.hours;
        }
      });
    }

    // Flatten projects
    if (item.projects) {
      item.projects.forEach(p => {
        if (topProjects.includes(p.name)) {
          base[p.name] = p.hours;
        }
      });
    }

    return base;
  });

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



        {/* Historical Trend Chart Area */}
        <motion.div variants={item}>
          <div className={`rounded-3xl p-1 md:p-8 backdrop-blur-xl border shadow-2xl ${theme === 'dark' ? 'bg-gray-900/40 border-white/5' : 'bg-white/60 border-white/40'}`}>
            <div className="flex flex-col gap-6 mb-8 px-4">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-4">
                  <h3 className={`text-2xl font-bold whitespace-nowrap ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                    30-Day Trend
                  </h3>
                  {/* View Selector */}
                  <div className={`flex rounded-lg p-1 border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-gray-100 border-gray-200'}`}>
                    {['overview', 'languages', 'projects'].map((mode) => (
                      <button
                        key={mode}
                        onClick={() => setViewMode(mode)}
                        className={`px-3 py-1 text-xs sm:text-sm font-medium rounded-md capitalize transition-all ${viewMode === mode
                          ? theme === 'dark' ? 'bg-gray-700 text-white shadow' : 'bg-white text-gray-800 shadow'
                          : theme === 'dark' ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'
                          }`}
                      >
                        {mode}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Dynamic Legend */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                {colors[viewMode].items.map((item, i) => (
                  <div key={item} className="flex items-center gap-1.5">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: viewMode === 'overview' ? colors.overview.map[item] : colors[viewMode].map[item] }}
                    ></span>
                    <span className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{item}</span>
                  </div>
                ))}
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
                        <stop offset="5%" stopColor={colors.overview.map.Hours} stopOpacity={0.3} />
                        <stop offset="95%" stopColor={colors.overview.map.Hours} stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="colorProjects" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={colors.overview.map.Projects} stopOpacity={0.3} />
                        <stop offset="95%" stopColor={colors.overview.map.Projects} stopOpacity={0} />
                      </linearGradient>

                      {/* Dynamic Gradients for Languages */}
                      {topLanguages.map((lang, index) => (
                        <linearGradient key={`grad-lang-${index}`} id={`color-lang-${index}`} x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={colors.languages.map[lang]} stopOpacity={0.4} />
                          <stop offset="95%" stopColor={colors.languages.map[lang]} stopOpacity={0.05} />
                        </linearGradient>
                      ))}

                      {/* Dynamic Gradients for Projects */}
                      {topProjects.map((proj, index) => (
                        <linearGradient key={`grad-proj-${index}`} id={`color-proj-${index}`} x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={colors.projects.map[proj]} stopOpacity={0.4} />
                          <stop offset="95%" stopColor={colors.projects.map[proj]} stopOpacity={0.05} />
                        </linearGradient>
                      ))}
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
                      tickFormatter={(value) => `${value}`}
                    />
                    <Tooltip
                      content={({ active, payload, label }) => {
                        if (active && payload && payload.length) {
                          // Filter out zero values
                          const activeItems = payload.filter(entry => entry.value > 0);

                          if (activeItems.length === 0) return null;

                          return (
                            <div className={`p-3 rounded-xl border backdrop-blur-md shadow-xl ${theme === 'dark'
                              ? 'bg-gray-900/90 border-gray-700 text-white'
                              : 'bg-white/90 border-gray-200 text-gray-800'
                              }`}>
                              <p className={`text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                                {label}
                              </p>
                              <div className="space-y-1">
                                {activeItems.map((entry, index) => {
                                  // Determine appropriate display unit
                                  let valueDisplay = entry.value;
                                  if (viewMode === 'overview' && entry.name === 'Projects') {
                                    valueDisplay = entry.value; // Projects keeps raw count
                                  } else {
                                    // Everything else is hours (Overview 'Hours', Languages, Projects view items)
                                    valueDisplay = formatDuration(entry.value);
                                  }

                                  return (
                                    <div key={index} className="flex items-center gap-2 text-xs">
                                      <span
                                        className="w-2 h-2 rounded-full"
                                        style={{ backgroundColor: entry.color || entry.fill }}
                                      ></span>
                                      <span className="font-medium">{entry.name}:</span>
                                      <span>{valueDisplay}</span>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          );
                        }
                        return null;
                      }}
                      cursor={{ stroke: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)', strokeWidth: 2 }}
                    />

                    {colors[viewMode].items.map((item, index) => {
                      // Determine fill URL
                      let fillUrl;
                      if (viewMode === 'overview') {
                        fillUrl = item === 'Hours' ? "url(#colorHours)" : "url(#colorProjects)";
                      } else if (viewMode === 'languages') {
                        fillUrl = `url(#color-lang-${index})`;
                      } else {
                        fillUrl = `url(#color-proj-${index})`;
                      }

                      return (
                        <Area
                          key={item}
                          type="monotone"
                          dataKey={item}
                          stackId={viewMode === 'overview' ? undefined : "1"}
                          stroke={viewMode === 'overview' ? colors.overview.map[item] : colors[viewMode].map[item]}
                          fill={fillUrl}
                          fillOpacity={1}
                          strokeWidth={2}
                        />
                      );
                    })}
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

        {/* Detailed Breakdown Component */}
        <motion.div variants={item}>
          <DetailedCodingChart date={selectedDate} />
        </motion.div>

      </motion.div>
    </div>
  );
};

export default DetailedCodingActivity;