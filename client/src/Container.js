import React from 'react';
import Note from './Note';

const Container = ({ notes, removeNote, updateNote }) => {
  return (
    <div>
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

export default Container;
