import React, { useState } from 'react';
import './Note.css';

const COLORS = [
  "#fff",
  "#ffeb3b", 
  "#ffc107",
  "#ff8a65",
  "#aed581", 
  "#80deea",
  "#b39ddb",
  "#f8bbd0",
];

function Note({ note, updateNote, deleteNote, togglePin }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(note.title);
  const [editContent, setEditContent] = useState(note.content);
  const [editColor, setEditColor] = useState(note.color || '#fff');

  const handleSave = () => {
    updateNote(note.id, {
      ...note,
      title: editTitle,
      content: editContent,
      color: editColor,
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditTitle(note.title);
    setEditContent(note.content);
    setEditColor(note.color || '#fff');
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      deleteNote(note.id);
    }
  };

  const handleColorChange = (color) => {
    if (isEditing) {
      setEditColor(color);
    } else {
      updateNote(note.id, { ...note, color });
    }
  };

  return (
    <div 
      className={`note ${note.isPinned ? 'pinned' : ''}`}
      style={{ backgroundColor: isEditing ? editColor : note.color || '#fff' }}
    >
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
          <div className="color-palette">
            {COLORS.map((color) => (
              <button
                key={color}
                className={`color-swatch ${color === editColor ? 'selected' : ''}`}
                style={{ backgroundColor: color }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleColorChange(color);
                }}
                title={`Change to ${color}`}
              />
            ))}
          </div>
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
            <div className="color-palette small">
              {COLORS.map((color) => (
                <button
                  key={color}
                  className={`color-swatch ${color === (note.color || '#fff') ? 'selected' : ''}`}
                  style={{ backgroundColor: color }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleColorChange(color);
                  }}
                  title={`Change to ${color}`}
                />
              ))}
            </div>
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