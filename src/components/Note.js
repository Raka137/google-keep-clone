import React, { useState } from 'react';
import './Note.css';

function Note({ note, updateNote, deleteNote, togglePin }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(note.title);
  const [editContent, setEditContent] = useState(note.content);

  const handleSave = () => {
    updateNote(note.id, {
      ...note,
      title: editTitle,
      content: editContent,
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditTitle(note.title);
    setEditContent(note.content);
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      deleteNote(note.id);
    }
  };

  return (
    <div className={`note ${note.isPinned ? 'pinned' : ''}`}>
      <div className="note-pin-wrapper">
        <button
          className="note-pin"
          onClick={(e) => {
            e.stopPropagation();
            togglePin(note.id);
          }}
          title={note.isPinned ? "Unpin note" : "Pin note"}
        >
          {note.isPinned ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="gold">
              <path d="M16 12V4h1V2H7v2h1v8l-2 2v2h5.2v6h1.6v-6H18v-2z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16 12V4h1V2H7v2h1v8l-2 2v2h5.2v6h1.6v-6H18v-2z" />
            </svg>
          )}
        </button>
      </div>

      {isEditing ? (
        <div className="note-edit">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            placeholder="Title"
            className="note-edit-input"
            autoFocus
          />
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            placeholder="Take a note..."
            className="note-edit-textarea"
            rows={4}
          />
          <div className="note-edit-actions">
            <button onClick={handleSave} className="note-button note-button-save">Save</button>
            <button onClick={handleCancel} className="note-button note-button-cancel">Cancel</button>
          </div>
        </div>
      ) : (
        <div className="note-view" onClick={() => setIsEditing(true)}>
          {note.title && <h3 className="note-title">{note.title}</h3>}
          <p className="note-content">{note.content}</p>
          <div className="note-actions">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDelete();
              }}
              className="note-delete"
              title="Delete note"
            >
              <svg width="24" height="24" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Note;
