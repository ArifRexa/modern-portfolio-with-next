// src/app/api/daily-coding-time/route.js
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET() {
  try {
    // Initialize Supabase client using environment variables
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      return NextResponse.json(
        { error: 'Supabase URL or Anon Key is not configured' },
        { status: 500 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    // Get date range for the last week for weekly stats
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - 7); // Last 7 days
    
    const endDateStr = endDate.toISOString().split('T')[0];
    const startDateStr = startDate.toISOString().split('T')[0];

    // Fetch daily coding time records for the last week
    const { data: weekData, error: weekError } = await supabase
      .from('daily_coding_time')
      .select('*')
      .gte('date', startDateStr)
      .lte('date', endDateStr)
      .order('date', { ascending: true });

    if (weekError) {
      throw weekError;
    }

    // Fetch today's data specifically
    const todayStr = new Date().toISOString().split('T')[0];
    const { data: todayData, error: todayError } = await supabase
      .from('daily_coding_time')
      .select('*')
      .eq('date', todayStr)
      .single();

    // Calculate weekly total
    const weeklyTotal = weekData.reduce((sum, record) => sum + (record.coding_time || 0), 0);
    
    // Calculate monthly total (last 30 days)
    const monthStartDate = new Date();
    monthStartDate.setDate(monthStartDate.getDate() - 30);
    const monthStartStr = monthStartDate.toISOString().split('T')[0];
    
    const { data: monthData, error: monthError } = await supabase
      .from('daily_coding_time')
      .select('*')
      .gte('date', monthStartStr)
      .lte('date', endDateStr);
    
    if (monthError) {
      throw monthError;
    }
    
    const monthlyTotal = monthData.reduce((sum, record) => sum + (record.coding_time || 0), 0);
    
    // Calculate average daily time
    const avgDaily = monthData.length > 0 ? monthlyTotal / monthData.length : 0;

    // Format weekly activity data for the chart (last 7 days)
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const weeklyActivity = [];
    
    // Create data for the last 7 days
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      const dayAbbr = daysOfWeek[date.getDay()];
      
      const dayRecord = weekData.find(record => record.date === dateStr);
      const hours = dayRecord ? parseFloat(dayRecord.coding_time) : 0;
      
      weeklyActivity.push({
        day: dayAbbr,
        hours: hours.toFixed(2)
      });
    }

    // Calculate today's formatted time
    let todayFormatted = '0h 0m';
    if (todayData && todayData.coding_time !== undefined) {
      const totalMinutes = todayData.coding_time * 60;
      const hours = Math.floor(totalMinutes / 60);
      const minutes = Math.round(totalMinutes % 60);
      todayFormatted = `${hours}h ${minutes}m`;
    }

    // Format weekly total
    const weeklyTotalMinutes = weeklyTotal * 60;
    const weeklyHours = Math.floor(weeklyTotalMinutes / 60);
    const weeklyMinutes = Math.round(weeklyTotalMinutes % 60);
    const weeklyFormatted = `${weeklyHours}h ${weeklyMinutes}m`;

    // Format monthly total
    const monthlyTotalMinutes = monthlyTotal * 60;
    const monthlyHours = Math.floor(monthlyTotalMinutes / 60);
    const monthlyMinutes = Math.round(monthlyTotalMinutes % 60);
    const monthlyFormatted = `${monthlyHours}h ${monthlyMinutes}m`;

    // Format average
    const avgMinutes = avgDaily * 60;
    const avgHour = Math.floor(avgMinutes / 60);
    const avgMin = Math.round(avgMinutes % 60);
    const avgFormatted = `${avgHour}h ${avgMin}m`;

    return NextResponse.json({
      coding_time: {
        today: todayFormatted,
        weekly: weeklyFormatted,
        monthly: monthlyFormatted,
        average: avgFormatted,
        today_numeric: todayData ? todayData.coding_time : 0
      },
      weekly_activity: weeklyActivity,
      last_updated: new Date().toISOString(),
      success: true
    });
  } catch (error) {
    console.error('Error fetching daily coding time data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch daily coding time data', message: error.message },
      { status: 500 }
    );
  }
}