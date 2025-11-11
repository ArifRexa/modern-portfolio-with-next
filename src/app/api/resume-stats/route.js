import { NextResponse } from 'next/server';
import supabase from '@/utils/supabaseClient';

export async function GET(request) {
  try {
    // Get the current resume download count
    const { data, error } = await supabase
      .from('resume_stats')
      .select('download_count')
      .eq('id', 1)
      .single();

    if (error && error.code !== 'PGRST116') { // PGRST116 means no rows found
      console.error('Error fetching resume download count:', error);
      return NextResponse.json({ error: 'Failed to fetch download count' }, { status: 500 });
    }

    const currentDownloadCount = data?.download_count || 0;

    return NextResponse.json({ download_count: currentDownloadCount });
  } catch (error) {
    console.error('Error in GET resume download count:', error);
    return NextResponse.json({ error: 'Failed to fetch download count' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    // Increment resume download count by first checking if the record exists
    const { data: existingData, error: selectError } = await supabase
      .from('resume_stats')
      .select('download_count')
      .eq('id', 1)
      .single();

    let newDownloadCount;
    
    if (selectError && selectError.code === 'PGRST116') {
      // Record doesn't exist, insert a new one with download_count = 1
      const { data, error: insertError } = await supabase
        .from('resume_stats')
        .insert([{ id: 1, download_count: 1 }])
        .select('download_count')
        .single();
      
      if (insertError) {
        console.error('Error inserting resume download count:', insertError);
        return NextResponse.json({ error: 'Failed to update download count' }, { status: 500 });
      }
      
      newDownloadCount = data.download_count;
    } else if (selectError) {
      console.error('Error selecting resume download count:', selectError);
      return NextResponse.json({ error: 'Failed to update download count' }, { status: 500 });
    } else {
      // Record exists, increment the count by 1
      const { data, error: updateError } = await supabase
        .from('resume_stats')
        .update({ download_count: existingData.download_count + 1 })
        .eq('id', 1)
        .select('download_count')
        .single();
      
      if (updateError) {
        console.error('Error updating resume download count:', updateError);
        return NextResponse.json({ error: 'Failed to update download count' }, { status: 500 });
      }
      
      newDownloadCount = data.download_count;
    }

    return NextResponse.json({ download_count: newDownloadCount });
  } catch (error) {
    console.error('Error in POST resume download count:', error);
    return NextResponse.json({ error: 'Failed to update download count' }, { status: 500 });
  }
}