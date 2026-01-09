import React, { useState, useEffect } from 'react';
import GenericUsageChart from './GenericUsageChart';
import { useTheme } from '@/context/ThemeContext';
import { motion } from 'framer-motion';

const DetailedCodingChart = ({ date }) => {
  const { theme } = useTheme();
  const [codingDetails, setCodingDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [chartType, setChartType] = useState('bar'); // 'bar', 'pie', 'radial'

  useEffect(() => {
    const fetchCodingDetails = async () => {
      try {
        setLoading(true);
        setError(null);

        let url;
        if (date) {
          url = `/api/daily-coding-details?date=${date}`;
        } else {
          url = `/api/daily-coding-averages`;
        }

        const response = await fetch(url);
        const data = await response.json();

        if (!data.success) {
          throw new Error(data.message || 'Failed to fetch coding details');
        }

        setCodingDetails(data.data);
      } catch (err) {
        console.error('Error fetching coding details:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCodingDetails();
  }, [date]);

  // Loading State
  if (loading) {
    return (
      <div className={`backdrop-blur-md rounded-3xl border p-8 shadow-lg ${theme === 'dark' ? 'bg-gray-900/40 border-white/5' : 'bg-white/60 border-white/40'}`}>
        <div className="flex flex-col justify-center items-center h-64 space-y-4">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Loading detailed stats...</p>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className={`backdrop-blur-md rounded-3xl border p-8 shadow-lg ${theme === 'dark' ? 'bg-red-900/20 border-red-500/20' : 'bg-red-50 border-red-200'}`}>
        <div className="flex flex-col items-center text-center">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <span className="text-2xl">⚠️</span>
          </div>
          <h3 className="text-lg font-bold text-red-500 mb-2">Failed to load data</h3>
          <p className={`${theme === 'dark' ? 'text-red-400' : 'text-red-600'}`}>{error}</p>
        </div>
      </div>
    );
  }

  // No Data State
  if (!codingDetails) {
    return (
      <div className={`backdrop-blur-md rounded-3xl border p-8 shadow-lg ${theme === 'dark' ? 'bg-gray-900/40 border-white/5' : 'bg-white/60 border-white/40'}`}>
        <div className="flex flex-col items-center justify-center h-64">
          <span className="text-4xl mb-4">📊</span>
          <p className={`text-lg font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>No detailed coding data available for this date.</p>
        </div>
      </div>
    );
  }

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

  return (
    <motion.div
      className="space-y-8"
      variants={container}
      initial="hidden"
      animate="show"
    >

      {/* 1. Summary Cards (Moved to Top) */}
      <motion.div variants={item} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Editors', value: codingDetails.editors?.length || 0, color: 'blue', icon: '📝' },
          { label: 'OS Used', value: codingDetails.operating_systems?.length || 0, color: 'purple', icon: '💻' },
          { label: 'Projects', value: codingDetails.projects?.length || 0, color: 'emerald', icon: '🚀' },
          { label: 'Languages', value: codingDetails.languages?.length || 0, color: 'orange', icon: '🔥' },
        ].map((stat, index) => (
          <div
            key={index}
            className={`relative overflow-hidden rounded-2xl p-6 border backdrop-blur-xl transition-all hover:scale-105 hover:shadow-xl ${theme === 'dark'
              ? 'bg-gray-800/40 border-white/5 hover:bg-gray-800/60'
              : 'bg-white/60 border-white/40 hover:bg-white/80'
              }`}
          >
            {/* Background Gradient Blob */}
            <div className={`absolute -right-4 -top-4 w-24 h-24 rounded-full blur-2xl opacity-20 bg-${stat.color}-500`}></div>

            <div className="relative z-10 flex flex-col items-center justify-center text-center">
              <span className="text-3xl mb-2 filter drop-shadow-md">{stat.icon}</span>
              <p className={`text-3xl font-black ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                {stat.value}
              </p>
              <p className={`text-sm font-medium uppercase tracking-wider mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                {stat.label}
              </p>
            </div>
          </div>
        ))}
      </motion.div>

      {/* 2. Controls & Charts */}
      <motion.div variants={item} className="space-y-6">
        <div className="flex justify-between items-center px-2">
          <h3 className={`text-xl font-bold ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>
            Detailed Breakdown
          </h3>
          {/* Chart Type Toggle */}
          <div className={`inline-flex rounded-xl p-1 border ${theme === 'dark' ? 'bg-gray-900/50 border-gray-700' : 'bg-gray-100 border-gray-200'}`}>
            {['bar', 'pie'].map((type) => (
              <button
                key={type}
                onClick={() => setChartType(type)}
                className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all capitalize ${chartType === type
                  ? theme === 'dark'
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white text-blue-600 shadow-sm'
                  : theme === 'dark'
                    ? 'text-gray-400 hover:text-gray-200'
                    : 'text-gray-500 hover:text-gray-700'
                  }`}
              >
                {type} Chart
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Editor Usage */}
          <GenericUsageChart
            data={codingDetails.editors}
            title="Editor Usage"
            chartType={chartType}
            theme={theme}
            dataType="editors"
          />

          {/* Operating System Usage */}
          <GenericUsageChart
            data={codingDetails.operating_systems}
            title="Operating System Usage"
            chartType={chartType}
            theme={theme}
            dataType="operating_systems"
          />

          {/* Language Usage */}
          <GenericUsageChart
            data={codingDetails.languages}
            title="Language Usage"
            chartType={chartType}
            theme={theme}
            dataType="languages"
          />

          {/* Project Activity */}
          <GenericUsageChart
            data={codingDetails.projects}
            title="Project Activity"
            chartType={chartType}
            theme={theme}
            dataType="projects"
          />

        </div>
      </motion.div>
    </motion.div>
  );
};

export default DetailedCodingChart;