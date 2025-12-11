import { NextResponse } from 'next/server';
import { initializeSupabase, parseJsonbField } from '@/utils/supabaseCodingUtils';
import dayjs from 'dayjs';

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const startDateParam = url.searchParams.get('startDate');
    const endDateParam = url.searchParams.get('endDate');

    const supabase = initializeSupabase();

    // Calculate date range if not provided (default to last 30 days)
    const endDate = endDateParam ? dayjs(endDateParam) : dayjs();
    const startDate = startDateParam ? dayjs(startDateParam) : endDate.subtract(29, 'day'); // Last 30 days including today

    // Ensure the date range is not too large
    const daysDiff = endDate.diff(startDate, 'day');
    if (daysDiff > 90) {
      return NextResponse.json({ error: 'Date range cannot exceed 90 days' }, { status: 400 });
    }

    // Fetch daily coding time details for the date range
    const { data, error } = await supabase
      .from('daily_coding_time_details')
      .select('date, editors, operating_systems, projects, languages, created_at')
      .gte('date', startDate.format('YYYY-MM-DD'))
      .lte('date', endDate.format('YYYY-MM-DD'))
      .order('date', { ascending: true });

    if (error) {
      console.error('Error fetching historical daily coding details:', error);
      return NextResponse.json({ error: 'Failed to fetch historical daily coding details', message: error.message }, { status: 500 });
    }

    // Process the data to extract basic summary information for each date
    const processedData = data.map(record => {
      // Parse JSONB fields using utility function
      const editors = parseJsonbField(record.editors);
      const languages = parseJsonbField(record.languages);
      const projects = parseJsonbField(record.projects);
      const operatingSystems = parseJsonbField(record.operating_systems);

      return {
        date: record.date,
        totalHours: editors.reduce((sum, editor) => sum + parseFloat(editor.decimal || 0), 0),
        editorCount: editors.length,
        languageCount: languages.length,
        projectCount: projects.length,
        osCount: operatingSystems.length,
        topEditor: editors.length > 0 ? editors[0].name : null,
        topLanguage: languages.length > 0 ? languages[0].name : null,
        topProject: projects.length > 0 ? projects[0].name : null,
        created_at: record.created_at
      };
    });

    return NextResponse.json({
      success: true,
      startDate: startDate.format('YYYY-MM-DD'),
      endDate: endDate.format('YYYY-MM-DD'),
      daysRequested: daysDiff + 1,
      data: processedData
    });
  } catch (error) {
    console.error('Error in historical daily coding details API route:', error);
    return NextResponse.json({ error: 'Failed to fetch historical daily coding details', message: error.message }, { status: 500 });
  }
}