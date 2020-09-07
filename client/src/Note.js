import React from 'react';

const Note = ({ title, text, index }) => {
  return (
    <div>
      <h3>{title}</h3>
      <p>{text}</p>
      <a href="/#">Editar</a>
      <a href="/#">Borrar</a>
    </div>
  );
};

export default Note;
