// src/Components/Note/NoteSection.jsx
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import Swal from 'sweetalert2';

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const NoteSection = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentNote, setCurrentNote] = useState({
    id: null,
    name: '',
    phone: '',
    email: '',
    meetingTime: '',
    additionalNotes: ''
  });
  const [editing, setEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Load notes from Supabase on component mount
  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('user_notes')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      // Map Supabase data to our format
      const mappedNotes = data.map(note => ({
        id: note.id,
        name: note.name || '',
        phone: note.phone || '',
        email: note.email || '',
        meetingTime: note.meeting_time || '',
        additionalNotes: note.additional_notes || ''
      }));
      
      setNotes(mappedNotes);
    } catch (err) {
      setError(err.message);
      console.error('Error loading notes:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentNote(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    try {
      if (editing && currentNote.id) {
        // Update existing note
        const { error } = await supabase
          .from('user_notes')
          .update({
            name: currentNote.name,
            phone: currentNote.phone,
            email: currentNote.email,
            meeting_time: currentNote.meetingTime,
            additional_notes: currentNote.additionalNotes,
            updated_at: new Date().toISOString()
          })
          .eq('id', currentNote.id);

        if (error) throw error;
      } else {
        // Add new note
        const { error } = await supabase
          .from('user_notes')
          .insert([{
            name: currentNote.name,
            phone: currentNote.phone,
            email: currentNote.email,
            meeting_time: currentNote.meetingTime,
            additional_notes: currentNote.additionalNotes,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }]);

        if (error) throw error;
      }
      
      resetForm();
      await loadNotes(); // Refresh the list
    } catch (err) {
      setError(err.message);
      console.error('Error saving note:', err);
    }
  };

  const handleEdit = (note) => {
    setCurrentNote(note);
    setEditing(true);
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      try {
        const { error } = await supabase
          .from('user_notes')
          .delete()
          .eq('id', id);

        if (error) throw error;
        
        if (currentNote.id === id) {
          resetForm();
        }
        
        await loadNotes(); // Refresh the list
        
        Swal.fire({
          title: 'Deleted!',
          text: 'The note has been deleted.',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false
        });
      } catch (err) {
        setError(err.message);
        console.error('Error deleting note:', err);
        
        Swal.fire({
          title: 'Error!',
          text: 'There was an error deleting the note.',
          icon: 'error'
        });
      }
    }
  };

  const resetForm = () => {
    setCurrentNote({
      id: null,
      name: '',
      phone: '',
      email: '',
      meetingTime: '',
      additionalNotes: ''
    });
    setEditing(false);
  };

  const handleNewNote = () => {
    resetForm();
  };

  // Filter notes based on search term
  const filteredNotes = notes.filter(note => 
    note.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.additionalNotes.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="bg-gray-700 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-gray-300 mb-4">Notes</h3>
        <p className="text-gray-400">Loading notes...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-700 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-gray-300 mb-4">Notes</h3>
        <p className="text-red-400">Error: {error}</p>
        <button
          onClick={loadNotes}
          className="mt-2 text-sm bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-700 rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-300">Notes</h3>
        <div className="flex space-x-2">
          <button
            onClick={handleNewNote}
            className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded transition-colors"
          >
            New Note
          </button>
        </div>
      </div>

      {/* Search bar */}
      <div className="mb-4">
        <label className="input flex items-center gap-2 w-full bg-gray-600 border border-gray-500 rounded px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-blue-500">
          <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input
            type="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search notes..."
            className="flex-1 bg-transparent focus:outline-none text-white"
          />
        </label>
      </div>

      <form onSubmit={(e) => { e.preventDefault(); handleSave(); }} className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="block text-sm text-gray-300 mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={currentNote.name}
              onChange={handleInputChange}
              className="w-full bg-gray-600 border border-gray-500 rounded px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Enter name"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">Phone</label>
            <input
              type="text"
              name="phone"
              value={currentNote.phone}
              onChange={handleInputChange}
              className="w-full bg-gray-600 border border-gray-500 rounded px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Enter phone number"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">Email</label>
            <input
              type="text"
              name="email"
              value={currentNote.email}
              onChange={handleInputChange}
              className="w-full bg-gray-600 border border-gray-500 rounded px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Enter email address"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">Meeting Time</label>
            <input
              type="datetime-local"
              name="meetingTime"
              value={currentNote.meetingTime}
              onChange={handleInputChange}
              className="w-full bg-gray-600 border border-gray-500 rounded px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="mt-3">
          <label className="block text-sm text-gray-300 mb-1">Additional Notes</label>
          <textarea
            name="additionalNotes"
            value={currentNote.additionalNotes}
            onChange={handleInputChange}
            rows="3"
            className="w-full bg-gray-600 border border-gray-500 rounded px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Add any additional notes..."
          />
        </div>

        <div className="flex space-x-2 pt-2">
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm transition-colors"
          >
            {editing ? 'Update Note' : 'Save Note'}
          </button>
          {editing && (
            <button
              type="button"
              onClick={resetForm}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded text-sm transition-colors"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Display all saved notes in table format */}
      <div className="mt-4">
        <h4 className="text-md font-medium text-gray-300 mb-2">Saved Notes ({filteredNotes.length})</h4>
        
        {filteredNotes.length === 0 ? (
          <p className="text-gray-400 italic">No notes saved yet</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-gray-600 rounded-lg overflow-hidden">
              <thead className="bg-gray-700">
                <tr>
                  <th className="py-2 px-3 text-left text-sm font-medium text-gray-300">Name</th>
                  <th className="py-2 px-3 text-left text-sm font-medium text-gray-300">Phone</th>
                  <th className="py-2 px-3 text-left text-sm font-medium text-gray-300">Email</th>
                  <th className="py-2 px-3 text-left text-sm font-medium text-gray-300">Meeting Time</th>
                  <th className="py-2 px-3 text-left text-sm font-medium text-gray-300">Notes</th>
                  <th className="py-2 px-3 text-right text-sm font-medium text-gray-300">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-500">
                {filteredNotes.map((note, index) => (
                  <tr key={note.id} className={index % 2 === 0 ? 'bg-gray-600' : 'bg-gray-650'}>
                    <td className="py-2 px-3 text-sm text-white">{note.name || '-'}</td>
                    <td className="py-2 px-3 text-sm text-white">{note.phone || '-'}</td>
                    <td className="py-2 px-3 text-sm text-white">{note.email || '-'}</td>
                    <td className="py-2 px-3 text-sm text-white">
                      {note.meetingTime ? new Date(note.meetingTime).toLocaleString() : '-'}
                    </td>
                    <td className="py-2 px-3 text-sm text-white max-w-xs truncate">{note.additionalNotes || '-'}</td>
                    <td className="py-2 px-3 text-right">
                      <div className="flex justify-end space-x-1">
                        <button
                          onClick={() => handleEdit(note)}
                          className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(note.id)}
                          className="text-xs bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default NoteSection;