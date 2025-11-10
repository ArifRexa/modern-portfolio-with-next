// Shared utility to track daily meetings and coffee consumption
// This ensures consistency across all components

// Function to generate a consistent random number of meetings for the day
export const getTodaysMeetings = () => {
  // Create a seed based on today's date to ensure the same number each time on this day
  const today = new Date();
  const dateStr = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
  // Simple hash function to create a deterministic "random" number
  let hash = 0;
  for (let i = 0; i < dateStr.length; i++) {
    const char = dateStr.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  // Convert to positive number and get 0-4 range
  const positiveHash = Math.abs(hash);
  return positiveHash % 5; // 0, 1, 2, 3, or 4
};

// Function to get coffee count based on current time
export const getCoffeeCount = () => {
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinutes = now.getMinutes();
  const currentMinutesFromMidnight = currentHour * 60 + currentMinutes;
  
  // Define coffee times: 11:30 AM (690 minutes), 4:00 PM (960 minutes), 6:00 PM (1080 minutes)
  const elevenThirty = 11 * 60 + 30;  // 11:30 AM
  const fourPM = 16 * 60 + 0;         // 4:00 PM
  const sixPM = 18 * 60 + 0;          // 6:00 PM
  
  if (currentMinutesFromMidnight >= sixPM) {
    return 3;  // 6:00 PM or later
  } else if (currentMinutesFromMidnight >= fourPM) {
    return 2;  // 4:00 PM to 5:59 PM
  } else if (currentMinutesFromMidnight >= elevenThirty) {
    return 1;  // 11:30 AM to 3:59 PM
  } else {
    return 0;  // Before 11:30 AM
  }
};