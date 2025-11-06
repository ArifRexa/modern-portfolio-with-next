// app/components/CodingActivities.jsx
'use client';
import React from 'react';

const StatCard = ({ title, value, icon, color }) => (
  <div className="bg-gray-900 backdrop-blur-md rounded-xl border border-gray-700/50 p-4 lg:p-6 shadow-sm flex flex-col items-center justify-center h-full">
    <div className={`${color} w-6 h-6 mb-2`}>{icon}</div>
    <div className="text-2xl font-bold">{value}</div>
    <div className="text-sm font-semibold text-gray-400">{title}</div>
  </div>
);

const CodingActivities = () => {
  // Mock data — in practice, you'd fetch this from an API or pass it as props
  const codingData = {
    coding_time: {
      today: "0h 55m",
      weekly: "9h 20m",
      monthly: "91h 57m",
      average: "3h 3m"
    },
    coding_sessions: {
      weekly: 38,
      average: "0h 28m",
      longest: "6h 10m",
      current: "0h 52m"
    },
    languages: {
      TypeScript: { time: "48h 41m", percentage: 52.9 },
      Python: { time: "20h 22m", percentage: 22.2 },
      JavaScript: { time: "6h 21m", percentage: 6.9 },
      SQL: { time: "1h 6m", percentage: 1.2 },
      Bash: { time: "1h 4m", percentage: 1.2 },
      Other: { time: "2h 9m", percentage: 2.3 }
    },
    editors: {
      "VS Code": { time: "76h 42m", percentage: 83.4 },
      Chrome: { time: "15h 11m", percentage: 16.5 },
      DataGrip: { time: "0h 3m", percentage: 0.1 }
    },
    operating_systems: {
      Linux: { time: "78h 5m", percentage: 84.9 },
      Mac: { time: "13h 51m", percentage: 15.1 }
    },
    projects: {
      "Homebuyer Backend": { time: "31h 40m", percentage: 34.4 },
      "Portfolio Frontend": { time: "17h 15m", percentage: 18.8 },
      "aif9PmS3-c80O0xxc-lrQ": { time: "10h 44m", percentage: 11.7 },
      "fYLqvv93Y-kinGNRv-9jDJ": { time: "7h 13m", percentage: 7.9 },
      "Bzh1c7k0Cp-nIqoMzR97CD-lGGn65": { time: "5h 50m", percentage: 6.4 },
      "flood-risk-uk": { time: "4h 56m", percentage: 5.4 },
      Other: { time: "14h 15m", percentage: 15.5 }
    },
    categories: {
      Coding: { time: "76h 41m", percentage: 83.4 },
      Browsing: { time: "15h 11m", percentage: 16.5 },
      "Writing Docs": { time: "0h 5m", percentage: 0.1 }
    },
    weekly_activity: [
      { day: "Mon", hours: "0.92" },
      { day: "Sun", hours: "0.19" },
      { day: "Sat", hours: "0.74" },
      { day: "Fri", hours: "1.66" },
      { day: "Thu", hours: "1.38" },
      { day: "Wed", hours: "1.89" },
      { day: "Tue", hours: "2.55" }
    ],
    time_of_day: [
      { period: "Night (12AM-6AM)", hours: "0.00", percent: 0 },
      { period: "Morning (6AM-12PM)", hours: "0.00", percent: 0.09 },
      { period: "Afternoon (12PM-6PM)", hours: "0.92", percent: 99.91 },
      { period: "Evening (6PM-12AM)", hours: "0.00", percent: 0 }
    ],
    last_updated: "2025-11-03 7:59:01 AM"
  };

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

      {/* Coding Sessions & Projects */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Sessions */}
        <div className="bg-gray-900 backdrop-blur-md rounded-xl border border-gray-700/50 p-4 lg:p-6 shadow-sm h-full">
          <h3 className="text-2xl font-bold tracking-tight text-gray-200 mb-4">Coding Sessions</h3>
          <div className="grid grid-cols-2 gap-2">
            {[
              { label: "Current Session", value: codingData.coding_sessions.current },
              { label: "Longest Session", value: codingData.coding_sessions.longest },
              { label: "Avg. Duration", value: codingData.coding_sessions.average },
              { label: "Weekly Sessions", value: codingData.coding_sessions.weekly.toString() }
            ].map((item, i) => (
              <div key={i} className="bg-gradient-to-bl from-blue-500/20 to-blue-400/20 border border-blue-500/30 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-blue-300">{item.value}</div>
                <div className="text-sm text-gray-300">{item.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Projects */}
        <div className="bg-gray-900 backdrop-blur-md rounded-xl border border-gray-700/50 p-4 lg:p-6 shadow-sm h-full">
          <h3 className="text-2xl font-bold tracking-tight text-gray-200 mb-4">Projects</h3>
          <div className="space-y-2">
            {Object.entries(codingData.projects)
              .sort((a, b) => b[1].percentage - a[1].percentage)
              .map(([name, data], idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded-full ${
                    idx === 0 ? 'bg-blue-500' :
                    idx === 1 ? 'bg-green-500' :
                    idx === 2 ? 'bg-yellow-500' :
                    idx === 3 ? 'bg-purple-500' : 'bg-red-500'
                  }`}></div>
                  <span className="text-gray-200 text-sm font-medium">
                    <span className="text-md font-semibold text-gray-300">{name}</span>: {data.time}{' '}
                    <span className="text-sm text-gray-400">({data.percentage}%)</span>
                  </span>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Language Breakdown */}
      <div className="bg-gray-900 backdrop-blur-md rounded-xl border border-gray-700/50 p-4 lg:p-6 shadow-sm">
        <h3 className="text-2xl font-bold tracking-tight text-gray-200 mb-4">Languages Used</h3>
        <div className="space-y-3">
          {Object.entries(codingData.languages).map(([lang, data]) => (
            <div key={lang}>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-300">{lang}</span>
                <span className="text-gray-400">{data.time} ({data.percentage}%)</span>
              </div>
              <div className="w-full h-4 rounded-full bg-gray-700 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400"
                  style={{ width: `${data.percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Weekly & Time-of-Day Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-gray-900 backdrop-blur-md rounded-xl border border-gray-700/50 p-4 lg:p-6 shadow-sm">
          <h3 className="text-2xl font-bold tracking-tight text-gray-200 mb-4">Weekly Activity (hours)</h3>
          <div className="flex justify-between items-end h-40 gap-2">
            {codingData.weekly_activity.map((day, i) => (
              <div key={i} className="flex flex-col items-center gap-2 flex-1">
                <span className="text-xs text-gray-400">{day.day}</span>
                <div className="w-full max-w-[60px] bg-gray-800/30 rounded-t overflow-hidden">
                  <div
                    className="w-full bg-gradient-to-t from-blue-500 to-cyan-400"
                    style={{ height: `${(parseFloat(day.hours) / 10) * 100}%` }}
                  ></div>
                </div>
                <span className="text-xs text-gray-200">{day.hours}h</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-900 backdrop-blur-md rounded-xl border border-gray-700/50 p-4 lg:p-6 shadow-sm">
          <h3 className="text-2xl font-bold tracking-tight text-gray-200 mb-4">Time of Day</h3>
          <div className="flex justify-between items-end h-40 gap-2">
            {codingData.time_of_day.map((slot, i) => (
              <div key={i} className="flex flex-col items-center gap-2 flex-1">
                <span className="text-xs text-gray-400">{slot.period.split(' ')[0]}</span>
                <div className="w-full max-w-[60px] bg-gray-800/30 rounded-t overflow-hidden">
                  <div
                    className="w-full bg-gradient-to-t from-teal-500 to-cyan-400"
                    style={{ height: `${slot.percent}%` }}
                  ></div>
                </div>
                <span className="text-xs text-gray-200">{slot.hours}h</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-sm text-right mt-4 text-gray-400">
        Last updated: {codingData.last_updated} (UTC +6)
      </div>
    </section>
  );
};

export default CodingActivities;