import React, { createContext, useContext, useEffect, useState, useRef, useCallback } from 'react';
import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword 
} from 'firebase/auth';
import { 
  ref, 
  onValue, 
  set, 
  remove,
  off 
} from 'firebase/database';
import { auth, database } from '../firebase/firebase.js';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState([]);
  const [notes, setNotes] = useState([]);
  
  // Store unsubscribe functions
  const projectUnsubscribeRef = useRef(null);
  const notesUnsubscribeRef = useRef(null);

  // Cleanup function
  const cleanupListeners = useCallback(() => {
    if (projectUnsubscribeRef.current) {
      projectUnsubscribeRef.current();
      projectUnsubscribeRef.current = null;
    }
    if (notesUnsubscribeRef.current) {
      notesUnsubscribeRef.current();
      notesUnsubscribeRef.current = null;
    }
  }, []);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      
      // Always cleanup previous listeners first
      cleanupListeners();
      
      if (currentUser) {
        // Setup projects listener
        const projectsPath = `users/${currentUser.uid}/projects`;
        projectUnsubscribeRef.current = onValue(ref(database, projectsPath), (snapshot) => {
          const data = snapshot.val();
          setProjects(data ? Object.entries(data).map(([id, project]) => ({ id, ...project })) : []);
        });
        
        // Setup notes listener
        const notesPath = `users/${currentUser.uid}/notes`;
        notesUnsubscribeRef.current = onValue(ref(database, notesPath), (snapshot) => {
          const data = snapshot.val();
          setNotes(data ? Object.entries(data).map(([id, note]) => ({ id, ...note })) : []);
        });
      } else {
        // Clear data when no user
        setProjects([]);
        setNotes([]);
      }
      
      setLoading(false);
    });

    // Cleanup on unmount
    return () => {
      unsubscribeAuth();
      cleanupListeners();
    };
  }, [cleanupListeners]);

  const login = async (email, password) => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      throw new Error('Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  const signup = async (email, password) => {
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } finally {
      setLoading(false);
    }
  };

  const addProject = async (projectData) => {
    if (!user) return;
    setLoading(true);
    try {
      const newProjectRef = ref(database, `users/${user.uid}/projects/${Date.now()}`);
      await set(newProjectRef, { ...projectData, createdAt: Date.now() });
    } finally {
      setLoading(false);
    }
  };

  const updateProject = async (projectId, projectData) => {
    if (!user) return;
    setLoading(true);
    try {
      const projectRef = ref(database, `users/${user.uid}/projects/${projectId}`);
      await set(projectRef, { ...projectData, updatedAt: Date.now() });
    } finally {
      setLoading(false);
    }
  };

  const deleteProject = async (projectId) => {
    if (!user) return;
    setLoading(true);
    try {
      const projectRef = ref(database, `users/${user.uid}/projects/${projectId}`);
      await remove(projectRef);
    } finally {
      setLoading(false);
    }
  };

  const addNote = async (noteData) => {
    if (!user) return;
    setLoading(true);
    try {
      const newNoteRef = ref(database, `users/${user.uid}/notes/${Date.now()}`);
      await set(newNoteRef, { ...noteData, createdAt: Date.now() });
    } finally {
      setLoading(false);
    }
  };

  const updateNote = async (noteId, noteData) => {
    if (!user) return;
    setLoading(true);
    try {
      const noteRef = ref(database, `users/${user.uid}/notes/${noteId}`);
      await set(noteRef, { ...noteData, updatedAt: Date.now() });
    } finally {
      setLoading(false);
    }
  };

  const deleteNote = async (noteId) => {
    if (!user) return;
    setLoading(true);
    try {
      const noteRef = ref(database, `users/${user.uid}/notes/${noteId}`);
      await remove(noteRef);
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    projects,
    notes,
    loading,
    login,
    signup,
    addProject,
    updateProject,
    deleteProject,
    addNote,
    updateNote,
    deleteNote
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
