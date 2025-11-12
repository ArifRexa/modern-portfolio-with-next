// src/app/api/github/commits/route.js
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET(request) {
  try {
    // Check if we're requesting extended data
    const requestUrl = new URL(request.url);
    const extended = requestUrl.searchParams.get('extended');
    
    const githubToken = process.env.GITHUB_TOKEN;
    const githubUsername = process.env.GITHUB_USERNAME || 'arif-code';

    if (!githubToken) {
      return NextResponse.json(
        { error: 'GITHUB_TOKEN is not configured' },
        { status: 500 }
      );
    }

    // Initialize Supabase client
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      return NextResponse.json(
        { error: 'Supabase URL or Anon Key is not configured' },
        { status: 500 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    const today = new Date().toISOString().split('T')[0];
    const githubApiUrl = `https://api.github.com/search/commits?q=author:${githubUsername}+author-date:${today}..${today}`;

    const response = await fetch(githubApiUrl, {
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

    // Save or update the commit count to Supabase (create or update the record for today)
    // Always update regardless of extended parameter to ensure daily counts are maintained
    try {
      // Check if a record already exists for today
      let { data: existingRecord, error: fetchError } = await supabase
        .from('daily_commit_count')
        .select('*')
        .eq('date', today)
        .single();

      if (fetchError && fetchError.code !== 'PGRST116') {
        // PGRST116 means no rows found, which is expected for new days
        console.error('Error fetching existing commit record:', fetchError);
      }

      if (existingRecord) {
        // Update existing record
        const { error } = await supabase
          .from('daily_commit_count')
          .update({ 
            commit_count: commitCount,
            updated_at: new Date().toISOString()
          })
          .eq('date', today); // Use date instead of id for safer updates

        if (error) {
          console.error('Error updating commit count:', error);
        }
      } else {
        // Create new record for today
        const { error } = await supabase
          .from('daily_commit_count')
          .insert([
            {
              date: today,
              commit_count: commitCount,
              created_at: new Date().toISOString()
            }
          ]);

        if (error) {
          console.error('Error creating commit count record:', error);
        }
      }
    } catch (dbError) {
      console.error('Database error in commit tracking:', dbError);
    }

    // If extended data is requested, fetch additional statistics
    if (extended) {
      // Get date range for the last week for weekly stats
      const endDate = new Date();
      const startDate = new Date();
      startDate.setDate(endDate.getDate() - 7); // Last 7 days
      
      const endDateStr = endDate.toISOString().split('T')[0];
      const startDateStr = startDate.toISOString().split('T')[0];

      // Fetch daily commit count records for the last week
      const { data: weekData, error: weekError } = await supabase
        .from('daily_commit_count')
        .select('*')
        .gte('date', startDateStr)
        .lte('date', endDateStr)
        .order('date', { ascending: true });

      if (weekError) {
        console.error('Error fetching weekly commit data:', weekError);
      }

      // Calculate monthly total (last 30 days)
      const monthStartDate = new Date();
      monthStartDate.setDate(monthStartDate.getDate() - 30);
      const monthStartStr = monthStartDate.toISOString().split('T')[0];
      
      const { data: monthData, error: monthError } = await supabase
        .from('daily_commit_count')
        .select('*')
        .gte('date', monthStartStr)
        .lte('date', endDateStr);
      
      if (monthError) {
        console.error('Error fetching monthly commit data:', monthError);
      }
      
      const monthlyTotal = monthData?.reduce((sum, record) => sum + (record.commit_count || 0), 0) || 0;
      
      // Calculate average daily commits
      const avgDaily = monthData && monthData.length > 0 ? monthlyTotal / monthData.length : 0;

      // Format weekly activity data for the chart (last 7 days)
      const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const weeklyActivity = [];
      
      // Create data for the last 7 days
      for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const dateStr = date.toISOString().split('T')[0];
        const dayAbbr = daysOfWeek[date.getDay()];
        
        const dayRecord = weekData?.find(record => record.date === dateStr);
        const commits = dayRecord ? dayRecord.commit_count : 0;
        
        weeklyActivity.push({
          day: dayAbbr,
          commits: commits
        });
      }

      // Calculate weekly total
      const weeklyTotal = weekData?.reduce((sum, record) => sum + (record.commit_count || 0), 0) || 0;

      return NextResponse.json({
        username: githubUsername,
        commitCount,
        timestamp: new Date().toISOString(),
        extendedData: {
          commit_stats: {
            today: commitCount,
            weekly: weeklyTotal,
            monthly: monthlyTotal,
            average: Math.round(avgDaily * 10) / 10, // Round to 1 decimal place
            today_numeric: commitCount
          },
          weekly_activity: weeklyActivity,
          last_updated: new Date().toISOString()
        }
      });
    }

    // Regular response (without extended data)
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
