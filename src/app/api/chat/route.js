import { NextResponse } from 'next/server';
import supabase from '@/utils/supabaseClient';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const isAdmin = searchParams.get('admin') === 'true';

    let { data: onlineUsers, error } = await supabase
      .from('online_users');
    
    if (isAdmin) {
      // For admin, get all users (both online and offline)
      const { data: allUsers, error: usersError } = await supabase
        .from('online_users')
        .select('*')
        .order('last_seen', { ascending: false }); // Order by last seen, newest first

      if (usersError) {
        console.error('Error fetching all users:', usersError);
        return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
      }

      onlineUsers = allUsers || [];
    } else {
      // For visitors, get only online users
      const { data: onlineData, error: onlineError } = await supabase
        .from('online_users')
        .select('*')
        .eq('is_online', true)
        .gt('last_seen', new Date(Date.now() - 5 * 60 * 1000).toISOString()); // Last 5 minutes

      if (onlineError) {
        console.error('Error fetching online users:', onlineError);
        return NextResponse.json({ error: 'Failed to fetch online users' }, { status: 500 });
      }

      onlineUsers = onlineData || [];
    }

    if (error) {
      console.error('Error fetching online users:', error);
      return NextResponse.json({ error: 'Failed to fetch online users' }, { status: 500 });
    }

    let recentMessages = [];
    
    if (isAdmin) {
      // For admin, get all messages in ascending order (oldest first) so newest appears at bottom
      const { data: messagesData, error: messagesError } = await supabase
        .from('user_messages')
        .select('*')
        .order('created_at', { ascending: true })
        .limit(100); // Admin gets more messages

      if (messagesError) {
        console.error('Error fetching admin messages:', messagesError);
        return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 });
      }
      
      recentMessages = messagesData || [];
    } else {
      // For visitors, get only messages for their specific session
      const visitorSessionId = searchParams.get('visitorSessionId');
      if (visitorSessionId) {
        // Get messages where visitor_session_id matches their session
        const { data: messagesData, error: messagesError } = await supabase
          .from('user_messages')
          .select('*')
          .eq('visitor_session_id', visitorSessionId)
          .order('created_at', { ascending: true })
          .limit(50);

        if (messagesError) {
          console.error('Error fetching visitor messages:', messagesError);
          return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 });
        }
        
        recentMessages = messagesData || [];
      } else {
        // If no session ID provided, return empty array
        recentMessages = [];
      }
    }

    // Get unread message count for visitor (messages from admin to this session)
    let unreadCount = 0;
    if (!isAdmin && typeof window !== 'undefined') {
      // This is tricky in API route since we don't have session context
      // We'll handle unread counts on the frontend based on last read time
    }

    return NextResponse.json({
      onlineUsers: onlineUsers || [],
      messages: recentMessages,
      unreadCount: unreadCount
    });
  } catch (error) {
    console.error('Error in GET chat data:', error);
    return NextResponse.json({ error: 'Failed to fetch chat data' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { action, sessionId, message, username, pageViewed } = body;

    if (action === 'update_online_status') {
      // Update or insert online user
      const { data, error } = await supabase
        .from('online_users')
        .upsert({
          session_id: sessionId,
          username: username || 'Anonymous Visitor',
          page_viewed: pageViewed || '/',
          last_seen: new Date().toISOString(),
          is_online: true
        }, { onConflict: 'session_id' });

      if (error) {
        console.error('Error updating online status:', error);
        return NextResponse.json({ error: 'Failed to update online status' }, { status: 500 });
      }

      return NextResponse.json({ success: true });
    } else if (action === 'send_message') {
      // Save message
      const { data, error } = await supabase
        .from('user_messages')
        .insert({
          visitor_session_id: sessionId,
          sender_type: body.senderType || 'visitor', // 'visitor' or 'admin'
          message: message
        });

      if (error) {
        console.error('Error sending message:', error);
        return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
      }

      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }
  } catch (error) {
    console.error('Error in POST chat:', error);
    return NextResponse.json({ error: 'Failed to process chat request' }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('sessionId');

    if (!sessionId) {
      return NextResponse.json({ error: 'Session ID required' }, { status: 400 });
    }

    // Mark user as offline
    const { error } = await supabase
      .from('online_users')
      .update({ is_online: false })
      .eq('session_id', sessionId);

    if (error) {
      console.error('Error updating offline status:', error);
      return NextResponse.json({ error: 'Failed to update offline status' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in DELETE chat:', error);
    return NextResponse.json({ error: 'Failed to process chat request' }, { status: 500 });
  }
}