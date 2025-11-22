// src/app/api/wakatime/route.js
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import dayjs from "dayjs";

export const dynamic = "force-dynamic";

// Convert WakaTime text (e.g., "5 hrs 30 mins") to numeric hours
function parseWakaTimeToHours(timeText) {
  let numericHours = 0;
  if (timeText && typeof timeText === "string") {
    const hoursMatch = timeText.match(/(\d+(?:\.\d+)?)\s*(?:hr|hrs|h)/i);
    const minsMatch = timeText.match(/(\d+)\s*(?:min|mins|m)/i);
    const hours = hoursMatch ? parseFloat(hoursMatch[1]) : 0;
    const mins = minsMatch ? parseInt(minsMatch[1]) : 0;
    numericHours = hours + mins / 60;
  }
  return numericHours;
}

// Convert numeric hours (e.g., 3.5) to formatted string "3h 30m"
function formatHoursToTime(hours) {
  const h = Math.floor(hours);
  const m = Math.round((hours - h) * 60);
  return `${h}h ${m}m`;
}

// Determine time period based on Dhaka time (Asia/Dhaka)
function getCurrentTimePeriod() {
  const dhakaString = new Date().toLocaleString("en-US", { timeZone: "Asia/Dhaka" });
  const dhakaTime = new Date(dhakaString);
  const hour = dhakaTime.getHours();

  if (hour >= 0 && hour < 6) return "night";
  if (hour >= 6 && hour < 12) return "morning";
  if (hour >= 12 && hour < 18) return "afternoon";
  return "evening";
}

