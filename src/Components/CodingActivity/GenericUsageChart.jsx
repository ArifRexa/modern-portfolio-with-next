import React from 'react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = [
  '#3B82F6', '#8B5CF6', '#10B981', '#F59E0B',
  '#EC4899', '#6366F1', '#14B8A6', '#F43F5E'
];

const GenericUsageChart = ({ data, title, chartType = 'bar', theme, dataType = 'general' }) => {
  if (!data || data.length === 0) {
    return (
      <div className={`backdrop-blur-md rounded-3xl border p-6 shadow-sm h-80 flex flex-col items-center justify-center ${theme === 'dark' ? 'bg-gray-900/40 border-white/5' : 'bg-white/60 border-white/40'}`}>
        <span className="text-4xl opacity-50 mb-2">📉</span>
        <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>No data for {title}</p>
      </div>
    );
  }

  // Prepare data
  const chartData = data.map(item => ({
    name: item.name,
    hours: parseFloat(item.decimal),
    time: item.text,
    percent: parseFloat(item.percent), // Ensure percent is a number
    // For projects
    humanAdditions: item.human_additions || 0,
    humanDeletions: item.human_deletions || 0,
  }));

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className={`p-4 rounded-xl shadow-2xl backdrop-blur-xl border ${theme === 'dark' ? 'bg-gray-800/90 border-white/10 text-white' : 'bg-white/90 border-gray-100 text-gray-800'}`}>
          <p className="font-bold text-lg mb-1">{data.name}</p>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between gap-4">
              <span className="opacity-70">Time:</span>
              <span className="font-mono font-medium">{data.time}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="opacity-70">Percent:</span>
              <span className="font-mono font-medium">{data.percent}%</span>
            </div>
            {dataType === 'projects' && (
              <div className="pt-2 mt-2 border-t border-gray-500/20">
                <p className="text-xs opacity-70 mb-1">Code Changes:</p>
                <div className="flex gap-3 text-xs">
                  <span className="text-green-500 font-bold">+{data.humanAdditions}</span>
                  <span className="text-red-500 font-bold">-{data.humanDeletions}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className={`backdrop-blur-md rounded-3xl border p-6 shadow-lg transition-all hover:shadow-xl ${theme === 'dark' ? 'bg-gray-900/40 border-white/5' : 'bg-white/60 border-white/40'}`}>
      <h3 className={`text-lg font-bold mb-6 flex items-center gap-2 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}`}>
        {title}
      </h3>

      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'bar' ? (
            <BarChart data={chartData} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke={theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'} />
              <XAxis type="number" hide />
              <YAxis
                dataKey="name"
                type="category"
                width={100}
                tick={{ fill: theme === 'dark' ? '#9CA3AF' : '#4B5563', fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }} />
              <Bar
                dataKey="hours"
                radius={[0, 4, 4, 0]}
                barSize={20}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          ) : (
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="percent"
                stroke="none"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend
                layout="vertical"
                verticalAlign="middle"
                align="right"
                iconType="circle"
                iconSize={8}
                wrapperStyle={{ fontSize: '12px', color: theme === 'dark' ? '#9CA3AF' : '#4B5563' }}
              />
            </PieChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default GenericUsageChart;