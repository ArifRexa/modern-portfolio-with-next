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


    // Get month and year from query parameters, default to current month
    const url = new URL(request.url);
    const yearParam = url.searchParams.get('year');
    const monthParam = url.searchParams.get('month');
    
    const current = new Date();
    const year = yearParam || current.getFullYear();
    const month = monthParam || String(current.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed

    // Format the date range for the selected month
    const startDate = `${year}-${month}-01`;
    const endDate = new Date(year, parseInt(month), 0); // Last day of the month
    const endOfMonth = endDate.toISOString().split('T')[0];

    // Fetch all daily coding time records for the specified month
    const { data, error } = await supabase
      .from('daily_coding_time')
      .select('date, coding_time')
      .gte('date', startDate)
      .lte('date', endOfMonth)
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
        message: 'No data found for the specified month'
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