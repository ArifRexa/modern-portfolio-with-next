import { NextResponse } from 'next/server';
import { initializeSupabase, parseJsonbField, handleFetchResult } from '@/utils/supabaseCodingUtils';

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const date = url.searchParams.get('date') || new Date().toISOString().split('T')[0];

    const supabase = initializeSupabase();

    // Fetch the daily coding time details for the specified date
    const result = await supabase
      .from('daily_coding_time_details')
      .select('*')
      .eq('date', date)
      .single();

    const fetchResult = handleFetchResult(result, { noDataMessage: 'No coding details found for this date' });

    if (!fetchResult.data) {
      return NextResponse.json({
        success: true,
        date: date,
        data: null,
        message: fetchResult.message
      });
    }

    const data = fetchResult.data;

    // Parse JSONB fields using utility function
    const parsedData = {
      ...data,
      editors: parseJsonbField(data.editors),
      operating_systems: parseJsonbField(data.operating_systems),
      projects: parseJsonbField(data.projects),
      languages: parseJsonbField(data.languages),
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