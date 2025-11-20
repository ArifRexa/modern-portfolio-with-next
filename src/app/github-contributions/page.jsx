// app/github-contributions/page.jsx
'use client';
import React, { useState, useEffect } from 'react';
import { useTheme } from '@/context/ThemeContext';
import ContributionGraph from '@/Components/Github/ContributionGraph';

const GitHubContributions = () => {
  const { theme } = useTheme();
  const [githubData, setGithubData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGithubData = async () => {
      try {
        const response = await fetch('/api/github-data');
        if (!response.ok) {
          throw new Error('Failed to fetch GitHub data');
        }
        const data = await response.json();
        setGithubData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGithubData();
  }, []);

  if (loading) {
    return (
      <section className="space-y-6 py-8">
        <div className="text-center p-2 sm:px-8 lg:px-12">
          <h1 className={`relative inline-block text-3xl sm:text-4xl md:text-4xl font-extrabold tracking-tight ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
            GitHub Contributions
          </h1>
          <p className={`max-w-2xl mx-auto text-sm sm:text-base md:text-lg leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            Loading GitHub data...
          </p>
          <span className="block h-1 w-16 mx-auto mt-3 rounded-full bg-blue-400"></span>
        </div>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="space-y-6 py-8">
        <div className="text-center p-2 sm:px-8 lg:px-12">
          <h1 className={`relative inline-block text-3xl sm:text-4xl md:text-4xl font-extrabold tracking-tight ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
            GitHub Contributions
          </h1>
          <p className={`max-w-2xl mx-auto text-sm sm:text-base md:text-lg leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            Failed to load GitHub data
          </p>
          <span className="block h-1 w-16 mx-auto mt-3 rounded-full bg-blue-400"></span>
        </div>
        <div className={`${theme === 'dark' ? 'bg-red-900/50 border-red-700/50' : 'bg-red-100/50 border-red-300/50'} border rounded-xl p-6 text-center ${theme === 'dark' ? 'text-red-200' : 'text-red-700'}`}>
          Error: {error}
          <p className="mt-2 text-sm">Please check your console for more details.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-6 py-8">
      {/* Header */}
      <div className="text-center p-2 sm:px-8 lg:px-12">
        <h1 className={`relative inline-block text-3xl sm:text-4xl md:text-4xl font-extrabold tracking-tight ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
          GitHub Contributions
        </h1>
        <p className={`max-w-2xl mx-auto text-sm sm:text-base md:text-lg leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
          Explore my public GitHub activity and projects
        </p>
        <span className="block h-1 w-16 mx-auto mt-3 rounded-full bg-blue-400"></span>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-2 lg:gap-3 mt-6">
        <StatCard
          title="Total Repos"
          value={githubData?.total_repos || 0}
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-github w-6 h-6 mx-auto mb-2 text-purple-500">
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
              <path d="M9 18c-4.51 2-5-2-7-2" />
            </svg>
          }
          color="text-purple-500"
          theme={theme}
        />
        <StatCard
          title="Total Commits"
          value={githubData?.total_commits || 0}
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-code w-6 h-6 mx-auto mb-2 text-blue-500">
              <polyline points="16 18 22 12 16 6" />
              <polyline points="8 6 2 12 8 18" />
            </svg>
          }
          color="text-blue-500"
          theme={theme}
        />
        <StatCard
          title="Total Stars Earned"
          value={githubData?.total_stars_earned || 0}
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-star w-6 h-6 mx-auto mb-2 text-yellow-500">
              <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
            </svg>
          }
          color="text-yellow-500"
          theme={theme}
        />
        <StatCard
          title="Total PRs"
          value={githubData?.total_prs || 0}
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-git-pull-request w-6 h-6 mx-auto mb-2 text-green-500">
              <circle cx="18" cy="18" r="3" />
              <circle cx="6" cy="6" r="3" />
              <path d="M13 6h3a2 2 0 0 1 2 2v7" />
              <line x1="6" x2="6" y1="9" y2="21" />
            </svg>
          }
          color="text-green-500"
          theme={theme}
        />
        <StatCard
          title="Contributions"
          value={githubData?.contributed_to_last_year || 0}
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-blocks w-6 h-6 mx-auto mb-2 text-indigo-500">
              <rect width="7" height="7" x="14" y="3" rx="1" />
              <path d="M10 21V8a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-5a1 1 0 0 0-1-1H3" />
            </svg>
          }
          color="text-indigo-500"
          theme={theme}
        />
      </div>


      {/* Language Usage */}
      <div className={`${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'} backdrop-blur-md rounded-xl border ${theme === 'dark' ? 'border-gray-700/50' : 'border-gray-300/50'} p-4 lg:p-6 shadow-sm`}>
        <h3 className={`text-2xl font-bold tracking-tight ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'} mb-4`}>
          Top Languages (by Repos)
        </h3>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
          {githubData?.language_usage?.map((lang, idx) => (
            <div
              key={idx}
              className={`${theme === 'dark' ? 'bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700/40' : 'bg-gradient-to-br from-gray-200 to-gray-300 border-gray-300/40'} border rounded-xl p-4 lg:p-6 shadow-md flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-2 sm:space-y-0`}
            >
              <div className="flex-1">
                <div className={`font-semibold text-lg ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>{lang.language}</div>
              </div>
              <div className="w-full sm:w-28 h-3 bg-gray-300 rounded-full overflow-hidden">
                <div
                  className="h-3 rounded-full bg-gradient-to-r from-green-500 to-blue-600"
                  style={{ width: `${lang.percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ContributionGraph />

      {/* Top Repositories */}
      <div className={`${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'} backdrop-blur-md rounded-xl border ${theme === 'dark' ? 'border-gray-700/50' : 'border-gray-300/50'} p-4 lg:p-6 shadow-sm`}>
        <h3 className={`text-2xl font-bold tracking-tight ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'} mb-4`}>
          Top Repositories
        </h3>
        <div className="space-y-3">
          {githubData?.top_repositories?.map((repo, idx) => (
            <div
              key={idx}
              className={`${theme === 'dark' ? 'bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700/40' : 'bg-gradient-to-br from-gray-200 to-gray-300 border-gray-300/40'} border rounded-xl p-4 lg:p-6 shadow-md flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0`}
            >
              <div>
                <h6 className={`font-semibold text-lg ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>{repo.repo_name}</h6>
                {repo.description && (
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} mt-1 line-clamp-2`}>{repo.description}</p>
                )}
              </div>
              <div className="flex space-x-6 text-sm">
                <span className="flex items-center text-yellow-400">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-star w-5 h-5 mr-1">
                    <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
                  </svg>
                  {repo.stars}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Helper component for stat cards
const StatCard = ({ title, value, icon, color, theme }) => (
  <div className={`${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'} backdrop-blur-md rounded-xl border ${theme === 'dark' ? 'border-gray-700/50' : 'border-gray-300/50'} p-4 lg:p-6 shadow-sm h-full flex flex-col items-center`}>
    {icon}
    <div className={`text-3xl font-bold ${color}`}>{value}</div>
    <div className={`text-sm font-semibold ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} text-center mt-1`}>{title}</div>
  </div>
);

export default GitHubContributions;