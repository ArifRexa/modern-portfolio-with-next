'use client';

import { useState, useEffect } from 'react';
import supabase from '@/utils/supabaseClient';
import NoteSection from '@/Components/Note/NoteSection';

const ContactMessagesPage = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchContactMessages();
  }, []);

  const fetchContactMessages = async () => {
    try {
      // Try to fetch from contact_messages table
      const { data, error } = await supabase
        .from('contact_messages') // Update this to your actual table name
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching contact messages:', error);
        // If the table doesn't exist, set an empty array
        if (error.code === '42P01' || error.code === '42883') { // Table doesn't exist or function doesn't exist
          setMessages([]);
          setError('Contact messages table not found. Please create the table in your database.');
        } else {
          setMessages([]);
          setError(`Error: ${error.message}`);
        }
      } else {
        setMessages(data || []);
      }
    } catch (error) {
      console.error('Error in fetchContactMessages:', error);
      setMessages([]);
      setError('An error occurred while loading messages.');
    } finally {
      setIsLoading(false);
    }
  };

  const deleteMessage = async (id) => {
    if (!window.confirm('Are you sure you want to delete this message?')) return;

    try {
      const { error } = await supabase
        .from('contact_messages')
        .delete()
        .eq('id', id);

      if (error) throw error;

      // Remove the message from the local state
      setMessages(messages.filter(msg => msg.id !== id));
      if (selectedMessage && selectedMessage.id === id) {
        setSelectedMessage(null);
      }
    } catch (error) {
      console.error('Error deleting message:', error);
      alert('Error deleting message: ' + error.message);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl text-gray-400">Loading messages...</div>
      </div>
    );
  }

  if (error && !messages.length) {
    return (
      <div className="min-h-screen bg-gray-900 text-gray-200 p-6">
        <h1 className="text-2xl font-bold mb-6">Contact Messages</h1>
        <div className="bg-gray-800 rounded-lg p-4">
          <div className="text-red-500">{error}</div>
          <div className="mt-4 text-gray-400">
            <p>This section is designed to display and manage contact form submissions.</p>
            <p className="mt-2">To use this feature, you need to:</p>
            <ul className="list-disc pl-6 mt-2">
              <li>Create a &quot;contact_messages&quot; table in your Supabase database</li>
              <li>Ensure the table has the following columns:</li>
              <ul className="list-circle pl-6 mt-1">
                <li>id (uuid or integer, primary key)</li>
                <li>name (text)</li>
                <li>email (text)</li>
                <li>subject (text)</li>
                <li>message (text)</li>
                <li>created_at (timestamp)</li>
              </ul>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 p-6">
      <h1 className="text-2xl font-bold mb-6">Contact Messages</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Messages List */}
        <div className="lg:col-span-1 bg-gray-800 rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-4">Messages ({messages.length})</h2>

          {messages.length === 0 ? (
            <p className="text-gray-500 text-sm">No messages found</p>
          ) : (
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {messages.map((message) => (
                <div
                  key={message.id}
                  onClick={() => setSelectedMessage(message)}
                  className={`p-3 rounded-lg cursor-pointer transition-colors ${
                    selectedMessage && selectedMessage.id === message.id
                      ? 'bg-blue-700/50 border border-blue-500'
                      : 'bg-gray-700/50 hover:bg-gray-700'
                  }`}
                >
                  <div className="font-medium truncate">{message.name || message.email || 'Unknown Sender'}</div>
                  <div className="text-xs text-gray-400 truncate">{message.subject || 'No Subject'}</div>
                  <div className="text-xs text-gray-500">{formatDate(message.created_at)}</div>
                  <div className="flex justify-end mt-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteMessage(message.id);
                      }}
                      className="text-red-500 hover:text-red-400 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Message Details */}
        <div className="lg:col-span-2 bg-gray-800 rounded-lg p-4">
          {selectedMessage ? (
            <div>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-bold">{selectedMessage.subject || 'No Subject'}</h2>
                  <p className="text-gray-400">From: {selectedMessage.name || 'Unknown'} ({selectedMessage.email || 'No email'})</p>
                  <p className="text-gray-400 text-sm">Date: {formatDate(selectedMessage.created_at)}</p>
                </div>
                <button
                  onClick={() => deleteMessage(selectedMessage.id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
                >
                  Delete
                </button>
              </div>

              <div className="border-t border-gray-700 pt-4">
                <h3 className="font-semibold mb-2">Message:</h3>
                <p className="whitespace-pre-wrap text-gray-300">{selectedMessage.message || selectedMessage.content || 'No message content'}</p>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center text-gray-500">
                <p>Select a message to view details</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Independent Notes Section */}
      <div className="mt-6">
        <NoteSection />
      </div>
    </div>
  );
};

export default ContactMessagesPage;