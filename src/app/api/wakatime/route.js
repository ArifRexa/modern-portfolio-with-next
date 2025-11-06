// src/app/api/wakatime/route.js
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Get the API key from environment variables
    const apiKey = process.env.WAKA_TIME_API_KEY;
    
    console.log('WAKA_TIME_API_KEY environment variable:', !!apiKey); // Log if exists (without exposing the key)
    
    if (!apiKey) {
      return NextResponse.json(
        { error: 'WAKA_TIME_API_KEY is not configured' },
        { status: 500 }
      );
    }

    // Encode the API key using base64 for Basic authentication (API_KEY:)
    const encodedKey = Buffer.from(`${apiKey}:`).toString('base64');
    
    console.log('Encoded Basic Auth:', `Basic ${encodedKey.substring(0, 10)}...`); // Log first 10 chars of encoded key
    
    // Construct the WakaTime API URL
    const url = 'https://wakatime.com/api/v1/users/current/summaries?start=today&end=today';
    
    // Make the request to WakaTime API with a short cache
    const response = await fetch(url, {
      headers: {
        Authorization: `Basic ${encodedKey}`,
      },
      next: { revalidate: 100 }, // Cache for 100 seconds
    });

    console.log('WakaTime API response status:', response.status);
    
    if (!response.ok) {
      console.error(`WakaTime API responded with status ${response.status}`);
      const errorText = await response.text(); // Get error details
      console.error('Error details:', errorText);
      throw new Error(`WakaTime API responded with status ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    
    // Log the full data structure for debugging
    console.log('WakaTime data received:', {
      hasData: !!data.data,
      dataLength: Array.isArray(data.data) ? data.data.length : 'Not an array',
      grandTotal: data.data[0]?.grand_total
    });
    
    // Extract today's coding time
    const codingTime = data.data[0]?.grand_total?.text || '0 mins';
    
    console.log('Extracted coding time:', codingTime);
    
    return NextResponse.json({
      codingTime,
      success: true,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error fetching WakaTime data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch WakaTime data', message: error.message },
      { status: 500 }
    );
  }
}