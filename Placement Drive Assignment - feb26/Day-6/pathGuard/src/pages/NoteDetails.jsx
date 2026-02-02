import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";  // ✅ Use context instead of direct Firebase
import { useEffect, useState } from "react";

export default function NoteDetails() {
  const { noteId } = useParams();
  const navigate = useNavigate();
  const { user, notes, updateNote, deleteNote } = useAuth();
  const [editingTitle, setEditingTitle] = useState(false);
  const [editingContent, setEditingContent] = useState(false);
  const [editedNote, setEditedNote] = useState({ title: '', content: '' });

  const note = notes.find(n => n.id === noteId);

  useEffect(() => {
    localStorage.setItem('lastSection', 'notes');
    localStorage.setItem('lastItem', noteId);
  }, [noteId]);

  useEffect(() => {
    if (note) {
      setEditedNote({ title: note.title || '', content: note.content || '' });
    }
  }, [note]);

  if (!note) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <p>Note not found</p>
      </div>
    );
  }

  const handleTitleChange = (e) => {
    setEditedNote({ ...editedNote, title: e.target.value });
    updateNote(noteId, { ...note, title: e.target.value });
  };

  const handleContentChange = (e) => {
    setEditedNote({ ...editedNote, content: e.target.value });
    updateNote(noteId, { ...note, content: e.target.value });
  };

  const handleDelete = () => {
    if (window.confirm('Delete this note?')) {
      deleteNote(noteId);
      navigate('/notes');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-start mb-8">
        <button 
          onClick={() => navigate('/notes')}
          className="text-blue-500 hover:text-blue-700 mb-4 inline-block font-medium"
        >
          ← Back to Notes
        </button>
        <button
          onClick={handleDelete}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 font-medium"
        >
          Delete Note
        </button>
      </div>

      <div className="bg-white p-8 rounded-xl shadow-lg">
        <input
          value={editedNote.title}
          onChange={handleTitleChange}
          className="w-full p-4 border border-gray-300 rounded-lg text-3xl font-bold mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Note title..."
        />
        
        <textarea
          value={editedNote.content}
          onChange={handleContentChange}
          className="w-full p-4 border border-gray-300 rounded-lg h-96 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-vertical"
          placeholder="Write your note here..."
        />
        
        {note.createdAt && (
          <p className="text-sm text-gray-500 mt-4">
            Created: {new Date(note.createdAt).toLocaleString()}
          </p>
        )}
      </div>
    </div>
  );
}
