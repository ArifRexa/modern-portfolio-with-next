// src/app/api/wakatime/route.js
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import dayjs from "dayjs";

export const dynamic = "force-dynamic";

// Convert numeric hours (e.g., 3.5) to formatted string "3h 30m"
function formatHoursToTime(hours) {
  const h = Math.floor(hours);
  const m = Math.round((hours - h) * 60);
  return `${h}h ${m}m`;
}

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const extended = url.searchParams.get("extended");

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey)
      return NextResponse.json({ error: "Supabase config missing" }, { status: 500 });

    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    // Fetch today's data from Supabase
    const todayStr = dayjs().format("YYYY-MM-DD");
    const { data: todayRecord, error: todayError } = await supabase
      .from("daily_coding_time")
      .select("*")
      .eq("date", todayStr)
      .single();

    if (todayError && todayError.code !== "PGRST116") {
      throw new Error(todayError.message);
    }

    const numericHoursToday = todayRecord ? todayRecord.coding_time || 0 : 0;
    const formattedToday = formatHoursToTime(numericHoursToday);

    if (extended) {
      // Fetch last 7 days data from Supabase
      const endDate = dayjs();
      const startDate = dayjs().subtract(6, "day"); // last 7 days including today
      const { data: weekData, error: weekError } = await supabase
        .from("daily_coding_time")
        .select("*")
        .gte("date", startDate.format("YYYY-MM-DD"))
        .lte("date", endDate.format("YYYY-MM-DD"))
        .order("date", { ascending: true });

      if (weekError) console.error("Error fetching weekly data:", weekError);

      // Fetch monthly data (last 30 days) from Supabase
      const monthlyStart = dayjs().subtract(29, "day"); // Last 30 days
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
        const hours = dayRecord ? parseFloat(dayRecord.coding_time || 0) : 0;
        weeklyActivity.push({
          day: dayAbbr,
          hours: hours.toFixed(2),
          formatted: formatHoursToTime(hours)
        });
      }

      return NextResponse.json({
        codingTime: formattedToday,
        numericHours: numericHoursToday,
        success: true,
        timestamp: new Date().toISOString(),
        extendedData: {
          coding_time: {
            today: formattedToday,
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
      codingTime: formattedToday,
      numericHours: numericHoursToday,
      formatted: formattedToday,
      success: true,
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    console.error("Error in WakaTime API route:", err);
    return NextResponse.json({ error: "Failed to fetch Wakatime data", message: err.message }, { status: 500 });
  }
}










// // src/app/api/wakatime/route.js
// import { NextResponse } from "next/server";
// import { createClient } from "@supabase/supabase-js";
// import dayjs from "dayjs";

// export const dynamic = "force-dynamic";

// // Convert WakaTime text (e.g., "5 hrs 30 mins") to numeric hours
// function parseWakaTimeToHours(timeText) {
//   if (!timeText) return 0;
//   const hoursMatch = timeText.match(/(\d+(?:\.\d+)?)\s*(?:hr|hrs|h)/i);
//   const minsMatch = timeText.match(/(\d+)\s*(?:min|mins|m)/i);
//   return (hoursMatch ? parseFloat(hoursMatch[1]) : 0) + (minsMatch ? parseInt(minsMatch[1]) / 60 : 0);
// }

// // Convert numeric hours (e.g., 3.5) to formatted string "3h 30m"
// function formatHoursToTime(hours) {
//   const h = Math.floor(hours);
//   const m = Math.round((hours - h) * 60);
//   return `${h}h ${m}m`;
// }

// // Determine current time period (Dhaka time)
// function getCurrentTimePeriod() {
//   const dhakaTime = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Dhaka" }));
//   const hour = dhakaTime.getHours();
//   if (hour < 6) return "night";
//   if (hour < 12) return "morning";
//   if (hour < 18) return "afternoon";
//   return "evening";
// }

// export async function GET(request) {
//   try {
//     const url = new URL(request.url);
//     const extended = url.searchParams.get("extended");

//     const apiKey = process.env.WAKA_TIME_API_KEY;
//     const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
//     const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

//     if (!apiKey || !supabaseUrl || !supabaseAnonKey)
//       return NextResponse.json({ error: "WAKA_TIME_API_KEY or Supabase config missing" }, { status: 500 });

//     const supabase = createClient(supabaseUrl, supabaseAnonKey);
//     const encodedKey = Buffer.from(`${apiKey}:`).toString("base64");

//     // --- Fetch last 7 days from WakaTime API ---
//     const endDate = dayjs();
//     const startDate = dayjs().subtract(6, "day"); // last 7 days including today
//     const wakaUrl = `https://wakatime.com/api/v1/users/current/summaries?start=${startDate.format("YYYY-MM-DD")}&end=${endDate.format("YYYY-MM-DD")}`;
//     const response = await fetch(wakaUrl, { headers: { Authorization: `Basic ${encodedKey}` } });
//     if (!response.ok) {
//       const errorText = await response.text();
//       throw new Error(`WakaTime API error ${response.status}: ${errorText}`);
//     }
//     const wakaData = await response.json();

//     // --- Prepare Supabase upsert data ---
//     const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
//     const recordsToUpsert = wakaData.data.map(day => {
//       const dateStr = day.range.date;
//       const codingHours = parseWakaTimeToHours(day.grand_total?.text);
//       const dhakaHour = dayjs().isSame(dayjs(dateStr), "day") ? getCurrentTimePeriod() : null;
//       const timePeriodUpdate = dhakaHour ? { [`${dhakaHour}_time`]: codingHours } : {};

//       return {
//         date: dateStr,
//         coding_time: codingHours,
//         ...timePeriodUpdate,
//         updated_at: new Date().toISOString(),
//       };
//     });

//     // --- Upsert all 7 days in one go ---
//     const { error: upsertError } = await supabase
//       .from("daily_coding_time")
//       .upsert(recordsToUpsert, { onConflict: ["date"] });

//     if (upsertError) throw new Error(upsertError.message);

//     // --- Prepare weekly activity for response ---
//     const weeklyActivity = recordsToUpsert.map(record => ({
//       day: daysOfWeek[dayjs(record.date).day()],
//       hours: record.coding_time.toFixed(2),
//       formatted: formatHoursToTime(record.coding_time),
//     }));

//     // --- Monthly summary (last 30 days) ---
//     const monthStart = dayjs().subtract(29, "day");
//     const { data: monthData } = await supabase
//       .from("daily_coding_time")
//       .select("*")
//       .gte("date", monthStart.format("YYYY-MM-DD"))
//       .lte("date", endDate.format("YYYY-MM-DD"));

//     const monthlyTotal = monthData?.reduce((sum, r) => sum + (r.coding_time || 0), 0) || 0;
//     const avgDaily = monthData && monthData.length > 0 ? monthlyTotal / monthData.length : 0;

//     return NextResponse.json({
//       success: true,
//       timestamp: new Date().toISOString(),
//       extendedData: {
//         coding_time: {
//           today: formatHoursToTime(recordsToUpsert[recordsToUpsert.length - 1].coding_time),
//           weekly: formatHoursToTime(recordsToUpsert.reduce((sum, r) => sum + r.coding_time, 0)),
//           monthly: formatHoursToTime(monthlyTotal),
//           average: formatHoursToTime(avgDaily),
//           today_numeric: recordsToUpsert[recordsToUpsert.length - 1].coding_time,
//         },
//         weekly_activity: weeklyActivity,
//         last_updated: new Date().toISOString(),
//       },
//     });
//   } catch (err) {
//     console.error("Error in WakaTime API route:", err);
//     return NextResponse.json({ error: "Failed to fetch or update WakaTime data", message: err.message }, { status: 500 });
//   }
// }