import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const date = url.searchParams.get('date') || new Date().toISOString().split('T')[0];
    
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      return NextResponse.json({ error: 'Supabase configuration missing' }, { status: 500 });
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    // Fetch the daily coding time details for the specified date
    const { data, error } = await supabase
      .from('daily_coding_time_details')
      .select('*')
      .eq('date', date)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        // No data found for the date, return success with null data
        return NextResponse.json({
          success: true,
          date: date,
          data: null,
          message: 'No coding details found for this date'
        });
      }
      console.error('Error fetching daily coding details:', error);
      return NextResponse.json({ error: 'Failed to fetch daily coding details', message: error.message }, { status: 500 });
    }

    if (!data) {
      return NextResponse.json({
        success: true,
        date: date,
        data: null,
        message: 'No coding details found for this date'
      });
    }

    // Parse JSONB fields (only if they are strings; Supabase might return them as objects already)
    const parsedData = {
      ...data,
      editors: Array.isArray(data.editors) ? data.editors : (typeof data.editors === 'string' ? JSON.parse(data.editors) : []),
      operating_systems: Array.isArray(data.operating_systems) ? data.operating_systems : (typeof data.operating_systems === 'string' ? JSON.parse(data.operating_systems) : []),
      projects: Array.isArray(data.projects) ? data.projects : (typeof data.projects === 'string' ? JSON.parse(data.projects) : []),
      languages: Array.isArray(data.languages) ? data.languages : (typeof data.languages === 'string' ? JSON.parse(data.languages) : []),
    };

    return NextResponse.json({
      success: true,
      date: date,
      data: parsedData
    });
  } catch (error) {
    console.error('Error in daily coding details API route:', error);
    return NextResponse.json({ error: 'Failed to fetch daily coding details', message: error.message }, { status: 500 });
  }
}