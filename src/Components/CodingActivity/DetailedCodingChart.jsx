import React, { useState, useEffect } from 'react';
import GenericUsageChart from './GenericUsageChart';
import { useTheme } from '@/context/ThemeContext';

const DetailedCodingChart = ({ date }) => {
  const { theme } = useTheme();
  const [codingDetails, setCodingDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [chartType, setChartType] = useState('bar'); // 'bar' or 'pie'

  useEffect(() => {
    const fetchCodingDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(`/api/daily-coding-details?date=${date || new Date().toISOString().split('T')[0]}`);
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

  if (loading) {
    return (
      <div className={`${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'} backdrop-blur-md rounded-xl border ${theme === 'dark' ? 'border-gray-700/50' : 'border-gray-300'} p-6 shadow-sm`}>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'} backdrop-blur-md rounded-xl border ${theme === 'dark' ? 'border-gray-700/50' : 'border-gray-300'} p-6 shadow-sm`}>
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  if (!codingDetails) {
    return (
      <div className={`${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'} backdrop-blur-md rounded-xl border ${theme === 'dark' ? 'border-gray-700/50' : 'border-gray-300'} p-6 shadow-sm`}>
        <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>No detailed coding data available for the selected date</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Chart Type Toggle */}
      <div className="flex justify-end">
        <div className="inline-flex rounded-lg border p-1">
          <button
            className={`px-3 py-1 text-sm rounded-md transition-colors ${
              chartType === 'bar'
                ? theme === 'dark'
                  ? 'bg-blue-600 text-white'
                  : 'bg-blue-500 text-white'
                : theme === 'dark'
                ? 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
            }`}
            onClick={() => setChartType('bar')}
          >
            Bar Chart
          </button>
          <button
            className={`px-3 py-1 text-sm rounded-md transition-colors ${
              chartType === 'pie'
                ? theme === 'dark'
                  ? 'bg-blue-600 text-white'
                  : 'bg-blue-500 text-white'
                : theme === 'dark'
                ? 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
            }`}
            onClick={() => setChartType('pie')}
          >
            Pie Chart
          </button>
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

        {/* Project Activity */}
        <GenericUsageChart
          data={codingDetails.projects}
          title="Project Activity"
          chartType={chartType}
          theme={theme}
          dataType="projects"
        />

        {/* Language Usage */}
        <GenericUsageChart
          data={codingDetails.languages}
          title="Language Usage"
          chartType={chartType}
          theme={theme}
          dataType="languages"
        />
      </div>

      {/* Summary Stats */}
      <div className={`${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'} backdrop-blur-md rounded-xl border ${theme === 'dark' ? 'border-gray-700/50' : 'border-gray-300'} p-6 shadow-sm`}>
        <h3 className={`text-xl font-bold mb-4 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>Today's Coding Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="text-center p-4 rounded-lg bg-gradient-to-br from-blue-500/10 to-blue-600/10">
            <p className="text-lg font-bold text-blue-500">{codingDetails.editors?.length || 0}</p>
            <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Editors</p>
          </div>
          <div className="text-center p-4 rounded-lg bg-gradient-to-br from-green-500/10 to-green-600/10">
            <p className="text-lg font-bold text-green-500">{codingDetails.operating_systems?.length || 0}</p>
            <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>OS Used</p>
          </div>
          <div className="text-center p-4 rounded-lg bg-gradient-to-br from-purple-500/10 to-purple-600/10">
            <p className="text-lg font-bold text-purple-500">{codingDetails.projects?.length || 0}</p>
            <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Projects</p>
          </div>
          <div className="text-center p-4 rounded-lg bg-gradient-to-br from-yellow-500/10 to-yellow-600/10">
            <p className="text-lg font-bold text-yellow-500">{codingDetails.languages?.length || 0}</p>
            <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Languages</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailedCodingChart;