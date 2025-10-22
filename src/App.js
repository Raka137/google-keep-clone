import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import NoteForm from "./components/NoteForm";
import NotesList from "./components/NotesList";
import "./App.css";

function App() {
  const [notes, setNotes] = useState([]);

  // === BAGIAN BARU: State untuk Pencarian ===
  const [searchTerm, setSearchTerm] = useState("");
  // === AKHIR BAGIAN BARU ===

  useEffect(() => {
    const savedNotes = localStorage.getItem("keepNotes");
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
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
      createdAt: new Date().toISOString(),
    };
    setNotes([newNote, ...notes]);
  };

  const updateNote = (id, updatedNote) => {
    setNotes(notes.map((note) => (note.id === id ? updatedNote : note)));
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  // === BAGIAN BARU: Logika untuk memfilter catatan ===
  // Variabel ini akan berisi catatan yang sudah difilter atau semua catatan jika searchTerm kosong
  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );
  // === AKHIR BAGIAN BARU ===

  return (
    <div className="app">
      {/* Kirim state pencarian sebagai props ke Header */}
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <main className="app-main">
        <NoteForm addNote={addNote} />

        {/* Gunakan filteredNotes (bukan notes) untuk ditampilkan di NotesList */}
        <NotesList
          notes={filteredNotes}
          updateNote={updateNote}
          deleteNote={deleteNote}
        />
      </main>
    </div>
  );
}

export default App;
