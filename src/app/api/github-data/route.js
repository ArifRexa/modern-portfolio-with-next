import { NextResponse } from 'next/server';

// GitHub API endpoints
const GITHUB_API = 'https://api.github.com';
const GITHUB_GRAPHQL = 'https://api.github.com/graphql';

// Function to fetch with potential authentication
async function fetchWithAuth(url, options = {}) {
  const headers = {
    'Accept': 'application/vnd.github.v3+json',
    'User-Agent': 'my-portfolio-app',
    ...options.headers
  };

  // Add token if available for higher rate limits
  if (process.env.GITHUB_TOKEN) {
    headers['Authorization'] = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  const response = await fetch(url, { ...options, headers });
  return response;
}

// Function to fetch with GraphQL
async function fetchGraphQL(query, variables = {}) {
  if (!process.env.GITHUB_TOKEN) {
    throw new Error('GITHUB_TOKEN is required for GraphQL queries');
  }

  const response = await fetch(GITHUB_GRAPHQL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`,
      'Content-Type': 'application/json',
      'User-Agent': 'my-portfolio-app'
    },
    body: JSON.stringify({ 
      query,
      variables
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`GraphQL API error: ${response.status} - ${errorText}`);
  }

  return await response.json();
}

// Fetch GitHub data using the proper GraphQL API for accurate contribution data
async function fetchGitHubData(username) {
  try {
    // Using GraphQL with the exact query pattern from the working Python script
    const query = `
      query($username: String!) {
        user(login: $username) {
          name
          login
          bio
          followers {
            totalCount
          }
          following {
            totalCount
          }
          repositories(first: 100, orderBy: {field: UPDATED_AT, direction: DESC}) {
            totalCount
            nodes {
              name
              stargazers {
                totalCount
              }
              description
              url
              primaryLanguage {
                name
              }
              forkCount
            }
          }
          contributionsCollection {
            contributionCalendar {
              totalContributions
            }
            commitContributionsByRepository {
              repository {
                name
                isPrivate
              }
              contributions(first: 1) {
                totalCount
              }
            }
            totalCommitContributions
            restrictedContributionsCount
            totalPullRequestContributions
            totalPullRequestReviewContributions
            contributionYears
          }
          pullRequests: pullRequests(first: 100, states: OPEN) {
            totalCount
          }
          issues: issues(first: 100) {
            totalCount
          }
        }
      }
    `;

    const graphResponse = await fetchGraphQL(query, { username });
    
    if (graphResponse.errors) {
      console.error('GraphQL Error:', graphResponse.errors);
      throw new Error(graphResponse.errors.map(err => err.message).join(', '));
    }

    const userData = graphResponse.data.user;

    if (!userData) {
      throw new Error('No user data returned from GraphQL');
    }

    // Extract data from GraphQL response
    let totalStarsEarned = 0;
    let languageUsage = {};
    let topRepositories = [];

    // Process repositories data
    for (const repo of userData.repositories.nodes) {
      totalStarsEarned += repo.stargazers.totalCount;

      // Get languages for this repo
      if (repo.primaryLanguage) {
        const language = repo.primaryLanguage.name;
        if (!languageUsage[language]) {
          languageUsage[language] = 0;
        }
        languageUsage[language]++;
      }

      // Add to top repositories if it has stars
      if (repo.stargazers.totalCount > 0) {
        topRepositories.push({
          repo_name: repo.name,
          stars: repo.stargazers.totalCount,
          description: repo.description,
          url: repo.url,
          language: repo.primaryLanguage?.name
        });
      }
    }

    // Sort top repositories by stars
    topRepositories.sort((a, b) => b.stars - a.stars);
    topRepositories = topRepositories.slice(0, 3);

    // Calculate language percentages
    const totalLanguages = Object.values(languageUsage).reduce((sum, count) => sum + count, 0);
    const languageUsageArray = Object.entries(languageUsage)
      .map(([language, count]) => ({
        language,
        count,
        percentage: Math.round((count / totalLanguages) * 100)
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 6);

    // Use the accurate contribution data from the contributions calendar
    const contributionsCollection = userData.contributionsCollection;
    const totalContributions = contributionsCollection.contributionCalendar.totalContributions || 0;
    const totalCommitContributions = contributionsCollection.totalCommitContributions || 0;
    const restrictedContributions = contributionsCollection.restrictedContributionsCount || 0;

    return {
      total_repos: userData.repositories.totalCount,
      total_commits: totalCommitContributions, // Actual commit contributions
      total_stars_earned: totalStarsEarned,
      total_prs: contributionsCollection.totalPullRequestContributions || 0,
      total_pr_reviews: contributionsCollection.totalPullRequestReviewContributions || 0,
      contributed_to_last_year: totalContributions, // This is the actual contribution count from the calendar
      restricted_contributions: restrictedContributions, // Private contributions
      total_contributions_with_private: totalContributions + restrictedContributions, // Total including private
      contribution_years: contributionsCollection.contributionYears || [],
      language_usage: languageUsageArray,
      top_repositories: topRepositories,
      user_data: {
        login: userData.login,
        name: userData.name,
        bio: userData.bio,
        followers: userData.followers.totalCount,
        following: userData.following.totalCount,
        public_repos: userData.repositories.totalCount,
        public_gists: 0
      }
    };
  } catch (error) {
    console.error('Error with GraphQL, falling back to REST API:', error.message);
    
    // Fallback to REST API if GraphQL fails
    return await fetchGitHubDataREST(username);
  }
}

// Fallback to REST API if GraphQL fails
async function fetchGitHubDataREST(username) {
  console.log('Falling back to REST API for GitHub data');
  
  try {
    // Get user profile data
    const userResponse = await fetchWithAuth(`${GITHUB_API}/users/${username}`);
    if (!userResponse.ok) {
      throw new Error(`GitHub API user error: ${userResponse.status}`);
    }
    const userData = await userResponse.json();

    // Get user repos
    const reposResponse = await fetchWithAuth(
      `${GITHUB_API}/users/${username}/repos?per_page=100&sort=updated&direction=desc`
    );
    if (!reposResponse.ok) {
      throw new Error(`GitHub API repos error: ${reposResponse.status}`);
    }
    const reposData = await reposResponse.json();

    // Calculate total stats
    let totalStarsEarned = 0;
    let totalPRs = 0;
    let languageUsage = {};
    let topRepositories = [];

    // Process repositories data
    for (const repo of reposData) {
      totalStarsEarned += repo.stargazers_count;

      // Get languages for this repo
      if (repo.language) {
        if (!languageUsage[repo.language]) {
          languageUsage[repo.language] = 0;
        }
        languageUsage[repo.language]++;
      }

      // Add to top repositories if it has stars
      if (repo.stargazers_count > 0) {
        topRepositories.push({
          repo_name: repo.name,
          stars: repo.stargazers_count,
          description: repo.description,
          url: repo.html_url,
          language: repo.language
        });
      }
    }

    // Sort top repositories by stars
    topRepositories.sort((a, b) => b.stars - a.stars);
    topRepositories = topRepositories.slice(0, 3);

    // Calculate language percentages
    const totalLanguages = Object.values(languageUsage).reduce((sum, count) => sum + count, 0);
    const languageUsageArray = Object.entries(languageUsage)
      .map(([language, count]) => ({
        language,
        count,
        percentage: Math.round((count / totalLanguages) * 100)
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 6);

    // Get contribution count from events
    const eventsResponse = await fetchWithAuth(`${GITHUB_API}/users/${username}/events?per_page=100`);
    if (!eventsResponse.ok) {
      throw new Error(`GitHub API events error: ${eventsResponse.status}`);
    }
    const eventsData = await eventsResponse.json();

    let totalCommits = 0;
    if (Array.isArray(eventsData)) {
      // Count contribution events that represent actual code contributions
      const contributionEvents = eventsData.filter(event =>
        event.type === 'PushEvent' ||
        event.type === 'PullRequestEvent' ||
        event.type === 'IssuesEvent' ||
        event.type === 'PullRequestReviewEvent' ||
        event.type === 'CommitCommentEvent'
      );

      totalCommits = contributionEvents.length;

      // Count actual PRs made by the user
      const prEvents = eventsData.filter(event =>
        event.type === 'PullRequestEvent' &&
        event.payload &&
        event.payload.action === 'opened'
      );
      totalPRs = prEvents.length;
    }

    // Get user's pull requests to count actual PRs contributed to
    let userPRs = 0;
    try {
      const prResponse = await fetchWithAuth(`${GITHUB_API}/search/issues?q=type:pr+author:${username}&per_page=1`);
      if (prResponse.ok) {
        const prData = await prResponse.json();
        userPRs = prData.total_count || 0;
      }
    } catch (prError) {
      console.warn('Could not fetch PR data:', prError.message);
      // Fallback to previously calculated value
      userPRs = totalPRs;
    }

    // Calculate contributed to last year from events
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

    const recentEvents = eventsData.filter(event => {
      const eventDate = new Date(event.created_at);
      return eventDate > oneYearAgo;
    });

    // Count unique repositories in recent events
    const uniqueRepoSet = new Set();
    recentEvents.forEach(event => {
      if (event.repo && event.repo.name) {
        uniqueRepoSet.add(event.repo.name);
      }
    });

    const contributedToLastYear = uniqueRepoSet.size;

    return {
      total_repos: reposData.length,
      total_commits: totalCommits,
      total_stars_earned: totalStarsEarned,
      total_prs: userPRs,
      contributed_to_last_year: contributedToLastYear,
      language_usage: languageUsageArray,
      top_repositories: topRepositories,
      user_data: {
        login: userData.login,
        name: userData.name,
        bio: userData.bio,
        followers: userData.followers,
        following: userData.following,
        public_repos: userData.public_repos,
        public_gists: userData.public_gists
      }
    };
  } catch (error) {
    console.error('Error in REST API fallback:', error);
    throw error;
  }
}

export async function GET(request) {
  try {
    const username = process.env.GITHUB_USERNAME;
    if (!username) {
      return NextResponse.json(
        { error: 'GITHUB_USERNAME environment variable is not set' },
        { status: 500 }
      );
    }

    if (!process.env.GITHUB_TOKEN) {
      return NextResponse.json(
        { error: 'GITHUB_TOKEN environment variable is not set' },
        { status: 500 }
      );
    }

    const githubData = await fetchGitHubData(username);
    return NextResponse.json(githubData);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch GitHub data: ' + error.message },
      { status: 500 }
    );
  }
}