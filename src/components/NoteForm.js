import React, { useState, useEffect } from 'react';
import './NoteForm.css';

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

function NoteForm({ addNote }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [color, setColor] = useState('#fff'); // Tambah state untuk warna

    // Load draft from localStorage when component mounts
  useEffect(() => {
    const savedDraft = localStorage.getItem('noteDraft');
    if (savedDraft) {
      const draft = JSON.parse(savedDraft);
      setTitle(draft.title || '');
      setContent(draft.content || '');
      setColor(draft.color || '#fff');
      if (draft.title || draft.content) {
        setIsExpanded(true);
      }
    }
  }, []);

    useEffect(() => {
    const draft = { title, content, color };
    localStorage.setItem('noteDraft', JSON.stringify(draft));
  }, [title, content, color]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() || content.trim()) {
      addNote({ title, content, color }); // Kirim warna ke addNote
      setTitle('');
      setContent(''); 
      setColor('#fff');
      setIsExpanded(false);
      localStorage.removeItem('noteDraft'); // Tambahkan ini untuk clear draft
    }
  };
  
  const handleExpand = () => {
    setIsExpanded(true);
  };

  const handleClose = () => {
    if (!title.trim() && !content.trim()) {
      setIsExpanded(false);
      setColor('#fff');
      localStorage.removeItem('noteDraft'); // Clear draft when closing empty form
    }
  };

  return (
    <div className="note-form-container">
      <form className="note-form" onSubmit={handleSubmit} style={{ backgroundColor: color }}>
        {isExpanded && (
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="note-form-input"
            autoFocus
          />
        )}
        <textarea
          placeholder="Take a note..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onClick={handleExpand}
          className="note-form-textarea"
          rows={isExpanded ? 3 : 1}
        />
        {isExpanded && (
          <div className="note-form-actions">
            {/* Tambah palette warna */}
            <div className="color-palette">
              {COLORS.map((c) => (
                <button
                  key={c}
                  type="button"
                  className={`color-swatch ${c === color ? 'selected' : ''}`}
                  style={{ backgroundColor: c }}
                  onClick={() => setColor(c)}
                  aria-label={`Set color ${c}`}
                />
              ))}
            </div>
            <div className="button-group">
              <button type="submit" className="note-form-button">
                Add Note
              </button>
              <button 
                type="button" 
                onClick={handleClose} 
                className="note-form-button note-form-button-secondary"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}

export default NoteForm;