export async function GET(request) {
  const url = new URL(request.url);
  const extended = url.searchParams.get("extended");

  try {
    const apiKey = process.env.WAKA_TIME_API_KEY;
    if (!apiKey) return NextResponse.json({ error: "WAKA_TIME_API_KEY is not configured" }, { status: 500 });

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!supabaseUrl || !supabaseAnonKey)
      return NextResponse.json({ error: "Supabase URL or Anon Key is not configured" }, { status: 500 });

    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    const encodedKey = Buffer.from(`${apiKey}:`).toString("base64");

    // Fetch today's WakaTime summary
    const wakaUrl = "https://wakatime.com/api/v1/users/current/summaries?start=today&end=today";
    const response = await fetch(wakaUrl, { headers: { Authorization: `Basic ${encodedKey}` } });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`WakaTime API responded with status ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    const codingTimeText = data.data[0]?.grand_total?.text || "0 mins";
    const numericHoursToday = parseWakaTimeToHours(codingTimeText);

    const currentTimePeriod = getCurrentTimePeriod();
    const timePeriodUpdate = { [`${currentTimePeriod}_time`]: numericHoursToday };

    const todayStr = dayjs().format("YYYY-MM-DD");

    // Fetch existing record for today
    let { data: todayRecord, error: fetchError } = await supabase
      .from("daily_coding_time")
      .select("*")
      .eq("date", todayStr)
      .single();

    if (fetchError && fetchError.code !== "PGRST116") throw new Error(fetchError.message);

    const newTotalCodingTime = numericHoursToday;

    if (todayRecord) {
      // Update existing record
      await supabase.from("daily_coding_time").update({
        ...timePeriodUpdate,
        coding_time: newTotalCodingTime,
        updated_at: new Date().toISOString(),
      }).eq("date", todayStr);
    } else {
      // Insert new record
      await supabase.from("daily_coding_time").insert([{
        date: todayStr,
        coding_time: newTotalCodingTime,
        ...timePeriodUpdate,
        created_at: new Date().toISOString(),
      }]);
    }

    if (extended) {
      // Fetch last 7 days data
      const endDate = dayjs();
      const startDate = dayjs().subtract(6, "day"); // last 7 days including today
      const { data: weekData, error: weekError } = await supabase
        .from("daily_coding_time")
        .select("*")
        .gte("date", startDate.format("YYYY-MM-DD"))
        .lte("date", endDate.format("YYYY-MM-DD"))
        .order("date", { ascending: true });

      if (weekError) console.error("Error fetching weekly data:", weekError);

      const monthlyStart = dayjs().subtract(30, "day");
      const { data: monthData, error: monthError } = await supabase
        .from("daily_coding_time")
        .select("*")
        .gte("date", monthlyStart.format("YYYY-MM-DD"))
        .lte("date", endDate.format("YYYY-MM-DD"));

      if (monthError) console.error("Error fetching monthly data:", monthError);

      const monthlyTotal = monthData?.reduce((sum, record) => sum + (record.coding_time || 0), 0) || 0;
      const avgDaily = monthData && monthData.length > 0 ? monthlyTotal / monthData.length : 0;

      const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      const weeklyActivity = [];
      for (let i = 6; i >= 0; i--) {
        const date = dayjs().subtract(i, "day");
        const dateStr = date.format("YYYY-MM-DD");
        const dayAbbr = daysOfWeek[date.day()];
        const dayRecord = weekData?.find(record => record.date === dateStr);
        const hours = dayRecord ? parseFloat(dayRecord.coding_time) : 0;
        weeklyActivity.push({ 
          day: dayAbbr, 
          hours: hours.toFixed(2),
          formatted: formatHoursToTime(hours)
        });
      }

      return NextResponse.json({
        codingTime: codingTimeText,
        numericHours: numericHoursToday,
        success: true,
        timestamp: new Date().toISOString(),
        extendedData: {
          coding_time: {
            today: formatHoursToTime(numericHoursToday),
            weekly: formatHoursToTime(weekData?.reduce((sum, r) => sum + (r.coding_time || 0), 0) || 0),
            monthly: formatHoursToTime(monthlyTotal),
            average: formatHoursToTime(avgDaily),
            today_numeric: numericHoursToday,
          },
          weekly_activity: weeklyActivity,
          last_updated: new Date().toISOString(),
        },
      });
    }

    // Normal response without extended
    return NextResponse.json({
      codingTime: codingTimeText,
      numericHours: numericHoursToday,
      formatted: formatHoursToTime(numericHoursToday),
      success: true,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error in WakaTime API route:", error);
    return NextResponse.json(
      { error: "Failed to fetch or update WakaTime data", message: error.message },
      { status: 500 }
    );
  }
}






















// Previous version of the code:

// // src/app/api/wakatime/route.js
// import { NextResponse } from 'next/server';
// import { createClient } from '@supabase/supabase-js';

// export async function GET(request) {
//   // Check if we're requesting extended data
//   const url = new URL(request.url);
//   const extended = url.searchParams.get('extended');
  
//   try {
//     // Get the API key from environment variables
//     const apiKey = process.env.WAKA_TIME_API_KEY;
    
//     if (!apiKey) {
//       return NextResponse.json(
//         { error: 'WAKA_TIME_API_KEY is not configured' },
//         { status: 500 }
//       );
//     }

//     // Initialize Supabase client
//     const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
//     const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

//     if (!supabaseUrl || !supabaseAnonKey) {
//       return NextResponse.json(
//         { error: 'Supabase URL or Anon Key is not configured' },
//         { status: 500 }
//       );
//     }

//     const supabase = createClient(supabaseUrl, supabaseAnonKey);
    
//     // Fetch from WakaTime API
//     // Encode the API key using base64 for Basic authentication (API_KEY:)
//     const encodedKey = Buffer.from(`${apiKey}:`).toString('base64');
    
//     // Construct the WakaTime API URL
//     const url = 'https://wakatime.com/api/v1/users/current/summaries?start=today&end=today';
    
//     // Make the request to WakaTime API with a short cache
//     const response = await fetch(url, {
//       headers: {
//         Authorization: `Basic ${encodedKey}`,
//       },
//       next: { revalidate: 100 }, // Cache for 100 seconds
//     });

//     if (!response.ok) {
//       console.error(`WakaTime API responded with status ${response.status}`);
//       const errorText = await response.text(); // Get error details
//       throw new Error(`WakaTime API responded with status ${response.status}: ${errorText}`);
//     }

//     const data = await response.json();
    
//     // Extract today's coding time
//     const codingTime = data.data[0]?.grand_total?.text || '0 mins';
    
//     // Extract numeric hours from the text (e.g., "5 hrs 30 mins" -> convert to hours as number)
//     let numericHours = 0;
//     if (codingTime && typeof codingTime === 'string') {
//       // Parse the text to extract hours and minutes
//       const hoursMatch = codingTime.match(/(\d+(?:\.\d+)?)\s*(?:hr|hrs|h)/i);
//       const minsMatch = codingTime.match(/(\d+)\s*(?:min|mins|m)/i);
      
//       const hours = hoursMatch ? parseFloat(hoursMatch[1]) : 0;
//       const mins = minsMatch ? parseInt(minsMatch[1]) : 0;
      
//       numericHours = hours + (mins / 60);
//     }

//     // Save or update the coding time to Supabase (create or update the record for today)
//     if (numericHours > 0 || extended) { // Only update if we have data or need extended data
//       const today = new Date();
//       const dateStr = today.toISOString().split('T')[0]; // Format: YYYY-MM-DD

//       // Check if a record already exists for today
//       let { data: existingRecord, error: fetchError } = await supabase
//         .from('daily_coding_time')
//         .select('*')
//         .eq('date', dateStr)
//         .single();

//       if (fetchError && fetchError.code !== 'PGRST116') {
//         // PGRST116 means no rows found, which is expected for new days
//         console.error('Error fetching existing record:', fetchError);
//       }

//       if (existingRecord) {
//         // Update existing record
//         const { error } = await supabase
//           .from('daily_coding_time')
//           .update({ 
//             coding_time: numericHours,
//             updated_at: new Date().toISOString()
//           })
//           .eq('id', existingRecord.id);

//         if (error) {
//           console.error('Error updating coding time:', error);
//         }
//       } else {
//         // Create new record for today
//         const { error } = await supabase
//           .from('daily_coding_time')
//           .insert([
//             {
//               date: dateStr,
//               coding_time: numericHours,
//               created_at: new Date().toISOString()
//             }
//           ]);

//         if (error) {
//           console.error('Error creating coding time record:', error);
//         }
//       }
//     }
    
//     // If extended data is requested, fetch additional statistics
//     if (extended) {
//       // Get date range for the last week for weekly stats
//       const endDate = new Date();
//       const startDate = new Date();
//       startDate.setDate(endDate.getDate() - 7); // Last 7 days
      
//       const endDateStr = endDate.toISOString().split('T')[0];
//       const startDateStr = startDate.toISOString().split('T')[0];

//       // Fetch daily coding time records for the last week
//       const { data: weekData, error: weekError } = await supabase
//         .from('daily_coding_time')
//         .select('*')
//         .gte('date', startDateStr)
//         .lte('date', endDateStr)
//         .order('date', { ascending: true });

//       if (weekError) {
//         console.error('Error fetching weekly data:', weekError);
//       }

//       // Calculate monthly total (last 30 days)
//       const monthStartDate = new Date();
//       monthStartDate.setDate(monthStartDate.getDate() - 30);
//       const monthStartStr = monthStartDate.toISOString().split('T')[0];
      
//       const { data: monthData, error: monthError } = await supabase
//         .from('daily_coding_time')
//         .select('*')
//         .gte('date', monthStartStr)
//         .lte('date', endDateStr);
      
//       if (monthError) {
//         console.error('Error fetching monthly data:', monthError);
//       }
      
//       const monthlyTotal = monthData?.reduce((sum, record) => sum + (record.coding_time || 0), 0) || 0;
      
//       // Calculate average daily time
//       const avgDaily = monthData && monthData.length > 0 ? monthlyTotal / monthData.length : 0;

//       // Format weekly activity data for the chart (last 7 days)
//       const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
//       const weeklyActivity = [];
      
//       // Create data for the last 7 days
//       for (let i = 6; i >= 0; i--) {
//         const date = new Date();
//         date.setDate(date.getDate() - i);
//         const dateStr = date.toISOString().split('T')[0];
//         const dayAbbr = daysOfWeek[date.getDay()];
        
//         const dayRecord = weekData?.find(record => record.date === dateStr);
//         const hours = dayRecord ? parseFloat(dayRecord.coding_time) : 0;
        
//         weeklyActivity.push({
//           day: dayAbbr,
//           hours: hours.toFixed(2)
//         });
//       }

//       // Format times for display
//       const formatTime = (hours) => {
//         const totalMinutes = hours * 60;
//         const h = Math.floor(totalMinutes / 60);
//         const m = Math.round(totalMinutes % 60);
//         return `${h}h ${m}m`;
//       };

//       const todayFormatted = formatTime(numericHours);
//       const weeklyTotal = weekData?.reduce((sum, record) => sum + (record.coding_time || 0), 0) || 0;
//       const weeklyFormatted = formatTime(weeklyTotal);
//       const monthlyFormatted = formatTime(monthlyTotal);
//       const avgFormatted = formatTime(avgDaily);

//       return NextResponse.json({
//         codingTime,
//         numericHours,
//         success: true,
//         timestamp: new Date().toISOString(),
//         extendedData: {
//           coding_time: {
//             today: todayFormatted,
//             weekly: weeklyFormatted,
//             monthly: monthlyFormatted,
//             average: avgFormatted,
//             today_numeric: numericHours
//           },
//           weekly_activity: weeklyActivity,
//           last_updated: new Date().toISOString()
//         }
//       });
//     }
    
//     return NextResponse.json({
//       codingTime,
//       numericHours,
//       success: true,
//       timestamp: new Date().toISOString(),
//     });
//   } catch (error) {
//     console.error('Error fetching WakaTime data:', error);
//     return NextResponse.json(
//       { error: 'Failed to fetch WakaTime data', message: error.message },
//       { status: 500 }
//     );
//   }
// }
