// app/admin/chat/page.jsx
'use client';
import { useState, useEffect, useRef } from 'react';
import { createClient } from '@supabase/supabase-js';
import NoteSection from '@/Components/Note/NoteSection';

// Initialize Supabase client for client-side operations
const supabaseClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// Helper function to format time ago
const formatTimeAgo = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now - date) / 1000);

  let interval = seconds / 31536000; // years
  if (interval > 1) return Math.floor(interval) + "y ago";

  interval = seconds / 2592000; // months
  if (interval > 1) return Math.floor(interval) + "mo ago";

  interval = seconds / 86400; // days
  if (interval > 1) return Math.floor(interval) + "d ago";

  interval = seconds / 3600; // hours
  if (interval > 1) return Math.floor(interval) + "h ago";

  interval = seconds / 60; // minutes
  if (interval > 1) return Math.floor(interval) + "m ago";

  return Math.floor(seconds) + "s ago";
};

// Helper function to determine if user is online (last seen within 5 minutes)
const isUserOnline = (lastSeen) => {
  const now = new Date();
  const lastSeenDate = new Date(lastSeen);
  const timeDiff = (now - lastSeenDate) / 1000; // difference in seconds
  return timeDiff < 5 * 60; // 5 minutes
};

const AdminChatPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  // Auth state for the chat interface
  const [allUsers, setAllUsers] = useState([]); // Changed from onlineUsers to allUsers to store all users (online and offline)
  const [allMessages, setAllMessages] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userMessages, setUserMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [lastSeenTimes, setLastSeenTimes] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('admin_last_seen_times');
      return saved ? JSON.parse(saved) : {};
    }
    return {};
  }); // Track last seen time for each user
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const messagesEndRef = useRef(null);

  // Function to generate a session ID that matches the ChatWidget pattern
  const generateSessionId = () => {
    if (typeof window !== 'undefined') {
      // Check if there's already a session ID from the ChatWidget
      const existingSessionId = localStorage.getItem('chat_session_id');
      if (existingSessionId) {
        return existingSessionId;
      } else {
        // Create a new session ID using the same pattern as ChatWidget
        const timestamp = Date.now();
        const random1 = Math.random().toString(36).substr(2, 5);
        const random2 = Math.random().toString(36).substr(2, 5);
        const newSessionId = `session_${timestamp}_${random1}_${random2}`;
        localStorage.setItem('chat_session_id', newSessionId);
        return newSessionId;
      }
    }
    return null;
  };

  // Check authentication status on component mount
  useEffect(() => {
    const checkAuth = () => {
      const storedAuth = sessionStorage.getItem('adminAuth');
      if (storedAuth === 'true') {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    };

    checkAuth();

    // Add storage event listener to handle auth changes from other tabs
    const handleStorageChange = () => {
      checkAuth();
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError('');

    try {
      // Call the login API to verify credentials
      const response = await fetch('/api/admin-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        // Store auth status
        sessionStorage.setItem('adminAuth', 'true');
        setIsAuthenticated(true);
        setLoginError('');
      } else {
        setLoginError(data.error || 'Invalid email or password');
      }
    } catch (err) {
      setLoginError('Login failed');
      console.error(err);
    }

    setLoginLoading(false);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('adminAuth');
    setIsAuthenticated(false);
    setEmail('');
    setPassword('');
  };

  // Function to delete a user's entire chat history
  const deleteUserChat = async (sessionId) => {
    try {
      // Delete messages for this session ID
      const { error: messagesError } = await supabaseClient
        .from('user_messages')
        .delete()
        .eq('visitor_session_id', sessionId);

      if (messagesError) {
        console.error('Error deleting messages:', messagesError);
        return;
      }

      // Also delete user from online_users table
      await supabaseClient
        .from('online_users')
        .delete()
        .eq('session_id', sessionId);

      // Refresh all data after deletion
      await fetchAllData();
      
      if (selectedUser && selectedUser.session_id === sessionId) {
        // If we deleted the currently selected user, clear selection
        setSelectedUser(null);
        setUserMessages([]);
      }
      
      setShowDeleteConfirm(null);
    } catch (error) {
      console.error('Error deleting user chat:', error);
    }
  };

  // Function to fetch all data (only when authenticated)
  const fetchAllData = async () => {
    try {
      // Fetch data from the API with admin flag
      const response = await fetch('/api/chat?admin=true');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Get the visitor's session ID to filter out
      const visitorSessionId = localStorage.getItem('chat_session_id');
      
      // Filter out the admin's own session from all users
      const filteredAllUsers = data.onlineUsers.filter(user => {
        // Filter out the visitor's own session (which would be the admin's session when they visited other pages)
        return user.session_id !== visitorSessionId;
      });

      // Separate all users and messages
      setAllUsers(filteredAllUsers || []);
      setAllMessages(data.messages || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Function to load messages for a specific user
  const loadUserMessages = async (session_id) => {
    try {
      const { data, error } = await supabaseClient
        .from('user_messages')
        .select('*')
        .eq('visitor_session_id', session_id)
        .order('created_at', { ascending: true });

      if (error) throw error;

      setUserMessages(data || []);
      const user = allUsers.find(u => u.session_id === session_id);
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
      const { error } = await supabaseClient
        .from('user_messages')
        .insert({
          visitor_session_id: selectedUser.session_id,
          sender_type: 'admin',
          message: inputMessage
        });

      if (!error) {
        setInputMessage('');
        // Mark this user's messages as seen when admin sends a reply
        const newLastSeenTimes = {
          ...lastSeenTimes,
          [selectedUser.session_id]: new Date().toISOString()
        };
        setLastSeenTimes(newLastSeenTimes);
        localStorage.setItem('admin_last_seen_times', JSON.stringify(newLastSeenTimes));
        // Refresh messages
        await loadUserMessages(selectedUser.session_id);
        await fetchAllData(); // Refresh all data

        // Scroll to bottom after message is sent and loaded
        setTimeout(() => {
          messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      // Generate session ID to identify potential admin visitor session
      const visitorSessionId = generateSessionId();
      
      fetchAllData().then(() => {
        setIsLoading(false);
      });

      // Set up real-time updates (only if realtime is enabled in Supabase)
      const channel = supabaseClient
        .channel('chat-updates')
        .on(
          'postgres_changes',
          {
            event: 'INSERT',
            schema: 'public',
            table: 'user_messages',
          },
          (payload) => {
            fetchAllData(); // Refresh all data for any new message
            // If we have a selected user and the new message is from them, refresh their messages
            if (selectedUser && payload.new.visitor_session_id === selectedUser.session_id) {
              loadUserMessages(selectedUser.session_id);
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
            fetchAllData(); // Refresh all users
          }
        )
        .subscribe();

      // Set up a periodic refresh every 5 seconds as primary update method
      const intervalId = setInterval(() => {
        fetchAllData();
        // If we have a selected user, also refresh their specific messages
        if (selectedUser) {
          loadUserMessages(selectedUser.session_id);
        }
      }, 5000); // Refresh every 5 seconds for active updates

      return () => {
        supabaseClient.removeChannel(channel);
        clearInterval(intervalId);
      };
    }
  }, [isAuthenticated, selectedUser]);

  useEffect(() => {
    if (selectedUser && isAuthenticated) {
      loadUserMessages(selectedUser.session_id);
    }
  }, [selectedUser, isAuthenticated]);

  // Removed auto-scroll functionality to prevent unwanted scrolling

  // Show login form if not authenticated
  if (isAuthenticated === false) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
        <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-lg p-8">
          <h1 className="text-2xl font-bold text-center text-gray-200 mb-6">Admin Access</h1>

          <form onSubmit={handleLogin}>
            {loginError && <div className="mb-4 text-red-500 text-sm">{loginError}</div>}

            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-300 mb-2">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-700 text-gray-200 px-3 py-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-300 mb-2">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-700 text-gray-200 px-3 py-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loginLoading}
              className={`w-full py-2 px-4 rounded-lg text-white ${
                loginLoading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
              } transition-colors`}
            >
              {loginLoading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Show loading while checking auth
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-gray-900 text-gray-200 p-6">
        <div className="text-center py-12">Checking authentication...</div>
      </div>
    );
  }

  // Show admin chat interface if authenticated
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 text-gray-200 p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Admin Chat Dashboard</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
          >
            Logout
          </button>
        </div>
        <div className="text-center py-12">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Admin Chat Dashboard</h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
        >
          Logout
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Online Users Panel */}
        <div className="lg:col-span-1 bg-gray-800 rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-4 flex items-center">
            <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
            All Visitors ({allUsers.length}) 
            <span className="ml-2 text-sm text-gray-400">({allUsers.filter(user => isUserOnline(user.last_seen)).length} online)</span>
          </h2>

            <div className="space-y-2 max-h-96 overflow-y-auto">
            {allUsers.length === 0 ? (
              <p className="text-gray-500 text-sm">No visitors</p>
            ) : (
              allUsers.map((user) => {
                // Get the last seen time for this user, default to a very old date
                const userLastSeen = lastSeenTimes[user.session_id] ? new Date(lastSeenTimes[user.session_id]) : new Date(0);

                // Count unread messages for this user (messages that came after admin last saw them)
                const unreadCount = allMessages.filter(
                  msg => msg.visitor_session_id === user.session_id &&
                         msg.sender_type === 'visitor' && // Only visitor messages to admin
                         new Date(msg.created_at) > userLastSeen
                ).length;

                const userIsOnline = isUserOnline(user.last_seen);
                const timeAgo = formatTimeAgo(user.last_seen);

                return (
                  <div
                    key={user.session_id}
                    onClick={() => {
                      // If clicking the same user that's already selected, deselect them
                      if (selectedUser && selectedUser.session_id === user.session_id) {
                        setSelectedUser(null);
                        setUserMessages([]);
                      } else {
                        // Update last seen time when user is selected
                        const newLastSeenTimes = {
                          ...lastSeenTimes,
                          [user.session_id]: new Date().toISOString()
                        };
                        setLastSeenTimes(newLastSeenTimes);
                        localStorage.setItem('admin_last_seen_times', JSON.stringify(newLastSeenTimes));
                        loadUserMessages(user.session_id);
                        setSelectedUser(user);
                      }
                    }}
                    className={`p-3 rounded-lg cursor-pointer transition-colors relative ${
                      selectedUser?.session_id === user.session_id
                        ? 'bg-blue-700/50 border border-blue-500'
                        : 'bg-gray-700/50 hover:bg-gray-700'
                    }`}
                  >
                    <div className="font-medium">{user.username}</div>
                    <div className="text-xs text-gray-400 truncate">{user.page_viewed}</div>
                    <div className="flex items-center text-xs">
                      <div className="flex items-center mr-2">
                        <div className={`w-2 h-2 rounded-full mr-1 ${userIsOnline ? 'bg-green-500' : 'bg-gray-500'}`}></div>
                        <span>{userIsOnline ? 'Online' : 'Offline'}</span>
                      </div>
                      <span className="text-gray-500">· {timeAgo}</span>
                    </div>
                    {unreadCount > 0 && (
                      <span className="absolute top-2 right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {unreadCount}
                      </span>
                    )}
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent triggering the user selection
                        setShowDeleteConfirm(user.session_id);
                      }}
                      className="absolute top-2 right-8 text-gray-400 hover:text-red-500 text-lg"
                      aria-label="Delete chat"
                    >
                      …
                    </button>
                  </div>
                );
              })
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
      
      {/* Independent Notes Section */}
      <div className="mt-6">
        <NoteSection selectedUser={selectedUser} />
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-200 mb-4">Confirm Delete</h3>
            <p className="text-gray-400 mb-6">Are you sure you want to delete this visitor&apos;s entire chat history? This action cannot be undone.</p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="px-4 py-2 bg-gray-600 text-gray-200 rounded hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => deleteUserChat(showDeleteConfirm)}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminChatPage;