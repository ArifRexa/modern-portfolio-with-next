// src/utils/codingTimeTracker.js
import supabase from './supabaseClient';

/**
 * Updates or creates a daily coding time record
 * @param {string} codingTime - The total coding time for the day (e.g., "2.35" for 2.35 hours)
 * @returns {Promise<Object>} Result of the operation
 */
export const updateDailyCodingTime = async (codingTime) => {
  try {
    // Get today's date in YYYY-MM-DD format
    const today = new Date();
    const dateStr = today.toISOString().split('T')[0]; // Format: YYYY-MM-DD

    // Check if a record already exists for today
    let { data: existingRecord, error: fetchError } = await supabase
      .from('daily_coding_time')
      .select('*')
      .eq('date', dateStr)
      .single();

    if (fetchError && fetchError.code !== 'PGRST116') {
      // PGRST116 means no rows found, which is expected for new days
      throw fetchError;
    }

    if (existingRecord) {
      // Update existing record
      const { data, error } = await supabase
        .from('daily_coding_time')
        .update({ 
          coding_time: codingTime,
          updated_at: new Date().toISOString()
        })
        .eq('id', existingRecord.id)
        .select()
        .single();

      if (error) {
        throw error;
      }

      console.log('Updated coding time for today:', data);
      return { success: true, data, isNew: false };
    } else {
      // Create new record for today
      const { data, error } = await supabase
        .from('daily_coding_time')
        .insert([
          {
            date: dateStr,
            coding_time: codingTime,
            created_at: new Date().toISOString()
          }
        ])
        .select()
        .single();

      if (error) {
        throw error;
      }

      console.log('Created new coding time record for today:', data);
      return { success: true, data, isNew: true };
    }
  } catch (error) {
    console.error('Error updating daily coding time:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Fetches the current day's coding time
 * @returns {Promise<Object>} Current day's coding time record
 */
export const getTodaysCodingTime = async () => {
  try {
    const today = new Date();
    const dateStr = today.toISOString().split('T')[0]; // Format: YYYY-MM-DD

    const { data, error } = await supabase
      .from('daily_coding_time')
      .select('*')
      .eq('date', dateStr)
      .single();

    if (error && error.code !== 'PGRST116') {
      // PGRST116 means no rows found
      throw error;
    }

    return { success: true, data };
  } catch (error) {
    console.error('Error fetching today\'s coding time:', error);
    return { success: false, error: error.message, data: null };
  }
};

/**
 * Fetches coding time for a specific date
 * @param {string} date - Date string in YYYY-MM-DD format
 * @returns {Promise<Object>} Coding time record for the specified date
 */
export const getCodingTimeForDate = async (date) => {
  try {
    const { data, error } = await supabase
      .from('daily_coding_time')
      .select('*')
      .eq('date', date)
      .single();

    if (error && error.code !== 'PGRST116') {
      throw error;
    }

    return { success: true, data };
  } catch (error) {
    console.error(`Error fetching coding time for ${date}:`, error);
    return { success: false, error: error.message, data: null };
  }
};