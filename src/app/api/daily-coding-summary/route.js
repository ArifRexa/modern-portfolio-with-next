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
      .select('date, editors, operating_systems, projects, languages')
      .eq('date', date)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        // No data found for the date, return success with null data
        return NextResponse.json({
          success: true,
          date: date,
          summary: null,
          message: 'No coding details found for this date'
        });
      }
      console.error('Error fetching daily coding details summary:', error);
      return NextResponse.json({ error: 'Failed to fetch daily coding details summary', message: error.message }, { status: 500 });
    }

    if (!data) {
      return NextResponse.json({
        success: true,
        date: date,
        summary: null,
        message: 'No coding details found for this date'
      });
    }

    // Parse JSONB fields (only if they are strings; Supabase might return them as objects already)
    const parsedData = {
      editors: Array.isArray(data.editors) ? data.editors : (typeof data.editors === 'string' ? JSON.parse(data.editors) : []),
      operating_systems: Array.isArray(data.operating_systems) ? data.operating_systems : (typeof data.operating_systems === 'string' ? JSON.parse(data.operating_systems) : []),
      projects: Array.isArray(data.projects) ? data.projects : (typeof data.projects === 'string' ? JSON.parse(data.projects) : []),
      languages: Array.isArray(data.languages) ? data.languages : (typeof data.languages === 'string' ? JSON.parse(data.languages) : []),
    };

    // Calculate summary statistics
    const summary = {
      totalCodingHours: parsedData.editors.reduce((sum, editor) => sum + parseFloat(editor.decimal), 0),
      editorCount: parsedData.editors.length,
      osCount: parsedData.operating_systems.length,
      projectCount: parsedData.projects.length,
      languageCount: parsedData.languages.length,
      topEditor: parsedData.editors.length > 0 ? parsedData.editors[0].name : 'N/A',
      topLanguage: parsedData.languages.length > 0 ? parsedData.languages[0].name : 'N/A',
      topProject: parsedData.projects.length > 0 ? parsedData.projects[0].name : 'N/A',
      topOS: parsedData.operating_systems.length > 0 ? parsedData.operating_systems[0].name : 'N/A',
    };

    return NextResponse.json({
      success: true,
      date: date,
      summary: summary
    });
  } catch (error) {
    console.error('Error in daily coding details summary API route:', error);
    return NextResponse.json({ error: 'Failed to fetch daily coding details summary', message: error.message }, { status: 500 });
  }
}