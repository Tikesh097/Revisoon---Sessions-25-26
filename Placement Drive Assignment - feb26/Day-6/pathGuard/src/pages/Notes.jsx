import { ref, onValue, push } from "firebase/database";
import { database } from "../firebase/firebase.js";  
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Notes() {
  const { user, notes, addNote: contextAddNote } = useAuth();  
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('lastSection', 'notes');
    localStorage.removeItem('lastItem');
  }, []);

  const handleAddNote = () => {
    contextAddNote({  // 
      title: "New Note",
      content: "Write something..."
    });
  };

  return (
    <>
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Notes</h1>
        
        <button 
          onClick={handleAddNote}
          className="mb-8 bg-blue-600 text-white py-3 px-6 rounded-xl font-bold hover:bg-blue-800"
        >
          Add Note
        </button>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notes.map(([id, note]) => (
            <div 
              key={id} 
              onClick={() => navigate(`/notes/${id}`)}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all cursor-pointer"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-2">{note.title}</h3>
              <p className="text-gray-600">{note.content?.substring(0, 100)}...</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
