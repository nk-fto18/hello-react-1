import React, { useState } from 'react';

const Note = ({ index, title, text, removeNote, updateNote }) => {
  // editable state
  const [editable, setEditable] = useState(false);
  // edit handler
  const handleEdit = () => {
    console.log(editable); // DEBUG
    setEditable(!editable);
  };
  // save handler
  const handleSave = () => {
    updateNote(index, title, text);
    setEditable(!editable);
  };
  // render JSX
  return (
    <div>
      <h3 contentEditable={editable}>{title}</h3>
      <p contentEditable={editable}>{text}</p>
      <button hidden={editable} onClick={handleEdit}>Editar</button>
      <button hidden={!editable} onClick={handleSave}>Guardar</button>
      <button onClick={() => removeNote(index)}>Eliminar</button>
    </div>
  );
};

export default Note;
