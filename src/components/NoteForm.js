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
    const [color, setColor] = useState('#fff');
    const [image, setImage] = useState(''); // <- buat nyimpen gambar base64

    useEffect(() => {
        const savedDraft = localStorage.getItem('noteDraft');
        if (savedDraft) {
            const draft = JSON.parse(savedDraft);
            setTitle(draft.title || '');
            setContent(draft.content || '');
            setColor(draft.color || '#fff');
            if (draft.title || draft.content) setIsExpanded(true);
        }
    }, []);

    useEffect(() => {
        const draft = { title, content, color };
        localStorage.setItem('noteDraft', JSON.stringify(draft));
    }, [title, content, color]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (title.trim() || content.trim() || image) {
            addNote({ title, content, color, image }); // include image di sini
            setTitle('');
            setContent('');
            setColor('#fff');
            setImage('');
            setIsExpanded(false);
            localStorage.removeItem('noteDraft');
        }
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => setImage(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const handleExpand = () => setIsExpanded(true);

    const handleClose = () => {
        if (!title.trim() && !content.trim()) {
            setIsExpanded(false);
            setColor('#fff');
            localStorage.removeItem('noteDraft');
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

                {image && (
                    <div className="note-image-preview">
                        <img src={image} alt="preview" className="uploaded-image" />
                    </div>
                )}

                {isExpanded && (
                    <div className="note-form-actions">
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
                            <label className="note-upload-label">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
                                </svg>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="note-upload-input"
                                />
                            </label>

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
