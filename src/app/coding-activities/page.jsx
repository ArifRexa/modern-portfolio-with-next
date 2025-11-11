// app/components/CodingActivities.jsx
'use client';
import React, { useState, useEffect } from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, Legend, AreaChart, Area } from 'recharts';

const StatCard = ({ title, value, icon, color }) => (
  <div className="bg-gray-900 backdrop-blur-md rounded-xl border border-gray-700/50 p-4 lg:p-6 shadow-sm flex flex-col items-center justify-center h-full">
    <div className={`${color} w-6 h-6 mb-2`}>{icon}</div>
    <div className="text-2xl font-bold">{value}</div>
    <div className="text-sm font-semibold text-gray-400">{title}</div>
  </div>
);

const CodingActivities = () => {
  const [codingData, setCodingData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [chartType, setChartType] = useState('bar'); // Default to bar chart

  useEffect(() => {
    const fetchCodingData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch extended data from the wakatime API
        const response = await fetch('/api/wakatime?extended=true');
        if (!response.ok) {
          throw new Error(`Failed to fetch coding data: ${response.status}`);
        }
        
        const data = await response.json();
        if (!data.success) {
          throw new Error(data.error || 'Unknown error occurred');
        }
        
        // Use the extended data
        setCodingData(data.extendedData);
      } catch (err) {
        console.error('Error fetching coding data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCodingData();
  }, []);

  // Show loading state
  if (loading) {
    return (
      <section className="space-y-6">
        <div className="text-center p-2 sm:px-8 lg:px-12">
          <h1 className="relative inline-block text-3xl sm:text-4xl md:text-4xl font-extrabold tracking-tight text-gray-200">
            Coding Activities
          </h1>
          <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg leading-relaxed text-gray-300">
            Explore my coding journey across platforms and projects
          </p>
          <span className="block h-1 w-16 mx-auto mt-3 rounded-full bg-blue-400"></span>
        </div>
        
        <div className="text-center py-12">
          <p className="text-gray-400">Loading coding data...</p>
        </div>
      </section>
    );
  }

  // Show error state
  if (error || !codingData) {
    return (
      <section className="space-y-6">
        <div className="text-center p-2 sm:px-8 lg:px-12">
          <h1 className="relative inline-block text-3xl sm:text-4xl md:text-4xl font-extrabold tracking-tight text-gray-200">
            Coding Activities
          </h1>
          <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg leading-relaxed text-gray-300">
            Explore my coding journey across platforms and projects
          </p>
          <span className="block h-1 w-16 mx-auto mt-3 rounded-full bg-blue-400"></span>
        </div>
        
        <div className="text-center py-12">
          <p className="text-red-400">Error loading coding data: {error || 'Unknown error'}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="text-center p-2 sm:px-8 lg:px-12">
        <h1 className="relative inline-block text-3xl sm:text-4xl md:text-4xl font-extrabold tracking-tight text-gray-200">
          Coding Activities
        </h1>
        <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg leading-relaxed text-gray-300">
          Explore my coding journey across platforms and projects
        </p>
        <span className="block h-1 w-16 mx-auto mt-3 rounded-full bg-blue-400"></span>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
        <StatCard
          title="Today's Coding"
          value={codingData.coding_time.today}
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />
            </svg>
          }
          color="text-yellow-500"
        />
        <StatCard
          title="Weekly Coding Time"
          value={codingData.coding_time.weekly}
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M8 2v4" />
              <path d="M16 2v4" />
              <rect width="18" height="18" x="3" y="4" rx="2" />
              <path d="M3 10h18" />
              <path d="m9 16 2 2 4-4" />
            </svg>
          }
          color="text-green-500"
        />
        <StatCard
          title="Total Coding Time"
          value={codingData.coding_time.monthly}
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          }
          color="text-blue-500"
        />
        <StatCard
          title="Avg. Daily Time"
          value={codingData.coding_time.average}
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2" />
            </svg>
          }
          color="text-purple-500"
        />
      </div>

      {/* Weekly Activity Chart */}
      <div className="bg-gray-900 backdrop-blur-md rounded-xl border border-gray-700/50 p-4 lg:p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
          <h3 className="text-2xl font-bold tracking-tight text-gray-200">Weekly Activity (hours)</h3>
          
          {/* Chart Type Selector */}
          <div className="flex flex-wrap gap-2">
            <button 
              onClick={() => setChartType('bar')}
              className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                chartType === 'bar' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
              }`}
            >
              Bar
            </button>
            <button 
              onClick={() => setChartType('line')}
              className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                chartType === 'line' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
              }`}
            >
              Line
            </button>
            <button 
              onClick={() => setChartType('pie')}
              className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                chartType === 'pie' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
              }`}
            >
              Pie
            </button>
            <button 
              onClick={() => setChartType('doughnut')}
              className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                chartType === 'doughnut' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
              }`}
            >
              Donut
            </button>
          </div>
        </div>
        
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            {chartType === 'bar' && (
              <BarChart
                data={codingData.weekly_activity.map((day, i) => ({
                  name: day.day,
                  hours: parseFloat(day.hours),
                  dayOrder: i
                }))}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 30,
                }}
              >
                <CartesianGrid stroke="none" />
                <XAxis 
                  dataKey="name" 
                  stroke="#9CA3AF" 
                  tick={{ fill: '#9CA3AF', fontSize: 12 }}
                  axisLine={{ stroke: '#4B5563' }}
                />
                <YAxis 
                  stroke="#9CA3AF" 
                  tick={{ fill: '#9CA3AF', fontSize: 12 }}
                  axisLine={{ stroke: '#4B5563' }}
                />
                <Tooltip
                  wrapperStyle={{ outline: 'none' }}
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    borderColor: '#065ae2ff',
                    borderRadius: '0.5rem',
                    color: '#F9FAFB',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.1)',
                    border: '1px solid #374151'
                  }}
                  itemStyle={{ color: '#F9FAFB' }}
                  labelStyle={{ color: '#F9FAFB', fontWeight: 'bold', marginBottom: '5px' }}
                />
                <Bar 
                  dataKey="hours" 
                  name="Hours"
                  radius={[4, 4, 0, 0]}
                  minPointSize={2}
                >
                  {codingData.weekly_activity.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill="url(#colorGradient)" 
                      stroke="url(#colorGradient)"
                      strokeWidth={0}
                    />
                  ))}
                </Bar>
                <defs>
                  <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.9}/>
                    <stop offset="95%" stopColor="#2563EB" stopOpacity={0.7}/>
                  </linearGradient>
                </defs>
              </BarChart>
            )}
            
            {chartType === 'line' && (
              <LineChart
                data={codingData.weekly_activity.map((day, i) => ({
                  name: day.day,
                  hours: parseFloat(day.hours),
                  dayOrder: i
                }))}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 30,
                }}
              >
                <CartesianGrid stroke="none" />
                <XAxis 
                  dataKey="name" 
                  stroke="#9CA3AF" 
                  tick={{ fill: '#9CA3AF' }}
                  axisLine={{ stroke: '#4B5563' }}
                />
                <YAxis 
                  stroke="#9CA3AF" 
                  tick={{ fill: '#9CA3AF' }}
                  axisLine={{ stroke: '#4B5563' }}
                />
                <Tooltip
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    borderColor: '#374151',
                    borderRadius: '0.5rem',
                    color: '#F9FAFB',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                  }}
                  itemStyle={{ color: '#F9FAFB' }}
                  labelStyle={{ color: '#F9FAFB', fontWeight: 'bold' }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="hours"
                  name="Hours"
                  stroke="url(#colorLine)"
                  strokeWidth={3}
                  dot={{ stroke: '#3B82F6', strokeWidth: 2, r: 4, fill: '#1F2937' }}
                  activeDot={{ r: 6, stroke: '#3B82F6', strokeWidth: 2, fill: '#1F2937' }}
                />
                <defs>
                  <linearGradient id="colorLine" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={1}/>
                    <stop offset="95%" stopColor="#60A5FA" stopOpacity={1}/>
                  </linearGradient>
                </defs>
              </LineChart>
            )}
            
            {(chartType === 'pie' || chartType === 'doughnut') && (
              <PieChart>
                <Pie
                  data={codingData.weekly_activity.map((day, i) => ({
                    name: day.day,
                    hours: parseFloat(day.hours),
                    dayOrder: i
                  }))}
                  cx="50%"
                  cy="50%"
                  label={({ name, percent }) => `${name}\n${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                  outerRadius={chartType === 'doughnut' ? 80 : '80%'}
                  innerRadius={chartType === 'doughnut' ? '50%' : 0}
                  dataKey="hours"
                  nameKey="name"
                  paddingAngle={2}
                >
                  {codingData.weekly_activity.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={['#6366F1', '#8B5CF6', '#EC4899', '#F43F5E', '#F97316', '#F59E0B', '#10B981'][index % 7]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    borderColor: '#374151',
                    borderRadius: '0.5rem',
                    color: '#F9FAFB',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                  }}
                  formatter={(value) => [`${value} hours`, 'Hours']}
                />
                <Legend />
              </PieChart>
            )}
          </ResponsiveContainer>
        </div>
      </div>

      {/* Footer */}
      <div className="text-sm text-right mt-4 text-gray-400">
        Last updated: {new Date().toLocaleString()} (UTC +6)
      </div>
    </section>
  );
};

export default CodingActivities;