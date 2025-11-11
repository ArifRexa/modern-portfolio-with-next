import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const dateRange = url.searchParams.get('range') || 'all'; // all, year, month, week
    const githubToken = process.env.GITHUB_TOKEN;
    const githubUsername = process.env.GITHUB_USERNAME || 'arifrexa';

    if (!githubToken) {
      return NextResponse.json(
        { error: 'GITHUB_TOKEN is not configured' },
        { status: 500 }
      );
    }

    // Fetch user data from GitHub API
    const userResponse = await fetch(`https://api.github.com/users/${githubUsername}`, {
      headers: {
        Authorization: `Bearer ${githubToken}`,
        Accept: 'application/vnd.github.v3+json',
      },
    });

    if (!userResponse.ok) {
      return NextResponse.json(
        { error: `GitHub API responded with ${userResponse.status}` },
        { status: userResponse.status }
      );
    }

    const userData = await userResponse.json();

    // Fetch user's repositories
    const reposResponse = await fetch(
      `https://api.github.com/users/${githubUsername}/repos?sort=updated&direction=desc&per_page=100`,
      {
        headers: {
          Authorization: `Bearer ${githubToken}`,
          Accept: 'application/vnd.github.v3+json',
        },
      }
    );

    if (!reposResponse.ok) {
      return NextResponse.json(
        { error: `GitHub API responded with ${reposResponse.status}` },
        { status: reposResponse.status }
      );
    }

    const reposData = await reposResponse.json();

    // Calculate total stars earned
    const totalStars = reposData.reduce((sum, repo) => sum + repo.stargazers_count, 0);
    
    // Get top repositories by stars
    const topRepositories = reposData
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
      .slice(0, 10)
      .map(repo => ({
        repo_name: repo.name,
        stars: repo.stargazers_count,
        description: repo.description,
        language: repo.language,
        forks: repo.forks_count,
        updated_at: repo.updated_at,
      }));

    // Calculate language usage
    const languageCount = {};
    reposData.forEach(repo => {
      if (repo.language) {
        languageCount[repo.language] = (languageCount[repo.language] || 0) + 1;
      }
    });

    const totalReposWithLanguage = reposData.filter(repo => repo.language).length;
    const languageUsage = Object.entries(languageCount)
      .map(([language, count]) => ({
        language,
        count,
        percentage: Math.round((count / totalReposWithLanguage) * 100)
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 6); // Top 6 languages

    // Calculate total PRs
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
      totalPrs = 0;
    }

    // For total commits, we'll use the commits API route that already exists
    let totalCommits = 0;
    let weeklyActivity = [];
    
    try {
      const commitsResponse = await fetch(`${request.url.replace('/stats', '/commits?extended=true')}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (commitsResponse.ok) {
        const commitsData = await commitsResponse.json();
        totalCommits = commitsData.extendedData?.commit_stats?.monthly || 0;
        weeklyActivity = commitsData.extendedData?.weekly_activity || [];
      }
    } catch (commitsError) {
      console.error('Error fetching commits:', commitsError);
      totalCommits = 0;
    }

    // Get contribution data from GitHub GraphQL API
    const graphqlResponse = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${githubToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          query($username: String!) {
            user(login: $username) {
              contributionsCollection {
                contributionCalendar {
                  totalContributions
                }
                totalCommitContributions
              }
            }
          }
        `,
        variables: { username: githubUsername }
      })
    });

    let contributedToLastYear = 0;
    if (graphqlResponse.ok) {
      const graphqlData = await graphqlResponse.json();
      contributedToLastYear = graphqlData.data?.user?.contributionsCollection?.contributionCalendar?.totalContributions || 0;
    }

    // Construct the response data
    const statsData = {
      total_repos: userData.public_repos || 0,
      total_commits: totalCommits,
      total_stars_earned: totalStars,
      total_prs: totalPrs,
      contributed_to_last_year: contributedToLastYear,
      language_usage: languageUsage,
      top_repositories: topRepositories.slice(0, 3), // Top 3 repositories
      weekly_activity: weeklyActivity,
      last_updated: new Date().toISOString(),
    };

    return NextResponse.json(statsData);
  } catch (error) {
    console.error('Error in GitHub stats API:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch GitHub stats', 
        message: error.message,
        total_repos: 0,
        total_commits: 0,
        total_stars_earned: 0,
        total_prs: 0,
        contributed_to_last_year: 0,
        language_usage: [],
        top_repositories: [],
        weekly_activity: [],
      },
      { status: 500 }
    );
  }
}