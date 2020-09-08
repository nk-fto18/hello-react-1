// imports
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';
import NotesList from './NotesList';
import NoteForm from './NoteForm';
import Footer from './Footer';

const App = () => {

  // useState hook
  const [notes, setNotes] = useState([]);

  // useEffect hook
  useEffect(() => {
    axios.get('/api/notes')
      .then(res => {
        setNotes(res.data.notes);
      });
  }, []);

  // CRUD functions
  // create note
  const addNote = note => {
    axios.post('/api/notes', note)
      .then(res => {
        const newNotes = [res.data, ...notes];
        //console.log(newNotes);
        setNotes(newNotes);
      });
  };

  // update note
  const updateNote = (id, title, text) => {
    const updatedNote = {
      title: title,
      text: text,
      updatedAt: Date.now()
    };
    axios.put('/api/notes/' + id, updatedNote)
      .then(res => {
        const newNotes = notes.map(note => {
          if (note.id === id) {
            return updatedNote;
          }
          return note;
        });
        setNotes(newNotes);
      });
  };

  // delete note
  const removeNote = (id) => {
    axios.delete('/api/notes/' + id)
      .then(res => {
        console.log(id);
        const newNotes = notes.filter(note => note._id !== id);
        console.log(newNotes);
        setNotes(newNotes);
    });
  };

  // render JSX
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

// export
export default App;
