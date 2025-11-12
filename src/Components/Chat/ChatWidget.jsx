'use client';
import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

const ChatWidget = () => {
  const pathname = usePathname();

  // Hide on admin chat page
  if (pathname?.includes('/admin/chat')) {
    return null;
  }

  // Add animation styles
  if (typeof document !== 'undefined') {
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes fadeInOut {
        0% { opacity: 0; transform: translateY(10px); }
        10% { opacity: 1; transform: translateY(0); }
        90% { opacity: 1; transform: translateY(0); }
        100% { opacity: 0; transform: translateY(-10px); }
      }
    `;
    document.head.appendChild(style);
  }

  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);
  const [lastReadMessageId, setLastReadMessageId] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('chat_last_read_message_id') || '';
    }
    return '';
  });
  const [showNotification, setShowNotification] = useState(false);
  const [notificationText, setNotificationText] = useState("");
  const [sessionId] = useState(() => {
    // Generate or retrieve session ID
    if (typeof window !== 'undefined') {
      let id = localStorage.getItem('chat_session_id');
      if (!id) {
        // Create a more unique session ID using timestamp and multiple random components
        const timestamp = Date.now();
        const random1 = Math.random().toString(36).substr(2, 5);
        const random2 = Math.random().toString(36).substr(2, 5);
        id = `session_${timestamp}_${random1}_${random2}`;
        localStorage.setItem('chat_session_id', id);
      }
      return id;
    }
    return null;
  });

  const messagesEndRef = useRef(null);
  const intervalRef = useRef(null);

  // Function to scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Function to fetch chat data
  const fetchChatData = async () => {
    try {
      // Pass the session ID to the API to get only this visitor's messages
      const url = sessionId ? `/api/chat?visitorSessionId=${sessionId}` : '/api/chat';
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        const newMessages = data.messages || [];
        setOnlineUsers(data.onlineUsers || []);
        
        setMessages(newMessages);
        
        // Calculate total admin messages before update (for this session only)
        const prevAdminMessagesCount = messages.filter(msg => msg.sender_type === 'admin').length;
        
        // Calculate unread admin messages (messages that have ID greater than last read message ID)
        const currentUnreadCount = newMessages.filter(msg => 
          msg.sender_type === 'admin' && 
          (!lastReadMessageId || msg.id > lastReadMessageId)
        ).length;
        
        // Calculate total admin messages after update
        const currentAdminMessagesCount = newMessages.filter(msg => msg.sender_type === 'admin').length;
        
        // Update unread count if chat is closed (replace instead of adding)
        if (!isChatOpen) {
          setUnreadCount(currentUnreadCount);
          // Show notification if there are new admin messages
          if (currentUnreadCount > 0) {
            // Get the latest admin message to show in notification
            const latestAdminMessage = [...newMessages]
              .filter(msg => msg.sender_type === 'admin')
              .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))[0];
            
            if (latestAdminMessage) {
              setNotificationText(latestAdminMessage.message.length > 30 
                ? latestAdminMessage.message.substring(0, 30) + '...' 
                : latestAdminMessage.message);
              
              setShowNotification(true);
              
              // Hide the notification after 2 seconds
              setTimeout(() => {
                setShowNotification(false);
              }, 2000);
            }
          }
        } else {
          // If chat is open, set unread count to 0
          setUnreadCount(0);
        }
      }
    } catch (error) {
      console.error('Error fetching chat data:', error);
    }
  };

  // Function to send a message
  const sendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'send_message',
          sessionId, // This is the visitor's session ID
          message: inputMessage,
          senderType: 'visitor'
        })
      });

      if (response.ok) {
        setInputMessage('');
        // Refresh messages after sending
        setTimeout(fetchChatData, 500);
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  // Update online status
  const updateOnlineStatus = async () => {
    if (typeof window === 'undefined') return;

    try {
      await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'update_online_status',
          sessionId,
          username: username || `Visitor ${sessionId?.substr(-6)}`,
          pageViewed: window.location.pathname
        })
      });
    } catch (error) {
      console.error('Error updating online status:', error);
    }
  };

  useEffect(() => {
    if (!sessionId) return;

    // Set default username
    if (typeof window !== 'undefined') {
      const savedUsername = localStorage.getItem('chat_username');
      if (savedUsername) {
        setUsername(savedUsername);
      } else {
        const defaultName = `Visitor ${sessionId.substr(-6)}`;
        setUsername(defaultName);
        localStorage.setItem('chat_username', defaultName);
      }
    }

    // Initial data fetch
    fetchChatData().then(() => {
      setIsLoading(false);
    });

    // Update online status immediately
    updateOnlineStatus();

    // Set up periodic updates
    intervalRef.current = setInterval(() => {
      fetchChatData();
      updateOnlineStatus(); // Update status every 30 seconds
    }, 30000);

    // Cleanup function
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      // Mark as offline when leaving
      if (typeof window !== 'undefined') {
        fetch(`/api/chat?sessionId=${sessionId}`, {
          method: 'DELETE'
        }).catch(console.error);
      }
    };
  }, [sessionId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={() => {
          const willOpen = !isChatOpen;
          setIsChatOpen(willOpen);
          
          if (willOpen) {
            // When opening chat, mark all messages as read
            setUnreadCount(0);
            setShowNotification(false); // Hide notification when chat opens
            // Find the latest admin message ID and save it
            const adminMessages = messages.filter(msg => msg.sender_type === 'admin');
            if (adminMessages.length > 0) {
              // Sort by ID to get the latest one
              adminMessages.sort((a, b) => (b.id || 0) - (a.id || 0));
              const latestMessageId = adminMessages[0]?.id || '';
              setLastReadMessageId(latestMessageId);
              localStorage.setItem('chat_last_read_message_id', latestMessageId);
            }
          }
          
          // Scroll to bottom when opening the chat
          if (willOpen) {
            setTimeout(() => {
              messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
            }, 100); // Small delay to ensure DOM is updated
          }
        }}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center text-white shadow-lg transition-all duration-300 ${
          isChatOpen ? 'bg-red-500' : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
        {/* Notification popup for new messages */}
        {showNotification && (
          <div 
            className="fixed bottom-20 right-6 z-50 px-4 py-2 bg-gray-800 text-white text-sm rounded-lg shadow-lg border border-gray-700 animate-fadeInOut"
            style={{ 
              animation: 'fadeInOut 2s forwards',
              pointerEvents: 'none' // Allow clicks to pass through
            }}
          >
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5H9z" />
              </svg>
              {notificationText}
            </div>
          </div>
        )}
      </button>

      {/* Chat Window */}
      {isChatOpen && (
        <div className="fixed bottom-20 right-6 z-50 w-80 h-96 bg-gray-900 border border-gray-700 rounded-lg shadow-xl flex flex-col">
          {/* Header */}
          <div className="bg-gray-800 px-4 py-3 rounded-t-lg flex justify-between items-center border-b border-gray-700">
            <h3 className="font-semibold text-gray-200">Live Chat</h3>
            <button
              onClick={() => setIsChatOpen(false)}
              className="text-gray-400 hover:text-gray-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          </div>

          {/* Online Status */}
          <div className="bg-gray-850 px-4 py-2 border-b border-gray-700">
            <div className="flex items-center text-sm text-gray-400">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              Online
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {isLoading ? (
              <div className="text-center text-gray-500 py-8">Loading messages...</div>
            ) : messages.length === 0 ? (
              <div className="text-center text-gray-500 py-8">No messages yet. Say hello!</div>
            ) : (
              messages.map((msg, index) => {
                // Check if this message is a new admin message that arrived after the last read message
                // Only show animation if chat is closed
                const isNewMessage = !isChatOpen && msg.sender_type === 'admin' && 
                  (!lastReadMessageId || msg.id > lastReadMessageId);
                return (
                  <div
                    key={index}
                    className={`p-3 rounded-lg max-w-[80%] ${
                      msg.sender_type === 'admin'
                        ? 'bg-blue-800/30 text-blue-100 self-start ml-auto'
                        : 'bg-gray-800 text-gray-200 self-end'
                    } ${isNewMessage ? 'animate-pulse' : ''}`}
                  >
                    <div className="text-xs text-gray-400 mb-1">
                      {msg.sender_type === 'admin' ? 'Admin' : 'You'}
                    </div>
                    <div className="text-sm">{msg.message}</div>
                    <div className="text-xs text-gray-500 mt-1">
                      {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                );
              })
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={sendMessage} className="border-t border-gray-700 p-3">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 bg-gray-800 text-gray-200 px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
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
        </div>
      )}
    </>
  );
};

export default ChatWidget;