// app/components/CodingActivities.jsx
'use client';
import React, { useState, useEffect } from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, Legend, AreaChart, Area } from 'recharts';
import { useTheme } from '@/context/ThemeContext';

const StatCard = ({ title, value, icon, color, theme }) => (
  <div className={`${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'} backdrop-blur-md rounded-xl border ${theme === 'dark' ? 'border-gray-700/50' : 'border-gray-300'} p-4 lg:p-6 shadow-sm flex flex-col items-center justify-center h-full relative overflow-hidden group`}>
    {/* 3D Glass Effect */}
    <div className={`absolute inset-0 ${theme === 'dark' ? 'bg-linear-to-br from-blue-500/10 to-purple-500/10' : 'bg-linear-to-br from-blue-400/10 to-purple-400/10'} rounded-xl transform -rotate-1 scale-105 opacity-60 group-hover:opacity-100 transition-all duration-300 z-0`}></div>
    <div className="relative z-10">
      <div className={`w-6 h-6 mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>{icon}</div>
      <div className={`text-2xl font-bold ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>{value}</div>
      <div className={`text-sm font-semibold ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{title}</div>
    </div>
  </div>
);

// Helper function to convert decimal hours to hh:mm
const formatHoursToHHMM = (decimalHours) => {
  const hours = Math.floor(decimalHours);
  const minutes = Math.round((decimalHours - hours) * 60);
  return `${hours}h ${minutes}m`;
};

const CodingActivities = () => {
  const { theme } = useTheme();
  const [codingData, setCodingData] = useState(null);
  const [monthlyDailyHours, setMonthlyDailyHours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [chartType, setChartType] = useState('bar'); // Default to bar chart
  const [monthlyChartType, setMonthlyChartType] = useState('Bar'); // Chart type for monthly data
  const [showGrid, setShowGrid] = useState(false);

  useEffect(() => {
    const fetchCodingData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch('/api/wakatime?extended=true');
        if (!response.ok) throw new Error(`Failed to fetch coding data: ${response.status}`);

        const data = await response.json();
        if (!data.success) throw new Error(data.error || 'Unknown error occurred');

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

  useEffect(() => {
    const fetchMonthlyData = async () => {
      try {
        const response = await fetch('/api/monthly-coding-breakdown');
        if (!response.ok) throw new Error(`Failed to fetch monthly data: ${response.status}`);

        const data = await response.json();
        if (data.success) setMonthlyDailyHours(data.monthlyDailyHours || []);
      } catch (err) {
        console.error('Error fetching monthly daily hours:', err);
        setMonthlyDailyHours([]);
      }
    };

    fetchMonthlyData();
  }, []);

  if (loading) {
    return (
      <section className="space-y-6 py-8">
        <div className="text-center p-2 sm:px-8 lg:px-12">
          <h1 className="relative inline-block text-3xl sm:text-4xl md:text-4xl font-extrabold tracking-tight text-gray-200">
            Coding Activities
          </h1>
          <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg leading-relaxed text-gray-300">
            Loading coding data...
          </p>
          <span className="block h-1 w-16 mx-auto mt-3 rounded-full bg-blue-400"></span>
        </div>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </section>
    );
  }

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


  const monthlyChartData = monthlyDailyHours
    .map(d => ({ day: d.day, hours: parseFloat(d.hours) }))
    .filter(d => d.hours > 0); // remove 0-hour entries

  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="text-center p-2 sm:px-8 lg:px-12">
        <h1 className={`relative inline-block text-3xl sm:text-4xl md:text-4xl font-extrabold tracking-tight ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
          Coding Activities
        </h1>
        <p className={`max-w-2xl mx-auto text-sm sm:text-base md:text-lg leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
          Explore my coding journey across platforms and projects
        </p>
        <span className={`block h-1 w-16 mx-auto mt-3 rounded-full bg-blue-400`}></span>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
        <StatCard title="Today's Coding" value={codingData.coding_time.today}
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />
            </svg>
          }
          color="text-yellow-500" theme={theme} />


        <StatCard title="Weekly Coding Time" value={codingData.coding_time.weekly} icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 2v4" /><path d="M16 2v4" /><rect width="18" height="18" x="3" y="4" rx="2" /><path d="M3 10h18" /><path d="m9 16 2 2 4-4" /></svg>} color="text-green-500" theme={theme} />


        <StatCard title="Total Coding Time" value={codingData.coding_time.monthly} icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>} color="text-blue-500" theme={theme} />


        <StatCard title="Avg. Daily Time" value={codingData.coding_time.average} icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2" /></svg>} color="text-purple-500" theme={theme} />
      </div>

      {/* Weekly Activity Chart */}
      <div className={`${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'} backdrop-blur-md rounded-xl border ${theme === 'dark' ? 'border-gray-700/50' : 'border-gray-300'} p-4 lg:p-6 shadow-sm`}>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
          <h3 className={`text-2xl font-bold tracking-tight ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>Weekly Activity (hours)</h3>
          <div className="flex flex-wrap gap-2">
            <button onClick={() => setChartType('bar')} className={`px-3 py-1 text-sm rounded-lg transition-colors ${chartType === 'bar' ? `${theme === 'dark' ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white'}` : `${theme === 'dark' ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' : 'bg-gray-300 text-gray-700 hover:bg-gray-400'}`}`}>Bar</button>
            <button onClick={() => setChartType('line')} className={`px-3 py-1 text-sm rounded-lg transition-colors ${chartType === 'line' ? `${theme === 'dark' ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white'}` : `${theme === 'dark' ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' : 'bg-gray-300 text-gray-700 hover:bg-gray-400'}`}`}>Line</button>
            <button onClick={() => setChartType('pie')} className={`px-3 py-1 text-sm rounded-lg transition-colors ${chartType === 'pie' ? `${theme === 'dark' ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white'}` : `${theme === 'dark' ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' : 'bg-gray-300 text-gray-700 hover:bg-gray-400'}`}`}>Pie</button>
            <button onClick={() => setChartType('doughnut')} className={`px-3 py-1 text-sm rounded-lg transition-colors ${chartType === 'doughnut' ? `${theme === 'dark' ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white'}` : `${theme === 'dark' ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' : 'bg-gray-300 text-gray-700 hover:bg-gray-400'}`}`}>Donut</button>
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
                margin={{ top: 20, right: 30, left: 20, bottom: 30 }}
              >
                <CartesianGrid stroke="none" />
                <XAxis dataKey="name" stroke={theme === 'dark' ? '#9CA3AF' : '#6B7280'} tick={{ fill: theme === 'dark' ? '#9CA3AF' : '#6B7280', fontSize: 12 }} axisLine={{ stroke: theme === 'dark' ? '#4B5563' : '#D1D5DB' }} />
                <YAxis tickFormatter={formatHoursToHHMM} stroke={theme === 'dark' ? '#9CA3AF' : '#6B7280'} tick={{ fill: theme === 'dark' ? '#9CA3AF' : '#6B7280', fontSize: 12 }} axisLine={{ stroke: theme === 'dark' ? '#4B5563' : '#D1D5DB' }} />
                <Tooltip
                  formatter={(value) => [formatHoursToHHMM(value), 'Time']}
                  contentStyle={{
                    backgroundColor: theme === 'dark' ? '#1F2937' : '#F9FAFB',
                    borderColor: theme === 'dark' ? '#374151' : '#E5E7EB',
                    borderRadius: '0.5rem',
                    color: theme === 'dark' ? '#F9FAFB' : '#1F2937',
                  }}
                  itemStyle={{
                    color: theme === 'dark' ? '#F9FAFB' : '#1F2937',
                  }}
                />

                <Bar dataKey="hours" radius={[4, 4, 0, 0]} minPointSize={2}>
                  {codingData.weekly_activity.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill="url(#colorGradient)" stroke="url(#colorGradient)" strokeWidth={0} />
                  ))}
                </Bar>
                <defs>
                  <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.9} />
                    <stop offset="95%" stopColor="#2563EB" stopOpacity={0.7} />
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
                margin={{ top: 20, right: 30, left: 20, bottom: 30 }}
              >
                <CartesianGrid stroke="none" />
                <XAxis dataKey="name" stroke={theme === 'dark' ? '#9CA3AF' : '#6B7280'} tick={{ fill: theme === 'dark' ? '#9CA3AF' : '#6B7280' }} axisLine={{ stroke: theme === 'dark' ? '#4B5563' : '#D1D5DB' }} />
                <YAxis tickFormatter={formatHoursToHHMM} stroke={theme === 'dark' ? '#9CA3AF' : '#6B7280'} tick={{ fill: theme === 'dark' ? '#9CA3AF' : '#6B7280' }} axisLine={{ stroke: theme === 'dark' ? '#4B5563' : '#D1D5DB' }} />
                <Tooltip formatter={(value) => [formatHoursToHHMM(value), 'Time']} contentStyle={{ backgroundColor: theme === 'dark' ? '#1F2937' : '#F9FAFB', borderColor: theme === 'dark' ? '#374151' : '#E5E7EB', borderRadius: '0.5rem', color: theme === 'dark' ? '#F9FAFB' : '#1F2937' }} />
                <Legend />
                <Line type="monotone" dataKey="hours" name="Hours" stroke="url(#colorLine)" strokeWidth={3} dot={{ stroke: theme === 'dark' ? '#3B82F6' : '#2563EB', strokeWidth: 2, r: 4, fill: theme === 'dark' ? '#1F2937' : '#F9FAFB' }} activeDot={{ r: 6, stroke: theme === 'dark' ? '#3B82F6' : '#2563EB', strokeWidth: 2, fill: theme === 'dark' ? '#1F2937' : '#F9FAFB' }} />
                <defs>
                  <linearGradient id="colorLine" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={theme === 'dark' ? '#3B82F6' : '#2563EB'} stopOpacity={1} />
                    <stop offset="95%" stopColor={theme === 'dark' ? '#60A5FA' : '#3B82F6'} stopOpacity={1} />
                  </linearGradient>
                </defs>
              </LineChart>
            )}

            {(chartType === 'pie' || chartType === 'doughnut') && (
              <PieChart>
                <Pie
                  data={codingData.weekly_activity.map((day, i) => ({
                    name: day.day,
                    hours: parseFloat(day.hours)
                  }))}
                  dataKey="hours"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  innerRadius={chartType === 'doughnut' ? 40 : 0}
                  fill="#3B82F6"
                  label={({ name, hours }) => `${name}\n${formatHoursToHHMM(hours)}`}
                >
                  {codingData.weekly_activity.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={['#3B82F6', '#2563EB', '#60A5FA', '#2563EB', '#3B82F6', '#3B82F6', '#2563EB'][index % 7]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [formatHoursToHHMM(value), 'Time']} contentStyle={{ backgroundColor: theme === 'dark' ? '#1F2937' : '#F9FAFB', borderColor: theme === 'dark' ? '#374151' : '#E5E7EB', borderRadius: '0.5rem', color: theme === 'dark' ? '#F9FAFB' : '#1F2937' }} />
              </PieChart>
            )}
          </ResponsiveContainer>
        </div>
      </div>





      {/* Monthly Chart */}
      {monthlyDailyHours.length > 0 && (
        <div className={`${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'} rounded-xl p-4 shadow-sm`}>
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-xl font-bold">Monthly Daily Activity (hours)</h3>
            <div className="flex gap-2 items-center">
              {['Bar', 'Line', 'Area'].map(t => (
                <button
                  key={t}
                  onClick={() => setMonthlyChartType(t)}
                  className={`px-3 py-1 text-sm rounded ${monthlyChartType === t ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'}`}
                >
                  {t}
                </button>
              ))}
              {/* Toggle for Grid */}
              <label className="flex items-center gap-3 ml-4 cursor-pointer select-none">
                <span className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>Show Grid</span>
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={showGrid}
                    onChange={() => setShowGrid(!showGrid)}
                    className="sr-only"
                  />
                  <div className={`w-11 h-6 rounded-full transition-colors duration-300 ${showGrid ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
                  <div
                    className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${showGrid ? 'translate-x-5' : 'translate-x-0'}`}
                  ></div>
                </div>
              </label>

            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              {monthlyChartType === 'Bar' && (
                <BarChart data={monthlyChartData}>
                  {showGrid && <CartesianGrid strokeDasharray="3 3" />}
                  <XAxis dataKey="day" />
                  <YAxis tickFormatter={formatHoursToHHMM} />
                  <Tooltip formatter={v => formatHoursToHHMM(v)} contentStyle={{
                    backgroundColor: theme === 'dark' ? '#1F2937' : '#F9FAFB',
                    borderColor: theme === 'dark' ? '#374151' : '#E5E7EB',
                    borderRadius: '0.5rem',
                    color: theme === 'dark' ? '#F9FAFB' : '#1F2937',
                  }}
                    itemStyle={{
                      color: theme === 'dark' ? '#F9FAFB' : '#1F2937',
                    }} />
                  <Bar dataKey="hours" fill="#10B981" />
                </BarChart>
              )}
              {monthlyChartType === 'Line' && (
                <LineChart data={monthlyChartData}>
                  {showGrid && <CartesianGrid strokeDasharray="3 3" />}
                  <XAxis dataKey="day" />
                  <YAxis tickFormatter={formatHoursToHHMM} />
                  <Tooltip formatter={v => formatHoursToHHMM(v)} contentStyle={{
                    backgroundColor: theme === 'dark' ? '#1F2937' : '#F9FAFB',
                    borderColor: theme === 'dark' ? '#374151' : '#E5E7EB',
                    borderRadius: '0.5rem',
                    color: theme === 'dark' ? '#F9FAFB' : '#1F2937',
                  }}
                    itemStyle={{
                      color: theme === 'dark' ? '#F9FAFB' : '#1F2937',
                    }} />
                  <Line type="monotone" dataKey="hours" stroke="#10B981" strokeWidth={3} />
                </LineChart>
              )}
              {monthlyChartType === 'Area' && (
                <AreaChart data={monthlyChartData}>
                  {showGrid && <CartesianGrid strokeDasharray="3 3" />}
                  <XAxis dataKey="day" />
                  <YAxis tickFormatter={formatHoursToHHMM} />
                  <Tooltip formatter={v => formatHoursToHHMM(v)} contentStyle={{
                    backgroundColor: theme === 'dark' ? '#1F2937' : '#F9FAFB',
                    borderColor: theme === 'dark' ? '#374151' : '#E5E7EB',
                    borderRadius: '0.5rem',
                    color: theme === 'dark' ? '#F9FAFB' : '#1F2937',
                  }}
                    itemStyle={{
                      color: theme === 'dark' ? '#F9FAFB' : '#1F2937',
                    }} />
                  <Area type="monotone" dataKey="hours" stroke="#10B981" strokeWidth={3} fill="rgba(16,185,129,0.3)" />
                </AreaChart>
              )}
            </ResponsiveContainer>
          </div>
        </div>
      )}



    </section>
  );
};

export default CodingActivities;
