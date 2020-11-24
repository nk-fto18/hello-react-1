import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';
import NotesList from './NotesList';
import NoteForm from './NoteForm';
import Footer from './Footer';

const App = () => {

  const [notes, setNotes] = useState([]);

  useEffect(() => {
    axios.get('/api/notes')
      .then(res => {
        setNotes(res.data.notes);
      });
  }, []);

  const addNote = note => {
    axios.post('/api/notes', note)
      .then(res => {
        const newNotes = [res.data, ...notes];
        setNotes(newNotes);
      });
  };

  const updateNote = (id, title, text) => {
    const updatedNote = {
      title: title,
      text: text
    };
    axios.put('/api/notes/' + id, updatedNote)
      .then(res => {
        const newNotes = notes.map(note =>
          note.id === id ? updatedNote : note
        );
        setNotes(newNotes);
      });
  };

  const removeNote = (id) => {
    axios.delete('/api/notes/' + id)
      .then(res => {
        const newNotes = notes.filter(note => note._id !== id);
        setNotes(newNotes);
    });
  };

  return (
    <div>
      <Header title='Notas'/>
      <div className="container mt-3">
        <NoteForm
          addNote={addNote}
        />
        <hr />
        <NotesList
          notes={notes}
          removeNote={removeNote}
          updateNote={updateNote}
        />
      </div>
      <Footer />
    </div>
  );
};

export default App;