import React from 'react';
import Note from './Note';

const NotesList = ({ notes, removeNote, updateNote }) => {
  return (
    <div className="card-columns">
      {notes.map((note, index) => (
        <Note
          index={index}
          key={index}
          title={note.title}
          text={note.text}
          removeNote={removeNote}
          updateNote={updateNote}
        />
      ))}
    </div>
  );
};

export default NotesList;
