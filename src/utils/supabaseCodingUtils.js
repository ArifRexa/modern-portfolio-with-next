// Utility functions for Supabase API interactions
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

/**
 * Initialize Supabase client with environment variables
 */
export function initializeSupabase() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Supabase configuration missing');
  }

  return createClient(supabaseUrl, supabaseAnonKey);
}

/**
 * Safely parse JSONB fields from Supabase
 * Handles both string and object formats
 */
export function parseJsonbField(field) {
  if (Array.isArray(field)) {
    return field;
  }
  if (typeof field === 'string') {
    try {
      return JSON.parse(field);
    } catch (error) {
      console.error('Error parsing JSONB field:', error);
      return [];
    }
  }
  return field || [];
}

/**
 * Process raw coding data to extract various metrics
 */
export function processCodingData(data) {
  const editors = parseJsonbField(data.editors);
  const languages = parseJsonbField(data.languages);
  const projects = parseJsonbField(data.projects);
  const operatingSystems = parseJsonbField(data.operating_systems);

  return {
    editors,
    languages,
    projects,
    operatingSystems,
    parsedData: {
      editors,
      languages,
      projects,
      operatingSystems,
    }
  };
}

/**
 * Calculate summary statistics from parsed data
 */
export function calculateSummary(parsedData) {
  return {
    totalCodingHours: parsedData.editors.reduce((sum, editor) => sum + parseFloat(editor.decimal || 0), 0),
    editorCount: parsedData.editors.length,
    osCount: parsedData.operating_systems.length,
    projectCount: parsedData.projects.length,
    languageCount: parsedData.languages.length,
    topEditor: parsedData.editors.length > 0 ? parsedData.editors[0].name : 'N/A',
    topLanguage: parsedData.languages.length > 0 ? parsedData.languages[0].name : 'N/A',
    topProject: parsedData.projects.length > 0 ? parsedData.projects[0].name : 'N/A',
    topOS: parsedData.operating_systems.length > 0 ? parsedData.operating_systems[0].name : 'N/A',
  };
}

/**
 * Format error response
 */
export function formatError(error, message) {
  console.error(message, error);
  return NextResponse.json({ error: 'Failed to fetch data', message: error.message }, { status: 500 });
}

/**
 * Handle Supabase fetch errors (specifically handle the 'no rows' case)
 */
export function handleFetchResult(result, params = {}) {
  const { error, data } = result;
  const { noDataMessage = 'No coding details found for this date' } = params;

  if (error) {
    if (error.code === 'PGRST116') {
      // No data found for the date, return success with null data
      return {
        success: true,
        data: null,
        message: noDataMessage
      };
    }
    console.error('Supabase error:', error);
    throw error;
  }

  return {
    success: true,
    data: data
  };
}