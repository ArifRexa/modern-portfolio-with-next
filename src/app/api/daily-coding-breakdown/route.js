import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET(request) {
  try {
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

    // Get date from query parameters, default to today
    const url = new URL(request.url);
    const dateParam = url.searchParams.get('date');
    
    // Use provided date or default to today's date
    const targetDate = dateParam || new Date().toISOString().split('T')[0];

    // Fetch coding breakdown for the specified date
    const { data, error } = await supabase
      .from('daily_coding_time')
      .select('night_time, morning_time, afternoon_time, evening_time, coding_time')
      .eq('date', targetDate)
      .single();

    if (error && error.code !== 'PGRST116') { // PGRST116 means no rows found
      console.error('Error fetching coding breakdown:', error);
      return NextResponse.json(
        { error: 'Failed to fetch coding breakdown', details: error.message },
        { status: 500 }
      );
    }

    // If no record found for the date, return default values
    if (!data) {
      return NextResponse.json({
        success: true,
        codingBreakdown: {
          night_time: 0,
          morning_time: 0,
          afternoon_time: 0,
          evening_time: 0,
          total_time: 0
        },
        message: 'No data found for the specified date, using default values'
      });
    }

    return NextResponse.json({
      success: true,
      codingBreakdown: {
        night_time: data.night_time || 0,
        morning_time: data.morning_time || 0,
        afternoon_time: data.afternoon_time || 0,
        evening_time: data.evening_time || 0,
        total_time: data.coding_time || 0
      }
    });

  } catch (error) {
    console.error('Unexpected error in daily-coding-breakdown API:', error);
    return NextResponse.json(
      { error: 'Unexpected error occurred', message: error.message },
      { status: 500 }
    );
  }
}