import { NextResponse } from 'next/server';
import supabase from '@/utils/supabaseClient';

export async function GET(request) {
  try {

    if (!supabase) {
      return NextResponse.json(
        { error: 'Supabase URL or Anon Key is not configured' },
        { status: 500 }
      );
    }


    // Get mode from query parameter: 'monthly' (default) for current month or 'last30days' for last 30 days
    const url = new URL(request.url);
    const mode = url.searchParams.get('mode') || 'monthly'; // Default to monthly for backward compatibility

    let startDate, endDate;

    if (mode === 'last30days') {
      // Calculate last 30 days from today
      const today = new Date();
      const thirtyDaysAgo = new Date(today);
      thirtyDaysAgo.setDate(today.getDate() - 30);

      startDate = thirtyDaysAgo.toISOString().split('T')[0];
      endDate = today.toISOString().split('T')[0];
    } else {
      // Get month and year from query parameters, default to current month
      const yearParam = url.searchParams.get('year');
      const monthParam = url.searchParams.get('month');

      const current = new Date();
      const year = yearParam || current.getFullYear();
      const month = monthParam || String(current.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed

      // Format the date range for the selected month
      startDate = `${year}-${month}-01`;
      const monthEndDate = new Date(year, parseInt(month), 0); // Last day of the month
      endDate = monthEndDate.toISOString().split('T')[0];
    }

    // Fetch all daily coding time records for the specified date range
    const { data, error } = await supabase
      .from('daily_coding_time')
      .select('date, coding_time')
      .gte('date', startDate)
      .lte('date', endDate)
      .order('date', { ascending: true });

    if (error) {
      console.error('Error fetching monthly coding breakdown:', error);
      return NextResponse.json(
        { error: 'Failed to fetch monthly coding breakdown', details: error.message },
        { status: 500 }
      );
    }

    if (!data || data.length === 0) {
      // Return default values if no data found
      return NextResponse.json({
        success: true,
        monthlyDailyHours: [],
        message: mode === 'last30days' ? 'No data found for the last 30 days' : 'No data found for the specified month'
      });
    }

    // Format the data for chart (similar to weekly activity)
    const monthlyDailyHours = data.map(record => {
      const date = new Date(record.date);
      const options = { day: 'numeric', month: 'short' };
      const dateStr = date.toLocaleDateString('en-US', options);
      return {
        day: dateStr,
        hours: parseFloat(record.coding_time || 0).toFixed(2)
      };
    });

    return NextResponse.json({
      success: true,
      monthlyDailyHours: monthlyDailyHours
    });

  } catch (error) {
    console.error('Unexpected error in monthly-coding-breakdown API:', error);
    return NextResponse.json(
      { error: 'Unexpected error occurred', message: error.message },
      { status: 500 }
    );
  }
}