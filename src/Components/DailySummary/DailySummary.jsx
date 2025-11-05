'use client';
import React from 'react';

const DailySummary = () => {
  return (
    <div className="bg-gray-900 backdrop-blur-md rounded-xl border border-gray-700/50 p-4 lg:p-6 shadow-sm">
      <dl className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="text-center">
          <dd
              className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 text-transparent bg-clip-text">
            0.9h</dd>
          <dt className="uppercase text-sm font-semibold text-gray-300">Coding</dt>
        </div>
        <div className="text-center">
          <dd
              className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-indigo-500 text-transparent bg-clip-text">
            <span></span>
          </dd>
          <dt className="uppercase text-sm font-semibold text-gray-300">Commits</dt>
        </div>
        <div className="text-center">
          <dd
              className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-violet-500 text-transparent bg-clip-text">
            <span></span>
          </dd>
          <dt className="uppercase text-sm font-semibold text-gray-300">Meetings</dt>
        </div>
        <div className="text-center">
          <dd
              className="text-3xl font-bold bg-gradient-to-r from-green-400 to-teal-500 text-transparent bg-clip-text">
            <span></span>
          </dd>
          <dt className="uppercase text-sm font-semibold text-gray-300">Coffees</dt>
        </div>
      </dl>
    </div>
  );
};

export default DailySummary;