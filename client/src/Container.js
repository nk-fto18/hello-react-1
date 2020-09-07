import React from 'react';
import Note from './Note';

const Container = ({ notes }) => {
  return (
    <div>
      {notes.map((note, index) => (
        <Note
          index={index}
          title={note.title}
          text={note.text}
        />
      ))}
    </div>
  );
};

export default Container;
