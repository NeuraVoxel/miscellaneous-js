// src/components/NoteList.tsx
import React from 'react';
import { Note } from '../services/IndexedDBService';

interface NoteListProps {
  notes: Note[];
  onEdit: (note: Note) => void;
  onDelete: (id: number) => void;
}

const NoteList: React.FC<NoteListProps> = ({ notes, onEdit, onDelete }) => {
  if (notes.length === 0) {
    return <div className="empty-state">No notes found. Add your first note!</div>;
  }

  const formatDate = (date: Date): string => {
    return new Date(date).toLocaleString();
  };

  return (
    <div className="note-list">
      <h2>Your Notes</h2>
      <div className="notes-container">
        {notes.map((note) => (
          <div key={note.id} className="note-card">
            <h3>{note.title}</h3>
            <p className="note-content">{note.content}</p>
            <div className="note-footer">
              <span className="note-date">Created: {formatDate(note.createdAt)}</span>
              <div className="note-actions">
                <button onClick={() => onEdit(note)} className="edit-btn">
                  Edit
                </button>
                <button onClick={() => note.id && onDelete(note.id)} className="delete-btn">
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NoteList;