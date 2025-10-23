import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import NoteForm from "./components/NoteForm";
import NotesList from "./components/NotesList";
import "./App.css";

function App() {
  const [notes, setNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const savedNotes = localStorage.getItem("keepNotes");
    if (savedNotes) {
      const parsed = JSON.parse(savedNotes);
      // Pastikan setiap note punya properti color (fallback ke putih)
      const withColor = parsed.map((n) => ({ color: "#fff", ...n }));
      setNotes(withColor);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("keepNotes", JSON.stringify(notes));
  }, [notes]);

  const addNote = (noteData) => {
    const newNote = {
      id: Date.now(),
      title: noteData.title,
      content: noteData.content,
      color: noteData.color || "#fff",
        image: noteData.image || null,  
      createdAt: new Date().toISOString(),
      isPinned: false,
    };
    setNotes([newNote, ...notes]);
  };

  const updateNote = (id, updatedNote) => {
    setNotes(notes.map((note) => (note.id === id ? updatedNote : note)));
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const togglePin = (id) => {
    setNotes(
      notes.map((note) =>
        note.id === id ? { ...note, isPinned: !note.isPinned } : note
      )
    );
  };

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedNotes = [
    ...filteredNotes.filter((n) => n.isPinned),
    ...filteredNotes.filter((n) => !n.isPinned),
  ];

  return (
    <div className="app">
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <main className="app-main">
        <NoteForm addNote={addNote} />
        <NotesList
          notes={sortedNotes}
          updateNote={updateNote}
          deleteNote={deleteNote}
          togglePin={togglePin}
          setSelectedImage={setSelectedImage}
        />
      </main>
        {selectedImage && (
            <div
                className="note-modal"
                onClick={() => setSelectedImage(null)}
            >
                <div
                    className="note-modal-content"
                    onClick={(e) => e.stopPropagation()}
                >
                    <img
                        src={selectedImage}
                        alt="Full view"
                        className="note-modal-image"
                    />
                </div>
            </div>
        )}
    </div>
  );
}

export default App;