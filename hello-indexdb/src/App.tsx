// src/App.tsx
import React, { useEffect, useState } from 'react';
import './App.css';
import NoteForm from './components/NoteForm';
import NoteList from './components/NoteList';
import indexedDBService, { Note } from './services/IndexedDBService';

const App: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [dbInitialized, setDbInitialized] = useState<boolean>(false);

  // Initialize IndexedDB
  useEffect(() => {
    const initializeDB = async () => {
      try {
        const initialized = await indexedDBService.initDB();
        setDbInitialized(initialized);
      } catch (err) {
        setError(`Failed to initialize database: ${err instanceof Error ? err.message : String(err)}`);
      }
    };

    initializeDB();
  }, []);

  // Load notes when DB is initialized
  useEffect(() => {
    if (dbInitialized) {
      loadNotes();
    }
  }, [dbInitialized]);

  const loadNotes = async () => {
    setLoading(true);
    try {
      const allNotes = await indexedDBService.getAllNotes();
      setNotes(allNotes);
      setError(null);
    } catch (err) {
      setError(`Failed to load notes: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setLoading(false);
    }
  };

  const handleNoteAdded = () => {
    loadNotes();
  };

  const handleEditNote = (note: Note) => {
    setEditingNote(note);
  };

  const handleCancelEdit = () => {
    setEditingNote(null);
  };

  const handleDeleteNote = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      try {
        await indexedDBService.deleteNote(id);
        loadNotes();
      } catch (err) {
        setError(`Failed to delete note: ${err instanceof Error ? err.message : String(err)}`);
      }
    }
  };

  const handleClearAllNotes = async () => {
    if (window.confirm('Are you sure you want to delete ALL notes? This cannot be undone.')) {
      try {
        await indexedDBService.clearNotes();
        loadNotes();
      } catch (err) {
        setError(`Failed to clear notes: ${err instanceof Error ? err.message : String(err)}`);
      }
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>IndexedDB Notes App</h1>
        <p>A simple note-taking app using React, TypeScript, and IndexedDB</p>
      </header>

      <main className="app-main">
        {error && <div className="error-banner">{error}</div>}

        <section className="form-section">
          <NoteForm 
            onNoteAdded={handleNoteAdded} 
            editNote={editingNote} 
            onCancelEdit={handleCancelEdit} 
          />
        </section>

        <section className="notes-section">
          {loading ? (
            <div className="loading">Loading notes...</div>
          ) : (
            <>
              <div className="notes-header">
                <h2>Your Notes ({notes.length})</h2>
                {notes.length > 0 && (
                  <button onClick={handleClearAllNotes} className="clear-all-btn">
                    Clear All Notes
                  </button>
                )}
              </div>
              <NoteList 
                notes={notes} 
                onEdit={handleEditNote} 
                onDelete={handleDeleteNote} 
              />
            </>
          )}
        </section>
      </main>

      <footer className="app-footer">
        <p>IndexedDB Demo with React and TypeScript</p>
      </footer>
    </div>
  );
};

export default App;