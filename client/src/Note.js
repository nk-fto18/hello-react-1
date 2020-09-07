import React from 'react';

const Note = ({ title, text, index, removeNote, updateNote }) => {
  // render JSX
  return (
    <div>
      <h3>{title}</h3>
      <p>{text}</p>
      <button onClick={() => updateNote(index)}>Guardar</button>
      <button onClick={() => removeNote(index)}>Eliminar</button>
    </div>
  );
};

export default Note;
