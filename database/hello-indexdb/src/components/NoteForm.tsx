// src/components/NoteForm.tsx
import React, { useState } from 'react';
import indexedDBService, { Note } from '../services/IndexedDBService';

interface NoteFormProps {
  onNoteAdded: () => void;
  editNote?: Note | null;
  onCancelEdit?: () => void;
}

const NoteForm: React.FC<NoteFormProps> = ({ onNoteAdded, editNote, onCancelEdit }) => {
  const [title, setTitle] = useState(editNote?.title || '');
  const [content, setContent] = useState(editNote?.content || '');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!title.trim() || !content.trim()) {
      setError('Title and content are required');
      return;
    }

    try {
      if (editNote && editNote.id) {
        // Update existing note
        await indexedDBService.updateNote({
          id: editNote.id,
          title,
          content,
          createdAt: editNote.createdAt
        });
      } else {
        // Add new note
        await indexedDBService.addNote({
          title,
          content,
          createdAt: new Date()
        });
      }

      // Reset form
      setTitle('');
      setContent('');
      onNoteAdded();
      
      if (editNote && onCancelEdit) {
        onCancelEdit();
      }
    } catch (err) {
      setError(`Failed to ${editNote ? 'update' : 'add'} note: ${err instanceof Error ? err.message : String(err)}`);
    }
  };

  return (
    <div className="note-form">
      <h2>{editNote ? 'Edit Note' : 'Add New Note'}</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter note title"
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">Content:</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Enter note content"
            rows={5}
          />
        </div>
        <div className="form-actions">
          <button type="submit">{editNote ? 'Update Note' : 'Add Note'}</button>
          {editNote && onCancelEdit && (
            <button type="button" onClick={onCancelEdit}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default NoteForm;