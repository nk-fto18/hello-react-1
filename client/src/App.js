// imports
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';
import Container from './Container';
import NoteAddForm from './NoteAddForm';
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
  // CREATE

  // UPDATE
  const updateNote = index => {
    console.log('implementar')
  };
  // DELETE
  const removeNote = index => {
    const newNotes = [...notes];
    newNotes.splice(index, 1);
    setNotes(newNotes);
  };
  // render JSX
  return (
    <div>
      <Header title='Notas'/>
      <NoteAddForm />
      <Container
        notes={notes}
        removeNote={removeNote}
        updateNote={updateNote}
      />
      <Footer />
    </div>
  );
};

// export
export default App;
