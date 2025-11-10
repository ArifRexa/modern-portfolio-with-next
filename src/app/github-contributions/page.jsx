// app/components/GitHubContributions.jsx
'use client';
import React, { useState, useEffect } from 'react';

const GitHubContributions = () => {
  const [githubData, setGithubData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch commit data from our extended GitHub API
        const commitResponse = await fetch('/api/github/commits?extended=true');
        if (!commitResponse.ok) {
          throw new Error(`Failed to fetch commit data: ${commitResponse.status}`);
        }
        const commitData = await commitResponse.json();
        if (!commitData) {
          throw new Error('No commit data received');
        }
        
        // Check if we have the token before making any GitHub API calls
        const githubToken = process.env.NEXT_PUBLIC_GITHUB_TOKEN || process.env.GITHUB_TOKEN;
        const githubUsername = process.env.NEXT_PUBLIC_GITHUB_USERNAME || 'arifrexa';
        
        let realData = {
          total_repos: commitData.extendedData?.commit_stats?.monthly || 0,
          total_commits: commitData.extendedData?.commit_stats?.monthly || 0,
          total_stars_earned: 0,
          total_prs: 0,
          contributed_to_last_year: Math.min(commitData.extendedData?.commit_stats?.monthly || 20, 20),
          language_usage: [],
          top_repositories: []
        };
        
        // Only fetch extended GitHub data if token is available
        if (githubToken) {
          // Get user data from GitHub API
          const userResponse = await fetch(`https://api.github.com/users/${githubUsername}`, {
            headers: {
              Authorization: `Bearer ${githubToken}`,
              Accept: 'application/vnd.github.v3+json',
            },
          });
          
          if (!userResponse.ok) {
            console.error(`GitHub API responded with ${userResponse.status}`);
          } else {
            const userData = await userResponse.json();
            
            // Get user's repositories (public)
            const reposResponse = await fetch(
              `https://api.github.com/users/${githubUsername}/repos?sort=updated&direction=desc&per_page=100`,
              {
                headers: {
                  Authorization: `Bearer ${githubToken}`,
                  Accept: 'application/vnd.github.v3+json',
                },
              }
            );
            
            if (reposResponse.ok) {
              const reposData = await reposResponse.json();
              
              // Calculate total stars earned
              const totalStars = reposData.reduce((sum, repo) => sum + repo.stargazers_count, 0);
              
              // Get top repositories (by stars)
              const topRepositories = reposData
                .sort((a, b) => b.stargazers_count - a.stargazers_count)
                .slice(0, 10)
                .map(repo => ({
                  repo_name: repo.name,
                  stars: repo.stargazers_count,
                  description: repo.description,
                  language: repo.language,
                  forks: repo.forks_count,
                }));
              
              // Calculate language usage from repos
              const languageCount = {};
              reposData.forEach(repo => {
                if (repo.language) {
                  languageCount[repo.language] = (languageCount[repo.language] || 0) + 1;
                }
              });
              
              // Format language usage data
              const totalReposWithLanguage = reposData.filter(repo => repo.language).length;
              const languageUsage = Object.entries(languageCount)
                .map(([language, count]) => ({
                  language,
                  count,
                  percentage: Math.round((count / totalReposWithLanguage) * 100)
                }))
                .sort((a, b) => b.percentage - a.percentage)
                .slice(0, 6); // Top 6 languages
              
              // Calculate total PRs (this is harder to get, using GitHub API search)
              let totalPrs = 0;
              try {
                const prResponse = await fetch(
                  `https://api.github.com/search/issues?q=type:pr+author:${githubUsername}`,
                  {
                    headers: {
                      Authorization: `Bearer ${githubToken}`,
                      Accept: 'application/vnd.github.v3+json',
                    },
                  }
                );
                
                if (prResponse.ok) {
                  const prData = await prResponse.json();
                  totalPrs = prData.total_count || 0;
                }
              } catch (prError) {
                console.error('Error fetching PRs:', prError);
                totalPrs = 0; // Set to 0 if we can't fetch
              }
              
              // Update real data with GitHub API data
              realData = {
                ...realData,
                total_repos: userData.public_repos || 0,
                total_stars_earned: totalStars,
                total_prs: totalPrs,
                contributed_to_last_year: userData.following || 0,
                language_usage: languageUsage,
                top_repositories: topRepositories.slice(0, 3) // Top 3
              };
            }
          }
        } else {
          console.warn('GITHUB_TOKEN is not configured. Using limited functionality from our own API.');
        }
        
        setGithubData(realData);
      } catch (err) {
        console.error('Error fetching GitHub data:', err);
        setError(err.message);
        
        // Set some fallback data if possible
        setGithubData({
          total_repos: 0,
          total_commits: 0,
          total_stars_earned: 0,
          total_prs: 0,
          contributed_to_last_year: 0,
          language_usage: [],
          top_repositories: []
        });
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubData();
  }, []);

  if (loading) {
    return (
      <section className="space-y-6">
        <div className="text-center p-2 sm:px-8 lg:px-12">
          <h1 className="relative inline-block text-3xl sm:text-4xl md:text-4xl font-extrabold tracking-tight text-gray-200">
            GitHub Contributions
          </h1>
          <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg leading-relaxed text-gray-300">
            Explore my GitHub contributions and projects
          </p>
          <span className="block h-1 w-16 mx-auto mt-3 rounded-full bg-blue-400"></span>
        </div>
        
        <div className="text-center py-12">
          <p className="text-gray-400">Loading GitHub data...</p>
        </div>
      </section>
    );
  }

  if (error && !githubData) {
    return (
      <section className="space-y-6">
        <div className="text-center p-2 sm:px-8 lg:px-12">
          <h1 className="relative inline-block text-3xl sm:text-4xl md:text-4xl font-extrabold tracking-tight text-gray-200">
            GitHub Contributions
          </h1>
          <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg leading-relaxed text-gray-300">
            Explore my GitHub contributions and projects
          </p>
          <span className="block h-1 w-16 mx-auto mt-3 rounded-full bg-blue-400"></span>
        </div>
        
        <div className="text-center py-12">
          <p className="text-red-400">Error loading GitHub data: {error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="text-center p-2 sm:px-8 lg:px-12">
        <h1 className="relative inline-block text-3xl sm:text-4xl md:text-4xl font-extrabold tracking-tight text-gray-200">
          GitHub Contributions
        </h1>
        <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg leading-relaxed text-gray-300">
          Explore my GitHub contributions and projects
        </p>
        <span className="block h-1 w-16 mx-auto mt-3 rounded-full bg-blue-400"></span>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-2 lg:gap-3 mt-6">
        <StatCard
          title="Total Repos"
          value={githubData.total_repos}
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-github w-6 h-6 mx-auto mb-2 text-purple-500">
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
              <path d="M9 18c-4.51 2-5-2-7-2" />
            </svg>
          }
          color="text-purple-500"
        />
        <StatCard
          title="Total Commits"
          value={githubData.total_commits}
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-code w-6 h-6 mx-auto mb-2 text-blue-500">
              <polyline points="16 18 22 12 16 6" />
              <polyline points="8 6 2 12 8 18" />
            </svg>
          }
          color="text-blue-500"
        />
        <StatCard
          title="Total Stars Earned"
          value={githubData.total_stars_earned}
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-star w-6 h-6 mx-auto mb-2 text-yellow-500">
              <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
            </svg>
          }
          color="text-yellow-500"
        />
        <StatCard
          title="Total PRs"
          value={githubData.total_prs}
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-git-pull-request w-6 h-6 mx-auto mb-2 text-green-500">
              <circle cx="18" cy="18" r="3" />
              <circle cx="6" cy="6" r="3" />
              <path d="M13 6h3a2 2 0 0 1 2 2v7" />
              <line x1="6" x2="6" y1="9" y2="21" />
            </svg>
          }
          color="text-green-500"
        />
        <StatCard
          title="Last Year Contributions"
          value={githubData.contributed_to_last_year}
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-blocks w-6 h-6 mx-auto mb-2 text-indigo-500">
              <rect width="7" height="7" x="14" y="3" rx="1" />
              <path d="M10 21V8a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-5a1 1 0 0 0-1-1H3" />
            </svg>
          }
          color="text-indigo-500"
        />
      </div>

      {/* Language Usage */}
      <div className="bg-gray-900 backdrop-blur-md rounded-xl border border-gray-700/50 p-4 lg:p-6 shadow-sm">
        <h3 className="text-2xl font-bold tracking-tight text-gray-200 mb-4">
          Language Usage
        </h3>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
          {githubData.language_usage.map((lang, idx) => (
            <div
              key={idx}
              className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/40 rounded-xl p-4 lg:p-6 shadow-md flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-2 sm:space-y-0"
            >
              <div className="flex-1">
                <div className="font-semibold text-lg text-white">{lang.language}</div>
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

      {/* Top Repositories */}
      <div className="bg-gray-900 backdrop-blur-md rounded-xl border border-gray-700/50 p-4 lg:p-6 shadow-sm">
        <h3 className="text-2xl font-bold tracking-tight text-gray-200 mb-4">
          Top Repositories
        </h3>
        <div className="space-y-3">
          {githubData.top_repositories.map((repo, idx) => (
            <div
              key={idx}
              className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/40 rounded-xl p-4 lg:p-6 shadow-md flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0"
            >
              <div>
                <h6 className="font-semibold text-lg text-white">{repo.repo_name}</h6>
                {repo.description && (
                  <p className="text-sm text-gray-400 mt-1 line-clamp-1">{repo.description}</p>
                )}
              </div>
              <div className="flex space-x-6 text-sm">
                <span className="flex items-center text-yellow-400">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-star w-5 h-5 mr-1">
                    <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
                  </svg>
                  {repo.stars}
                </span>
                {repo.language && (
                <span className="flex items-center text-gray-400">
                  <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C9.375 12.652 10.376 12.652 11.067 13.342L12 14.274l.933-.932c.691-.69 1.692-.69 2.383 0 .69.69.69 1.692 0 2.383l-2.316 2.316a1 1 0 01-1.414 0l-2.316-2.316c-.69-.69-.69-1.692 0-2.383zM12 4v8" />
                  </svg>
                  {repo.language}
                </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Helper component for stat cards
const StatCard = ({ title, value, icon, color }) => (
  <div className="bg-gray-900 backdrop-blur-md rounded-xl border border-gray-700/50 p-4 lg:p-6 shadow-sm h-full flex flex-col items-center">
    {icon}
    <div className={`text-3xl font-bold ${color}`}>{value}</div>
    <div className="text-sm font-semibold text-gray-400 text-center mt-1">{title}</div>
  </div>
);

export default GitHubContributions;