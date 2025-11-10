// app/components/CodingActivities.jsx
'use client';
import React, { useState, useEffect } from 'react';

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

      {/* Weekly Activity */}
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

      {/* Footer */}
      <div className="text-sm text-right mt-4 text-gray-400">
        Last updated: {new Date().toLocaleString()} (UTC +6)
      </div>
    </section>
  );
};

export default CodingActivities;