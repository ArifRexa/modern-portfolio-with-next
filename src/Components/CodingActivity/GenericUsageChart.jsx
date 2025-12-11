import React from 'react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useTheme } from '@/context/ThemeContext';

const COLORS = ['#3B82F6', '#10B981', '#8B5CF6', '#F59E0B', '#EF4444', '#06B6D4', '#8B5CF6', '#EC4899'];

const GenericUsageChart = ({ data, title, chartType = 'bar', theme, dataType = 'general' }) => {
  if (!data || data.length === 0) {
    return (
      <div className={`${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'} backdrop-blur-md rounded-xl border ${theme === 'dark' ? 'border-gray-700/50' : 'border-gray-300'} p-6 shadow-sm h-80 flex items-center justify-center`}>
        <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>No ${title.toLowerCase()} data available</p>
      </div>
    );
  }

  // Prepare data for charts
  const chartData = data.map(item => {
    const baseData = {
      name: item.name,
      hours: parseFloat(item.decimal),
      time: item.text,
      percent: item.percent
    };

    // Add additional properties based on data type
    if (dataType === 'projects' && item.human_additions !== undefined) {
      baseData.humanAdditions = item.human_additions || 0;
      baseData.humanDeletions = item.human_deletions || 0;
    }

    return baseData;
  });

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className={`p-3 rounded-lg shadow-lg ${theme === 'dark' ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-800'} border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
          <p className="font-bold">{data.name}</p>
          <p>Time: {data.time}</p>
          <p>Percentage: {data.percent}%</p>
          {dataType === 'projects' && (
            <p>Human Code: +{data.humanAdditions}/-{data.humanDeletions}</p>
          )}
        </div>
      );
    }
    return null;
  };

  // Determine color based on data type
  const getColor = () => {
    switch(dataType) {
      case 'editors': return '#3B82F6';
      case 'languages': return '#F59E0B';
      case 'projects': return '#10B981';
      case 'operating_systems': return '#8B5CF6';
      default: return '#3B82F6';
    }
  };

  return (
    <div className={`${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'} backdrop-blur-md rounded-xl border ${theme === 'dark' ? 'border-gray-700/50' : 'border-gray-300'} p-4 lg:p-6 shadow-sm h-80`}>
      <h3 className={`text-xl font-bold mb-4 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>{title}</h3>
      
      {chartType === 'bar' ? (
        <ResponsiveContainer width="100%" height="85%">
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#4B5563' : '#D1D5DB'} />
            <XAxis 
              dataKey="name" 
              angle={-45} 
              textAnchor="end" 
              height={60}
              stroke={theme === 'dark' ? '#9CA3AF' : '#6B7280'}
            />
            <YAxis 
              stroke={theme === 'dark' ? '#9CA3AF' : '#6B7280'}
              tickFormatter={(value) => `${value}h`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar dataKey="hours" name="Hours" fill={getColor()} radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <ResponsiveContainer width="100%" height="85%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={true}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="percent"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default GenericUsageChart;