// app/admin/chat/page.jsx
'use client';
import { useState, useEffect, useRef } from 'react';
import supabase from '@/utils/supabaseClient';

const AdminChatPage = () => {
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [allMessages, setAllMessages] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userMessages, setUserMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const messagesEndRef = useRef(null);

  // Function to fetch all data
  const fetchAllData = async () => {
    try {
      // Fetch data from the API with admin flag
      const response = await fetch('/api/chat?admin=true');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Separate online users and messages
      setOnlineUsers(data.onlineUsers || []);
      setAllMessages(data.messages || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Function to load messages for a specific user
  const loadUserMessages = async (session_id) => {
    try {
      const { data, error } = await supabase
        .from('user_messages')
        .select('*')
        .eq('visitor_session_id', session_id)
        .order('created_at', { ascending: true });

      if (error) throw error;

      setUserMessages(data || []);
      const user = onlineUsers.find(u => u.session_id === session_id);
      setSelectedUser(user);
    } catch (error) {
      console.error('Error loading user messages:', error);
    }
  };

  // Function to send a message to a user
  const sendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || !selectedUser) return;

    try {
      const { error } = await supabase
        .from('user_messages')
        .insert({
          visitor_session_id: selectedUser.session_id,
          sender_type: 'admin',
          message: inputMessage
        });

      if (!error) {
        setInputMessage('');
        // Refresh messages
        await loadUserMessages(selectedUser.session_id);
        await fetchAllData(); // Refresh all data
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  useEffect(() => {
    fetchAllData().then(() => {
      setIsLoading(false);
    });

    // Set up real-time updates
    const channel = supabase
      .channel('chat-updates')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'user_messages',
        },
        (payload) => {
          fetchAllData(); // Refresh data when new message arrives
          if (selectedUser && payload.new.visitor_session_id === selectedUser.session_id) {
            loadUserMessages(selectedUser.session_id); // Refresh specific user messages
          }
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'online_users',
        },
        (payload) => {
          fetchAllData(); // Refresh online users
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  useEffect(() => {
    if (selectedUser) {
      loadUserMessages(selectedUser.session_id);
    }
  }, [selectedUser]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [userMessages]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 text-gray-200 p-6">
        <h1 className="text-2xl font-bold mb-6">Admin Chat Dashboard</h1>
        <div className="text-center py-12">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Chat Dashboard</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Online Users Panel */}
        <div className="lg:col-span-1 bg-gray-800 rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-4 flex items-center">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
            Online Visitors ({onlineUsers.length})
          </h2>
          
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {onlineUsers.length === 0 ? (
              <p className="text-gray-500 text-sm">No visitors online</p>
            ) : (
              onlineUsers.map((user) => (
                <div
                  key={user.session_id}
                  onClick={() => loadUserMessages(user.session_id)}
                  className={`p-3 rounded-lg cursor-pointer transition-colors ${
                    selectedUser?.session_id === user.session_id
                      ? 'bg-blue-700/50 border border-blue-500'
                      : 'bg-gray-700/50 hover:bg-gray-700'
                  }`}
                >
                  <div className="font-medium">{user.username}</div>
                  <div className="text-xs text-gray-400 truncate">{user.page_viewed}</div>
                  <div className="text-xs text-gray-500">
                    {new Date(user.last_seen).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Chat Panel */}
        <div className="lg:col-span-3 bg-gray-800 rounded-lg flex flex-col">
          {selectedUser ? (
            <>
              <div className="p-4 border-b border-gray-700">
                <h2 className="text-lg font-semibold">
                  Chat with {selectedUser.username}
                  <span className="text-xs text-gray-400 ml-2">
                    (on {selectedUser.page_viewed})
                  </span>
                </h2>
              </div>
              
              {/* Messages */}
              <div className="flex-1 p-4 overflow-y-auto max-h-96">
                {userMessages.length === 0 ? (
                  <div className="text-center text-gray-500 py-8">No messages yet</div>
                ) : (
                  <div className="space-y-3">
                    {userMessages.map((msg, index) => (
                      <div
                        key={index}
                        className={`p-3 rounded-lg max-w-[80%] ${
                          msg.sender_type === 'admin'
                            ? 'bg-blue-800/30 text-blue-100 ml-auto'
                            : 'bg-gray-700 text-gray-200'
                        }`}
                      >
                        <div className="text-xs text-gray-400 mb-1">
                          {msg.sender_type === 'admin' ? 'You (Admin)' : selectedUser.username}
                        </div>
                        <div className="text-sm">{msg.message}</div>
                        <div className="text-xs text-gray-500 mt-1">
                          {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                )}
              </div>
              
              {/* Message Input */}
              <form onSubmit={sendMessage} className="p-4 border-t border-gray-700">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 bg-gray-700 text-gray-200 px-3 py-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  <button
                    type="submit"
                    disabled={!inputMessage.trim()}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Send
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center p-8">
              <div className="text-center text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-4">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                <p>Select a visitor to start chatting</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminChatPage;