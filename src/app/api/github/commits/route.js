// src/app/api/github/commits/route.js
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const githubToken = process.env.GITHUB_TOKEN;
    const githubUsername = process.env.GITHUB_USERNAME || 'arif-code';

    if (!githubToken) {
      return NextResponse.json(
        { error: 'GITHUB_TOKEN is not configured' },
        { status: 500 }
      );
    }

    const today = new Date().toISOString().split('T')[0];
    const url = `https://api.github.com/search/commits?q=author:${githubUsername}+author-date:${today}..${today}`;

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${githubToken}`,
        Accept: 'application/vnd.github.cloak-preview',
        'User-Agent': 'NextJS-Portfolio',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      const text = await response.text();
      return NextResponse.json(
        { error: `GitHub API responded with ${response.status}`, message: text },
        { status: response.status }
      );
    }

    const data = await response.json();
    const commitCount = data.total_count || 0;

    return NextResponse.json({
      username: githubUsername,
      commitCount, // ⚡ Make sure the key matches what the client expects
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch GitHub commits', message: error.message },
      { status: 500 }
    );
  }
}
