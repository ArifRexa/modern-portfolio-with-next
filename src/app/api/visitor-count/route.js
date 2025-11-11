import { NextResponse } from 'next/server';
import supabase from '@/utils/supabaseClient';

export async function GET(request) {
  try {
    // Get the current visitor count
    const { data, error } = await supabase
      .from('visitor_stats')
      .select('count')
      .eq('id', 1)
      .single();

    if (error && error.code !== 'PGRST116') { // PGRST116 means no rows found
      console.error('Error fetching visitor count:', error);
      return NextResponse.json({ error: 'Failed to fetch visitor count' }, { status: 500 });
    }

    const currentCount = data?.count || 0;

    return NextResponse.json({ count: currentCount });
  } catch (error) {
    console.error('Error in GET visitor count:', error);
    return NextResponse.json({ error: 'Failed to fetch visitor count' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    // Increment visitor count by first checking if the record exists
    const { data: existingData, error: selectError } = await supabase
      .from('visitor_stats')
      .select('count')
      .eq('id', 1)
      .single();

    let newCount;
    
    if (selectError && selectError.code === 'PGRST116') {
      // Record doesn't exist, insert a new one with count = 1
      const { data, error: insertError } = await supabase
        .from('visitor_stats')
        .insert([{ id: 1, count: 1 }])
        .select('count')
        .single();
      
      if (insertError) {
        console.error('Error inserting visitor count:', insertError);
        return NextResponse.json({ error: 'Failed to update visitor count' }, { status: 500 });
      }
      
      newCount = data.count;
    } else if (selectError) {
      console.error('Error selecting visitor count:', selectError);
      return NextResponse.json({ error: 'Failed to update visitor count' }, { status: 500 });
    } else {
      // Record exists, increment the count by 1
      const { data, error: updateError } = await supabase
        .from('visitor_stats')
        .update({ count: existingData.count + 1 })
        .eq('id', 1)
        .select('count')
        .single();
      
      if (updateError) {
        console.error('Error updating visitor count:', updateError);
        return NextResponse.json({ error: 'Failed to update visitor count' }, { status: 500 });
      }
      
      newCount = data.count;
    }

    return NextResponse.json({ count: newCount });
  } catch (error) {
    console.error('Error in POST visitor count:', error);
    return NextResponse.json({ error: 'Failed to update visitor count' }, { status: 500 });
  }
}